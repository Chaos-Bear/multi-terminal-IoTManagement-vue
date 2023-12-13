<template>
  <div class="deviceManagement">
    <!-- 2.查询 -->
    <div class="searchInfo">
      <el-form :model="form">
        <el-form-item label="设备名称">
          <el-input v-model="form.tabletName" placeholder="请输入设备名称" />
        </el-form-item>

        <el-form-item label="设备状态">
          <el-select v-model="form.tabletState" placeholder="全部" popper-class="zdy_select">
            <!-- <el-option v-for="(item,id) in tableData"  label="item.region" value="item.region" :key="id"/> -->
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="借用状态">
          <el-select v-model="form.borrowedStatus" placeholder="全部" popper-class="zdy_select">
            <el-option
              v-for="item in dayStateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <div class="searchbtn">
        <el-button type="primary" @click="searchbtn()">查询</el-button>
        <el-button @click="resetbtn()">重置</el-button>
        <el-button type="primary" @click="createbtn()">新增</el-button>
      </div>
    </div>
    <!-- 3.设备列表 -->
    <div class="deviceList">
      <!-- 3.2 设备列表-->
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#F5F9FC' }"
        ref="table"
      >
        <el-table-column fixed type="index" min-width="6%" label="序号" />
        <el-table-column prop="tabletName" label="设备名称" min-width="10%">
          <template #default="scope">
            <!-- placement="bottom" effect="light" -->
            <el-tooltip
              class="box-item"
              effect="dark"
              :content="scope.row.tabletName"
              placement="right-end"
            >
              <div>{{ scope.row.tabletName }}</div>
              >
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="tabletID" label="设备序列号" min-width="22%" />
        <el-table-column prop="tabletIP" label="设备ip地址" min-width="16%" />
        <el-table-column prop="tabletPort" label="端口号" min-width="10%" />
        <el-table-column prop="tabletBrand" label="品牌" min-width="10%" />
        <el-table-column prop="tabletModel" label="型号" min-width="10%" />
        <el-table-column prop="tabletState" label="设备状态" min-width="10%">
          <template #default="scope">
            <!-- 当设备借用状态为1 使用中时，按钮禁用 -->
            <el-switch
              class="switchClass"
              v-model="scope.row.tabletState"
              size="small"
              active-text="启用"
              inactive-text="禁用"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              active-value="1"
              inactive-value="2"
              @change="switchChange($event, scope.row)"
              :disabled="scope.row.borrowedStatus == 1"
            />
          </template>
        </el-table-column>
        <el-table-column prop="borrowedStatus" label="借用状态" min-width="10%">
          <!--此处声明了一个getDayStateStr()方法，将接口返回的状态号，映射成对应得状态文字  -->
          <template #default="scope">
            {{
              getDayStateStr(scope.row.borrowedStatus)
                ? getDayStateStr(scope.row.borrowedStatus)
                : '空闲中'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="opration" label="操作" min-width="15%">
          <!-- scope.row   -->
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="edititem(scope.row)"
              :disabled="scope.row.borrowedStatus == 1"
              :style="scope.row.borrowedStatus == 1 ? 'color:gray' : ''"
            >
              编辑
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click.prevent="deleteitem(scope.row)"
              :disabled="scope.row.borrowedStatus == 1"
              :style="scope.row.borrowedStatus == 1 ? 'color:gray' : ''"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增弹框表单  -->
    <div class="tankuang">
      <el-dialog v-model="createdialogFormVisible" title="新增">
        <el-form :model="createForm" ref="createFormRef" :rules="createFormRules">
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="tabletName">
            <el-input v-model="createForm.tabletName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备序列号" :label-width="formLabelWidth" prop="tabletID">
            <el-input v-model="createForm.tabletID" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="tabletIP">
            <el-input v-model="createForm.tabletIP" autocomplete="off" />
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="tabletBrand">
            <el-input v-model="createForm.tabletBrand" autocomplete="off" />
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="tabletModel">
            <el-input v-model="createForm.tabletModel" autocomplete="off" />
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth" prop="tabletPort">
            <el-input v-model="createForm.tabletPort" autocomplete="off" />
          </el-form-item>
          <el-form-item
            label="&nbsp;&nbsp;设备状态"
            :label-width="formLabelWidth"
            prop="tabletState"
          >
            <el-select v-model="createForm.tabletState" placeholder="全部">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="&nbsp;&nbsp;借用状态" :label-width="formLabelWidth" prop="borrowedStatus" >
            <el-select v-model="editForm.borrowedStatus" placeholder="" @change="onChange2" style="width:100%" disabled>
                        <el-option
                          v-for="item in dayStateOptions"
                          :key="item.value" 
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
          </el-form-item> -->
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelItemCreate()">取消</el-button>
            <el-button type="primary" @click="createIteminfo()">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!--编辑弹框表单  -->
    <div class="tankuang">
      <el-dialog v-model="editdialogFormVisible" title="编辑">
        <el-form :model="editForm" ref="editFormRef" :rules="editFormRules">
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="tabletName">
            <el-input v-model="editForm.tabletName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备序列号" :label-width="formLabelWidth" prop="tabletID">
            <el-input v-model="editForm.tabletID" autocomplete="off" readonly />
          </el-form-item>
          <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="tabletIP">
            <el-input v-model="editForm.tabletIP" autocomplete="off" />
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="tabletBrand">
            <el-input v-model="editForm.tabletBrand" autocomplete="off" />
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="tabletModel">
            <el-input v-model="editForm.tabletModel" autocomplete="off" />
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth" prop="tabletPort">
            <el-input v-model="editForm.tabletPort" autocomplete="off" />
          </el-form-item>
          <!-- <el-form-item label="&nbsp;&nbsp;设备状态" :label-width="formLabelWidth" prop="tabletState">
            <el-input v-model="editForm.tabletState" autocomplete="off" disabled/>
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;借用状态" :label-width="formLabelWidth" prop="borrowedStatus" >
            <el-select v-model="editForm.borrowedStatus" placeholder="" @change="onChange2" style="width:100%" disabled>
                        <el-option
                          v-for="item in dayStateOptions"
                          :key="item.value" 
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
          </el-form-item> -->
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
import { request, tabletRequest } from '@/utils/server.js'

const table = ref(null)
// 1.平板管理列表查询接口
const getList = () => {
  // 平板借用状态：0已禁用，1使用中，2空闲中
  // 平板设备状态：1启用、2禁用
  tabletRequest
    .post('/IotBabletEditCrtl/queryMageBablet', {
      borrowedStatus: form.borrowedStatus,
      tabletName: form.tabletName,
      tabletState: form.tabletState
    })
    .then((response) => {
      console.log('平板管理列表查询查询成功:', response.data)

      tableData.value = response.data.result
    })
    .catch((error) => {
      console.log('平板管理列表查询失败:', error)
    })
}
//初始化渲染
onMounted(() => {
  getList()
})
//2.按要求查询
const form = reactive({
  tabletName: '',
  tabletState: '',
  borrowedStatus: ''
})
// 条件查询(设备名称、设备id地址、区域)
const searchbtn = () => {
  console.log(form.tabletName, form.tabletState, form.borrowedStatus)
  getList()
}
// ----设备借用状态
const dayStateOptions = [
  {
    value: '0',
    label: '已禁用'
  },
  {
    value: '1',
    label: '使用中'
  },
  {
    value: '2',
    label: '空闲中'
  }
]
const getDayStateStr = (v) => {
  let a
  for (var i = 0; i < dayStateOptions.length; i++) {
    if (v == dayStateOptions[i].value) {
      a = dayStateOptions[i].label
      break
    }
  }
  return a
}
//----监听设备启用/禁用状态
const switchChange = (v, row) => {
  // debugger
  console.log(v)
  // 设备借用 状态为 空闲中2 ，时，待用编辑接口，修改设备状态为禁用/启用 ，禁用时 设备借用状态需变为 已禁用0，
  if (row.borrowedStatus == 2) {
    //调用设备管理的更新接口
    tabletRequest
      .post('/IotBabletEditCrtl/editBablet', {
        tabletID: row.tabletID,
        tabletState: v
      })
      .then((res) => {
        console.log('设备列表修改成功:', res)
        if (res.data.repCode == 200) {
          //重新发请求，渲染设备列表
          getList()
        }
      })
  }
}
// 重置
const resetbtn = () => {
  form.tabletName = ''
  form.tabletState = ''
  form.borrowedStatus = ''
  getList()
}

//新增
const createdialogFormVisible = ref(false)
const createForm = reactive({
  // "tabletID": "E280689400005020F5352D7F",
  // "tabletName": "平板03",
  // "tabletModel": "2",
  // "tabletBrand": "华硕",
  // "tabletIP": "10.31.0.230",
  // "tabletPort": "3308",
  // "tabletState": "1",
  // "borrowedStatus": "1",
})
// 组件实例

const createFormRef = ref(null)
const createFormRules = reactive({
  tabletName: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletID: [
    { required: true, message: '请输入', trigger: 'blur' },
    { min: 24, max: 24, message: '长度需为24位', trigger: 'blur' }
  ],
  tabletIP: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      message: '情输入正确的ip地址',
      trigger: 'blur'
    }
  ],
  tabletBrand: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletModel: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletPort: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/,
      message: '范围需在0-65535之间',
      trigger: 'blur'
    }
  ]
  // tabletState: [{ required: true, message: '请输入', trigger: '' }],
  // borrowedStatus: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const createbtn = () => {
  createdialogFormVisible.value = true
  // 打开新增弹框后，清除上一次校验规则
  createFormRef.value.clearValidate()
  ;(createForm.tabletID = ''),
    (createForm.tabletName = ''),
    (createForm.tabletModel = ''),
    (createForm.tabletBrand = ''),
    (createForm.tabletIP = ''),
    (createForm.tabletPort = ''),
    (createForm.tabletState = '')
  // createForm.borrowedStatus=''
}
const cancelItemCreate = () => {
  createdialogFormVisible.value = false
}
// 2.新增弹框中 确认新增接口
const createIteminfo = () => {
  createFormRef.value.validate((valid) => {
    if (valid) {
      tabletRequest
        .post('/IotBabletEditCrtl/saveBablet', {
          tabletID: createForm.tabletID,
          tabletName: createForm.tabletName,
          tabletIP: createForm.tabletIP,
          tabletBrand: createForm.tabletBrand,
          tabletModel: createForm.tabletModel,
          tabletPort: createForm.tabletPort,
          tabletState: createForm.tabletState
        })
        .then((res) => {
          console.log('设备列表修改成功:', res)
          if (res.data.repCode == 200) {
            //重新发请求，渲染设备列表
            // debugger
            getList()
          }
        })
      createdialogFormVisible.value = false
    } else {
      console.log('校验错误')
    }
  })
}
//3 设备信息

