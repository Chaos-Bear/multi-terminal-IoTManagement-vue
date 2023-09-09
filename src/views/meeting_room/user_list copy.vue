<template>
    <div style="margin: 0 auto;">
        <el-container>
            <el-header style="height: 90px;">
                <b>
                    <span style="font-size: 24px;font-family: SourceHanSansSC-medium;color: rgba(51, 51, 51, 1);">
                    {{ titleName }}
                    </span>
                </b>
                <el-button style="float: right;margin-left: 10px;" @click="toRouter('/home')">返回</el-button>
                <el-button type="primary" style="float: right;" @click="materialManage">素材管理</el-button>
                <el-divider style="margin: 10px 0;"/>
                <el-button type="primary" @click="meetingCategoryVisual = true">
                    新增
                </el-button>
                <el-button type="danger"  :icon="Delete">
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
                            @selection-change="handleSelectionChange"
                    >
                        <el-table-column type="selection" width="30"/>
                        <el-table-column prop="name" label="名称">
                            <template #default="scope">
                                <template v-if="scope.row.type === 'page'">
                                <span style="color: #1890FF;font-size: 14px;cursor: pointer;"
                                      @click="publishPage(scope.$index, scope.row)">
                                    {{ scope.row.name }}
                                </span>
                                </template>
                                <template v-else>
                                    {{ scope.row.name }}
                                </template>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注">
                            <template #default="scope">
                                <el-input @change="rowTableChange(scope.$index, scope.row)"
                                          v-model="scope.row.description"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="auth" label="关联设备"/>

                        <el-table-column prop="updateTime" label="更新时间" :formatter="formatDate"/>
                        <el-table-column prop="auth" label="类型"/>
                        <el-table-column prop="auth" label="数量"/>
                        <el-table-column prop="auth" label="权限管理"/>

                        <el-table-column prop="auth" label="权限管理"/>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <span style="color: #1890FF;font-size: 14px;cursor: pointer;"
                                      @click="handleEdit(scope.$index, scope.row)">
                                    {{ scope.row.type === 'page' ? '编辑' : '修改' }}
                                </span>
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
            <el-form-item label="页面名称" prop="name">
                <el-input v-model="addForm.name"/>
            </el-form-item>
            <el-form-item label="备注" prop="description">
                <el-input v-model="addForm.description"/>
            </el-form-item>
            <el-form-item label="所属分类" prop="category">
                <el-select
                        v-model="addForm.category"
                        multiple
                        @change="addSelectPage"
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
                <el-input v-model="addForm.auth"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addMeetingCategory">确 定</el-button>
                <el-button @click="meetingCategoryVisual = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <!-- 修改分类 -->
    <!-- <el-dialog
            title="修改分类"
            v-model="meetingModifyVisual"
            @before-close="modifyClose"
            destroy-on-close
            style="width: 400px;"
    >
        <el-form :model="formModify" label-width="100px">
            <el-form-item label="页面名称" prop="name">
                <el-input v-model="formModify.name"/>
            </el-form-item>
            <el-form-item label="备注" prop="description">
                <el-input v-model="formModify.description"/>
            </el-form-item>
            <el-form-item label="所属分类" prop="category">
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
    </el-dialog> -->
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

// 1.顶部会议室名称展示
const titleName = localStorage.getItem('name')

// 2.新增按钮/删除按钮
// 新增弹框展示
const meetingCategoryVisual = ref(false)
class UserObj {
    id = ''
    name = ''
    description = ''
    roomId = localStorage.getItem('roomId')
    category = []
    categoryData = []
    auth = ''
}
// 新增页面弹框中的 form表单
const addForm = reactive(new UserObj())

// 新增弹框汇中 添加多个页面列表
const categoryArr = ref([])
const addMeetingCategory=() => {
    //收集信息，发送请求 ，并重新渲染列表页面
   meetingCategoryVisual.value = false
   
}
// 3. 用户列表展示
const tableData = ref([
    {
    id : '',
    name : "信息发布",
    description :'',
    roomId :localStorage.getItem('roomId'),
    category : [],
    categoryData : [],
    auth : '',
    }
])

