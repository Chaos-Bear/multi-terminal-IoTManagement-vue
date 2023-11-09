<template>
  <div class="device">
    <!-- 1. 顶部 -->
    <div class="top">
      <h1>设备管理</h1>
      <el-button @click="router.push('/')">返回</el-button>
    </div>
    <!-- 2.查询 -->
    <div class="searchInfo">
      <el-form :model="form">
        <el-form-item label="设备名称">
          <el-input v-model="form.deviceName" placeholder="请输入设备名称" />
        </el-form-item>

        <el-form-item label="设备ip地址">
          <el-input v-model="form.deviceIP" placeholder="请输入设备ip地址" />
        </el-form-item>

        <el-form-item label="区域">
          <el-select v-model="form.deviceRoom" placeholder="全部">
            <!-- <el-option v-for="(item,id) in tableData"  label="item.deviceRoom" value="item.deviceRoom" :key="id"/> -->
            <el-option v-for="item in meetingRoomlist" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>

      <div class="searchbtn">
        <el-button type="primary" @click="searchbtn()">查询</el-button>

        <el-button @click="resetbtn()">重置</el-button>
      </div>
    </div>
    <!-- 3.1新增/删除-->
    <div class="addAndDel">
      <!-- 新增 -->
      <el-button type="primary" text @click="add()" class="addbtn">新增</el-button>

      <!-- 删除 -->
      <el-button
        @click="deletebtns()"
        class="deletebtn"
        :style="selectRows.length > 0 ? 'background:red' : ''"
        :disabled="selectRows.length <= 0"
        >删除</el-button
      >
    </div>
    <!-- 3.设备列表 -->
    <div class="deviceList">
      <!-- 3.2 设备列表-->
      <el-table
        :data="tableData"
        style="width: 100%"
        height="100%"
        :header-cell-style="{ background: '#F5F9FC' }"
        @selection-change="selectionChange"
        ref="tableRef"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          type="selection"
          prop="sec"
          label=""
          min-width="30px"
          fixed
          @selection-change="selectionChange"
        />
        <el-table-column prop="deviceID" label="设备ID" min-width="230px" />
        <el-table-column prop="deviceName" label="设备名称" min-width="130px" />
        <el-table-column prop="deviceIP" label="设备ip地址" min-width="100" />
        <el-table-column prop="devicePort" label="端口号" min-width="70" />
        <el-table-column prop="deviceBrand" label="品牌" min-width="130px" />
        <el-table-column prop="deviceModel" label="型号" min-width="170px" />
        <el-table-column prop="deviceRoom" label="区域" min-width="150px" />
        <el-table-column prop="increaseTime" label="添加时间" min-width="150px">
          <template #default="scope">
            {{ scope.row.increaseTime.slice(0, -3) }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" min-width="130">
          <template #default="scope">
            <el-switch
              class="ml-2"
              size="small"
              v-model="scope.row.state"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
              active-text="开启"
              inactive-text="关闭"
              active-value="ON"
              inactive-value="OFF"
              @change="
                (v) => {
                  isOpen(v, scope.row)
                }
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="opration" label="操作" min-width="120" fixed="right">
          <!-- scope.row   -->
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="edititem(scope.row)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click.prevent="deleteitem(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 4.分页 // 总条数
      total.value = res.data.totalRecord-->
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
    <!--新增弹框表单  -->
    <div class="tankuang">
      <el-dialog v-model="newdialogFormVisible" title="新增">
        <el-form :model="newForm" ref="newFormRef" :rules="newFormRules">
          <el-form-item label="设备ID" :label-width="formLabelWidth" prop="deviceID">
            <el-input v-model="newForm.deviceID" autocomplete="off" placeholder="请输入设备id" />
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="deviceBrand">
            <el-input v-model="newForm.deviceBrand" autocomplete="off" placeholder="请输入品牌" />
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
            <el-input
              v-model="newForm.deviceName"
              autocomplete="off"
              placeholder="请输入设备名称"
            />
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="deviceModel">
            <el-input v-model="newForm.deviceModel" autocomplete="off" placeholder="请输入型号" />
          </el-form-item>
          <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="deviceIP">
            <el-input v-model="newForm.deviceIP" autocomplete="off" placeholder="请输入IP地址" />
          </el-form-item>
          <el-form-item label="会议室" :label-width="formLabelWidth" prop="deviceRoom">
            <el-select
              v-model="newForm.deviceRoom"
              placeholder="请输入会议室名称"
              style="width: 100%"
            >
              <!-- multiple -->
              <el-option v-for="item in meetingRoomlist" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth" prop="devicePort">
            <el-input v-model="newForm.devicePort" autocomplete="off" placeholder="请输入端口号" />
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;状态" :label-width="formLabelWidth" prop="status">
            <el-input v-model="newForm.status" autocomplete="off" placeholder="请输入状态" />
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;订阅主题" :label-width="formLabelWidth" prop="topic">
            <el-input v-model="newForm.topic" autocomplete="off" placeholder="请输入订阅主题" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelItem()">取消</el-button>
            <el-button type="primary" @click="addItem()">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!--编辑弹框表单  -->
    <div class="tankuang">
      <el-dialog v-model="editdialogFormVisible" title="编辑">
        <el-form :model="editForm" ref="editFormRef" :rules="editFormRules">
          <el-form-item label="设备ID" :label-width="formLabelWidth" prop="deviceID">
            <el-input v-model="editForm.deviceID" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="deviceBrand">
            <el-input v-model="editForm.deviceBrand" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
            <el-input v-model="editForm.deviceName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="deviceModel">
            <el-input v-model="editForm.deviceModel" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="deviceIP">
            <el-input v-model="editForm.deviceIP" autocomplete="off" />
          </el-form-item>
          <el-form-item label="会议室" :label-width="formLabelWidth" prop="deviceRoom">
            <el-select
              v-model="editForm.deviceRoom"
              placeholder="请输入会议室名称"
              style="width: 100%"
            >
              <!-- multiple -->
              <el-option v-for="item in meetingRoomlist" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth" prop="devicePort">
            <el-input v-model="editForm.devicePort" autocomplete="off" />
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;状态" :label-width="formLabelWidth" prop="status">
            <el-input v-model="editForm.status" autocomplete="off" />
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;订阅主题" :label-width="formLabelWidth" prop="topic">
            <el-input v-model="editForm.topic" autocomplete="off" placeholder="请输入订阅主题" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelItemEdit()">取消</el-button>
            <el-button type="primary" @click="editIteminfo()">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
// import TheWelcome from '../components/TheWelcome.vue';
import axios from 'axios'
import { reactive, ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter()

import { request, noderedrequest, deviceRequest } from '@/utils/server.js'

const table = ref(null)

// 设备管理页会议室列表维护
const meetingRoomlist = ref([])
const getmeetingRoomList = () => {
  request
    .post('/IOTRoomCrtl/queryAllIotRoomList', {})
    .then((res) => {
      console.log('会议室列表查询成功:', res.data)
      for (var i = 0; i < res.data.length; i++) {
        meetingRoomlist.value.push(res.data[i].roomName + '会议室')
      }
    })
    .catch((error) => {
      console.log('会议室列表查询失败:', error)
    })
}
//获取设备列表
const getList = () => {
  deviceRequest
    .post('/IotDeviceEditCtrl/queryIotDevicePageList', {
      deviceIP: form.deviceIP,
      deviceName: form.deviceName,
      deviceRoom: form.deviceRoom,

      pageNum: currentPage.value,
      pageSize: pageSize.value,
      totalPage: form.totalPage,
      totalRecord: form.totalRecord
    })
    .then((response) => {
      console.log('设备管理列表按条件查询成功:', response.data)
      form.totalPage = response.data.totalPage ? response.data.totalPage : 0
      form.totalRecord = response.data.totalRecord ? response.data.totalRecord : 0
      // 总条数
      total.value = response.data.totalRecord
      // debugger
      tableData.value = response.data.data
    })
    .catch((error) => {
      console.log('设备管理列表按条件查询失败:', error)
    })
}
const deleteList = (v) => {
  //单个删除请求（成功后发查询请求）
  deviceRequest
    .post('/IotDeviceEditCtrl/deleteIotDeviceInfo', {
      deviceIDList: v
    })
    .then((response) => {
      console.log('设备列表删除成功', response)
      if (response.data.repCode == 200) {
        //重新发请求，渲染设备列表
        getList()
        selectRows.value = []
        // 清除勾选
        tableRef.value.clearSelection()
      }
    })
    .catch((error) => {})
}
//初始化渲染
onMounted(() => {
  getList()
  getmeetingRoomList()
})
//2.按要求查询
const form = reactive({
  deviceName: '',
  deviceIP: '',
  deviceRoom: '',

  totalPage: 0, //必填 总页数
  totalRecord: 0 //总条数
})
// 条件查询(设备名称、设备id地址、区域)
const searchbtn = () => {
  console.log(form.deviceName, form.deviceIP, form.deviceRoom)
  getList()
}
// 重置
const resetbtn = () => {
  form.deviceName = ''
  form.deviceRoom = ''
  form.deviceIP = ''
  getList()
}

//批量删除
const deletebtns = () => {
  if (selectRows.value.length <= 0) {
    return
  }
  var deviceIDs = []
  selectRows.value.forEach((item) => {
    deviceIDs.push(item.deviceID)
  })
  ElMessageBox.confirm('确定删除当前选中项吗？', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      // 调用删除设备接口
      deleteList(deviceIDs)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}
//3. 设备信息
// 3.2 row-class-name 属性来为 Table 中的某一行添加 class， 这样就可以自定义每一行的样式了---隔行换色
const tableRowClassName = ({ row, rowIndex }) => {
  if (rowIndex % 2 == 0) {
    return 'warning-row'
  } else if (rowIndex % 2 == 1) {
    return 'success-row'
  }
  return ''
}

const formLabelWidth = '32%'
const newdialogFormVisible = ref(false)
const newForm = reactive({
  deviceID: '',
  deviceName: '',
  deviceIP: '',
  devicePort: '',
  deviceBrand: '',
  deviceModel: '',
  deviceRoom: '',

  state: '',
  topic: ''
})
// 组件实例
const newFormRef = ref(null)
const newFormRules = reactive({
  deviceID: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceName: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceIP: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      message: '情输入正确的ip地址',
      trigger: 'blur'
    }
  ],
  deviceRoom: [{ required: true, message: '请输入', trigger: 'blur' }],
  devicePort: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/,
      message: '范围需在0-65535之间',
      trigger: 'blur'
    }
  ],
  deviceBrand: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceModel: [{ required: true, message: '请输入', trigger: 'blur' }]
  // deviceRoom: [{ required: true, message: '请输入', trigger: 'blur' }]
  // state: [{required: true, message:'请输入', trigger: 'blur'}],
})
// 确认新增
const addItem = () => {
  newFormRef.value.validate((valid) => {
    if (valid) {
      //校验通过后发请求
      // console.log(newForm.deviceRoom)
      deviceRequest
        .post('/IotDeviceEditCtrl/increaseDeviceInfo', {
          deviceBrand: newForm.deviceBrand,
          deviceID: newForm.deviceID,
          deviceIP: newForm.deviceIP,
          deviceModel: newForm.deviceModel,
          deviceName: newForm.deviceName,
          devicePort: newForm.devicePort,
          deviceRoom: newForm.deviceRoom
          // state: newForm.state,
          // topic: newForm.topic,
        })
        .then((res) => {
          console.log('设备列表新增成功', res)
          if (res.data.repCode == 200) {
            //重新发请求，渲染设备列表
            getList()
          }
        })
        .catch((error) => {
          console.log(error)
        })

      newdialogFormVisible.value = false
      // 清除新增校验
      nextTick(() => {
        newFormRef.value.clearValidate()
      })
    } else {
      console.log('校验错误')
    }
  })
}
// 取消新增
const cancelItem = () => {
  newdialogFormVisible.value = false

  // 清除新增校验
  nextTick(() => {
    newFormRef.value.clearValidate()
  })
}
// 点击新增弹框中 清空之前输入
const add = () => {
  newForm.deviceID = ''
  newForm.deviceName = ''
  newForm.deviceIP = ''
  newForm.devicePort = ''
  ;(newForm.deviceBrand = ''), (newForm.deviceModel = '')
  newForm.deviceRoom = ''

  newForm.state = ''
  newForm.topic = ''

  newdialogFormVisible.value = true
}

