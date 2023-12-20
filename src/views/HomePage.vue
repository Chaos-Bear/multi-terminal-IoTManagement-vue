<template>
  <div class="home">
    <!-- 1.导航栏 -->
    <div class="navigationBar">
      <div>
        <!-- <div v-for="(item,i) in navigationBar" :key="i" class="item">
              <div>
                  <img :src="item.src" @click="(item.url)">
              </div>
              <div>{{item.navigationCon}}</div>
          </div> -->
        <div class="item">
          <div>
            <img src="@/assets/home/1.png" @click="router.push('/deviceList')" />
          </div>
          <div>设备管理</div>
        </div>
        <div class="item">
          <a href="/iot-client/#/callService" target="__blank">
            <img src="@/assets/home/3.png" />
          </a>
          <!-- <a href="/#/callService" target="__blank">
            <img src="@/assets/home/3.png" />
          </a> -->
          <div>呼叫服务</div>
        </div>
        <div class="item">
          <a href="/iot-client/#/tablet" target="_blank">
            <img src="@/assets/home/2.png" />
          </a>
          <!-- <a href="/#/tablet" target="_blank">
            <img src="@/assets/home/2.png" />
          </a> -->
          <div>平板借还</div>
        </div>
        <!-- <div class="item">
          <div>
            <img src="@/assets/home/3.png" @click="router.push('/callService')" />
          </div>
          <div>呼叫服务</div>
        </div>
        <div class="item">
          <div>
            <img src="@/assets/home/2.png" @click="router.push('/tablet')" />
          </div>
          <div>平板借还</div>
        </div> -->
        <div class="item">
          <div>
            <img src="@/assets/xxfb/screenshots/10.png" @click="router.push('/xxfb-monitorlist')" />
          </div>
          <div>发布屏监控</div>
        </div>
      </div>
      <div>
         <el-button  style="float: right; margin-left: 10px" @click="returnHome">返回</el-button>
        
      </div>
    </div>
    <!-- 2. 头部 -->
    <div class="top">
      <b>
        <span
          style="font-size: 24px; font-family: SourceHanSansSC-medium; color: rgba(51, 51, 51, 1)"
        >
          智慧物联
        </span>
      </b>
      <!-- <el-button style="float: right; margin-left: 10px" @click="returnHome">返回</el-button> -->

      <div>
        <el-form ref="queryFormRef" :model="searchform" label-position="left">
          <el-row>
            <el-col :span="6">
              <el-form-item label="会议室名称" prop="name">
                <el-input
                  style="width: 80%"
                  v-model="searchform.name"
                  placeholder="请输入会议室名称"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="楼层" prop="floor" required>
                <el-select v-model="searchform.floor" style="width: 80%" placeholder="选择楼层">
                  <el-option
                    v-for="item in floorOptions"
                    :key="item.order"
                    :label="item.floor"
                    :value="item.floor"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地点" prop="address" required>
                <el-select v-model="searchform.address" style="width: 80%" placeholder="选择地点">
                  <!-- <el-option label="全部" value="全部" />
                  <el-option label="会议中心" value="会议中心" /> -->
                  <el-option
                    v-for="item in addressOptions"
                    :key="item.order"
                    :label="item.address"
                    :value="item.address"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="&nbsp;" style="float: right">
                <el-button type="primary" @click="addMeetingItem">新增</el-button>
                <el-button type="primary" @click="searchInfo">查询</el-button>
                <el-button @click="resetQuery()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 3.会议室列表 -->
    <div class="tableBox">
      <el-scrollbar height="100%" v-loading='isloading'>
        <div class="meetingList" v-if="meetingList.length > 0" >
          <div v-for="(item, index) in meetingList" :key="index" class="meetingroom">
            <!-- <img src="@/assets/index/1.png" @click="router.push('/meetingUserList?id='+item.id+'&name='+item.name)"/> -->
            <el-image :src="'data:image/jpg;base64,' + item.roomImg" :key="'data:image/jpg;base64,' + item.roomImg"
              @click="gotoMeetingUserList(item)"  lazy />
            <div>
              <div>
                <div class="roomName">{{ item.roomName }}会议室</div>

                <img
                  class="custom_option_img1"
                  src="@/assets/img/meeting_modify.png"
                  alt="修改图片"
                  @click="meetingModify(item)"
                />
                <img
                  class="custom_option_img2"
                  alt="删除图片"
                  src="@/assets/img/meeting_delete.png"
                  @click="deleteMeeting(item)"
                />
              </div>
              <div class="detailInfo">
                {{ item.roomClassNum }}个项目，{{ item.roomContNum }}个发布页
              </div>
            </div>
          </div>
        </div>
        <!-- 暂无会议室 -->
        <div v-else class="noMeetingList">暂无会议室</div>
      </el-scrollbar>
    </div>

    <!-- 4. 分页 -->
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[24, 48, 96]"
        layout=" prev, pager, next, sizes,jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-button type="primary">确定</el-button>
      <img src="@/assets/index/deviceList/refresh.png" @click="refresh()" />
    </div>
    <!-- ----------新增/修改会议室弹框 -->
    <div v-if="meetingVisual">
      <el-dialog
        :title="createForm.roomID ? '编辑会议室' : '新增会议室'"
        v-model="meetingVisual"
        style="width: 450px"
        :before-close="createFormClose"
      >
        <el-form
          :model="createForm"
          label-width="100px"
          ref="createFormRef"
          :rules="createFormRules"
          label-position="left"
        >
          <el-form-item
            label="会议室名称"
            prop="name"
            :class="[createForm.roomID ? '' : 'is-required']"
          >
            <el-input
              v-model="createForm.name"
              placeholder="请输入会议室名称例如:A2-110"
              :disabled="createForm.roomID ? true : false"
            />
          </el-form-item>
          <el-form-item label="地点" prop="address">
            <el-select v-model="createForm.address" style="width: 100%" placeholder="选择地点">
              <el-option
                v-for="item in addressOptions.slice(1)"
                :key="item.order"
                :label="item.address"
                :value="item.address"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="楼层" prop="floor">
            <el-select v-model="createForm.floor" style="width: 100%" placeholder="选择楼层">
              <el-option
                v-for="item in floorOptions.slice(1)"
                :key="item.order"
                :label="item.floor"
                :value="item.floor"
                :disabled="item.disabled"
              />
            </el-select>
          </el-form-item>
          <!--*号 class="is-required"  prop="imageUrl"-->
          <el-form-item label="会议室图片" prop="imageUrl" class="is-required">
            <!-- action:要上传的地址   :show-file-list是否展示上传列表 :on-change上传文件列表改变时 :auto-upload 是否自动上传 false为手动上传  -->
            <div style="display: flex; align-items: center">
              <div v-if="imageUrl" style="position: relative" class="uploadImgCont">
                <img :src="imageUrl" class="avatar" />
                <div class="uploadImg">
                  <el-icon @click="del"><Delete /></el-icon>
                </div>
              </div>
              <el-upload
                class="avatar-uploader"
                :auto-upload="false"
                :limit="1"
                :show-file-list="false"
                :on-change="beforeAvatarUpload"
                :http-request="() => {}"
                accept=".jpeg,.jpg,.png,.gif"
                v-else
              >
                <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
              <div class="uploadTip" v-if="!imageUrl">仅支持jpeg/jpg/png/gif格式上传!</div>
            </div>
          </el-form-item>
          <el-form-item>
            <!-- 修改弹窗 -->
            <el-button v-if="createForm.roomID" type="primary" @click="saveMeetingModify"
              >确 定</el-button
            >
            <!-- 新增弹窗 -->
            <el-button v-else type="primary" @click="addMeeting">确 定</el-button>
            <el-button @click="createFormClose">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
