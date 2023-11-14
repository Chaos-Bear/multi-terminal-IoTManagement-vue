<template>
  <div class="xxfb-monitorlist">
    <!-- 1. 顶部 -->
    <div class="top">
      <b>
        <span
          style="font-size: 24px; font-family: SourceHanSansSC-medium; color: rgba(51, 51, 51, 1)"
        >
          发布屏监控
        </span>
      </b>
      <el-button style="float: right; margin-left: 10px" @click="router.push('/')">返回</el-button>

      <div>
        <el-form ref="queryFormRef" :model="searchform" label-position="left">
          <el-row>
            <el-col :span="6">
              <el-form-item label="会议室名称" prop="name">
                <el-input style="width: 80%" v-model="searchform.name" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="楼层" prop="floor">
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
              <el-form-item label="地点" prop="address">
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
                <!-- <el-button type="primary" @click="addMeetingItem">新增</el-button> -->
                <el-button type="primary" @click="searchInfo">查询</el-button>
                <el-button @click="resetQuery()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 2.发布屏监控列表 :src="'data:image/jpg;base64,'+"-->
    <div class="tableBox">
      <el-scrollbar height="100%">
        <div class="meetingList" v-if="meetingList.length > 0">
          <div v-for="(item, index) in meetingList" :key="index" class="meetingroom">
            <img src="@/assets/xxfb/screenshots/11.png" @click="gotomonitorList(item)" />

            <div class="roomName">{{ item.roomName }}信息发布屏</div>
          </div>
        </div>
        <!-- 暂无监控列表 -->
        <div v-else class="noMeetingList">暂无监控列表</div>
      </el-scrollbar>
    </div>

    <!-- 3. 分页 -->
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30, 50]"
        layout=" prev, pager, next, sizes,jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-button type="primary">确定</el-button>
      <img src="@/assets/index/deviceList/refresh.png" @click="refresh()" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApiAddressStore } from '@/pinia_stores/api_address_store.js'
import { ElMessage, valueEquals, ElMessageBox, ElConfigProvider } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
const router = useRouter()
// import axios from 'axios'

import { request, noderedrequest } from '@/utils/server.js'

// 会议室配置信息
var floorOptions = ref([])
var addressOptions = ref([])

const getFloorandAddList = () => {
  request
    .post('/IOTRoomCrtl/queryIotFloorAddr')
    .then((res) => {
      // console.log("楼层及地点列表获取成功",res.data);
      floorOptions.value = res.data.iotFloorList
      addressOptions.value = res.data.iotAddresseList
    })
    .catch((error) => {
      console.log('楼层及地点列表获取失败', error)
    })
}
// 会议室列表接口
const getList = () => {
  request
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
}
onMounted(() => {
  getList()
  getFloorandAddList()
})
// 监控列表新增接口
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
  request
    .post('/IOTRoomCrtl/saveIOTRoomInfo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('会议室新增列表成功:', res.data)
      meetingVisual.value = false
      //debugger
      getList()
    })
    .catch((error) => {
      // console.log('会议室新增列表失败:', error)
    })
}
// 监控列表删除接口
const roomID = ref('')
const deleteList = () => {
  request
    .post('/IOTRoomCrtl/deleteIOTMTInfo', {
      roomID: roomID.value
    })
    .then((res) => {
      // console.log('删除会议室列表成功:', res.data)
      console.log('删除id:', roomID.value)
      getList()
    })
    .catch((error) => {
      // console.log('删除会议室列表失败:', error)
    })
}

// 2.查询/新增/重置
const queryFormRef = ref()
// 查询form表单
const searchform = reactive({
  name: '',
  floor: '全部',
  address: '全部'
})
// 查询按钮
const searchInfo = () => {
  //发get请求,渲染会议列表
  getList()
}

// 重置
const resetQuery = () => {
  searchform.name = ''
  searchform.floor = ''
  searchform.address = ''
  // 发get请求，重新渲染会议列表
  getList()
}

// 新增
const createForm = reactive({
  name: '',
  address: '',
  floor: '',
  img: '',
  roomID: ''
})

const addMeetingItem = () => {
  createForm.name = ''
  createForm.address = ''
  createForm.floor = ''
  createForm.roomID = ''

  imageUrl.value = ''
  meetingVisual.value = true
  createFormRef.value.clearValidate()
}
// 新增-----图片上传
const imageUrl = ref('')

const beforeAvatarUpload = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 1) {
    ElMessage.error('上传图片尺寸不能超过 1MB!')
    return false
  }

  imageUrl.value = URL.createObjectURL(rawFile)
  createForm.img = rawFile
  return true
}

