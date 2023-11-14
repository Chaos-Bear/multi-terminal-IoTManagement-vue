<template>
  <div class="edit">
    <PreEdit :form="form" ></PreEdit>
  </div>
</template>

<script setup>
import PreEdit from '@/components/xxfb/PreEdit.vue'
import { ref, reactive,onMounted ,computed} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { releaseRequest } from '@/utils/server.js'
const roomName = route.query.roomName
const roomId = route.query.roomID

// 1.----查询发布信息接口------
const getSyncInfo = (item) => {
  releaseRequest
    .post('/IotPageEditCrtl/queryReleasePageInfoByMeet', {
      
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('查询发布信息成功:', res.data.result)

        item.textConent = res.data.result.textConent
        
      }
    })
    .catch((error) => {
      // debugger
      console.log('查询发布信息失败:', error)
    })
}
const meetingList = ref([
  {
    publishTime: '10:00~23:00',
    publishStatus: '1',
    roomID: '8186847552438272',
    roomName: 'A2-226',
    meetID: '670413063993503744',
    meetName: '11.13日测试会议',
    roomTemp: null,
    roomHum: null,
    meetStatus: '1',
    showStartTime: '2023-11-13T02:00:00.000+0000',
    showEndTime: '2023-11-13T14:00:00.000+0000',
    startTime: '2023-11-13 10:00:00',
    endTime: '2023-11-13 22:00:00',
    imgShow: '1',
    brightNess: 0,
    playGap: 5000,
    mtAreaList: [
      {
        roomID: '8186847552438272',
        meetID: '670413063993503744',
        textLocat: '标题',
        textConent: '11.13日测试会议',
        fontSize: 48,
        textColor: 'rgba(208, 178, 178, 0.8)',
        textVgt: '100%',
        showLocat: 'center',
        showOrder: 1,
        syncStatus: 1,
        isShow: '1',
        startTime: null,
        endTime: null
      },
      {
        roomID: '8186847552438272',
        meetID: '670413063993503744',
        textLocat: '时间',
        textConent: '10:00~23:00',
        fontSize: 34,
        textColor: 'rgba(219, 79, 79, 0.8)',
        textVgt: '100%',
        showLocat: 'center',
        showOrder: 2,
        syncStatus: 1,
        isShow: '1',
        startTime: null,
        endTime: null
      },
      {
        roomID: '8186847552438272',
        meetID: '670413063993503744',
        textLocat: '主办方',
        textConent: '信息系统信息通讯分公司',
        fontSize: 34,
        textColor: 'rgba(255, 255, 255, 0.8)',
        textVgt: '100%',
        showLocat: 'center',
        showOrder: 3,
        syncStatus: 1,
        isShow: '1',
        startTime: null,
        endTime: null
      }
    ],
    mediaAreaList: [
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        type: 'img'
      },
      {
        name: 'cat.mp4',
        // url: '@/assets/xxfb/cat.mp4',
        // url: 'http://39.105.179.38:9797/noderad/cat.mp4',
        url:'file:///C:/Users/55462/Downloads/cat%20(7).mp4',
        type: 'video',
        domId:"xy"
      }
    ]
  }
])
// const form=ref({})
const form=computed(()=>{
  var res=meetingList.value[0]
  
  return res
})
onMounted(()=>{
  //  form.value=meetingList.value[0]
})

</script>

<style lang="less" scoped>
.edit {
  // background-color:rgba(255, 255, 255, 1);
}
</style>