const router = useRouter()
// import axios from 'axios'

import {releaseRequest } from '@/utils/server.js'

// 会议室配置信息
var floorOptions = ref([])
var addressOptions = ref([])

const getFloorandAddList = () => {
  releaseRequest
    .post('/IOTRoomCrtl/queryIotFloorAddr')
    .then((res) => {
      // console.log("楼层及地点列表获取成功",res.data);
      // debugger
      // 楼层中添加全部
      res.data.iotFloorList.unshift({ floor: '全部', order: 0 })
      floorOptions.value = res.data.iotFloorList

      // 地点中添加全部
      res.data.iotAddresseList.unshift({ address: '全部', order: 0 })
      addressOptions.value = res.data.iotAddresseList
    })
    .catch((error) => {
      console.log('楼层及地点列表获取失败', error)
    })
}
// 会议室列表接口
const isloading=ref(false)
const getList = () => {
  isloading.value=true
  releaseRequest
    .post('/IOTRoomCrtl/queryIotRoomList', {
      floor: searchform.floor,
      roomAddr: searchform.address,
      roomName: searchform.name,
      source: '',
      pageNum: currentPage.value,
      pageSize: pageSize.value
    })
    .then((res) => {
      console.log('会议室列表查询成功:', res.data)

      // debugger
      // 总条数
      total.value = res.data.totalRecord
      meetingList.length = 0
      //使用push方法:结构后再赋值
      meetingList.push(...res.data.data)
    })
    .catch((error) => {
      console.log('会议室列表查询失败:', error)
    })
    .finally(()=>{
      isloading.value=false
    })
}
onMounted(() => {
  getList()
  getFloorandAddList()
})
// 会议室列表新增接口
const postList = () => {
  //数据流
  const formData = new FormData()
  const data = {
    floor: createForm.floor,
    roomAddr: createForm.address,
    roomName: createForm.name,
    source: ''
  }
  formData.append('data', JSON.stringify(data))
  // 二进制文件上传
  formData.append('file', createForm.img)
  // debugger
  releaseRequest
    .post('/IOTRoomCrtl/saveIOTRoomInfo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('会议室新增列表成功:', res.data)

      createFormClose()
      isLocked.value = false
      //debugger
      getList()
    })
    .catch((error) => {
      console.log('会议室新增列表失败:', error)
      isLocked.value = false
    })
}
// 会议室列表删除接口
const roomID = ref('')
const deleteList = () => {
  releaseRequest
    .post('/IOTRoomCrtl/deleteIOTMTInfo', {
      roomID: roomID.value
    })
    .then((res) => {
      console.log('删除会议室列表成功:', res.data)
      console.log('删除id:', roomID.value)
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      getList()
    })
    .catch((error) => {
      console.log('删除会议室列表失败:', error)
    })
}

