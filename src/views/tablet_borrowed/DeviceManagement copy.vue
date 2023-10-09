<template>
  <div class="deviceManagement">
    <!-- 2.查询 -->
    <div class="searchInfo">
      <el-form :model="form">
        <el-form-item label="设备名称">
          <el-input v-model="form.deviceName" placeholder="请输入设备名称" />
        </el-form-item>

        <el-form-item label="设备状态">
          <el-select v-model="form.deviceState" placeholder="全部" popper-class="zdy_select">
            <!-- <el-option v-for="(item,id) in tableData"  label="item.region" value="item.region" :key="id"/> -->
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="借用状态">
          <el-select v-model="form.borrowedState" placeholder="全部" popper-class="zdy_select" >
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
        <el-button @click="resetbtn()">重置</el-button>
        <el-button type="primary" @click="searchbtn()">查询</el-button>
      </div>
    </div>
    <!-- 3.设备列表 -->
    <div class="deviceList">
      <!-- 此处设置了滚动条组件 -->
      <el-scrollbar style="width: 100%">
        <!-- 3.2 设备列表-->
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{ background: '#F5F9FC' }"
          ref="table"
        >
          <el-table-column fixed type="index" min-width="8%" label="序号" />
          <el-table-column prop="deviceName" label="设备名称" min-width="10%" />
          <el-table-column prop="equipmentSerialNumber" label="设备序列号" min-width="20%" />
          <el-table-column prop="deviceIpAddress" label="设备ip地址" min-width="16%" />
            <el-table-column prop="port" label="端口号" min-width="10%" />
            <el-table-column prop="brand" label="品牌" min-width="10%" />
            <el-table-column prop="modelNumber" label="型号" min-width="10%" />
          <el-table-column prop="deviceState" label="设备状态" min-width="10%">
            <template #default="scope">
              <!-- 当设备借用状态为2 使用中时，按钮禁用 -->
              <el-switch
                class="switchClass"
                v-model="scope.row.deviceState"
                size="small"
                active-text="启用"
                inactive-text="禁用"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-value="1"
                inactive-value="0"
                @change="switchChange($event, scope.row)"
                :disabled="scope.row.borrowedState==2"
              />
            </template>
          </el-table-column>
          <el-table-column prop="borrowedState" label="借用状态" min-width="10%">
            <!--此处声明了一个getDayStateStr()方法，将接口返回的状态号，映射成对应得状态文字  -->
            <template #default="scope">
              {{getDayStateStr(scope.row.borrowedState)?getDayStateStr(scope.row.borrowedState):"空闲中"}}
            </template>  
          </el-table-column>
          <el-table-column prop="opration" label="操作" min-width="15%">
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
      </el-scrollbar>
    </div>
    <!--编辑弹框表单  -->
   <div class="tankuang">
      <el-dialog v-model="editdialogFormVisible" title="编辑" >
        <el-form :model="editForm" ref="editFormRef" :rules="editFormRules">
          <!-- <el-form-item label="设备ID" :label-width="formLabelWidth" prop="deviceId">
            <el-input v-model="editForm.deviceId" autocomplete="off" />
          </el-form-item> -->
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
            <el-input v-model="editForm.deviceName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备序列号" :label-width="formLabelWidth" prop="deviceIpAddress">
            <el-input v-model="editForm.equipmentSerialNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="deviceIpAddress">
            <el-input v-model="editForm.deviceIpAddress" autocomplete="off" />
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand">
            <el-input v-model="editForm.brand" autocomplete="off" />
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="modelNumber">
            <el-input v-model="editForm.modelNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth" prop="port">
            <el-input v-model="editForm.port" autocomplete="off" />
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;设备状态" :label-width="formLabelWidth" prop="status">
            <el-input v-model="editForm.deviceState" autocomplete="off" disabled/>
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;借用状态" :label-width="formLabelWidth" prop="status">
            <!-- <el-input v-model="editForm.borrowedState" autocomplete="off"  disabled/> -->
            <el-select v-model="editForm.borrowedState" placeholder="" @change="onChange2" style="width:100%">
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
import {request,noderedrequest,tabletWSRequest}  from "@/utils/server.js" 

