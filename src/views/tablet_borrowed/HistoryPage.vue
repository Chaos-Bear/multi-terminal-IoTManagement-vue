<template>
  <div class="history">
    <!-- 2.查询 -->
    <div class="searchInfo">
      <el-form :model="form">
        <el-form-item label="借用时间">
          <!--value-format设置成我们想要的时间格式就可以了，比如：value-format=“yyyy-MM-dd HH:mm:ss”； -->
          <!-- v-model中的值，对应两个值，一个开始时间，一个结束时间，以数组的形式存在 -->
          <!-- :disabled-date="disabledDate"  时间选择禁用-->
          <el-date-picker
            v-model="value1"
            popper-class="dzy_datePickers"
            type="datetimerange"
            range-separator="～"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY.MM.DD HH:mm"
            value-format="YYYY-MM-DD HH:mm:ss"
            prefix-icon="false"
            :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)]"
          />
        </el-form-item>

        <el-form-item label="借用人">
          <el-input v-model="userNameValue" placeholder="请输入借用人" />
        </el-form-item>

        <el-form-item label="借用状态">
          <el-select v-model="borrowedStatusValue" placeholder="全部" popper-class="zdy_select">
            <el-option
              v-for="item in borrowedStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="searchbtn">
        <el-button type="primary" @click="searchbtn()">查询</el-button>
        <el-button @click="resetbtn()">重置</el-button>
      </div>
    </div>
    <!-- 3.设备列表 -->
    <div class="deviceList">
      <!-- 此处设置了滚动条组件 -->
      <!-- <el-scrollbar style="width: 100%" @scroll="handleScroll" ref="scrollBarRef"> -->
      <!-- 3.2 设备列表-->
      <!-- <div ref="tableRef"> -->
      <el-table
        :data="tableData"
        style="width: 100%; height: 400px"
        :header-cell-style="{ background: '#F5F9FC' }"
        v-el-table-infinite-scroll="getList"
        :infinite-scroll-disabled="disabled"
      >
        <el-table-column fixed type="index" min-width="5%" label="序号" />
        <el-table-column prop="meetName" label="会议名称" min-width="38%">
          <template #default="scope">
            {{ scope.row.meetName ? scope.row.meetName : '无会议名称' }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="借用人" min-width="8%" />
        <el-table-column prop="borrowNum" label="借用数量" min-width="9%">
          <template #default="scope">
            {{ scope.row.borrowNum }}
          </template>
        </el-table-column>
        <el-table-column prop="borrowTime" label="借用时间" min-width="12%">
          <template #default="scope">
            <!-- 显示年月日 2023-8-23 -->
            {{ scope.row.borrowTime ? scope.row.borrowTime.split(' ')[0] : 0 }}
          </template>
        </el-table-column>
        <el-table-column prop="returnNum" label="归还数量" min-width="9%">
          <template #default="scope">
            <!-- 未归还时，归还数量默认为0-->
            {{ scope.row.returnNum ? scope.row.returnNum : 0 }}
          </template>
        </el-table-column>
        <el-table-column prop="returnTime" label="归还时间" min-width="12%">
          <template #default="scope">
            <!-- 显示年月日 2023-8-23 -->
            {{ scope.row.returnTime ? scope.row.returnTime.split(' ')[0] : '---' }}
          </template>
        </el-table-column>
        <el-table-column prop="borrowedStatus" label="状态" min-width="8%">
          <template #default="scope">
            {{ scope.row.borrowedStatus }}
          </template>
          <!--此处声明了一个getDayStateStr()方法，将接口返回的状态号，映射成对应得状态文字  -->
          <!-- <template #default="scope">
                {{getDayStateStr(scope.row.borrowedStatus)}}
              </template>  -->
        </el-table-column>
      </el-table>
      <!-- </div> -->
      <!-- </el-scrollbar> -->
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import {} from 'vue-router'
import {} from 'element-plus'

import { tabletRequest } from '@/utils/server.js'

// table列表下拉刷新
import { default as vElTableInfiniteScroll } from 'el-table-infinite-scroll'

// startTime及endTime 初始化默认值(每月1日-31日)
var currentTime = new Date()
var ty = currentTime.getFullYear()
// var tm=currentTime.getMonth()+1
var tm =
  currentTime.getMonth() + 1 <= 9 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1

var startTime1 = ty + '-' + tm + '-01' + ' 00:00:00'
var endTime1
if (tm == 1 || tm == 3 || tm == 5 || tm == 7 || tm == 8 || tm == 10 || tm == 12) {
  endTime1 = ty + '-' + tm + '-31' + ' 23:59:59'
} else if (tm == 2) {
  endTime1 = ty + '-' + tm + '-28' + ' 23:59:59'
} else {
  endTime1 = ty + '-' + tm + '-30' + ' 23:59:59'
}

const disabled = ref(false)
const locked = ref(false)
// ----获取初始化历史记录接口--------------表格滚动到底刷新刷新
const getList = () => {
  if (locked.value) {
    return
  }
  locked.value = true
  if (disabled.value) {
    return
  }
  console.log('3333333333333333333333333333333', disabled.value)
  form.pageNum++

  tabletRequest
    .post('/IotDeviHisCrtl/queryBorrowInfoPage', form)
    .then((response) => {
      console.log('历史记录按条件查询成功:', response.data)
      // debugger
      form.totalPage = response.data.totalPage
      form.totalRecord = response.data.totalRecord
      // debugger
      if (tableData.value.length <= form.totalRecord) {
        tableData.value.push(...response.data.data)
      }
      // debugger
      if (tableData.value.length == form.totalRecord) {
        disabled.value = true
      }
    })
    .catch((error) => {
      console.log('历史记录按条件查询失败:', error)
      if (form.pageNum <= 0) {
        return
      } else {
        form.pageNum--
      }
    })
    .finally(() => {
      locked.value = false
    })
}
// --------查询/重置接口--------
const getList1 = () => {
  // debugger
  form.pageNum = 0
  tableData.value = []
  disabled.value = false

  getList()
}
//2.按要求查询
//借用时间
const value1 = ref('')
const userNameValue = ref('')
const borrowedStatusValue = ref('')

const form = reactive({
  startTime: startTime1,
  endTime: endTime1,
  userName: '',
  borrowedStatus: '',

  pageNum: 0, //必填   第几页
  pageSize: 30, //必填  /条每页

  totalPage: 0, //必填 总页数
  totalRecord: 0 //总条数
})

// 借用状态
const borrowedStatusOptions = [
  {
    value: '',
    label: '全部'
  },
  {
    value: '1',
    label: '待借用'
  },
  {
    value: '2',
    label: '借用中'
  },
  {
    value: '3',
    label: '完结'
  },
  {
    value: '4',
    label: '异常'
  },
  {
    value: '5',
    label: '取消'
  }
]
// const getDayStateStr=(v)=>{
//   let a
//   for(var i=0;i<borrowedStatusOptions.length;i++){
//      if(v==borrowedStatusOptions[i].value){
//         a= borrowedStatusOptions[i].label;
//         break
//      }
//   }
//   return a
// }
// 查询按钮
const searchbtn = () => {
  // debugger
  form.pageNum = 1
  form.pageSize = 30
  form.userName = userNameValue.value
  form.borrowedStatus = borrowedStatusValue.value
  if (value1.value == '') {
    form.startTime = startTime1
    form.endTime = endTime1
  } else {
    form.startTime = value1.value[0]
    form.endTime = value1.value[1]
  }
  // debugger
  // 调用查询/重置接口
  getList1()
}
// 今天及今天之后的日期禁用
// const disabledDate=(time)=> {
//   return time.getTime() > Date.now()- 8.64e7;
// }
// 重置按钮
const resetbtn = () => {
  form.startTime = startTime1
  form.endTime = endTime1
  // 重置 时分别清空输入框的 借用时间 借用人 借用状态,并重新调用历史列表
  value1.value = ''
  userNameValue.value = ''
  borrowedStatusValue.value = ''
  form.userName = ''
  form.borrowedStatus = ''
  form.pageNum = 1
  form.pageSize = 30
  // debugger
  // 调用查询/重置接口
  getList1()
}

//3 设备信息
// 3.2设备列表
const tableData = ref([
  // {borrowNum: 1,
  // borrowTime: "2023-10-24 11:00:00",
  // borrowedStatus: "待借用",
  // endTime: null,
  // meetID: null,
  // meetName: "10.24-223-11:00-14:00第1次测试会议",
  // returnNum: 0,
  // returnTime: null,
  // roomID: null,
  // roomName: "A2-223",
  // startTime: null,
  // userName: "益伟康",
  // verifyCode: "2960"
  // }
])

//初始化渲染
onMounted(() => {})
</script>
<style lang="less">
.el-popper.dzy_datePickers {
  border: 0px !important ;

  .el-popper__arrow {
    display: none !important;
  }

  .el-date-table td.disabled .el-date-table-cell {
    background-color: transparent;
  }
  .el-date-table th {
    border-color: rgba(235, 238, 245, 0.3);
  }

  .el-picker-panel {
    background: #05456e !important;
  }

  .el-input__wrapper {
    background: #05456e !important;
    border: 1px solid rgba(235, 238, 245, 0.3) !important;
  }
  .el-date-range-picker__time-header {
    border-bottom: 1px solid rgba(235, 238, 245, 0.3) !important;
  }
  .el-picker-panel__footer {
    background-color: #05456e !important;
    border-top: 1px solid rgba(235, 238, 245, 0.3) !important;
  }
  .el-date-range-picker__content.is-left {
    border-right: 1px solid rgba(235, 238, 245, 0.3) !important;
  }
  .el-input--small .el-input__inner {
    &::-webkit-input-placeholder {
      color: #fff;
    }
    &:-moz-placeholder {
      color: #fff;
    }
    &::-moz-placeholder {
      color: #fff;
    }
    &:-ms-input-placeholder {
      color: #fff;
    }
  }
  .el-picker-panel {
    color: #ffffff;
  }
  .el-date-table td.in-range .el-date-table-cell {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

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
  .el-input__inner {
    color: #fff;
  }
}
</style>
<style lang="less" scoped>
.history {
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
          // margin-bottom: (8/1080)*100vh;
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
      .el-form-item:nth-child(1) {
        //  width: (414/1920)*100vw;
        width: (550/1920) * 100vw;
      }
    }
    :deep(.el-date-editor) {
      .el-range-input,
      .el-range-separator {
        color: rgba(255, 255, 255, 0.9);
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
        line-height: (50/1080) * 100vh;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        background-color: transparent;
        font-size: (20/1920) * 100vw;
        text-align: center;
        border: 1px solid rgba(15, 204, 249, 1);
        font-family: Roboto;
      }
      .el-button:nth-child(1) {
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
    height: calc(100vh - (300 / 1080) * 100vh);

    .scrollbar-flex-content {
      display: flex;
    }
    // 编辑/删除按钮
    .addbtn,
    .deletebtn {
      margin-bottom: (16/1080) * 100vh;
      width: (80/1920) * 100vw;
      height: (32/1080) * 100vh;
      line-height: (20/1080) * 100vh;
      margin-right: (8/1080) * 100vh;
      border-radius: 2px;
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

    //3.2设备列表
    :deep(.el-table) {
      height: (800/1080) * 100vh !important;
      background-color: transparent;
      font-size: (18/1920) * 100vw;
      color: rgba(255, 255, 255, 1);
      font-family: Roboto;
      border: 1px solid transparent;

      .el-table__inner-wrapper {
        height: (800/1080) * 100vh !important;
        // height:auto;
        .el-select {
          .el-input {
          }
          .el-input__wrapper {
            height: (44/1080) * 100vh;
            border-radius: 0px;
            padding: 0;
            background-color: transparent;
            box-shadow: none !important;
            .el-input__inner {
              color: rgba(255, 255, 255, 1) !important;
              font-size: (18/1920) * 100vw;
            }
          }
        }
        tr {
          background-color: transparent !important;
          td,
          th {
            background-color: transparent !important;
          }
        }
        .el-table__cell {
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
            height: (44/1080) * 100vh;

            .el-button {
              color: rgba(24, 144, 255, 1);
              font-size: (14/1920) * 100vw;
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
              height: (44/1080) * 100vh;
              line-height: (44/1080) * 100vh;
              white-space: nowrap;
              background-color: rgba(24, 144, 255, 0.1);
              margin-right: (10/1920) * 100vw;
            }
            .cell:has(.isRequset) {
              height: 1px;
              background-color: transparent;
            }
          }
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
}
</style>