// 1.顶部，模块导航
// const navigationBar=[
//     {
//        src:"/home/1.png",
//        navigationCon:"设备管理",
//        url:"/deviceList",
//     },
//     {
//        src:"/home/3.png",
//        navigationCon:"呼叫服务",
//        url:"/callService"

//     },
//     {
//        src:"/home/2.png",
//        navigationCon:"平板借还",
//        url:"/tablet"
//     },
// ]

// 2.查询/新增/重置
const queryFormRef = ref()
// 查询form表单
const searchform = reactive({
  name: '',
  floor: '2F',
  address: '会议中心'
})
// 查询按钮
const searchInfo = () => {
  //发get请求,渲染会议列表
  getList()
}

// 重置
const resetQuery = () => {
  searchform.name = ''
  searchform.floor = '2F'
  searchform.address = '会议中心'
  // 发get请求，重新渲染会议列表
  getList()
}
//返回
// const isshow=ref(true)
// isshow.value=window.top?true:false
const returnHome = () => {
  if(window.top && window.top.document.getElementsByTagName('iframe').length>0){
     window.top.document.getElementsByTagName('iframe')[0].src='/meeting-appoint-web/#/conference-room-manage'
  }else{
    return
  }
  
}
// 新增
const createForm = reactive({
  name: '',
  address: '',
  floor: '',
  img: '',
  roomID: ''
})
// 新增按钮
const addMeetingItem = () => {
  createFormRules.value = {
    name: [{ validator: validateName, trigger: 'blur' }],
    address: [{ required: true, message: '请选择地点', trigger: 'blur' }],
    floor: [{ required: true, message: '请选择楼层', trigger: 'blur' }],
    imageUrl: [{ validator: checkImg, trigger: 'blur' }]
  }

  meetingVisual.value = true
  nextTick(() => {
    createForm.name = ''
    createForm.address = '会议中心'
    createForm.floor = '2F'
    createForm.roomID = ''

    imageUrl.value = ''
  })
}
// 新增-----图片上传
const imageUrl = ref('')

