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
        <div>
          <!-- 2. 用户界面列表 -->
          <el-table
            :data="tableData"
            style="width: 100%; margin-bottom: 20px"
            row-key="id"
            default-expand-all
            :header-cell-style="{ background: '#F5F9FC' }"
            @selection-change="selectionChange"
          >
            <el-table-column type="selection" width="30" :reserve-selection="true" />
            <el-table-column prop="classificationName" label="名称">
              <template #default="scope">
                <template v-if="scope.row.type == 1">
                  {{ scope.row.classificationName }}
                </template>
                <template v-if="scope.row.type == 2">
                  <a :href="scope.row.publishPath" target="_blank">{{
                    scope.row.childficationName
                  }}</a>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="associatedDevice" label="关联设备" />

            <el-table-column prop="updateTime" label="更新时间" :formatter="formatDate" />
            <el-table-column prop="categoryOrPage" label="类型" />
            <el-table-column prop="num" label="数量">
              <template #default="scope">
                <template v-if="scope.row.type == 1">
                  {{ scope.row.children.length }}个tab
                </template>
                <template v-if="scope.row.type == 2"> - </template>
              </template>
            </el-table-column>
            <el-table-column prop="auth" label="权限控制" />
            <el-table-column label="操作">
              <template #default="scope">
                <template v-if="scope.row.type == 1">
                  <span
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    @click="handleEdit(scope.row)"
                    >修改&nbsp;&nbsp;</span
                  >

                  <span
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    @click="addPageBtn(scope.row)"
                    >新增页面</span
                  >
                </template>
                <template v-if="scope.row.type == 2">
                  <span
                    style="color: #1890ff; font-size: 14px; cursor: pointer"
                    @click="handlePageEdit(scope.row)"
                    >修改&nbsp;&nbsp;</span
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
        <el-form-item label="分类名称" prop="classificationName">
          <el-input v-model="addForm.classificationName" placeholder="请输入分类名称" />
        </el-form-item>

        <el-form-item label="权限控制" prop="auth">
          <el-select v-model="addForm.auth" multiple placeholder="选择角色" style="width: 100%">
            <!-- <template > -->
            <el-option v-for="item in authArr" :key="item.id" :label="item.role" :value="item.id" />
            <!-- </template> -->
          </el-select>
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

    <!--1.2 修改/ 修改 页面 -->
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
        <el-form-item label="页面名称" prop="classificationName">
          <el-input v-model="addPageForm.classificationName" placeholder="请输入页面名称" />
        </el-form-item>
        <el-form-item label="关联设备" prop="associatedDevice">
          <el-input v-model="addPageForm.associatedDevice" placeholder="请输入关联设备" />
        </el-form-item>

        <el-form-item label="权限控制" prop="auth">
          <el-input v-model="addPageForm.auth" placeholder="请输入权限控制" />
        </el-form-item>
        <el-form-item label="添加发布页路径" prop="publishPath">
          <el-input v-model="addPageForm.publishPath" placeholder="请输入发布页路径" />
        </el-form-item>
        <el-form-item label="添加流程编辑路径" prop="processEditPath">
          <el-input v-model="addPageForm.processEditPath" placeholder="请输入流程编辑路径" />
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
import { useRouter } from 'vue-router'
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

import { request, noderedrequest } from '@/utils/server.js'
// 1.顶部会议室名称/会议室id展示
// debugger
const titleName = localStorage.getItem('name')
const roomId = localStorage.getItem('roomId')

const getList = () => {
  // 请求用户界面列表
  request
    .post('/IOTRoomCrtl/queryIotRoomClassList', {
      roomID: roomId
    })
    .then((res) => {
      console.log('请求用户界面列表成功', res.data)
      tableData.value.push(res.data.result)
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
  addForm.classificationName = ''
  addForm.auth = ''
  meetingCategoryVisual.value = true
  type.value = 'add'

  nextTick(() => {
    createFormRef.value.clearValidate()
  })
}
class UserObj {
  id = ''
  classificationName = ''
  auth = ''
  // 包含页面字段
  // includePage=""
  // associatedDevice = '';
  // updateTime="";
  // categoryOrPage="";
  // num="";
  // operation = "";
  // type="1";
}
// 新增分类弹框中的 form表单
const addForm = reactive(new UserObj())
// 组件实例 及校验
const createFormRef = ref(null)
// ,max:10 ,min:4
const createFormRules = reactive({
  classificationName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  auth: [{ required: true, message: '请选择角色', trigger: 'blur' }]
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
      // 发新增请求
      request
        .post('/  ', {
          classificationName: addForm.classificationName,
          auth: addForm.auth
        })
        .then((res) => {
          // console.log("新增分类成功",res.data);
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
      // 发修改分类请求
      // request
      //     .post('/  ',
      //         {
      //             id :addForm.id,
      //             classificationName:addForm.classificationName,
      //             auth : addForm.auth,
      //         })
      //     .then((res) => {
      //     // console.log("修改分类成功",res.data);
      //      meetingCategoryVisual.value = false
      //      // 查询请求
      //       getList()
      //     })
      //     .catch((error) => {
      //     console.log('楼层及地点列表获取失败', error)
      //     })
    } else {
      console.log('校验错误')
    }
  })
}
// 3.1  ---修改分类按钮
const handleEdit = (row) => {
  addForm.id = row.id
  addForm.classificationName = row.classificationName
  addForm.auth = row.auth

  type.value = 'update'
  meetingCategoryVisual.value = true

  nextTick(() => {
    createFormRef.value.clearValidate()
  })
}
const meetingModifyVisual = ref(false)

// ---3. 新增/修改 页面
const pagetype = ref('add')
const addPageBtn = () => {
  ;(addPageForm.id = ''),
    (addPageForm.classificationName = ''),
    (addPageForm.associatedDevice = ''),
    (addPageForm.auth = ''),
    (addPageForm.publishPath = ''),
    (addPageForm.processEditPath = ''),
    (meetingModifyVisual.value = true)
  pagetype.value = 'add'

  nextTick(() => {
    createPageFormRef.value.clearValidate()
  })
}
// 新增页面弹框中的 form表单
const addPageForm = reactive({
  id: '',
  childficationName: '',
  associatedDevice: '',
  auth: '',
  publishPath: '',
  processEditPath: ''
  // 包含页面字段
  // includePage=""
  // associatedDevice = '';
  // updateTime="";
  // categoryOrPage="";
  // num="";
  // operation = "";
  // type="1";
})
// 组件实例 及校验
const createPageFormRef = ref(null)
// ,max:10 ,min:4
const createPageFormRules = reactive({
  classificationName: [{ required: true, message: '请输入页面名称', trigger: 'blur' }]
  //   auth: [{ required: true, message: '请选择角色', trigger: 'blur' }],
  //   associatedDevice:[{ required: true, message: '请选择关联设备', trigger: 'blur' }],
  //   publishPath:[{ required: true, message: '请输入发布页路径', trigger: 'blur' }],
  //   processEditPath:[{ required: true, message: '请输入流程编辑页路径', trigger: 'blur' }],
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
      // 发新增请求
      // request
      //     .post('/  ',
      //         {
      //             id :addPageForm.id,
      //             classificationName:addPageForm.classificationName,
      //             associatedDevice:addPageForm.associatedDevice,
      //             auth : addPageForm.auth,
      //             publishPath:addPageForm.publishPath,
      //             processEditPath:addPageForm.processEditPath,
      //         })
      //     .then((res) => {
      //     // console.log("修改页面成功",res.data);
      console.log(addPageForm)
      //    tableData.children.push(addPageForm)
      //     meetingModifyVisual.value =false

      //      // 查询请求
      //       getList()
      //     })
      //     .catch((error) => {
      //     console.log('修改页面失败', error)
      //     })
    } else {
      console.log('校验错误')
    }
  })
}

