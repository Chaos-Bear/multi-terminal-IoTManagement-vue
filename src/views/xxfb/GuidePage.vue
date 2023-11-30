<template>
  <div class="guidePage">引导页</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, nextTick, watch, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { pubRequest } from '@/utils/server.js'

const roomName = ref('')
const pubPath = ref('')
//根据ip获取发布页路径接口
const getPubPath = (ip) => {
  pubRequest
    .post('/PublishFlowCtrl/queryReleasePageAddrres', {
      deviceIP: ip
    })
    .then((res) => {
      console.log('根据ip获取发布页路径成功:', res.data)

      roomName.value = res.data.result.roomName
      pubPath.value = res.data.result.pubPath
      // debugger

      // localStorage.setItem("xxfbIp",ip)
      localStorage.setItem(roomName.value, ip)

      window.location.href = pubPath.value

      localStorage.setItem('roomName', res.data.result.roomName)
    })
    .catch((error) => {
      // debugger
      console.log('根据ip获取发布页路径失败:', error)
      ElMessage({
        message: '根据ip获取发布页路径失败',
        type: 'warning'
      })
      // router.push('/pub?roomName=' + roomName.value)
    })
}

const getIP = (callback) => {
  let recode = {}
  let RTCPeerConnection =
    window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  if (!RTCPeerConnection) {
    let win = iframe.contentWindow
    RTCPeerConnection =
      win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection
  }
  //创建实例，生成连接
  let pc = new RTCPeerConnection()
  // 匹配字符串中符合ip地址的字段
  function handleCandidate(candidate) {
    try {
      let ip_regexp =
        /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/
      let ip_isMatch = candidate.match(ip_regexp)[1]
      if (!recode[ip_isMatch]) {
        callback(ip_isMatch)
        recode[ip_isMatch] = true
      }
    } catch (err) {
      if (candidate.indexOf('typ host') !== -1) {
        var ipAddress = candidate.split(' ')[4]
        callback(ipAddress)
        console.log('本地 IPv4 地址:', ipAddress)
      }
    }
  }
  //监听icecandidate事件
  pc.onicecandidate = (ice) => {
    if (ice.candidate) {
      handleCandidate(ice.candidate.candidate)
    }
  }
  //建立一个伪数据的通道
  pc.createDataChannel('')
  pc.createOffer(
    (res) => {
      pc.setLocalDescription(res)
    },
    () => {}
  )

  //延迟，让一切都能完成
  setTimeout(() => {
    let lines = pc.localDescription.sdp.split('\n')
    lines.forEach((item) => {
      if (item.indexOf('a=candidate:') === 0) {
        handleCandidate(item)
      }
    })
  }, 1000)
}

onMounted(() => {
  getIP(function (ip) {
    console.log(ip)

    getPubPath(ip)
  })
})
</script>

<style lang="less" scoped>
.guidePage {
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
