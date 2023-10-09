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
          <el-input v-model="form.deviceIpAddress" placeholder="请输入设备ip地址" />
        </el-form-item>

        <el-form-item label="区域">
          <el-select v-model="form.region" placeholder="全部">
            <!-- <el-option v-for="(item,id) in tableData"  label="item.region" value="item.region" :key="id"/> -->
            <el-option
                  v-for="item in meetingRoomlist"
                  :key="item"
                  :label="item"
                  :value="item"
              />
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
        <el-button type="primary" text @click="add()" :class="['addbtn',selectList.length != 0?'addbtnActive':'']" :disabled="selectList.length != 0">新增</el-button>
        <!--新增弹框表单  -->
        <el-dialog v-model="newdialogFormVisible" title="新增">
          <el-form :model="newForm" ref="newFormRef" :rules="newFormRules">
            <el-form-item label="设备ID" :label-width="formLabelWidth" prop="deviceId">
              <el-input v-model="newForm.deviceId" autocomplete="off" placeholder="请输入设备id" />
            </el-form-item>
            <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand">
              <el-input v-model="newForm.brand" autocomplete="off" placeholder="请输入品牌" />
            </el-form-item>
            <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
              <el-input
                v-model="newForm.deviceName"
                autocomplete="off"
                placeholder="请输入设备名称"
              />
            </el-form-item>
            <el-form-item label="型号" :label-width="formLabelWidth" prop="modelNumber">
              <el-input v-model="newForm.modelNumber" autocomplete="off" placeholder="请输入型号" />
            </el-form-item>
            <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="deviceIpAddress">
              <el-input
                v-model="newForm.deviceIpAddress"
                autocomplete="off"
                placeholder="请输入IP地址"
              />
            </el-form-item>
            <el-form-item label="&nbsp;&nbsp;会议室" :label-width="formLabelWidth" prop="region">
              <el-select
                v-model="newForm.region"
                placeholder="请输入会议室名称"
                style="width: 100%"
              >
                <!-- multiple -->
                <el-option
                  v-for="item in meetingRoomlist"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="端口号" :label-width="formLabelWidth" prop="port">
              <el-input v-model="newForm.port" autocomplete="off" placeholder="请输入端口号" />
            </el-form-item>
            <el-form-item label="&nbsp;&nbsp;状态" :label-width="formLabelWidth" prop="status">
              <el-input v-model="newForm.status" autocomplete="off" placeholder="请输入状态" />
            </el-form-item>
            <el-form-item label="&nbsp;&nbsp;设备类型" :label-width="formLabelWidth" prop="deviceType">
              <el-select
                v-model="newForm.deviceType"
                placeholder="请选择设备类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in deviceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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
        <!-- 删除 -->
        <el-button @click="deletebtn()" :class="['deletebtn',selectList.length != 0?'delbtnActive':'']" :disabled="selectList.length == 0"
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
            @select="handleSelectionChange"
            @select-all="selectAll"
            ref="table"
            :row-class-name="tableRowClassName"
          >
            <el-table-column type="selection" prop="sec" label="" min-width="30" />
            <el-table-column fixed prop="deviceId" label="设备ID" min-width="80" />
            <el-table-column prop="deviceName" label="设备名称" min-width="120" />
            <el-table-column prop="deviceIpAddress" label="设备ip地址" min-width="120" />
            <el-table-column prop="port" label="端口号" min-width="70" />
            <el-table-column prop="brand" label="品牌" min-width="60" />
            <el-table-column prop="modelNumber" label="型号" min-width="150" />
            <el-table-column prop="region" label="区域" min-width="120" />
            <el-table-column prop="createTime" label="添加时间" min-width="170" >
              <template #default="scope">
                {{getcreateTime(scope.row.createTime)}}
              </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" min-width="150">
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
    <!-- 4.分页 -->
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
      <img src="@/assets/index/deviceList/refresh.png" @click="refresh()"/>
    </div>
     <!--编辑弹框表单  -->
   <div class="tankuang">
      <el-dialog v-model="editdialogFormVisible" title="编辑">
        <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" >
          <el-form-item label="设备ID" :label-width="formLabelWidth" prop="deviceId">
            <el-input v-model="editForm.deviceId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand">
            <el-input v-model="editForm.brand" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备名称" :label-width="formLabelWidth" prop="deviceName">
            <el-input v-model="editForm.deviceName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="modelNumber">
            <el-input v-model="editForm.modelNumber" autocomplete="off" />
          </el-form-item>
          <el-form-item label="设备IP地址" :label-width="formLabelWidth" prop="deviceIpAddress">
            <el-input v-model="editForm.deviceIpAddress" autocomplete="off" />
          </el-form-item>
          <el-form-item label="会议室" :label-width="formLabelWidth" prop="region">
            <el-select v-model="editForm.region" placeholder="请输入会议室名称" style="width: 100%">
              <!-- multiple -->
              <el-option
                  v-for="item in meetingRoomlist"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="端口号" :label-width="formLabelWidth" prop="port">
            <el-input v-model="editForm.port" autocomplete="off" />
          </el-form-item>
          <el-form-item label="&nbsp;&nbsp;状态" :label-width="formLabelWidth" prop="status">
            <el-input v-model="editForm.status" autocomplete="off" />
          </el-form-item>
           <el-form-item label="&nbsp;&nbsp;设备类型" :label-width="formLabelWidth" prop="deviceType">
              <el-select
                v-model="editForm.deviceType"
                placeholder="请选择设备类型"
                style="width: 100%"
              >
                <el-option
                  v-for="item in deviceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
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