// 3.2 单个删除

const deleteitem = (row) => {
  console.log(row.tabletID)
  var tabletID = row.tabletID
  // debugger
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
      //单个删除请求（成功后发查询请求）
      tabletRequest
        .post('/IotBabletEditCrtl/deleteIotIablet', {
          tabletID: tabletID
        })
        .then((response) => {
          console.log('设备列表删除成功', response)
          if (response.data.repCode == 200) {
            //重新发请求，渲染设备列表

            getList()
          }
        })
        .catch((error) => {})
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

// 3.2设备列表
const tableData = ref([
  // {
  //     "tabletID": "E280689400005020F5352D7F",
  //     "tabletName": "平板03",
  //     "tabletModel": "2",
  //     "tabletBrand": "华硕",
  //     "tabletIP": "10.31.0.230",
  //     "tabletPort": "3308",
  //     "tabletState": "1",
  //     "borrowedStatus": "1",
  //     "tabletOrder": 0,
  //     "verifyCode": null
  //   },
])
//----启用 禁用
const isDisabled = ref(true)

//3.3 编辑按钮
const formLabelWidth = '30%'
var editId
const editdialogFormVisible = ref(false)
const editForm = reactive({
  tabletID: 'E280689400005020F5352D7F',
  tabletName: '平板03',
  tabletModel: '2',
  tabletBrand: '华硕',
  tabletIP: '10.31.0.230',
  tabletPort: '3308',
  tabletState: '1',
  borrowedStatus: '1'
})
// 组件实例
const editFormRef = ref(null)
const editFormRules = reactive({
  tabletName: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletID: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletIP: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern:
        /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      message: '情输入正确的ip地址',
      trigger: 'blur'
    }
  ],
  tabletBrand: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletModel: [{ required: true, message: '请输入', trigger: 'blur' }],
  tabletPort: [
    { required: true, message: '请输入', trigger: 'blur' },
    {
      pattern: /^(([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5]))$/,
      message: '范围需在0-65535之间',
      trigger: 'blur'
    }
  ]
  // tabletState: [{ required: true, message: '请输入', trigger: 'blur' }],
  // borrowedStatus: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const edititem = (row) => {
  console.log('2222222222', row)
  console.log(row)

  editdialogFormVisible.value = true
  ;(editForm.tabletID = row.tabletID),
    (editForm.tabletName = row.tabletName),
    (editForm.tabletModel = row.tabletModel),
    (editForm.tabletBrand = row.tabletBrand),
    (editForm.tabletIP = row.tabletIP),
    (editForm.tabletPort = row.tabletPort),
    (editForm.tabletState = row.tabletState == 1 ? '启用' : '禁用'),
    (editForm.borrowedStatus = row.borrowedStatus)
}