// const {
//     meetingCategory: meetingCategoryApi,
//     meetingPage: meetingPageApi,
// } = storeToRefs(useApiAddressStore())


// const meetingModifyVisual = ref(false)
// const router = useRouter()



// const showBTNDelete = ref(true)
// const deleteData = reactive([])
// const toRouter = (path, param) => {
//     if (path) {
//         router.push({
//             path: path
//         })
//     }
// }



// const formModify = reactive(new UserObj())
// const addSelectPage = (val) => {
//     addForm.categoryData = []
//     val.forEach((value) => {
//         categoryArr.value.forEach((value2) => {
//             if (value2.id === value) {
//                 addForm.categoryData.push({id: value, name: value2.name})
//             }
//         })
//     })
// }

// const modifySelectPage = (val) => {
//     formModify.categoryData = []
//     val.forEach((value) => {
//         categoryArr.value.forEach((value2) => {
//             if (value2.id === value) {
//                 formModify.categoryData.push({id: value, name: value2.name})
//             }
//         })
//     })
// }



// const modifyClose = (done) => {
//     formModify.value = new UserObj()
//     done()
// }

// // const modifyCategory = async () => {
// //     await useApiAddressStore().post(meetingCategoryApi.value.updateCategory, formModify, (res) => {
// //         loadPageData()
// //         meetingModifyVisual.value = false
// //     }, null)
// // }

// // const deleteList = async () => {
// //     await useApiAddressStore().post(meetingCategoryApi.value.delete, {idArr: [...deleteData.value]}, (res) => {
// //         loadPageData()
// //     }, null)
// // }

// // const rowTableChange = async (index, row) => {
// //     await useApiAddressStore().post(meetingCategoryApi.value.modify, {
// //         id: row.id,
// //         description: row.description,
// //         auth: row.auth
// //     }, (res) => {
// //         loadPageData()
// //     }, {
// //         needTip: false
// //     })
// // }
const handleSelectionChange = (val) => {
    deleteData.value = []
    val.forEach((val) => {
        deleteData.value.push(val.id)
    })
    deleteData.value.length > 0 ? showBTNDelete.value = false : showBTNDelete.value = true
}
// const handleEdit = (index, row) => {
//     if (row.type === 'page') {
//         toRouter('/pageEditor')
//     } else if (row.type === 'category') {
//         const category = []
//         const categoryData = []
//         row.children.forEach((value) => {
//             category.push(value.pageId)
//             categoryData.push({id: value.id, pageId: value.pageId})
//         })
//         Object.assign(formModify, {
//             id: row.id,
//             name: row.name,
//             description: row.description,
//             roomId: row.roomId,
//             category: category,
//             categoryData: categoryData,
//             auth: row.auth,
//         })
//         console.log(formModify);
//         meetingModifyVisual.value = true
//     }
// }

// await useApiAddressStore().get(meetingPageApi.value + '/' + localStorage.getItem('roomId'), (res) => {
//     console.log(categoryArr);
//     categoryArr.value = res.data.items
// })

// const loadPageData = async () =>
//     if (!localStorage.getItem('roomId') || localStorage.getItem('roomId') === '') {
//         toRouter('/home', '')
//     }
//     await useApiAddressStore().get(meetingCategoryApi.value.base + '/' + localStorage.getItem('roomId'), (res) => {
//         tableData.value = res.data;
//     })
// }
// const materialManage = () => {
//     console.log('暂未实现');
//     ElMessage({
//         message: '暂未实现',
//         type: 'warning',
//     })
// }
// const publishPage = (index, row) => {
//     console.log(index, row);
//     window.open(window.location.origin + '/page/index.html?pageId=' + row.pageId)
// }
const formatDate = (row, column, cellValue, index) => {
    const date = new Date(parseInt(cellValue))
    return date.getMonth() + '月' + date.getDay() + '日 ' + date.getHours() + ':' + date.getMinutes()
}
// loadPageData()
</script>

<style scoped>
:deep(.custom-table-head) {
    background-color: #F5F9FC;
}
</style>