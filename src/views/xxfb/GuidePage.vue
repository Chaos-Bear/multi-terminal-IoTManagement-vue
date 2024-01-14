<template>
  <div class="guidePage">引导页</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {} from 'vue-router'
import { ElMessage } from 'element-plus'
import {} from '@element-plus/icons-vue'

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

      localStorage.setItem(roomName.value, ip)

      // const data = {
      //   key: roomName.value,
      //   value: ip,
      //   expires: new Date().getTime() +2 * 60 * 1000 // 设置过期时间为当前时间加上30分钟
      // };
      // localStorage.removeItem(roomName.value)

      // localStorage.setItem(data.key, JSON.stringify(data));

      window.location.href = pubPath.value
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
// let timeout
const getIP = (callback) => {
  let recode = {}
  let RTCPeerConnection =
    window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
  if (!RTCPeerConnection) {
    let win = window
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
  // debugger
  getIP(function (ip) {
    console.log(ip)

    getPubPath(ip)
  })
})

onBeforeUnmount(() => {
  // clearTimeout(timeout)
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