const beforeAvatarUpload = (rawFile) => {
  // debugger
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error('上传图片尺寸不能超过 10MB!')
    return false
  }

  imageUrl.value = URL.createObjectURL(rawFile.raw)
  createForm.img = rawFile.raw
  return true
}


const del = () => {
  imageUrl.value = ''
}

const checkImg = (rule, value, callback) => {
  // debugger
  if (!imageUrl.value) {
    return callback(new Error('请上传图片'))
  } else {
    callback()
  }
}
// 组件实例 及校验
const createFormRef = ref(null)

// 会议名称校验
const validateName = (rule, value, callback) => {
  // 新增会议室名称校验
  if (value === '') {
    return callback(new Error('请输入会议室名称'))
  }
  const reg = /[^\w-]/g

  if (reg.test(value)) {
    return callback(new Error('只允许输入字母，数字，-'))
  }
  if (value.length > 50) {
    return callback(new Error('长度不能超过50个字符'))
  }

  var meetingNameList = []
  meetingList.forEach((item) => {
    meetingNameList.push(item.roomName)
  })
  if (meetingNameList.indexOf(value) > -1) {
    return callback(new Error('该会议室已存在，请重新输入'))
  }
  return callback()
}
//校验规则
const createFormRules = ref({})

//  新增会议信息 弹框中 的确定按钮
function debounce(func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        typeof func === 'function' && func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        typeof func === 'function' && func.apply(context, args)
      }, wait)
    }
  }
}
const isLocked = ref(false)
const addMeetingFn = () => {
  if (isLocked.value) {
    return
  }
  isLocked.value = true
  //校验
  createFormRef.value.validate((valid) => {
    if (valid) {
      postList()
    } else {
      console.log('校验错误')
      isLocked.value = false
    }
  })
}
const addMeeting = debounce(addMeetingFn, 300, false)

// 3.会议信息
const meetingList = reactive([
  //   {roomID:"1",roomName:"A201",floor:"2F",roomAddr:"会议中心",roomImg
  // :""},
])
// 点击会议室图片，跳转到 用户界面列表
const gotoMeetingUserList = (item) => {
  // debugger
  // localStorage.setItem('name', item.roomName)
  // localStorage.setItem('roomId', item.roomID)
  router.push('/meetingUserList?roomName=' + item.roomName + '&roomID=' + item.roomID)
}

// ----------------修改会议信息弹框
const meetingVisual = ref(false)
// 列表中的编辑按钮
const meetingModify = (obj) => {
  // debugger
  // console.log("333333333333333333333",createFormRef.value)
  createFormRules.value = {
    address: [{ required: true, message: '请选择地点', trigger: 'blur' }],
    floor: [{ required: true, message: '请选择楼层', trigger: 'blur' }],
    imageUrl: [{ validator: checkImg, trigger: 'blur' }]
  }

  meetingVisual.value = true
  nextTick(() => {
    createForm.roomID = obj.roomID
    createForm.name = obj.roomName
    createForm.address = obj.roomAddr
    createForm.floor = obj.floor
    // createForm.img='data:image/jpg;base64,'+obj.roomImg ;
    imageUrl.value = 'data:image/jpg;base64,' + obj.roomImg
    // Object.assign(formModify, obj)
  })
}