import {request,noderedrequest}  from "@/utils/server.js" 

const table = ref(null)

// 设备管理页会议室列表维护
const meetingRoomlist = ref([])
const getmeetingRoomList = () => {
  request
    .post('/IOTRoomCrtl/queryAllIotRoomList', { })
    .then((res) => {
      console.log('设备管理会议室列表查询成功:', res.data)
      for(var i=0;i<res.data.length;i++){
         meetingRoomlist.value.push(res.data[i].roomName+'会议室')
      }

    })
    .catch((error) => {
      console.log('设备管理会议室列表查询失败:', error)
    })
}
//获取设备列表
const getList = () => {
  //  noderedrequest.get("/device/list?deviceName="+form.deviceName+"&deviceIpAddress="+form.deviceIpAddress+"&region="+form.region+"&page="+currentPage.value+"&limit="+pageSize.value)
  noderedrequest
    .post('/device/list', {
      deviceName: {
        _lk: form.deviceName
      },
      deviceIpAddress: {
        _lk: form.deviceIpAddress
      },
      region: form.region,
      page: currentPage.value,
      limit: pageSize.value,
      deviceType: 0,
    })
    .then((response) => {
      console.log('设备管理列表按条件查询成功:', response.data)
      total.value = response.data.data.total;
      tableData.length = 0
      //使用push方法:结构后再赋值
      // debugger
      tableData.push(...response.data.data.items)

      nextTick(() => {
        // debugger
        selectList.value.forEach((row) => {
          let index = isindexof(tableData, row)
          if (index > -1) {
            table.value.toggleRowSelection(tableData[index], true)
          }
        })
      })
    })
    .catch((error) => {
      console.log('设备管理列表按条件查询失败:', error)
    })
}
// 添加时间
const getcreateTime=(createTime)=>{
  if(createTime){
    // 现在的时间
    var currentTime=new Date()
    var ty=currentTime.getFullYear()
    var tm=currentTime.getMonth()+1
    var td=currentTime.getDate()
    // 创建时间
    // debugger
    var time=new Date(createTime)
    
    var y=time.getFullYear()
    var m=time.getMonth()+1
    var d=time.getDate()
    // console.log(time,y,m,d )
    if(currentTime.getTime() - new Date(createTime).getTime() <5*60*1000){
      return "刚刚"
    }else if(ty==y&&tm==m&&td==d){
      return "今天 "+time.getHours()+':'+time.getMinutes()
    }else { 
      return m+'月'+d+'日 ' +time.getHours()+':'+time.getMinutes()
    }
  }
}

//初始化渲染
onMounted(() => {
  getList()
  getmeetingRoomList()
})
//2.按要求查询
const form = reactive({
  deviceName: '',
  deviceIpAddress: '',
  region: ''
})
// 条件查询(设备名称、设备id地址、区域)
const searchbtn = () => {
  console.log(form.deviceName, form.deviceIpAddress, form.region)
  getList()
}
// 重置
const resetbtn = () => {
  form.deviceName = ''
  form.region = ''
  form.deviceIpAddress = ''
  getList()
}

//3 设备信息
// 3.1 批量删除按钮
// 存放选中项
const selectList = ref([])

