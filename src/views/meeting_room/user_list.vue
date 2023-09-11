<template>
  <div style="margin: 0 auto" class="userList">
    <el-container>
      <el-header style="height: 90px">
        <b>
          <span
            style="font-size: 24px; font-family: SourceHanSansSC-medium; color: rgba(51, 51, 51, 1)"
          >
            {{ titleName }}
          </span>
        </b>
        <el-button style="float: right; margin-left: 10px" @click="router.push('/')"
          >返回</el-button
        >
        <el-divider style="margin: 10px 0" />
        <el-button
          type="primary"
          :class="['addBtn', selectRows.length > 0 ? 'addBtnActive' : '']"
          @click="addBtn"
          :disabled="selectRows.length > 0"
        >
          新增分类
        </el-button>
        <el-button
          type="danger"
          :class="['delBtn', selectRows.length > 0 ? 'delBtnActive' : '']"
          :disabled="selectRows.length <= 0"
          @click="deleteBtn"
        >
          删除
        </el-button>
      </el-header>
      <el-main>
        <!-- 2. 用户界面列表 -->
        <div class="tableBox">
          <el-scrollbar height="100%">
            <el-table
              :data="tableData"
              style="width: 100%; margin-bottom: 20px"
              row-key="id"
              default-expand-all
              :header-cell-style="{ background: '#F5F9FC' }"
              @selection-change="selectionChange"
              v-if="tableData.length>0"
            >
              <el-table-column type="selection" width="30" :reserve-selection="true" />
              <el-table-column prop="className" label="名称">
                <template #default="scope">
                  <template v-if="scope.row.classType == '分类'">
                    {{ scope.row.className }}
                  </template>
                  <template v-if="scope.row.contType== '页面'">
                    <a :href="scope.row.publishPath" target="_blank">{{ scope.row.contName}}</a>
                  </template>
                </template>
              </el-table-column>
              <el-table-column prop="" label="关联设备">
                <template #default="scope">
                  <template v-if="scope.row.classType == '分类'"> - </template>
                  <template v-if="scope.row.contType == '页面'"> --- </template>
                </template>
              </el-table-column>
              <el-table-column prop="updateTime" label="更新时间"  />
                
              <el-table-column prop="classType" label="类型" >
                <template #default="scope">
                  <template v-if="scope.row.classType == '分类'">{{scope.row.classType}} </template>
                  <template v-if="scope.row.contType == '页面'"> {{scope.row.contType}} </template>
                </template>
              </el-table-column>
              <el-table-column prop="num" label="数量">
                <template #default="scope">
                  <template v-if="scope.row.classType == '分类'">
                    {{ scope.row.number }}个tab
                  </template>
                  <template v-else> - </template>
                </template>
              </el-table-column>
              <el-table-column prop="" label="权限控制" >
                  <template #default="scope">
                      <template v-if="scope.row.classType == '分类'"></template>
                      <template v-if="scope.row.contType == '页面'"> --- </template>
                  </template>
              </el-table-column>
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
                    <a
                      style="color: #1890ff; font-size: 14px; cursor: pointer"
                      :href="scope.row.processEditPath"
                      target="_blank"
                    >
                      编辑
                    </a>
                  </template>
                </template>
              </el-table-column>
            </el-table>
            <!-- 暂无用户界面列表 -->
            <div v-else class="noUserList">暂无用户界面列表</div>
          </el-scrollbar>
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
        <!-- <el-form-item label="关联设备" prop="">
          <el-input v-model="addPageForm" placeholder="请输入关联设备" />
        </el-form-item>

        <el-form-item label="权限控制" prop="">
          <el-input v-model="addPageForm" placeholder="请输入权限控制" />
        </el-form-item> -->
        <el-form-item label="添加发布页路径" prop="pubPath">
          <el-input v-model="addPageForm.pubPath" placeholder="请输入发布页路径" />
        </el-form-item>
        <el-form-item label="添加流程编辑路径" prop="editPath">
          <el-input v-model="addPageForm.editPath" placeholder="请输入流程编辑路径" />
        </el-form-item>
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
import { useRouter,useRoute } from 'vue-router'
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage, valueEquals, ElMessageBox, } from 'element-plus'
import { useApiAddressStore } from '@/pinia_stores/api_address_store.js'
import { storeToRefs } from 'pinia'
const router = useRouter()
const route = useRoute()