// 将 base64 转换为 Blob
const base64ToFile = (base64) => {
  const name = new Date().getTime() + Math.floor(Math.random() * 999)
  // const name = '图片1';
  if (typeof base64 != 'string') {
    return
  }
  var arr = base64.split(',')
  var type = arr[0].match(/:(.*?);/)[1]
  var fileExt = type.split('/')[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${name}.` + fileExt, {
    type: type
  })
}

// 该方法用于清除新增和编辑弹框中的校验
const createFormClose = () => {
  if (createFormRef.value) {
    createFormRef.value.resetFields()
  }
  meetingVisual.value = false
}

// 编辑弹框中的保存按钮
const saveMeetingModify = () => {
  //校验
  createFormRef.value.validate((valid) => {
    if (valid) {
      // 会议室列表修改接口
      //数据流
      const formData = new FormData()
      const data = {
        floor: createForm.floor,
        roomAddr: createForm.address,
        roomID: createForm.roomID,

        roomName: createForm.name,
        source: ''
      }
      formData.append('data', JSON.stringify(data))
      // 二进制文件上传
      formData.append('file', createForm.img || base64ToFile(imageUrl.value))
      // debugger
      releaseRequest
        .post('/IOTRoomCrtl/updateIOTRoom', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('会议室编辑成功:', res.data)
          createFormClose()
          //debugger
          getList()
        })
        .catch((error) => {
          console.log('会议室编辑失败:', error)
        })
    } else {
      console.log('校验错误')
    }
  })
}

// 单条删除
const deleteMeeting = (v) => {
  // debugger
  // 删除时，需先删除当前会议室下的项目和页面
  if(v.roomClassNum || v.roomContNum){
    //  ElMessage.error('删除失败，请先删除当前会议室下的所有页面！')
    ElMessageBox.confirm('删除失败，请先删除当前会议室下的所有页面！', '删除', {
      cancelButtonClass:'ExitCancelBtn',
      confirmButtonText: '确定',
      type: 'error',
    }).then(() => {
     
    })
    .catch(() => {
      
    })
    return
  }
  roomID.value = v.roomID
  console.log('删除一条会议信息', v.roomName)
  ElMessageBox.confirm('确定删除当前选中会议室？', '删除', {
    cancelButtonClass:'ExitCancelBtn',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 发送删除接口 请求，删除此条会议室信息
      deleteList()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

// 4.分页
const currentPage = ref(1)
const pageSize = ref(24)
const total = ref(0)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  //重新发请求，渲染设备列表
  getList()
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  //重新发请求，渲染设备列表
  getList()
}
// 刷新按钮
const refresh = () => {
  //重新发请求，渲染设备列表
  getList()
}
</script>
<style lang="less" scoped>

.home {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  //1.导航栏
  .navigationBar {
    height: 111px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: none;
    &>div:nth-child(1){
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .item {
        margin-right: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        & > a,
        & > div:nth-child(1) {
          width: 45px;
          height: 45px;
          border-radius: 4px;
          background-color: rgba(24, 144, 255, 1);
          img {
            width: 25px;
            height: 25px;
            margin: 10px;
          }
        }

        & > div {
          height: 20px;
          font-size: 14px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }
    } 
    &>div:nth-child(2){
      margin-top: -20px;
    }
  }
  // 2. 头部
  .top {
    padding: 16px 0px 20px 20px;
    height: 113px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    flex: none;
    & > div {
      margin-top: 11px;
    }

    :deep(.el-form) {
      .el-form-item__content {
        flex-wrap: nowrap;
      }
    }
  }

  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    width: 120px;
    height: 120px;
    line-height: 20px;
    border-radius: 3px;
    background-color: rgba(251, 253, 255, 1);
    text-align: center;
    border: 1px solid rgba(192, 204, 218, 1);
  }

  // 3. 会议列表
  .tableBox {
    flex: 1;
    overflow: hidden;
    .meetingList {
      width: 100%;
      // height: 690px;
      // height: calc( 100% -  );
      padding-top: 16px;
      padding-left: 22px;
      display: flex;
      flex-wrap: wrap;
      // border: 1px solid red;
      .meetingroom {
        width: 220px;
        height: 213px;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: 8px 8px 0px 0px;
        background-color: rgba(255, 255, 255, 1);
        text-align: center;
        border: 1px solid rgba(233, 233, 233, 1);
        
        & > div {
          height: 123px;
          display: flex;
          flex-direction: column;
          & > div {
            line-height: 24px;
            margin-top: 14px;
            padding-left: 24px;
            padding-right: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
              img {
                width: 100%;
                height: 123px;
              }

            & > div:nth-child(2) {
              width: 28px;
              height: 20px;
              color: rgba(24, 144, 255, 1);
              font-size: 14px;
              text-align: right;
              font-family: SourceHanSansSC-regular;
              display: none;
            }
          }
        }
        // 会议室及项目
        & > div:nth-child(2){
          height: 90px;
          .roomName {
            width: 130px;
            height: 24px;
            font-size: 16px;
            text-align: left;
            font-family: SourceHanSansSC-regular;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .detailInfo {
            // height: 20px;
            margin-top: 8px;
            color: rgba(154, 154, 154, 1);
            font-size: 14px;
            text-align: left;
            font-family: SourceHanSansSC-regular;
          }
        }

        .custom_option_img1,
        .custom_option_img2 {
          width: 16px;
          height: 16px;
          margin: 0px 2px 0 2px;
          cursor: pointer;
          display: none;
        }
        .custom_option_img1 {
          margin-left: 15px;
        }

        &:hover {
          box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.2);
          .custom_option_img1,
          .custom_option_img2 {
            display: inline-block;
          }
        }
      }
    }
    .noMeetingList {
      height: 35px;
      margin-top: 5%;
      color: rgba(191, 191, 191, 1);
      font-size: 24px;
      text-align: center;
      font-family: SourceHanSansSC-regular;
    }
  }

  // 4.分页
  .pagination-block {
    height: 52px;
    display: flex;
    justify-content: flex-end;
    flex: none;
    //上一页
    :deep(.el-pagination) {
      .btn-prev,
      .btn-next {
        border: 1px solid rgba(220, 220, 220, 1);
      }
      .el-pager li {
        width: 32px;
        height: 32px;
        margin-left: 8px;
        margin-right: 8px;
        border-radius: 3px;
      }
      .el-pager li.is-active {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(79, 168, 249, 1) !important;
      }
    }

    .el-button {
      width: 48px;
      height: 32px;
      line-height: 32px;
      margin: 10px 10px 10px 8px;
      border-radius: 3px;
      background-color: rgba(79, 168, 249, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
    }
    img {
      width: 24px;
      height: 24px;
      margin-top: 14px;
    }
  }
}
// 新增/修改弹框
.uploadImgCont {
  width: 120px;
  height: 120px;
  border-radius: 3px;
  img {
    width: 100%;
    height: 100%;
  }

  .uploadImg {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    i {
      color: #fff;
      font-size: 28px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &:hover {
    .uploadImg {
      display: block;
    }
  }
}

.uploadTip {
  font-size: 12px;
  color: red;
  margin-left: 6px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 120px;
  height: 120px;
  line-height: 20px;
  border-radius: 3px;
  background-color: rgba(251, 253, 255, 1);
  text-align: center;
  border: 1px solid rgba(192, 204, 218, 1);
}

//新增/编辑弹窗
  :deep(.el-dialog) {
    .el-dialog__body {
      border-top: 1px solid rgba(239, 239, 239, 1);
    }
  }


</style>

<style lang='less'>
/* 删除弹框确定与取消按钮居中 */
.ExitCancelBtn{
    margin-left: 10px!important;
}

.el-message-box {
  .el-message-box__content{
  border-top: 1px solid rgba(239, 239, 239, 1);
  }
  .el-message-box__btns{
    /* flex-direction: row-reverse !important; */
    justify-content: center !important;
  }
}

</style>