// 2.2 修改页面
// 3.1  ---修改页面按钮
const handlePageEdit = (row) => {
  // debugger
  addPageForm.id = row.id
  ;(addPageForm.childficationName = row.childficationName),
    (addPageForm.associatedDevice = row.associatedDevice),
    (addPageForm.auth = row.auth),
    (addPageForm.publishPath = row.publishPath),
    (addPageForm.processEditPath = row.processEditPath),
    (pagetype.value = 'update')
  meetingModifyVisual.value = true

  nextTick(() => {
    createFormRef.value.clearValidate()
  })
}

const updateMeetingPage = () => {
  //校验
  createPageFormRef.value.validate((valid) => {
    if (valid) {
      // 发修改分类请求
      request
        .post('/  ', {
          id: addPageForm.id,
          classificationName: addPageForm.classificationName,
          auth: addPageForm.auth
        })
        .then((res) => {
          // console.log("修改页面成功",res.data);
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
  // 发请求  删除接口
}

// 3. 用户列表展示
const tableData = ref([
  // {
  //   id: 2,
  //   classificationName: '信息发布',
  //   associatedDevice: '',
  //   updateTime: '',
  //   categoryOrPage: '分类',
  //   auth: '',
  //   type: 1,
  //   children: [
  //     {
  //       id: 22,
  //       childficationName: ' 信息发布控制页面',
  //       associatedDevice: '',
  //       updateTime: '',
  //       categoryOrPage: '页面',
  //       auth: '',
  //       publishPath: 'http://10.31.0.101:1880/A2-227/',
  //       processEditPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //       type: 2
  //     },
  //     {
  //       id: 22,
  //       childficationName: ' 信息发布页面',
  //       associatedDevice: '信息发布屏',
  //       updateTime: '',
  //       categoryOrPage: '页面',
  //       auth: '',
  //       publishPath: 'http://10.31.0.101:1880/ui/#!/2?socketid=1y_-U_HB66ieufZxAAB9',
  //       processEditPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //       type: 2
  //     },
  //     {
  //       id: 22,
  //       childficationName: ' 设备控制页面',
  //       associatedDevice: '设备控制',
  //       updateTime: '',
  //       categoryOrPage: '页面',
  //       auth: '',
  //       publishPath: 'https://172.27.35.3:1880/#flow/7668578d5ada24c3',
  //       processEditPath: 'https://172.27.35.3:1880/ui/#!/20?socketid=P1VvgoGe1cj4mJ0kAACx',
  //       type: 2
  //     }
  //   ]
  // },
  // {
  //   classID: '3000001336943648',
  //   className: '信息发布',
  //   classType: '分类',
  //   list: [
  //     {
  //       classID: '3000001336943648',
  //       contID: '3000001161688196',
  //       contName: '设置页面',
  //       contType: '页面',
  //       editPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //       pubPath: 'http://10.31.0.101:1880/A2-227/',
  //       updateTime: '2023-09-10 16:48:09'
  //     },
  //     {
  //       classID: '3000001336943648',
  //       contID: '3000001161688196',
  //       contName: '设置页面',
  //       contType: '页面',
  //       editPath: 'http://10.31.0.101:1880/#flow/52c3354996b6a408',
  //       pubPath: 'http://10.31.0.101:1880/A2-227/',
  //       updateTime: '2023-09-10 16:48:09'
  //     }
  //   ]
  // }
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
  :deep(.custom-table-head) {
    background-color: #f5f9fc;
  }

  a {
    text-decoration: none;
    color: rgb(24, 144, 255);
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