// 3.2 单个删除
const deleteitem = (row) => {
  console.log(row.deviceID)
  var deviceIDs = []
  deviceIDs.push(row.deviceID)

  ElMessageBox.confirm('确定删除当前选中项吗？', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      // 调用删除设备接口
      deleteList(deviceIDs)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}
// 3.2 编辑按钮
var editId
const editdialogFormVisible = ref(false)
const editForm = reactive({
  deviceID: '',
  deviceName: '',
  deviceIP: '',
  devicePort: '',
  deviceBrand: '',
  deviceModel: '',
  deviceRoom: '',
  deviceType: '',
  state: '',
  topic: ''
})
// 组件实例
const editFormRef = ref(null)
const editFormRules = reactive({
  deviceID: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceName: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceIP: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      message: '情输入正确的ip地址',
      trigger: 'blur'
    }
  ],
  devicePort: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/,
      message: '范围需在0-65535之间',
      trigger: 'blur'
    }
  ],
  deviceBrand: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceModel: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceRoom: [{ required: true, message: '请输入', trigger: 'blur' }]
  // state: [{required: true, message:'请输入', trigger: 'blur'}],
})
const edititem = (row) => {
  console.log(row)

  editId = row.deviceID
  editdialogFormVisible.value = true

  editForm.deviceID = row.deviceID
  editForm.deviceName = row.deviceName
  editForm.deviceIP = row.deviceIP
  editForm.devicePort = row.devicePort
  ;(editForm.deviceBrand = row.deviceBrand),
    (editForm.deviceModel = row.deviceModel),
    (editForm.deviceRoom = row.deviceRoom)

  // editForm.state = row.state,
  // editForm.topic = row.topic
}
const editIteminfo = () => {
  editFormRef.value.validate((valid) => {
    if (valid) {
      deviceRequest
        .post('/IotDeviceEditCtrl/updateIotDeviceInfo', {
          deviceBrand: editForm.deviceBrand,
          deviceID: editForm.deviceID,
          deviceIP: editForm.deviceIP,
          deviceModel: editForm.deviceModel,
          deviceName: editForm.deviceName,
          devicePort: editForm.devicePort,
          deviceRoom: editForm.deviceRoom
          // state: editForm.state,
          // topic: editForm.topic
        })
        .then((res) => {
          console.log('设备列表修改成功:', res)
          if (res.data.repCode == 200) {
            //重新发请求，渲染设备列表
            getList()
          }
        })
      editdialogFormVisible.value = false
      // 清除编辑校验
      nextTick(() => {
        editFormRef.value.clearValidate()
      })
    } else {
      console.log('校验错误')
    }
  })
}

