<template>
  <div class="edit">
    <Prepub :form="form" ></Prepub>
  </div>
</template>

<script setup>
import PreEdit from '@/components/xxfb/PreEdit.vue'
import Prepub from '@/components/xxfb/Prepub.vue'
import { ref, reactive,onMounted ,computed,nextTick,watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import {pubRequest} from '@/utils/server.js'
import { createWebSocket } from '@/utils/websocket.js'
var wsbaseURL13 = import.meta.env.VITE_BASE_URL13

const roomName = route.query.roomName
const roomId = route.query.roomID


// 1.----获取本机ip接口------
const ipValue=ref("")
var websocket
const getIp = (item) => {
  pubRequest
    .post('/PublishFlowCtrl/queryIotDeviceByName',{
      "roomName": roomName
    })
    .then((res) => {
      console.log('获取本机ip成功:', res.data.result.deviceIP)
      if(res.data.repCode==200){
         ipValue.value=res.data.result.deviceIP
      }
      ipValue.value=res.data.result.deviceIP
      // debugger
      
    })
    .catch((error) => {
      // debugger
      console.log('获取本机ip失败:', error)
    })
}

// const form=ref(
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

const form=ref({})
onMounted(()=>{
   getIp()
})


watch(()=>ipValue.value,()=>{
    //--------创建websocket对象
      // websocket = createWebSocket('ws://10.31.0.230:8086/iot-release-page-service/websocket/10.31.0.239', {
      websocket = createWebSocket(wsbaseURL13+'/websocket/'+ipValue.value, {
        onopen(e) {
          console.log('建立了websocket连接')
          console.log(e)
        },
        onmessage(e) {
          // debugger
          // console.log('接收服务器消息：', e.data)
          // 如果e.data是所有消息，则判断是否是当前会议室消息
          // debugger
          if (e.data == 'HeartBeat') {
            console.log('接收服务器消息：', e.data)

            return
          } else {
            // debugger
            var data = JSON.parse(e.data)
            if(data.repCode==200){
              form.value=data.result
              // console.log(form.value)
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
})



</script>

<style lang="less" scoped>
.edit {
  // background-color:rgba(255, 255, 255, 1);
}
</style>