const deletebtn = () => {
  if (selectList.value.length <= 0) {
    return
  }
  var id = []
  for (var i = 0; i < selectList.value.length; i++) {
    id.push(selectList.value[i].id)
  }
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
      //批量删除请求（成功后发查询请求）
      noderedrequest
        .delete('/device/delete?id=' + id.join(','))
        .then((response) => {
          console.log('设备列表删除成功', response)
          if (response.data.code == 200) {
            //重新发请求，渲染设备列表
            getList()
            
            selectList.value=[]
            // 清除勾选
            table.value.clearSelection()
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
// 3.2 row-class-name 属性来为 Table 中的某一行添加 class， 这样就可以自定义每一行的样式了
const tableRowClassName = ({row,rowIndex}) => {
  if (rowIndex %2 == 0) {
    return 'warning-row'
  } else if (rowIndex % 2 == 1) {
    return 'success-row'
  }
  return ''
}

// 3.1新增按钮弹框
const deviceTypeOptions = ref([
  {
    value: 0,
    label: '固定设备'
  },
  {
    value: 1,
    label: '移动设备'
  }
])
const formLabelWidth = "32%";
const newdialogFormVisible = ref(false)
const newForm = reactive({
  deviceId: '',
  deviceName: '',
  deviceIpAddress: '',
  port: '',
  brand: '',
  modelNumber: '',
  region: '',
  deviceType:'',
  state: '',
  topic: ''
})
// 组件实例
const newFormRef = ref(null)
const newFormRules = reactive({
  deviceId: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceName: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceIpAddress: [{ required: true, message: '请输入', trigger: 'blur' }],
  port: [{ required: true, message: '请输入', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入', trigger: 'blur' }],
  modelNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
  // region: [{ required: true, message: '请输入', trigger: 'blur' }]
  // state: [{required: true, message:'请输入', trigger: 'blur'}],
})
// 确认新增
const addItem = () => {
  newFormRef.value.validate((valid) => {
    if (valid) {
      //校验通过后发请求
      // console.log(newForm.region)
      noderedrequest
        .post('/device/create', {
          data: {
            deviceId: newForm.deviceId,
            deviceName: newForm.deviceName,
            deviceIpAddress: newForm.deviceIpAddress,
            port: newForm.port,
            brand: newForm.brand,
            modelNumber: newForm.modelNumber,
            region: newForm.region,
            state: newForm.state,
            topic: newForm.topic,
            // deviceType: '0
            deviceType: newForm.deviceType,
          }
        })
        .then((res) => {
          console.log('设备列表新增成功', res)
          if (res.data.code == 200) {
            //重新发请求，渲染设备列表
            getList()
          }
        })
        .catch((error) => {
          console.log(error)
        })

      newdialogFormVisible.value = false
    } else {
      console.log('校验错误')
    }
  })
}
// 取消新增
const cancelItem = () => {
  newdialogFormVisible.value = false
}
// 点击新增弹框中 清空之前输入
const add = () => {
  newForm.deviceId = ''
  newForm.deviceName = ''
  newForm.deviceIpAddress = ''
  newForm.port = ''
  newForm.brand = '', 
  newForm.modelNumber = ''
  newForm.region = ''
  newForm.deviceTypeOptions=''
  newForm.state = ''
  newForm.topic = ''
  
  newdialogFormVisible.value = true
}

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
      noderedrequest
        .delete('/device/delete?id=' + id)
        .then((response) => {
          console.log('设备列表删除成功', response)
          if (response.data.code == 200) {
            //重新发请求，渲染设备列表
            getList()
            
            selectList.value=[]
            // 清除勾选
            table.value.clearSelection()
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
// 3.2 编辑按钮
var editId
const editdialogFormVisible = ref(false)
const editForm = reactive({
  deviceId: '',
  deviceName: '',
  deviceIpAddress: '',
  port: '',
  brand: '',
  modelNumber: '',
  region: '',
  deviceType:'',
  state: '',
  topic: ''
})
// 组件实例
const editFormRef = ref(null)
const editFormRules = reactive({
  deviceId: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceName: [{ required: true, message: '请输入', trigger: 'blur' }],
  deviceIpAddress: [{ required: true, message: '请输入', trigger: 'blur' }],
  port: [{ required: true, message: '请输入', trigger: 'blur' }],
  brand: [{ required: true, message: '请输入', trigger: 'blur' }],
  modelNumber: [{ required: true, message: '请输入', trigger: 'blur' }],
  region: [{ required: true, message: '请输入', trigger: 'blur' }]
  // state: [{required: true, message:'请输入', trigger: 'blur'}],
})
const edititem = (row) => {
  console.log(row)

  editId = row.id
  editdialogFormVisible.value = true

  editForm.deviceId = row.deviceId
  editForm.deviceName = row.deviceName
  editForm.deviceIpAddress = row.deviceIpAddress
  editForm.port = row.port
  editForm.brand = row.brand,
  editForm.modelNumber = row.modelNumber,
  editForm.region = row.region,
  editForm.deviceType=row.deviceType==0?"固定设备":"移动设备",
  editForm.state = row.state,
  editForm.topic = row.topic
}
const editIteminfo = () => {
  editFormRef.value.validate((valid) => {
    if (valid) {
      noderedrequest
        .put(
          '/device/update',
          // {data:
          {
            id: editId,
            deviceId: editForm.deviceId,
            deviceName: editForm.deviceName,
            deviceIpAddress: editForm.deviceIpAddress,
            port: editForm.port,
            brand: editForm.brand,
            modelNumber: editForm.modelNumber,
            region: editForm.region,
            deviceType:editForm.deviceType,
            state: editForm.state,
            topic: editForm.topic
          }
          // }
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

// 3.2设备列表
const tableData = reactive([
  // {
  //   deviceId: '001',
  //   deviceName: '220V A60 9W SMART BULLB',
  //   deviceIpAddress: '139.120.1.1',
  //   port: '80',
  //   brand: 'TTst',
  //   modelNumber: '220V A60 9W SMART BULLB',
  //   region: 'A2-225会议室',
  //   createTime: '2023.4.12 12:33',
  //   state: '在线'
  // },
])
const isindexof = (arr, item) => {
  for (var j = 0; j < arr.length; j++) {
    if (item.id == arr[j].id) {
      return j
    }
  }
  return -1
}
const handleSelectionChange = (e) => {
  // 为数组
  // console.log("handleSelectionChange",e)
  //监听所选中的列表项， 赋值删除变量---批量删除
  // debugger
  var selected = e
  var unselected = []
  for (var i = 0; i < tableData.length; i++) {
    var item = tableData[i]
    var index = isindexof(selected, item)
    if (index == -1) {
      unselected.push(item)
    }
  }
  for (var a = 0; a < unselected.length; a++) {
    let index = isindexof(selectList.value, unselected[a])
    if (index > -1) {
      selectList.value.splice(index, 1)
    }
  }
  for (var a = 0; a < selected.length; a++) {
    let index = isindexof(selectList.value, selected[a])
    if (index == -1) {
      selectList.value.push(selected[a])
    }
  }

  console.log('1111111111', selectList.value)
}
const selectAll = (e) => {
  //  console.log("selectAll",e)
  handleSelectionChange(e)
}


const isOpen = (v, item) => {
  // debugger
  if(item.topic!=""){
     request
    .post('/MqttCrtl/crtIotopic', 
      {
        "message": v,
        "pubTopic": item.topic,
        "qos": 2,
        "retained": true
      }
    )
    .then((res) => {
      console.log('控制设备发送成功', res)
      
    })
    .catch((error) => {
      console.log('控制设备发送失败',error)
    })
  }
  
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
const refresh=()=>{
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
  .addAndDel{
    height: 72px;
    border-top: 1px solid rgba(239, 239, 239, 1);
    border-bottom: 1px solid rgba(239, 239, 239, 1);
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
    .addbtn{
       &.addbtnActive{
        background-color: #bfbfbf!important;
        color: #ffffff;
      }
    }
    .deletebtn {
      background-color: rgba(191, 191, 191, 1);
      color: rgba(255, 255, 255, 1);
     
      &.delbtnActive{
         background-color: red;
      }
    }
    //编辑弹窗
    :deep(.el-form) {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .el-form-item {
        width: 48%;

        .el-form-item__label {
          justify-content: flex-start;
        }
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
      .cell {
        color: rgba(51, 51, 51, 1);
        font-size: 14px;
        text-align: left;
        font-family: Roboto;
      }
      .el-table__body-wrapper {
        thead {
          color: rgba(51, 51, 51, 1);
          font-size: 14px;
          text-align: left;
          font-family: Roboto;
        }
        tbody {
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
        background-color: transparent!important;
      }
      .success-row {
        background-color: #F5F9FC!important;
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
</style>