const cancelItemEdit = () => {
  editdialogFormVisible.value = false
  // 清除编辑校验
  nextTick(() => {
    editFormRef.value.clearValidate()
  })
}

// 3.2设备列表
const tableData = ref([
  // {
  //   "deviceID": "E280689400004020F535A17K",
  //     "deviceName": "设备03",
  //     "deviceModel": "A2764",
  //     "devicedeviceBrand": "联想",
  //     "deviceIP": "172.28.5.141",
  //     "devicePort": "17001",
  //     "deviceState": "2",
  //     "deviceRoom": "A2-208",
  //     "deviceArea": "会议中心",
  //     "increaseTime": "2023-10-18 19:16:08"
  // }
])
const isindexof = (arr, item) => {
  for (var j = 0; j < arr.length; j++) {
    if (item.id == arr[j].id) {
      return j
    }
  }
  return -1
}

const isOpen = (v, item) => {
  // debugger
  if (item.topic != '') {
    request
      .post('/MqttCrtl/crtIotopic', {
        message: v,
        pubTopic: item.topic,
        qos: 2,
        retained: true
      })
      .then((res) => {
        console.log('控制设备发送成功', res)
      })
      .catch((error) => {
        console.log('控制设备发送失败', error)
      })
  }
}

// 跨页勾选, 删除时选中行
var selectRows = ref([])
const selectionChange = (selection) => {
  selectRows.value = selection
  console.log('33333333333333', selectRows.value)
}

