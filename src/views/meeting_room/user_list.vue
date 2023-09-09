<template>
    <div style="margin: 0 auto;">
        <el-container>
            <el-header style="height: 90px;">
                <b>
                    <span style="font-size: 24px;font-family: SourceHanSansSC-medium;color: rgba(51, 51, 51, 1);">
                    {{ titleName }}
                    </span>
                </b>
                <el-button style="float: right;margin-left: 10px;" @click="router.push('/')">返回</el-button>
                <el-divider style="margin: 10px 0;"/>
                <el-button type="primary" @click="meetingCategoryVisual = true">
                    新增
                </el-button>
                <el-button type="danger"  :disabled="showBTNDelete" @click="deleteList">
                    删除
                </el-button>
                <!-- <template v-if="tableData.length === 0">
                    <el-button type="primary">
                        新增发布页面
                    </el-button>
                </template> -->
            </el-header>
            <el-main>
                <div>
                    <el-table
                            :data="tableData"
                            style="width: 100%; margin-bottom: 20px"
                            row-key="id"
                            default-expand-all
                            :header-cell-style="{background: '#F5F9FC'}"
                            @selection-change="selectionChange"
                    >
                        <el-table-column type="selection" width="30" :reserve-selection="true"/>
                        <el-table-column prop="classificationName" label="名称">
                        </el-table-column>
                        <el-table-column prop="associatedDevice" label="关联设备"/>

                        <el-table-column prop="updateTime" label="更新时间" :formatter="formatDate"/>
                        <el-table-column prop="categoryOrPage" label="类型"/>
                        <el-table-column prop="num" label="数量"/>
                        <el-table-column prop="auth" label="权限控制"/>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <span v-if="scope.row.type==1" style="color: #1890FF;font-size: 14px;cursor: pointer;" @click="handleEdit( scope.row)">
                                   修改
                                </span>
                                <a v-if="scope.row.type==2" style="color: #1890FF;font-size: 14px;cursor: pointer;"  href="" target="_blank">
                                   编辑
                                </a>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    <!-- 新增页面弹框 -->
    <el-dialog
            title="新增页面"
            v-model="meetingCategoryVisual"
            style="width: 400px;"
    >
        <el-form :model="addForm" label-width="100px">
            <el-form-item label="分类名称" prop="classificationName">
                <el-input v-model="addForm.classificationName"/>
            </el-form-item>
            <el-form-item label="关联设备" prop="associatedDevice">
                <el-input v-model="addForm.associatedDevice"/>
            </el-form-item>
            <el-form-item label="包含页面" prop="includePage">
                <el-select
                        v-model="addForm.includePage"
                        multiple
                        @change="addSelectPage"
                        placeholder="选择多个页面"
                        style="width: 100%"
                        multiline
                >
                    <template v-if="categoryArr.length > 0">
                        <el-option
                                v-for="item in categoryArr"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        />
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="权限控制" prop="auth">
                <el-input v-model="addForm.auth"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addMeetingCategory">确 定</el-button>
                <el-button @click="meetingCategoryVisual = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 修改分类 -->
    <el-dialog
            title="修改分类"
            v-model="meetingModifyVisual"
            @before-close="modifyClose"
            destroy-on-close
            style="width: 400px;"
    >
        <el-form :model="formModify" label-width="100px">
            <el-form-item label="分类名称" prop="classificationName">
                <el-input v-model="formModify.classificationName"/>
            </el-form-item>
            <el-form-item label="关联设备" prop="associatedDevice">
                <el-input v-model="addForm.associatedDevice"/>
            </el-form-item>
            <el-form-item label="包含页面" prop="includePage">
                <el-select
                        v-model="formModify.category"
                        multiple
                        @change="modifySelectPage"
                        placeholder="选择多个页面"
                        style="width: 100%"
                >
                    <template v-if="categoryArr.length > 0">
                        <el-option
                                v-for="item in categoryArr"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        />
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="权限控制" prop="auth">
                <el-input v-model="formModify.auth"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="modifyCategory">确 定</el-button>
                <el-button @click="meetingModifyVisual = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {
    Delete,
} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {useApiAddressStore} from "@/pinia_stores/api_address_store.js";
import {storeToRefs} from "pinia";
const router=useRouter();

// 1.顶部会议室名称展示
// debugger
const titleName = localStorage.getItem('name')

// 2.新增按钮/删除按钮
// 2.1新增弹框展示
const meetingCategoryVisual = ref(false)
class UserObj {
    id = '';
    classificationName = '';
    // 包含页面字段
    includePage=""
    associatedDevice = '';
    updateTime="";
    categoryOrPage="";
    num="";
    auth = '';
    operation = "";
    type="1";
}
// 新增页面弹框中的 form表单
const addForm = reactive(new UserObj())

// 新增弹框汇中 添加多个页面列表
const categoryArr = ref(["1","2"])

const addMeetingCategory=() => {
    //收集信息，发送请求 ，并重新渲染列表页面
    // addForm.name
    // addForm.roomId
    // category
    // auth

    tableData.value.push(addForm)
    meetingCategoryVisual.value = false
   
}
//   ----??? 关联页面字段--没有数据来源  权限--没有数据来源
// 2.2 删除
const showBTNDelete = ref(true)
const deleteList =() => {
    console.log("selectRows.value",selectRows.value)
    // 发请求  删除接口

}

// 3. 用户列表展示
const tableData= ref([
  {
    id: 1,
    classificationName: '大屏展示',
    associatedDevice : '',
    updateTime:"",
    categoryOrPage:"分类",
    auth : '',
    type:1,

    children: [
      {
        id: 11,
        classificationName: ' 312有主席台样式-领导',
        associatedDevice : '华为',
        updateTime:"",
        categoryOrPage:"页面",
        auth : '',
        type:2,
      },
    ]
  },
  {
    id: 2,
    classificationName: '大屏展示',
    associatedDevice : '',
    updateTime:"",
    categoryOrPage:"分类",
    auth : '',
    "type":1,
    children: [
      {
        id: 22,
        classificationName: ' 设置页面',
        associatedDevice : '华为',
        updateTime:"",
        categoryOrPage:"页面",
        auth : '',
        "type":2,
      },
      {
        id: 23,
        classificationName: ' 展示页面',
        associatedDevice : '华为',
        updateTime:"",
        categoryOrPage:"页面",
        auth : '',
        "type":2,
      },
    ],
  },
]);
// 跨页勾选
var selectRows=ref([]);
const selectionChange = (selection) => {
  selectRows.value = selection;
  console.log("33333333333333",selection)
};
// 更新时间
const formatDate = (row, column, cellValue, index) => {
    const date = new Date(parseInt(cellValue))
    return date.getMonth() + '月' + date.getDay() + '日 ' + date.getHours() + ':' + date.getMinutes()
}

// 3.1分类  ---修改按钮
const handleEdit = (row) => {
    // 
    meetingModifyVisual.value=true;
}
const meetingModifyVisual = ref(false);
const formModify = reactive(new UserObj())
const addSelectPage = (val) => {
    addForm.categoryData = []
    val.forEach((value) => {
        categoryArr.value.forEach((value2) => {
            if (value2.id === value) {
                addForm.categoryData.push({id: value, name: value2.name})
            }
        })
    })
}



</script>

<style scoped>
:deep(.custom-table-head) {
    background-color: #F5F9FC;
}
</style>