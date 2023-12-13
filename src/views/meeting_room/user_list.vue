<template>
  <div style="margin: 0 auto" class="userList">
    <el-container>
      <el-header style="height: 90px">
        <b>
          <span
            style="font-size: 24px; font-family: SourceHanSansSC-medium; color: rgba(51, 51, 51, 1)"
          >
            {{ titleName ? titleName : '会议室' }}
          </span>
        </b>
        <el-button style="float: right; margin-left: 10px" @click="router.push('/')"
          >返回</el-button
        >
        <el-divider style="margin: 10px 0" />
        <el-button
          type="primary"
          @click="addBtn"
          :class="['addBtn', selectRows.length <= 0 && tableData.length < 0 ? 'addBtnActive' : '']"
          :disabled="selectRows.length > 0"
        >
          新增分类
        </el-button>
        <el-button
          type="danger"
          :class="['delBtn', selectRows.length > 0 && tableData.length > 0 ? 'delBtnActive' : '']"
          :disabled="selectRows.length <= 0"
          @click="deleteBtn"
        >
          删除
        </el-button>
      </el-header>
      <el-main>
        <!-- 2. 用户界面列表 -->
        <div class="tableBox">
          <!-- <el-scrollbar height="100%"> -->
          <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 20px; height: 100%"
            row-key="id"
            default-expand-all
            :header-cell-style="{ background: '#F5F9FC' }"
            @selection-change="selectionChange"
            ref="tableRef"
          >
            <el-table-column type="selection" width="30" :reserve-selection="true" />
            <el-table-column prop="className" label="名称">
              <template #default="scope">
                <template v-if="scope.row.classType == '分类'">
                  {{ scope.row.className }}
                </template>
                <template v-if="scope.row.contType == '页面'">
                  <a :href="scope.row.pubPath" target="_blank">{{ scope.row.contName }}</a>
                  <!-- &nbsp;<span @click="router.push('/xxfb?roomName=' + titleName + '&roomID=' + roomId)"
                    >控制页</span
                  >&nbsp;
                  <span @click="router.push('/pub?roomName=' + titleName + '&roomID=' + roomId)"
                    >发布页</span
                  > -->
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="iotDeviceList" label="关联设备">
              <template #default="scope">
                <template v-if="scope.row.classType == '分类'"> - </template>
                <template v-if="scope.row.contType == '页面'">
                  <template v-for="(item, index) in scope.row.iotDeviceList">
                    {{ index == 0 ? '' : ',' }}{{ item.deviceName }}
                  </template>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间">
              <template #default="scope">
                <!-- {{(getTime(scope.row.updateTime) - currentTime < 5*60*1000)?"刚刚":'scope.row.updateTime'}} -->
                {{ formatDate(scope.row.updateTime) }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="classType" label="类型" >
                <template #default="scope">
                  <template v-if="scope.row.classType == '分类'">{{scope.row.classType}} </template>
                  <template v-if="scope.row.contType == '页面'"> {{scope.row.contType}} </template>
                </template>
              </el-table-column> -->
            <el-table-column prop="num" label="数量">
              <template #default="scope">
                <template v-if="scope.row.classType == '分类'">
                  {{ scope.row.number }}个发布页
                </template>
                <template v-else> - </template>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="" label="权限控制" >
                  <template #default="scope">
                      <template v-if="scope.row.classType == '分类'"></template>
                      <template v-if="scope.row.contType == '页面'"> --- </template>
                  </template>
              </el-table-column> -->
            <el-table-column label="操作">
              <template #default="scope">
                <template v-if="scope.row.classType == '分类'">
                  <span
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    @click="handleEdit(scope.row)"
                    >修改分类&nbsp;&nbsp;</span
                  >

                  <span
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    @click="addPageBtn(scope.row)"
                    >新增页面</span
                  >
                </template>
                <template v-if="scope.row.contType == '页面'">
                  <span
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    @click="handlePageEdit(scope.row)"
                    >修改页面&nbsp;&nbsp;</span
                  >
                  <!-- <a
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    :href="scope.row.editPath"
                    target="_blank"
                  >
                    编辑
                  </a> -->
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
    <!-- 1.1 新增 / 修改 分类弹框 -->
    <el-dialog
      :title="type == 'add' ? '新增分类' : '修改分类'"
      v-model="meetingCategoryVisual"
      style="width: 400px"
    >
      <el-form :model="addForm" label-width="100px" ref="createFormRef" :rules="createFormRules">
        <el-form-item label="分类名称" prop="className">
          <el-input v-model="addForm.className" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item>
          <el-button v-if="type == 'add'" type="primary" @click="addMeetingCategory"
            >确 定</el-button
          >
          <el-button type="primary" v-if="type == 'update'" @click="updateMeetingCategory"
            >确 定</el-button
          >
          <el-button @click="meetingCategoryVisual = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!--1.2 新增/ 修改 页面 -->
    <el-dialog
      :title="pagetype == 'add' ? '新增页面' : '修改页面'"
      v-model="meetingModifyVisual"
      destroy-on-close
      style="width: 400px"
    >
      <el-form
        :model="addPageForm"
        label-width="100px"
        ref="createPageFormRef"
        :rules="createPageFormRules"
      >
        <el-form-item label="页面名称" prop="contName">
          <el-input v-model="addPageForm.contName" placeholder="请输入页面名称" />
        </el-form-item>
        <el-form-item label="&nbsp;&nbsp;&nbsp;关联设备" prop="">
          <!-- multiple -->
          <el-select
            v-model="addPageForm.iotDeviceList"
            style="width: 100%"
            placeholder="请选择关联设备"
            multiple
          >
            <el-option
              v-for="item in deviceList"
              :key="item.deviceID"
              :label="item.deviceName"
              :value="item.deviceID"
            />
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="权限控制" prop="">
          <el-input v-model="addPageForm" placeholder="请输入权限控制" />
        </el-form-item> -->
        <el-form-item label="&nbsp;&nbsp;&nbsp;添加路径" prop="pubPath">
          <el-input v-model="addPageForm.pubPath" placeholder="请输入路径" />
        </el-form-item>
        <!-- <el-form-item label="添加流程编辑路径" prop="editPath">
          <el-input v-model="addPageForm.editPath" placeholder="请输入流程编辑路径" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" v-if="pagetype == 'add'" @click="addMeetingPage"
            >确 定</el-button
          >
          <el-button type="primary" v-if="pagetype == 'update'" @click="updateMeetingPage"
            >确 定</el-button
          >
          <el-button @click="meetingModifyVisual = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage, valueEquals, ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()

import { releaseRequest } from '@/utils/server.js'
// 1.顶部会议室名称/会议室id展示
// debugger
// const titleName = localStorage.getItem('name')
// const roomId = localStorage.getItem('roomId')
// debugger
const titleName = route.query.roomName
const roomId = route.query.roomID

const getList = () => {
  // 请求用户界面列表
  // debugger
  releaseRequest
    .post('/IOTRoomCrtl/queryIotRoomClassList', {
      roomID: roomId
    })
    .then((res) => {
      // debugger
      console.log('请求用户界面列表成功', res.data.result)
      tableData.value.length = 0
      tableData.value = res.data.result
      tableData.value.forEach((item) => {
        item.id = item.classID
        item.children = item.list
        item.children.forEach((itemx) => {
          itemx.id = item.classID + '_' + itemx.contID
        })
      })
    })
    .catch((error) => {
      console.log('请求用户界面列表失败', error)
    })
}
// 删除一级分类
const delClass = (params) => {
  // 删除用户界面分类
  return releaseRequest.post('/IOTRoomCrtl/deleteIotRmClass', {
    roomID: roomId,
    classIDList: params
  })
}
// 删除页面
const delPage = (params) => {
  // 删除用户界面页面
  return releaseRequest.post('/IOTRoomCrtl/deleteIotRmCont', {
    // classID: '',
    contIDList: params
  })
}

//获取设备列表zuixin

//获取设备列表
const deviceList = ref([{ index: '', deviceName: '' }])
const getDeviceList = () => {
  releaseRequest
    .post('/PublishFlowCtrl/queryIotDevicePageInfo', {})
    .then((res) => {
      // debugger
      console.log('设备管理列表成功:', res.data)
      deviceList.value = res.data.result
    })
    .catch((error) => {
      console.log('设备管理列表失败:', error)
    })
}
// 发布页新增绑定设备
const createConnectDevice = () => {
  // 发布页新增绑定设备
  releaseRequest
    .post('/IOTRoomCrtl/saveIotContDevice', {
      contID: 3000001504019772,
      deviceID: 3000001504019772,
      deviceModel: 'huawei',
      deviceName: '信息发布屏',
      deviceType: 1
    })
    .then((res) => {
      // debugger
      console.log('发布页新增绑定设备成功', res.data.result)
    })
    .catch((error) => {
      console.log('发布页新增绑定设备失败', error)
    })
}

onMounted(() => {
  getList()
})

// 2.新增按钮/删除按钮
// 2.1新增 / 修改 分类弹框展示
const meetingCategoryVisual = ref(false)
const type = ref('add')
const addBtn = () => {
  addForm.className = ''
  meetingCategoryVisual.value = true
  type.value = 'add'

  nextTick(() => {
    createFormRef.value.clearValidate()
  })
}

// 新增分类弹框中的 form表单
const addForm = reactive({
  classID: '',
  className: '',
  roomID: ''
})
// 组件实例 及校验
const createFormRef = ref(null)
// ,max:10 ,min:4
const createFormRules = reactive({
  className: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})

const authArr = ref([
  {
    id: '1',
    role: '管理员'
  },
  {
    id: '2',
    role: '会议预定人'
  }
])
const addMeetingCategory = () => {
  //校验
  createFormRef.value.validate((valid) => {
    if (valid) {
      // 发送新增分类请求
      releaseRequest
        .post('/IOTRoomCrtl/saveIOTClassInfo', {
          roomID: roomId,
          className: addForm.className
        })
        .then((res) => {
          console.log('新增分类成功', res.data)
          meetingCategoryVisual.value = false

          // 查询请求
          getList()
        })
        .catch((error) => {
          console.log('楼层及地点列表获取失败', error)
        })
    } else {
      console.log('校验错误')
    }
  })
}

// 2.2修改分类
const updateMeetingCategory = () => {
  //校验
  createFormRef.value.validate((valid) => {
    if (valid) {
      //   发修改分类请求
      releaseRequest
        .post('/IOTRoomCrtl/modifyIOTRoomClass', {
          roomID: roomId,
          classID: addForm.classID,
          className: addForm.className
        })
        .then((res) => {
          console.log('修改分类成功', res.data)
          meetingCategoryVisual.value = false
          // 查询请求
          getList()
        })
        .catch((error) => {
          console.log('修改分类失败', error)
        })
    } else {
      console.log('校验错误')
    }
  })
}
// 3.1  ---修改分类按钮
const handleEdit = (row) => {
  // debugger
  roomId
  addForm.classID = row.classID
  addForm.className = row.className

  type.value = 'update'
  meetingCategoryVisual.value = true

  nextTick(() => {
    createFormRef.value.clearValidate()
  })
}
const meetingModifyVisual = ref(false)

// ---3. 新增/修改 页面
const pagetype = ref('add')
const addPageBtn = (row) => {
  getDeviceList()
  addPageForm.classID = row.classID
  addPageForm.contID = ''
  addPageForm.contName = ''
  addPageForm.contType = ''
  addPageForm.iotDeviceList = ''
  addPageForm.editPath = ''
  addPageForm.pubPath = ''

  meetingModifyVisual.value = true

  pagetype.value = 'add'

  nextTick(() => {
    createPageFormRef.value.clearValidate()
  })
}
// 新增页面弹框中的 form表单
const addPageForm = reactive({
  classID: '',
  contID: '',
  contName: '',
  contType: '',
  iotDeviceList: [],
  editPath: '',
  pubPath: ''
})
// 组件实例 及校验
const createPageFormRef = ref(null)
// ,max:10 ,min:4
const createPageFormRules = reactive({
  contName: [{ required: true, message: '请输入页面名称', trigger: 'blur' }]
  //publishPath:[{ required: true, message: '请输入发布页路径', trigger: 'blur' }],
  // processEditPath:[{ required: true, message: '请输入流程编辑页路径', trigger: 'blur' }],
})

// const authArr=ref([
//     {
//       id:"1",
//       role:"管理员"
//     },{
//       id:"2",
//       role:"会议预定人"
//     }
// ])
const addMeetingPage = () => {
  // debugger
  //校验
  createPageFormRef.value.validate((valid) => {
    if (valid) {
      var iotDeviceList = []
      // debugger
      addPageForm.iotDeviceList.forEach((deviceID) => {
        for (var i = 0; i < deviceList.value.length; i++) {
          if (deviceList.value[i].deviceID == deviceID) {
            let { contID, deviceID, deviceModel, deviceName, deviceType } = deviceList.value[i]
            var obj = {
              contID: addPageForm.contID,
              deviceID: deviceID,
              deviceModel: deviceModel,
              deviceName: deviceName,
              deviceType: deviceType
            }
            // debugger
            iotDeviceList.push(obj)
            break
          }
        }
      })
      //发送新增页面请求
      releaseRequest
        .post('/IOTRoomCrtl/saveIOTConet', {
          classID: addPageForm.classID,
          contName: addPageForm.contName,
          contType: '页面',
          iotDeviceList: iotDeviceList,
          editPath: addPageForm.editPath,
          pubPath: addPageForm.pubPath
        })
        .then((res) => {
          // debugger
          // console.log("修改页面成功",res.data);
          meetingModifyVisual.value = false
          // debugger
          // 查询请求
          getList()
        })
        .catch((error) => {
          console.log('修改页面失败', error)
        })
    } else {
      console.log('校验错误')
    }
  })
}

// 2.2 修改页面
// 3.1  ---修改页面按钮
const handlePageEdit = (row) => {
  // debugger
  getDeviceList()
  addPageForm.classID = row.classID
  addPageForm.contID = row.contID
  addPageForm.contName = row.contName
  addPageForm.contType = row.contType
  var iotDeviceList = []
  row.iotDeviceList.forEach((item) => {
    iotDeviceList.push(item.deviceID)
  })
  addPageForm.iotDeviceList = iotDeviceList
  addPageForm.editPath = row.editPath
  addPageForm.pubPath = row.pubPath != 0 ? row.pubPath : ''

  pagetype.value = 'update'
  meetingModifyVisual.value = true

  nextTick(() => {
    createPageFormRef.value.clearValidate()
  })
}

const updateMeetingPage = () => {
  //校验
  createPageFormRef.value.validate((valid) => {
    if (valid) {
      var iotDeviceList = []
      addPageForm.iotDeviceList.forEach((deviceID) => {
        for (var i = 0; i < deviceList.value.length; i++) {
          if (deviceList.value[i].deviceID == deviceID) {
            let { contID, deviceID, deviceModel, deviceName, deviceType } = deviceList.value[i]
            var obj = {
              contID: addPageForm.contID,
              deviceID: deviceID,
              deviceModel: deviceModel,
              deviceName: deviceName,
              deviceType: deviceType
            }
            iotDeviceList.push(obj)
            break
          }
        }
      })
      // 发修改页面请求
      releaseRequest
        .post('/IOTRoomCrtl/modifyIOTRMCont', {
          classID: addPageForm.classID,
          contID: addPageForm.contID,
          contName: addPageForm.contName,
          iotDeviceList: iotDeviceList,
          editPath: addPageForm.editPath,
          pubPath: addPageForm.pubPath
        })
        .then((res) => {
          // debugger
          console.log('修改页面成功', res.data)
          meetingModifyVisual.value = false

          // 查询请求
          getList()
        })
        .catch((error) => {
          console.log('修改页面失败', error)
        })
    } else {
      console.log('校验错误')
    }
  })
}

//   ----??? 关联页面字段--没有数据来源  权限--没有数据来源
// 1.2 删除
const tableRef = ref('')
const showBTNDelete = ref(false)
const deleteList = ref([])

const deleteBtn = () => {
  console.log('selectRows.value', selectRows.value)
  if (selectRows.value.length <= 0) {
    return
  }
  ElMessageBox.confirm('确定删除当前选中的分类或页面吗？', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      var idArr = []
      var idClassArr = []
      selectRows.value.forEach((item) => {
        if (item.contType) {
          idArr.push(item.contID)
          // 删除页面接口传参："classID": ""  "contID": 3000001504019772
          // debugger
        } else if (item.classType) {
          idClassArr.push(item.classID)
        }
      })
      var promiseArr = []
      if (idArr.length > 0) {
        promiseArr.push(delPage(idArr))
      }
      if (idClassArr.length > 0) {
        promiseArr.push(delClass(idClassArr))
      }
      Promise.all(promiseArr)
        .then(() => {
          console.log('删除成功')
          getList()
          selectRows.value = []
          // 清除勾选
          tableRef.value.clearSelection()
        })
        .catch(() => {
          console.log('删除失败')
        })

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

// 3. 用户列表展示
const tableData = ref([
  //{
  //     roomID: '3000001504019772',
  //     classID: '3000001336943648',
  //     className: '信息发布442',
  //     classType: '分类',
  //     number: 3,
  //     updateTime: '2023-09-10 18:51:29',
  //     list: [
  //       {
  //         classID: '3000001336943648',
  //         contID: '3000001161688196',
  //         contName: '设置页面',
  //         contType: '页面',
  //         pubPath: 'http://10.31.0.101:1880/A2-227/',
  //         editPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //         updateTime: '2023-09-10 16:48:09'
  //       },
  //       {
  //         classID: '3000001336943648',
  //         contID: '3000000456134715',
  //         contName: '设置页面443',
  //         contType: '页面',
  //         pubPath: 'http://10.31.0.101:1880/A2-227/',
  //         editPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //         updateTime: '2023-09-10 18:50:15'
  //       },
  //       {
  //         classID: '3000001336943648',
  //         contID: '3000001166371478',
  //         contName: '设置页面2',
  //         contType: '页面',
  //         pubPath: 'http://10.31.0.101:1880/A2-227/',
  //         editPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //         updateTime: '2023-09-10 16:49:18'
  //       }
  //     ]
  //}
])
// 跨页勾选, 删除时选中行
var selectRows = ref([])
const selectionChange = (selection) => {
  selectRows.value = selection
  console.log('33333333333333', selectRows.value)
}
// 更新时间
const formatDate = (date) => {
  // 现在的时间
  var currentTime = new Date()
  var ty = currentTime.getFullYear()
  // var tm=currentTime.getMonth()+1
  var tm =
    currentTime.getMonth() + 1 <= 9
      ? '0' + (currentTime.getMonth() + 1)
      : currentTime.getMonth() + 1
  // var td=currentTime.getDate()
  var td = currentTime.getDate() <= 9 ? '0' + currentTime.getDate() : currentTime.getDate()
  // 创建时间
  var time = new Date(date)
  var y = time.getFullYear()
  // var m=time.getMonth()+1
  var m = time.getMonth() + 1 <= 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  // var d=time.getDate()
  var d = time.getDate() <= 9 ? '0' + time.getDate() : time.getDate()

  var h = time.getHours() <= 9 ? '0' + time.getHours() : time.getHours()
  var s = time.getMinutes() <= 9 ? '0' + time.getMinutes() : time.getMinutes()

  if (currentTime.getTime() - new Date(date).getTime() < 5 * 60 * 1000) {
    return '刚刚'
  } else if (ty == y && tm == m && td == d) {
    return '今天 ' + h + ':' + s
  } else {
    return m + '月' + d + '日 ' + h + ':' + s
  }
}
</script>

<style lang="less" scoped>
.userList {
  // 1.头部

  // 2.顶部
  // 2.1 顶部新增分类
  .addBtn {
    &.addBtnActive {
      background-color: rgba(191, 191, 191, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
  // 2.2 顶部删除按钮
  .delBtn {
    width: 80px;
    height: 32px;
    line-height: 20px;
    border-radius: 2px;
    border: none;
    background-color: rgba(191, 191, 191, 1);
    color: rgba(255, 255, 255, 1);
    font-size: 14px;
    text-align: center;
    font-family: Roboto;
    &.delBtnActive {
      background-color: red;
      color: rgba(255, 255, 255, 1);
    }
  }

  // 2.用户界面列表
  .tableBox {
    :deep(.custom-table-head) {
      background-color: #f5f9fc;
    }
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
    }
    a {
      text-decoration: none;
      color: rgb(24, 144, 255);
      font-size: 14px;
      cursor: pointer;
      white-space: nowrap;
    }
    // 暂无用户界面列表
    .noUserList {
      height: 35px;
      margin-top: 5%;
      color: rgba(191, 191, 191, 1);
      font-size: 24px;
      text-align: center;
      font-family: SourceHanSansSC-regular;
    }
  }

  :deep(.el-dialog__body) {
    .el-form-item__label {
      width: 124px !important;
      justify-content: flex-start;
    }
  }
}
</style>
