<template>
  <div class="edit">
    <Prepub :form="form" ref="prePubRef"></Prepub>
    <Prepub2 :form="form" ref="prePubRef"></Prepub2>
    <Prepub3 :form="form" ref="prePubRef"></Prepub3>
    <Prepub4 :form="form" ref="prePubRef"></Prepub4>
  </div>
</template>

<script setup>
import Prepub from '@/components/xxfb/PrePub.vue'
import Prepub2 from '@/components/xxfb/PrePub2.vue'
import Prepub3 from '@/components/xxfb/PrePub3.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import {} from 'element-plus'
const route = useRoute()
import { pubRequest } from '@/utils/server.js'
import { createWebSocket } from '@/utils/websocket.js'
var wsbaseURL13 = import.meta.env.VITE_BASE_URL13

import localforage from "localforage/src/localforage.js"
import Cookies from 'js-cookie'
// Cookies.set(
//   'Authorization',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGktbGlzdC11cmwiOlsiXi9kZnMtdWkvLioiLCJeL2hyLW9yZy1zZXJ2aWNlL29yZ1ByZXZpZXcvcXVlcnlTeXNPcmdMaXN0LioiLCJeL2hyLW9yZy1zZXJ2aWNlL3N5c1VzZXIvZ2V0UGFnZUxpc3QuKiIsIl4vaHItb3JnLXNlcnZpY2Uvc3lzVXNlci9xdWVyeUVtcC4qIiwiXi9haS1nYXRlLXBvcnRhbC1zZXJ2aWNlL2dhdGUtcG9ydGFsL2ZlYXR1cmVDb21wYXJlLioiLCJeL2FpLWdhdGUtcG9ydGFsLXNlcnZpY2UvZ2F0ZS1wb3J0YWwvYWRkRmVhdHVyZS4qIiwiXi9oci1hdHRlbmRhbmNlLXNlcnZpY2UvYXR0ZW5kQ29udHJvbGxlci9zaWduaW4uKiIsIl4vYWktZ2F0ZS1wb3J0YWwtc2VydmljZS9tZXJnZWQtZ2F0ZS1wb3J0YWwvLioiLCJeL3lkeXktcXJjb2RlLXNlcnZpY2UvcXJjb2RlL2NyZWF0ZVFyY29kZS4qIl0sImV4cCI6MTcwMzcyNDQ2MSwidXNlcl9uYW1lIjoidXNlcl9tdWx0aXBvcnRfcGxhdDIiLCJqdGkiOiIzZWIwOTA3OS05MTIzLTQxOWMtYjhlZS01Y2FlNjA1MDhlYWYiLCJjbGllbnRfaWQiOiJjbGllbnRfbXVsdGlwb3J0X3BsYXQiLCJzY29wZSI6WyJzZWxlY3QiXX0.ktdaG4rtsMuh0TX1gWSwVFLBi0HDEvajxiO-dcaA_sU'
// )
const cookie = Cookies.get('Authorization')
console.log(cookie)

const roomName = route.query.roomName
// const roomId = route.query.roomID


const prePubRef = ref('')
// const data = ref('')
// 1.----获取本机ip接口  注意：是在引导页进行的本地存储------
const ipValue = localStorage.getItem(roomName)

// ---2.下载图片接口-------
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
      mtAreaList: releaseCache.mtAreaList,
      mediaAreaList: releaseCache.mediaAreaList
    })
    .then((res) => {
      
      if (res.data.repCode == 200) {
        console.log('下载图片/视频成功:')
        
        for (let i = 0; i <res.data.result.mediaAreaList.length; i++) {
          if (res.data.result.mediaAreaList[i].obsFileType == 2) {
            res.data.result.mediaAreaList[i].base64=''

            res.data.result.mediaAreaList[i].domID='domID'+res.data.result.mediaAreaList[i].obsFileID
            
            // 视频下载
            // debugger
            downLoadVideo(res.data.result.mediaAreaList[i],i)
          }
        }
        
        form.value = res.data.result
        // debugger
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

onMounted(() => {})
onBeforeUnmount(() => {
  localStorage.removeItem(roomName)
})
// 缓存 记录初始图片数组
const releaseInfoCache = ref()

console.log(ipValue)
if (ipValue == null) {
} else {
  // let websocket= createWebSocket(wsbaseURL13 + '/websocket/' + localData.value, {
  createWebSocket(wsbaseURL13 + '/websocket/' + ipValue, {
    onopen(e) {
      console.log('建立了websocket连接')
      console.log(e)
    },
    onmessage(e) {
      if (e.data == 'HeartBeat') {
        // console.log('接收服务器消息：', e.data)
        console.log('接收服务器消息', e.data)
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
    onreconnect() {
      // websocket = ws
    }
  })
  // }
}

// 视频下载接口udsRequest
const downLoadVideo = (item,i) => {
  // 使用.then/.catch
  let videoUrl
    // debugger
    localforage.getItem(item.obsFileID)
    .then(value => {
      if(value){
        console.log('拉取本地数据流：', value);
        videoUrl = URL.createObjectURL(value)
        item.base64 = videoUrl

        form.value.mediaAreaList[i].base64=videoUrl
        form.value.mediaAreaList=JSON.parse(JSON.stringify(form.value.mediaAreaList))

        return
      } else{
        fetch(
          '/dfs-ui/dfs/v2/file/download?inputId=' +
            item.obsFileID +
            '&fileName=' +
            item.obsFileName,
          {
            headers: {
              access_token: cookie
            }
          }
        )
          .then((response) => {
            // debugger
            return response.blob()
          })
          .then((res) => {
            //获取文件格式
            // let blob = new Blob([res]);
            const videoUrl = URL.createObjectURL(res)
            console.log('拉取uds数据流',videoUrl)
            item.base64 = videoUrl
            
            form.value.mediaAreaList[i].base64=videoUrl
            form.value.mediaAreaList=JSON.parse(JSON.stringify(form.value.mediaAreaList))

            localforage.setItem(item.obsFileID, res).then(
              // console.log('数据流存储到本地成功')
            );
            
          })
          .finally(()=>{
            
          })
        }
      
    })
    .catch(error => {
      console.error('拉取本地数据流失败', error);
      
    });
}


</script>

<style lang="less" scoped>
.edit {
  // background-color:rgba(255, 255, 255, 1);
}
</style>
