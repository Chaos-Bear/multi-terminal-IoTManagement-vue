<template>
  <div class="edit">
    <PreEdit :form="form" :isshowlineValue="isshowlineValue"></PreEdit>
  </div>
</template>

<script setup>
import PreEdit from '@/components/xxfb/PreEdit.vue'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { request, tabletRequest } from '@/utils/server.js'
const roomName = route.query.roomName
const roomId = route.query.roomID

// debugger
// 1.----获取会议接口------
//   const getMeetingList=()=>{
//   tabletRequest
//     .post('', {
//       "borrowTime": dayTime.value,
//       "borrowedStatus": dayState.value,
//     })
//     .then((response) => {
//       // debugger
//       // console.log('当日借用记录按条件查询成功:', response.data.result)

//     })
//     .catch((error) => {
//       console.log('当日借用记录按条件查询失败:', error)
//     })
// }
// 2. ----------保存接口------------
// const saveRequest=()=>{
//   tabletRequest
//     .post('', {
//       "borrowTime": '',
//       "borrowedStatus": '',
//     })
//     .then(() => {
//       ElMessage({
//         type: 'success',
//         message: '保存成功'
//       })

//     })
//     .catch(() => {
//       ElMessage({
//         type: 'error',
//         message: '保存失败'
//       })
//     })
// }
// 1.选择会议
const meetingList = ref([
  {
    applyId: 1,
    mtName: '10月度工作例会'
  },
  {
    applyId: 2,
    mtName: '10月度工作例会2'
  }
])
const value = ref('')
//
const onChange = () => {
  // debugger
  console.log(value.value)
}

// 2.2.1会议信息区域
const form = ref({
  publishTime: '2023年10月31日 15:40:00',
  roomId: '',
  roomName: roomName,
  meetID: '',
  meetName: '人资部会议',
  roomTemp: 25,
  roomHum: '60%',
  brightNess: 100,
  meetStatus: '进行',
  imgShow: 1, //1.导览图 2 轮播图
  mtAreaList: [
    {
      TextLocat: '第一行文本',
      textConent: '11月度工作会议',
      fontSize: 54,
      textColor: '#ffffff',
      textVgt: 100,
      showLocat: 'center',
      syncStatus: 1, //1同步 0不同步
    },
    {
      textLocat: '第二行文本',
      textConent: '8:00-12:00',
      fontSize: 40,
      textColor: 'rgb(238, 238, 238)',
      textVgt: 100,
      showLocat: 'center',
      syncStatus: 1,
      isShow: 1
    },
    {
      textLocat: '第三行文本',
      textConent: '集成公司',
      fontSize: 40,
      textColor: 'rgb(238, 238, 238)',
      textVgt: 100,
      showLocat: 'center',
      syncStatus: 1,
      isShow: 1
    }
  ],
  mediaAreaList: [
    {
      roomId: 7781766872039424,
      meetID: 665786301885014016,
      playImg: 'http://39.105.179.38:9797/noderad/3.jpg',
      playVideoID: ''
    },
    {
      roomId: 7781766872039424,
      meetID: 665786301885014016,
      playImg: '',
      playVideoID: '@/assets/xxfb/cat.mp4',
      domId:"domVideo"
    },
    {
      roomId: 7781766872039424,
      meetID: 665786301885014016,
      playImg: 'http://39.105.179.38:9797/noderad/3.jpg',
      playVideoID: ''
    },
  ],
  // 提前发布时间
  prePubTime: 1,
  // 是否开启轮播图  1导览图  2.轮播图
  "imgShow": 1,  
  'playGap': 5000,
})

// debugger

// 第一行标题是否同步----------
const issyncLine1 = (v) => {
  //  debugger
  console.log('第一行标题是否同步', v)
  form.value.mtAreaList[0].syncStatus = v
}
const isshowlineValue = ref({
  isshowline1Value:true,
  isshowline2Value:true,
  isshowline3Value:true,
})