// 4.分页
const currentPage = ref(1)
const pageSize = ref(10)
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
.device {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  // 1.顶部
  .top {
    width: 100%;
    height: 52px;
    display: flex;
    justify-content: space-between;
    flex: none;

    h1 {
      height: 35px;
      color: rgba(51, 51, 51, 1);
      font-size: 24px;
      text-align: left;
      font-family: SourceHanSansSC-medium;
    }

    .el-button {
      width: 90px;
      height: 32px;
      margin-bottom: 20px;
      border-radius: 2px;
      color: rgba(51, 51, 51, 1);
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
      border: 1px solid rgba(206, 206, 206, 1);
    }
  }
  // 2. 查询
  .searchInfo {
    width: 100%;
    height: 72px;
    border-top: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    justify-content: space-between;
    flex: none;

    :deep(.el-form) {
      display: flex;
      margin-top: 16px;

      .el-form-item {
        // flex-direction: column;
        margin-right: 10px;

        .el-form-item__label {
          line-height: 36px;
          margin-bottom: 8px;
          color: rgba(16, 16, 16, 1);
          font-size: 14px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
          justify-content: flex-start;
        }
      }
    }

    .searchbtn {
      display: flex;
      justify-content: flex-end;
      height: 32px;
      margin-top: 20px;
      .el-button {
        width: 80px;
        height: 32px;
        line-height: 20px;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
        font-family: Roboto;
      }
      .el-button:nth-child(2) {
        color: rgba(51, 51, 51, 1);
      }
    }
  }
  // 3.新增/删除按钮
  // 编辑/删除按钮
  .addAndDel {
    height: 72px;
    border-top: 1px solid rgba(239, 239, 239, 1);
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    display: flex;
    align-items: center;
    .addbtn,
    .deletebtn {
      margin-top: 20px;
      margin-bottom: 16px;
      width: 80px;
      height: 32px;
      line-height: 20px;
      margin-right: 8px;
      border-radius: 2px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(79, 168, 249, 1);
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
    }
    .addbtn {
      &.addbtnActive {
        background-color: #bfbfbf !important;
        color: #ffffff;
      }
    }
    .deletebtn {
      background-color: rgba(191, 191, 191, 1);
      color: rgba(255, 255, 255, 1);

      &.delbtnActive {
        background-color: red;
      }
    }
  }
  // 3.设备列表
  .deviceList {
    padding-top: 16px;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    overflow: hidden;
    width: 100%;

    //3.2设备列表
    :deep(.el-table) {
      .el-table__header-wrapper {
        thead {
          .cell {
            color: rgba(51, 51, 51, 1);
            font-size: 14px;
            text-align: left;
            font-family: SourceHanSansSC-regular;
            white-space: nowrap;
            overflow: hidden;
            border-left: 1px solid rgba(206, 206, 206, 1);
          }
          th:nth-child(1) .cell {
            border-left: none;
          }
        }
      }
      .el-table__body-wrapper {
        tbody {
          .cell {
            color: rgba(51, 51, 51, 1);
            font-size: 14px;
            text-align: left;
            font-family: Roboto;
            white-space: nowrap;
            overflow: hidden;
          }
          .el-button {
            color: rgba(24, 144, 255, 1);
            font-size: 14px;
            text-align: left;
            font-family: SourceHanSansSC-regular;
          }
          .el-button:nth-child(2) {
            color: red;
          }
        }
      }

      .warning-row {
        background-color: transparent !important;
      }
      .success-row {
        background-color: #f5f9fc !important;
      }
    }
  }
  // 4.分页
  .pagination-block {
    height: 52px;
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

.tankuang {
  //新增/编辑弹窗
  :deep(.el-form) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .el-form-item {
      width: 45%;

      .el-form-item__label {
        justify-content: flex-start;
        white-space: nowrap;
      }
    }
  }
}
</style>