const uploadFlie = (params) => {
  // debugger
  // console.log(params.file)
  // createForm.img=params.file.name;
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
// ,max:10 ,min:4
const validateName = (rule, value, callback) => {
  // debugger
  const reg = /[a-zA-Z0-9\-]{1}/g
  if (!reg.test(value)) {
    return callback(new Error('请输入正确的格式:例如A2-110'))
  } else {
    callback()
  }
}
const createFormRules = reactive({
  name: [
    { required: true, message: '请输入会议室名称', trigger: 'blur' },
    { validator: validateName, trigger: 'blur' }
  ],
  address: [{ required: true, message: '请选择地点', trigger: 'blur' }],
  floor: [{ required: true, message: '请选择楼层', trigger: 'blur' }],
  imageUrl: [{ validator: checkImg, trigger: 'blur' }]
})
//  新增会议信息 弹框中 的确定按钮
const addMeeting = () => {
  //校验
  createFormRef.value.validate((valid) => {
    if (valid) {
      postList()
    } else {
      console.log('校验错误')
    }
  })
}

// 3.会议信息
const meetingList = reactive([
  //   {roomID:"1",roomName:"A201",floor:"2F",roomAddr:"会议中心",roomImg
  // :""},
])
// 点击监控图片，跳转到 监控设备控制列表
const gotomonitorList = (item) => {
  // debugger
  // localStorage.setItem('name', item.roomName)
  // localStorage.setItem('roomId', item.roomID)
  router.push('/monitor-control?roomName=' + item.roomName + '&roomID=' + item.roomID)
}

// ----------------修改会议信息弹框
const meetingVisual = ref(false)
// 修改会议信息涉及的字段

const meetingModify = (obj) => {
  // debugger
  // console.log("333333333333333333333",createFormRef.value)

  if (createFormRef.value != null) {
    createFormRef.value.clearValidate()
  }

  // debugger
  createForm.roomID = obj.roomID
  createForm.name = obj.roomName
  createForm.address = obj.roomAddr
  createForm.floor = obj.floor
  // createForm.img='data:image/jpg;base64,'+obj.roomImg ;
  imageUrl.value = 'data:image/jpg;base64,' + obj.roomImg
  // Object.assign(formModify, obj)

  meetingVisual.value = true
}
// file 转换为 base64

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    // 创建一个新的 FileReader 对象
    const reader = new FileReader()
    // 读取 File 对象
    reader.readAsDataURL(file)
    // 加载完成后
    reader.onload = function () {
      // 将读取的数据转换为 base64 编码的字符串
      const base64String = reader.result.split(',')[1]
      // 解析为 Promise 对象，并返回 base64 编码的字符串
      resolve(base64String)
    }

    // 加载失败时
    reader.onerror = function () {
      reject(new Error('Failed to load file'))
    }
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

// handleSuccess(sign) {
//      // sign是base64文件
//       const file = this.base64ToFile(sign);
//       if (!file.url) {
//         file.url = URL.createObjectURL(file);
//       }
//     },

// 修改会议信息弹框双向数据绑定
const meetingModifyVisual = ref(false)
// 保存修改
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
      //  debugger
      formData.append('file', createForm.img || base64ToFile(imageUrl.value))
      // debugger
      request
        .post('/IOTRoomCrtl/updateIOTRoom', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {
          console.log('会议室修改成功:', res.data)
          meetingVisual.value = false
          //debugger
          getList()
        })
        .catch((error) => {
          // console.log('会议室修改失败:', error)
        })
    } else {
      console.log('校验错误')
    }
  })
}

// 单条删除
const deleteMeeting = (v) => {
  // debugger
  roomID.value = v.roomID
  console.log('删除一条会议信息', v.roomName)
  ElMessageBox.confirm('确定删除当前选中会议室？', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      // 发送删除接口 请求，删除此条会议室信息
      deleteList()

      ElMessage({
        type: 'success',
        message: '删除成功'
      })
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
const pageSize = ref(10)
const total = ref(0)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  //重新发请求，渲染设备列表
  // getList()
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  //重新发请求，渲染设备列表
  // getList()
}
// 刷新按钮
const refresh = () => {
  //重新发请求，渲染设备列表
  // getList()
}
</script>
<style lang="less" scoped>
.xxfb-monitorlist {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  // 1. 顶部
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

  // 2. 发布屏监控列表
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
        width: 180px;
        height: 180px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 1);
        text-align: center;
        border: 1px solid rgba(233, 233, 233, 1);
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .roomName {
          width: 100%;
          height: 32px;
          line-height: 32px;
          border-radius: 0px 0px 8px 8px;
          background-color: rgba(0, 0, 0, 0.8);
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          text-align: left;
          padding-left: 10px;
          font-family: SourceHanSansSC-regular;
          position: absolute;
          bottom: 0;
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

  // 3.分页
  .pagination-block {
    height: 52px;
    // border: 1px solid red;
    display: flex;
    justify-content: flex-end;
    flex: none;
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
</style>