const table = ref(null)
const getList = () => {
  
    noderedrequest.post('/device/list', 
        {
          "deviceName":{
            "_lk":form.deviceName,
            "_timestamp":true
        },
          "deviceState":form.deviceState,
          "borrowedState":form.borrowedState,
          "deviceType": 1,
        }
    )
    .then((response) => {
      console.log('按条件查询成功:', response.data)
      
      tableData.length = 0
      //使用push方法:结构后再赋值
      tableData.push(...response.data.data.items)

      
    })
    .catch((error) => {
      console.log('按条件查询失败:', error)
    })
}
//2.按要求查询
const form = reactive({
  deviceName: '',
  deviceState: '',
  borrowedState: ''
})
// 条件查询(设备名称、设备id地址、区域)
const searchbtn = () => {
  console.log(form.deviceName, form.deviceState, form.borrowedState)
  getList()
}
// ----设备借用状态
const dayStateOptions = [
  {
    value: '0',
    label: '已禁用',
  },
  {
    value: '1',
    label: '使用中',
  },
  {
    value: '2',
    label: '空闲中',
  }
]
const getDayStateStr=(v)=>{
  let a
  for(var i=0;i<dayStateOptions.length;i++){
     if(v==dayStateOptions[i].value){
        a= dayStateOptions[i].label;
        break
     }
  }
  return a
}
//----监听设备启用/禁用状态
const switchChange=(v,row)=>{
  // debugger
  console.log(v)
  if(row.borrowedState== 1){
    //调用设备管理的更新接口
    noderedrequest.put("/device/update",
      {
              //当前行的id
              "id":row.id,
              "deviceState":v,
            }
        )
        .then(res=>{
          console.log("设备启用/禁用状态修改成功:",res)
          if(res.data.code==200){
            //更新成功，重新查询发查询请求，渲染设备列表
            getList()
        }
    })
  }
}
// 重置
const resetbtn = () => {
  form.deviceName = ''
  form.deviceState = ''
  form.borrowedState = ''
  getList()
}

//3 设备信息

// 3.2 单个删除
const deleteitem = (row) => {
  console.log(row.id)
  var id = row.id
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
      noderedrequest.delete("/device/delete?id="+id).then(response=>{
        console.log("设备列表删除成功",response);
        if(response.data.code==200){
          //重新发请求，渲染设备列表
          getList()
        }
      }).catch(error=>{

      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })
}

// 3.2设备列表
const tableData = reactive([
  {
    id: 8,
    deviceId: '34',
    deviceName: '平板01',
    deviceIpAddress: '192.168.100.100',
    port: 61000,
    brand: '联想',
    modelNumber: 'yoga',
    region: 'A2-230会议室',
    state: '在线',
    createTime: '2023-08-23T02:35:18.000Z',
    updateTime: null,
    equipmentSerialNumber: 'OPNIHFP0QU93H4FU',
    borrowedState: '3',
    deviceType: '移动设备',
    deviceState: '1'
  },
  // {
  //   id: 8,
  //   deviceId: '34',
  //   deviceName: '220VA609WSMARTBULLB',
  //   deviceIpAddress: '131',
  //   port: 810,
  //   brand: 'TTst',
  //   modelNumber: '220VA609WSMARTBULLB',
  //   region: 'A2-230会议室',
  //   state: '在线',
  //   createTime: '2023-08-23T02:35:18.000Z',
  //   updateTime: null,
  //   equipmentSerialNumber: 'OPNIHFP0QU93H4FU',
  //   borrowedState: '3',
  //   deviceType: '移动设备',
  //   deviceState: '1'
  // },
  // {
  //   id: 8,
  //   deviceId: '34',
  //   deviceName: '220VA609WSMARTBULLB',
  //   deviceIpAddress: '131',
  //   port: 810,
  //   brand: 'TTst',
  //   modelNumber: '220VA609WSMARTBULLB',
  //   region: 'A2-230会议室',
  //   state: '在线',
  //   createTime: '2023-08-23T02:35:18.000Z',
  //   updateTime: null,
  //   equipmentSerialNumber: 'OPNIHFP0QU93H4FU',
  //   borrowedState: '3',
  //   deviceType: '移动设备',
  //   deviceState: '1'
  // }
])
//----启用 禁用
const isDisabled = ref(true)
//初始化渲染
onMounted(() => {
   getList()
})