import { request, noderedrequest } from '@/utils/server.js'
// 1.顶部会议室名称/会议室id展示
// debugger
// const titleName = localStorage.getItem('name')
// const roomId = localStorage.getItem('roomId')
const titleName=route.query.roomName
const roomId=route.query.roomID

const getList = () => {
  // 请求用户界面列表
  request
    .post('/IOTRoomCrtl/queryIotRoomClassList', {
      roomID: roomId
    })
    .then((res) => {
      console.log('请求用户界面列表成功', res.data.result)
      tableData.value=res.data.result
      tableData.value.forEach(item=>{
        item.id=item.classID;
        item.children=item.list
        item.children.forEach(itemx=>{
               itemx.id=item.classID +'_'+ itemx.contID
               
        })
      })
    })
    .catch((error) => {
      console.log('请求用户界面列表失败', error)
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
    classID:"",
    className :'',
    roomID: ''
})
// 组件实例 及校验
const createFormRef = ref(null)
// ,max:10 ,min:4
const createFormRules = reactive({
  className: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
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
      request
        .post('/IOTRoomCrtl/saveIOTClassInfo', {
          roomID: roomId,
          className: addForm.className,
        })
        .then((res) => {
          console.log("新增分类成功",res.data);
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
      request
          .post('/IOTRoomCrtl/modifyIOTRoomClass',
              {   
                  "roomID": roomId,
                  'classID':addForm.classID,
                  'className':addForm.className,      
              })
          .then((res) => {
          console.log("修改分类成功",res.data);
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
    addPageForm.classID = row.classID
    addPageForm.contID = ''
    addPageForm.contName = ''
    addPageForm.contType = ''
    addPageForm.editPath = ''
    addPageForm.pubPath= ''

    meetingModifyVisual.value = true
    
    pagetype.value = 'add'

  nextTick(() => {
    createPageFormRef.value.clearValidate()
  })
}
// 新增页面弹框中的 form表单
const addPageForm = reactive({
  "classID": '',
  "contID": '""',
  "contName": '',
  "contType": "",
  "editPath": "",
  "pubPath": ""
})
// 组件实例 及校验
const createPageFormRef = ref(null)
// ,max:10 ,min:4
const createPageFormRules = reactive({
   contName: [{ required: true, message: '请输入页面名称', trigger: 'blur' }],
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
  //校验
  createPageFormRef.value.validate((valid) => {
    if (valid) {
      //发送新增页面请求
      request
          .post('/IOTRoomCrtl/saveIOTConet',
              {
                "classID":addPageForm.classID ,
                "contName": addPageForm.contName,
                "contType": "页面",
                "editPath": addPageForm.editPath,
                "pubPath": addPageForm.pubPath
              })
          .then((res) => {
          // console.log("修改页面成功",res.data);
          meetingModifyVisual.value =false

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
    addPageForm.classID = row.classID
    addPageForm.contID = row.contID
    addPageForm.contName = row.contName
    addPageForm.contType = row.contType
    addPageForm.editPath = row.editPath
    addPageForm.pubPath = row.pubPath
    
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
      // 发修改页面请求
      request
        .post('/IOTRoomCrtl/modifyIOTRMCont', {
          classID: addPageForm.classID,
          contID:addPageForm.contID,
          contName: addPageForm.contName,
          editPath:addPageForm.editPath,
          pubPath: addPageForm.pubPath,
        })
        .then((res) => {
          console.log("修改页面成功",res.data);
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
const showBTNDelete = ref(false)
const deleteList = ref([])
const deleteBtn = () => {
  console.log('selectRows.value', selectRows.value)
  if(selectRows.value.length<=0){
    return  
  }
  ElMessageBox.confirm('确定删除当前选中的分类或页面吗？', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      var idArr=[]
      var idClassArr=[]
      selectRows.value.forEach(item =>{
        if(item.contType){
            idArr.push(item.contID)
        }else if(item.classType){
            idClassArr.push(item.classID)
        }
           
      })
      // 发送删除接口 请求
       

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
const formatDate = (row, column, cellValue, index) => {
  const date = new Date(parseInt(cellValue))
  return date.getMonth() + '月' + date.getDay() + '日 ' + date.getHours() + ':' + date.getMinutes()
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
  .tableBox{
    :deep(.custom-table-head) {
      background-color: #f5f9fc;
    }
    
    a {
      text-decoration: none;
      color: rgb(24, 144, 255);
      font-size: 14px;
      cursor: pointer;
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
  
}
</style>