const isshowline1 = () => {
  // debugger
  isshowlineValue.value.isshowline1Value = !isshowlineValue.value.isshowline1Value
}
// 第一行字体大小
const line1FontSizeonChange = (v) => {
  // debugger
  form.value.mtAreaList[0].fontSize = v
}
// 第一行颜色
const line1TextColorChange = (v) => {
  // debugger
  // if(v==null){
  //   .value.mtAreaList[0].textColor="#13CE66"
  // }else{
  //   .value.mtAreaList[0].textColor=v
  // }
}
// 第一行居中方式
const line1textAlign = (e) => {
  form.value.mtAreaList[0].showLocat = e.target.dataset.textalign
}

// 第二行标题是否同步--------
const issyncLine2 = (v) => {
  //  debugger
  console.log('第二行标题是否同步', v)
  form.value.mtAreaList[1].syncStatus = v
}
const isshowline2 = () => {
  isshowlineValue.value.isshowline2Value = !isshowlineValue.value.isshowline2Value
}
// 第二行字体大小
const line2FontSizeonChange = (v) => {
  // debugger
  form.value.mtAreaList[1].fontSize = v
}
// 第二行颜色
// 第二行居中方式
const line2textAlign = (e) => {
  form.value.mtAreaList[1].showLocat = e.target.dataset.textalign
}

// 第三行标题是否同步--------
const issyncLine3 = (v) => {
  //  debugger
  console.log('第三行标题是否同步', v)
  form.value.mtAreaList[2].syncStatus = v
}
const isshowline3 = ()=> {
  isshowlineValue.value.isshowline3Value = !isshowlineValue.value.isshowline3Value
}
// 第一行字体大小
const line3FontSizeonChange = (v) => {
  // debugger
  form.value.mtAreaList[2].fontSize = v
}
// 第三行颜色
// 第三行居中方式
const line3textAlign = (e) => {
  form.value.mtAreaList[2].showLocat = e.target.dataset.textalign
}

// 是否开启轮播图
const issyncSwiperChange = () => {}
// 轮播间隔时间
const onTimeChange = (v) => {
 
  form.value.playGap=v
}

// 1.保存
const onSave = () => {
  // debugger
  console.log(form.value)
  // 调用保存接口
  // saveRequest()
}
// 2.发布弹框
const pubFormVisible = ref(false)
const onPub = () => {
  pubFormVisible.value = true
  // debugger
  form.value.prePubTime = '1'
  num.value = '0'
}

// 提前发布时间选择
// const prePubTime=ref(1)
// num 为自定义时间
const num = ref('')
const handleNumChange = (v) => {
  //  debugger
  num.value = v
}
const radioOptionChange = (v) => {
  // debugger
  // if(v!='3'&&v!=""){
  //   form.value.prePubTime=v
  // }else{
  //   form.value.prePubTime=num.value
  // }
}
// 弹框中取消按钮
const cancelPub = () => {
  pubFormVisible.value = false
  form.value.prePubTime = '1'
  num.value = '0'
}
//弹框中确认按钮
const confirmPub = () => {
  pubFormVisible.value = false
  // 调用发布接口

  pubSuccessVisible.value = true
}

// 发布成功提示
const pubSuccessVisible = ref(false)

// 2.2图片/视频上传
const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
  },
  {
    name: 'cat.mp4',
    url: '@/assets/xxfb/cat.mp4'
  }
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

// const fileList = ref([])
const beforeAvatarUpload = (rawFile) => {
  console.log('0000000', rawFile)

  // debugger
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('上传文件不能超过 20MB!')
    return false
  }

  for (var i = 0; i < fileList.value.length; i++) {
    if (rawFile.name == fileList.value[i].name) {
      ElMessage.error('上传文件名重复！')
      return
    }
  }
  fileList.value.push(rawFile)

  return true
}
</script>

<style lang="less" scoped>
.edit {
  // background-color:rgba(255, 255, 255, 1); 
}
</style>