// const onChange2=(v)=>{
//   // debugger
//   editForm.tabletState=v
// }

// 2.编辑弹框中 确认编辑接口
const editIteminfo = () => {
  editFormRef.value.validate((valid) => {
    if (valid) {
      tabletRequest
        .post('/IotBabletEditCrtl/editBablet', {
          tabletID: editForm.tabletID,
          tabletName: editForm.tabletName,

          tabletIP: editForm.tabletIP,
          tabletBrand: editForm.tabletBrand,
          tabletModel: editForm.tabletModel,
          tabletPort: editForm.tabletPort
          // tabletState: editForm.tabletState,
          // borrowedStatus:editForm.borrowedStatus,
        })
        .then((res) => {
          console.log('设备列表修改成功:', res)
          if (res.data.repCode == 200) {
            //重新发请求，渲染设备列表
            getList()
          }
        })
      editdialogFormVisible.value = false
    } else {
      console.log('校验错误')
    }
  })
}

const cancelItemEdit = () => {
  editdialogFormVisible.value = false
}
</script>

<style lang="less">
.el-popper.zdy_select {
  width: calc((260 / 1920) * 100vw - 12px) !important;
  background: #05456e !important;
  border: 0px !important;
  margin-top: -10px;
  //  margin-left: -12px!important;
  margin-left: (0/1920) * 100vw !important;
  border-radius: 0 !important;

  .el-select-dropdown {
    border-radius: 0 !important;
  }
  .el-select-dropdown__item {
    color: rgba(255, 255, 255, 1) !important;
    font-size: (18/1920) * 100vw !important;
    text-align: center !important;
    font-family: Microsoft Yahei !important;
    &.hover,
    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
  .el-popper__arrow {
    display: none !important;
  }
}
</style>
<style lang="less" scoped>
.deviceManagement {
  margin: 0 (58/1920) * 100vw;
  padding-top: (68/1080) * 100vh;
  height: calc(100% - (8 / 1080) * 100vh);
  box-sizing: border-box;
  overflow: hidden;
  // 2. 查询
  .searchInfo {
    width: 100%;
    height: (82/1080) * 100vh;
    display: flex;
    justify-content: space-between;
    border: calc((5 / 1920) * 100vw + 1px) solid transparent;
    border-width: 0px calc((5 / 1920) * 100vw + 1px);
    box-sizing: border-box;
    :deep(.el-form) {
      display: flex;
      margin-top: (38/1080) * 100vh;

      .el-form-item {
        display: flex;
        align-items: center;
        margin-right: (60/1920) * 100vw;

        .el-form-item__label {
          // height: (20/1920)*100vw;
          // margin-bottom: (8/1920) * 100vw;
          color: rgba(255, 255, 255, 1);
          font-size: (20/1920) * 100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        .el-input__wrapper {
          background-color: transparent;
          width: (240/1920) * 100vw;
          height: (50/1080) * 100vh;
        }
      }
    }
    :deep(.el-input__inner) {
      color: rgba(255, 255, 255, 1);
    }
    .searchbtn {
      display: flex;
      justify-content: flex-end;
      height: (32/1080) * 100vh;
      margin-top: (18/1080) * 100vh;
      .el-button {
        width: (120/1920) * 100vw;
        height: (50/1080) * 100vh;
        line-height: (20/1080) * 100vh;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        background-color: transparent;
        font-size: (20/1920) * 100vw;
        text-align: center;
        border: 1px solid rgba(15, 204, 249, 1);
        font-family: Roboto;
      }
      .el-button:nth-child(1),
      .el-button:nth-child(3) {
        border-radius: 2px;
        background-color: rgba(15, 204, 249, 0.3);
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(15, 204, 249, 1);
      }
    }
  }
  // 3.设备列表
  .deviceList {
    // padding-top: (16/1920)*100vw;
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - (8 / 1080) * 100vh);

    .scrollbar-flex-content {
      display: flex;
    }
    // 编辑/删除按钮
    .addbtn,
    .deletebtn {
      margin-bottom: (16/1920) * 100vw;
      width: (80/1920) * 100vw;
      height: (32/1080) * 100vh;
      line-height: (20/1920) * 100vw;
      margin-right: (8/1920) * 100vw;
      border-radius: (2/1920) * 100vw;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(79, 168, 249, 1);
      font-size: (14/1920) * 100vw;
      text-align: center;
      font-family: Roboto;
    }
    .deletebtn {
      background-color: rgba(191, 191, 191, 1);
      color: rgba(255, 255, 255, 1);
    }

    //3.2设备列表
    :deep(.el-table) {
      height: (800/1080) * 100vh !important;
      background-color: transparent;
      font-size: (18/1920) * 100vw;
      color: rgba(255, 255, 255, 1);
      font-family: Roboto;
      border: 1px solid transparent;
      // overflow: hidden;

      .el-table__inner-wrapper {
        height: (800/1080) * 100vh !important;
        // height:auto;
        tr {
          background-color: transparent !important;
          td,
          th {
            background-color: transparent !important;
          }
        }
        .el-table__cell {
          // height: (20/1080) * 100vh;
          text-align: center;
          border-bottom: 0px !important;
          padding: (5/1080) * 100vh 0;
        }
        thead {
          color: rgba(255, 255, 255, 1);
          tr th {
            border: (5/1920) * 100vw solid transparent;
            .cell {
              height: (44/1080) * 100vh;
              line-height: (44/1080) * 100vh;
              background: radial-gradient(
                0.5% 0.5% at 50% 50%,
                rgba(0, 207, 255, 0.1) 0%,
                rgba(0, 207, 255, 0.25) 100%
              ) !important;
              border: 0px;
              white-space: nowrap;
            }
          }
        }
        .el-table__body-wrapper {
          margin-left: (5/1920) * 100vw;
        }
        tbody {
          margin-left: (5/1920) * 100vw;
          tr td {
            // height: (44/1080) * 100vh;

            .el-button {
              color: rgba(24, 144, 255, 1);
              font-size: (18/1920) * 100vw;
              text-align: left;
              font-family: SourceHanSansSC-regular;
            }
            .el-button:nth-child(2) {
              color: red;
            }
            .cell {
              height: (44/1080) * 100vh;
              line-height: (44/1080) * 100vh;
              white-space: nowrap;
              background-color: rgba(24, 144, 255, 0.1);
              margin-right: (10/1920) * 100vw;

              .el-switch--small .el-switch__label * {
                font-size: (18/1920) * 100vw !important;
              }
            }
          }
        }
      }
      .switchClass {
        .el-switch__label {
          display: none;
        }
        .is-active {
          display: inline-block;
        }
        .el-switch__label--left {
          position: absolute;
          right: 0;
          margin-right: 0px;
        }
        .el-switch__label--right {
          position: absolute;
          right: 0;
        }
        .el-switch__core {
          margin-right: 30px;
        }
      }
    }
  }

  .tankuang {
    //编辑弹窗
    :deep(.el-dialog__body) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    :deep(.el-form) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .el-form-item {
        width: 48%;

        .el-form-item__label {
          white-space: nowrap;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