//编辑按钮
const formLabelWidth = '35%'
var editId
const editdialogFormVisible = ref(false)
const editForm = reactive({
  deviceId: '',
  deviceName: '',
  equipmentSerialNumber:'',
  deviceIpAddress:'',
  brand: '',
  modelNumber: '',
  port: '',
  deviceState: '',
  borrowedState: '',
})
// 组件实例
const editFormRef = ref(null)
const editFormRules = reactive({
  deviceId: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceName: [{ required: true, message: '请输入', trigger: 'blur' }],
  equipmentSerialNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceIpAddress: [{ required: true, message: '请输入', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入', trigger: 'blur' }],
  modelNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
  port: [{ required: true, message: '请输入', trigger: 'blur' }],
  // deviceState: [{ required: true, message: '请输入', trigger: 'blur' }],
  // borrowedState: [{ required: true, message: '请输入', trigger: 'blur' }],
})
const edititem=(row)=>{
  console.log("2222222222",row)
  console.log(row)

  editId = row.id
  editdialogFormVisible.value = true

  editForm.deviceId = row.deviceId
  editForm.deviceName = row.deviceName
  editForm.equipmentSerialNumber = row.equipmentSerialNumber
  editForm.deviceIpAddress = row.deviceIpAddress
  editForm.brand = row.brand,
  editForm.modelNumber = row.modelNumber,
  editForm.port = row.port
  editForm.deviceState = row.deviceState==1?"移动设备":''
  editForm.borrowedState = row.borrowedState
}

const onChange2=(v)=>{
  // debugger
  editForm.deviceState=v
  
}
const editIteminfo = () => {
  editFormRef.value.validate((valid) => {
    if (valid) {
      noderedrequest
        .put(
          '/device/update',
          {
            id: editId,
            deviceId: editForm.deviceId,
            deviceName: editForm.deviceName,
            equipmentSerialNumber:editForm.equipmentSerialNumber,
            deviceIpAddress: editForm.deviceIpAddress,
            brand: editForm.brand,
            modelNumber: editForm.modelNumber,
            port: editForm.port, 
            deviceState: editForm.deviceState,
            borrowedState:editForm.borrowedState,
          }
        )
        .then((res) => {
          console.log('设备列表修改成功:', res)
          if (res.data.code == 200) {
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
</script>

<style lang="less">
    .el-popper.zdy_select{
      width: calc((260/1920)*100vw - 12px)!important;
       background: #05456e!important;
       border: 0px!important;
       margin-top: -10px;
      //  margin-left: -12px!important;
       margin-left: (0/1920)*100vw!important;
       border-radius:0!important;
       
       .el-select-dropdown{
            border-radius:0!important;
       }
      .el-select-dropdown__item{
         color: rgba(255, 255, 255, 1)!important;
          font-size: (18/1920)*100vw!important;
          text-align: center!important;
          font-family: Microsoft Yahei!important;
        &.hover, &:hover{
           background-color: rgba(255, 255, 255, 0.1)!important;
        }
      }
      .el-popper__arrow{
         display: none!important;
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
    border:calc((5/1920) * 100vw + 1px)  solid transparent;
    border-width:0px  calc((5/1920) * 100vw + 1px);
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
    
   
    .searchbtn {
      display: flex;
      justify-content: flex-end;
      height: (32/1080) * 100vh;
      margin-top: (18/1080) * 100vh;
      .el-button {
        width: (120/1920)*100vw;
        height: (50/1080)*100vh;
        line-height: (20/1080) * 100vh;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        background-color: transparent;
        font-size: (20/1920) * 100vw;
        text-align: center;
        border: 1px solid rgba(15, 204, 249, 1);
        font-family: Roboto;
      }
      .el-button:nth-child(2) {
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
          padding:(5/1080) * 100vh 0;
        }
        thead {
          color: rgba(255, 255, 255, 1);
          tr th {
            border: (5/1920) * 100vw solid transparent;
            .cell {
              height: (44/1080)*100vh;
              line-height: (44/1080)*100vh;
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
              font-size: 15%;
              text-align: left;
              font-family: SourceHanSansSC-regular;
              // :deep(.el-switch__label .is-active){
              //   color: rgba(255, 255, 255, 1);
              //   font-size: 18px;
              //   text-align: left;
              //   font-family: SourceHanSansSC-regular;
              // }
            }
            .el-button:nth-child(2) {
              color: red;
            }
            .cell {
              height: (44/1080)*100vh;
              line-height: (44/1080)*100vh;
              white-space: nowrap;
              background-color: rgba(24, 144, 255, 0.1);
              margin-right: (10/1920) * 100vw;
            }
          }
        }
      }
      .switchClass{
        .el-switch__label{
          display: none;
        }
        .is-active{
           display: inline-block;
        }
        .el-switch__label--left{
          position: absolute;
          right: 0;
          margin-right: 0px;
        }
        .el-switch__label--right{
          position: absolute;
          right: 0;
          
        }
        .el-switch__core{
          margin-right: 30px;
        }
      }
    }
  }
  // 4.分页
  .pagination-block {
    height: 52px;
    display: flex;
    justify-content: flex-end;

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
  
  .tankuang{
    //编辑弹窗
    :deep(.el-form) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .el-form-item {
        width: 45%;

        .el-form-item__label {
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>