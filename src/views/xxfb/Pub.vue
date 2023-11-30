<template>
  <div class="edit">
    <Prepub :form="form" ref="prePubRef"></Prepub>
  </div>
</template>

<script setup>
import PreEdit from '@/components/xxfb/PreEdit.vue'
import Prepub from '@/components/xxfb/Prepub.vue'
import { ref, reactive, onMounted, computed, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { pubRequest} from '@/utils/server.js'
import { createWebSocket } from '@/utils/websocket.js'
var wsbaseURL13 = import.meta.env.VITE_BASE_URL13

const roomName = route.query.roomName
const roomId = route.query.roomID

const prePubRef = ref('')
const data = ref('')
// 1.----获取本机ip接口------
// const ipValue = localStorage.getItem("xxfbIp")
const ipValue = localStorage.getItem(roomName)
const roomNameLocal = localStorage.getItem('roomName')

var websocket
// const getIp = (item) => {
//   pubRequest
//     .post('/PublishFlowCtrl/queryIotDeviceByName', {
//       roomName: roomName
//     })
//     .then((res) => {
//       console.log('获取本机ip成功:', res.data.result.deviceIP)
//       if (res.data.repCode == 200) {
//         ipValue.value = res.data.result.deviceIP
//       }
//       ipValue.value = res.data.result.deviceIP
//       // debugger
//     })
//     .catch((error) => {
//       // debugger
//       console.log('获取本机ip失败:', error)
//     })
// }

// ---2.下载图片/视频接口-------
const updateMedia = (releaseCache) => {
  pubRequest
    .post('/PublishFlowCtrl/updateReleaseMediaInfo', {
      deviceIP: releaseCache.deviceIP,
      playGap: releaseCache.playGap,
      brightNess: releaseCache.brightNess,
      meetStatus: releaseCache.meetStatus,
      roomHum: releaseCache.roomHum,
      roomTemp: releaseCache.roomTemp,
      roomName: roomName,
      meetID: releaseCache.meetID,
      imgShow: releaseCache.imgShow,
      dataSource: releaseCache.dataSource,
      playGap: releaseCache.playGap,
      mtAreaList: releaseCache.mtAreaList,
      mediaAreaList: releaseCache.mediaAreaList
    })
    .then((res) => {
      if (res.data.repCode == 200) {
        console.log('下载图片/视频成功:')

        form.value = res.data.result

        //刷新缓存
        releaseInfoCache.value = res.data.result
      }
    })
    .catch((error) => {
      console.log('下载图片/视频失败:', error)
    })
}

// const from=({
// {
//   publishTime: '10:00~23:00',
//   publishStatus: '1',
//   roomID: '8186847552438272',
//   roomName: 'A2-226',
//   meetID: '670413063993503744',
//   meetName: '11.13日测试会议',
//   roomTemp: null,
//   roomHum: null,
//   meetStatus: '1',
//   showStartTime: '2023-11-13T02:00:00.000+0000',
//   showEndTime: '2023-11-13T14:00:00.000+0000',
//   startTime: '2023-11-13 10:00:00',
//   endTime: '2023-11-13 22:00:00',
//   imgShow: '1',
//   brightNess: 0,
//   playGap: 5000,
//   mtAreaList: [
//     {
//       roomID: '8186847552438272',
//       meetID: '670413063993503744',
//       textLocat: '标题',
//       textConent: '11.13日测试会议',
//       fontSize: 48,
//       textColor: 'rgba(208, 178, 178, 0.8)',
//       textVgt: '100%',
//       showLocat: 'center',
//       showOrder: 1,
//       syncStatus: 1,
//       isShow: '1',
//       startTime: null,
//       endTime: null
//     },
//     {
//       roomID: '8186847552438272',
//       meetID: '670413063993503744',
//       textLocat: '时间',
//       textConent: '10:00~23:00',
//       fontSize: 34,
//       textColor: 'rgba(219, 79, 79, 0.8)',
//       textVgt: '100%',
//       showLocat: 'center',
//       showOrder: 2,
//       syncStatus: 1,
//       isShow: '1',
//       startTime: null,
//       endTime: null
//     },
//     {
//       roomID: '8186847552438272',
//       meetID: '670413063993503744',
//       textLocat: '主办方',
//       textConent: '信息系统信息通讯分公司',
//       fontSize: 34,
//       textColor: 'rgba(255, 255, 255, 0.8)',
//       textVgt: '100%',
//       showLocat: 'center',
//       showOrder: 3,
//       syncStatus: 1,
//       isShow: '1',
//       startTime: null,
//       endTime: null
//     }
//   ],
//   mediaAreaList: [
//     {
//       name: 'food.jpeg',
//       url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
//       type: 'img'
//     },
//     {
//       name: 'cat.mp4',
//       // url: '@/assets/xxfb/cat.mp4',
//       // url: 'http://39.105.179.38:9797/noderad/cat.mp4',
//       url:'file:///C:/Users/55462/Downloads/cat%20(7).mp4',
//       type: 'video',
//       domId:"xy"
//     }
//   ]
// }
// )

const form = ref()

onMounted(() => {
  // getIp()
})

// 缓存 记录初始图片数组
const releaseInfoCache = ref()

console.log(ipValue)
// debugger
if (ipValue == null) {
  //  return
} else {
  websocket = createWebSocket(wsbaseURL13 + '/websocket/' + ipValue, {
    onopen(e) {
      console.log('建立了websocket连接')
      console.log(e)
    },
    onmessage(e) {
      if (e.data == 'HeartBeat') {
        console.log('接收服务器消息：', e.data)
        return
      } else {
        var data = JSON.parse(e.data)
        if (data.repCode == 200) {
          if (releaseInfoCache.value == undefined) {
            // 缓存为空，直接赋值
            releaseInfoCache.value = data.result
            updateMedia(releaseInfoCache.value)
            return
          } else {
            var dataRelease = data.result
            var dataMediaList = dataRelease.mediaAreaList
            var releaseInfo = releaseInfoCache.value
            var mediaCahceList = releaseInfo.mediaAreaList
            var cacheLength = mediaCahceList.length
            var dataMediaLength = dataMediaList.length
            var cacheObsFileList = []
            for (var i = 0; i < mediaCahceList.length; i++) {
              var cahceMedia = mediaCahceList[i]
              cacheObsFileList.push(cahceMedia.obsFileID)
            }
            var dataObsFileList = []
            for (var j = 0; j < dataMediaList.length; j++) {
              var dataMedia = dataMediaList[j]
              dataObsFileList.push(dataMedia.obsFileID)
            }
            //
            let set2 = new Set(dataObsFileList)

            let intersection = Array.from(new Set(cacheObsFileList)).filter((x) => set2.has(x))

            let setLength = intersection.length
            // 图片减少情况
            if (cacheLength != setLength) {
              updateMedia(dataRelease)
              console.log(intersection) // 输出: [3, 4, 5]
              return
            }
            // 图片新增情况
            if (setLength != dataMediaLength) {
              updateMedia(dataRelease)
              console.log(intersection) // 输出: [3, 4, 5]
              return
            }

            //刷新 form.value
            form.value.playGap = dataRelease.playGap
            form.value.brightNess = dataRelease.brightNess
            form.value.meetStatus = dataRelease.meetStatus
            form.value.roomHum = dataRelease.roomHum
            form.value.roomTemp = dataRelease.roomTemp
            form.value.roomName = roomName
            form.value.meetID = dataRelease.meetID
            form.value.imgShow = dataRelease.imgShow
            form.value.dataSource = dataRelease.dataSource
            form.value.playGap = dataRelease.playGap
            form.value.mtAreaList = dataRelease.mtAreaList
          }
        }
      }
    },
    onerror() {},
    onclose() {},
    onbeforeunload() {},
    onreconnect(ws) {
      websocket = ws
    }
  })
}
</script>

<style lang="less" scoped>
.edit {
  // background-color:rgba(255, 255, 255, 1);
}
</style>
