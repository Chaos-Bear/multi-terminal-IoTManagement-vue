<template>
  <!-- 平板借还首页 -->
  <div class="tabletBorrowed">
    <!-- 此处设置了滚动条组件 -->
    <el-scrollbar>
      <div class="tabletBorrowed-inner">
        <!-- 1.左区 -->
        <div class="borrowandmenu">
          <!-- 当日借用信息 -->
          <div class="dayBorrowinfo">
            <!-- 标题 -->
            <div class="header">
              <img src="@/assets/tablet_borrowed/3.png" class="img3" />
              <span>当日借用信息</span><span>({{ today }})</span>
              <img src="@/assets/tablet_borrowed/4.png" class="img4" />
              <div v-if="isshow">
                <Swiper
                  :modules="modules"
                  :autoplay="{
                  delay: 3000,
                  disableOnInteraction:false,
                  }"
                  :direction="'vertical'"
                  :loop="true"
                >
                  <SwiperSlide> 全天剩余可借用：{{alldayNum}}台 </SwiperSlide>
                  <SwiperSlide> 上午剩余可借用：{{mornNum}}台 </SwiperSlide>
                  <SwiperSlide> 下午剩余可借用：{{afterNum}}台 </SwiperSlide>
                </Swiper>
              </div>
            </div>
            <!-- 表格 -->
            <div calss="table">
              <el-table
                :data="dayTableData"
                style="width: 100%"
                :header-cell-style="{ background: '#F5F9FC' }"
                ref="table"
              >
                <el-table-column fixed type="index" min-width="11%" label="序号" />
                <el-table-column prop="userName" label="借用人" min-width="17%" />
                <el-table-column prop="borrowNum" label="借用数量" min-width="17%">
                    <template #default="scope">
                        {{scope.row.borrowNum}}台
                    </template>
                </el-table-column>
                <el-table-column prop="startTime" label="借用时间" min-width="28%">
                  <template #default="scope">
                    <!-- 显示时分 00:00 -->
                    {{(scope.row.startTime&&scope.row.endTime)?
                      (scope.row.startTime.split(' ')[1].slice(0, -3) +
                      '～' +
                      scope.row.endTime.split(' ')[1].slice(0, -3)):""
                    }}
                  </template>
                  <!-- 自定义表头：借用时间 -->
                  <template #header>
                    <el-select
                      :model-value="'借用时间' + (dayTime ? '(' + dayTimeStr + ')' : '(全部)')"
                      placeholder="借用时间"
                      @change="onChange1"
                      style="width: 100%"
                      popper-class="zdy_select1"
                    >
                      <el-option
                        v-for="item in dayTimeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="borrowedStatus" label="借用状态" min-width="28%">
                  <!-- <template #default="scope">
                    {{scope.row.borrowedStatus}}
                  </template> -->
                  <!-- 自定义表头：借用状态 -->
                  <template #header>
                    <el-select
                      :model-value="'借用状态' + (dayState ? '(' + dayStateStr + ')' : '(全部)')"
                      placeholder="借用状态"
                      @change="onChange2"
                      style="width: 100%"
                      popper-class="zdy_select2"
                    >
                      <el-option
                        v-for="item in dayStateOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled"
                      />
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 功能菜单 -->
          <div class="menu">
            <!-- 标题 -->
            <div class="header">
              <img src="@/assets/tablet_borrowed/3.png" class="img3" />
              <span>功能菜单</span>
              <img src="@/assets/tablet_borrowed/4.png" class="img4" />
            </div>
            <!-- 取平板/还平板 -->
            <div class="takeAndreturnTablet">
              <!-- 取平板 -->
              <div @click="takeTablet">
                <span>取平板</span>
              </div>
              <!-- 还平板 -->
              <div @click="returnTablet">
                <span>还平板</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 2.右区 预约记录 -->
        <div class="appointmentRecord">
          <!-- 标题 -->
          <div class="header">
            <img src="@/assets/tablet_borrowed/3.png" class="img3" />
            <span>预约记录</span>
            <img src="@/assets/tablet_borrowed/4.png" class="img4" />
          </div>
          <!-- 表格 -->
          <el-table
            :data="appointmentTableData"
            style="width: 100%"
            :header-cell-style="{ background: '#F5F9FC' }"
            ref="table"
          >
            <el-table-column fixed type="index" min-width="11%" label="序号" />
            <el-table-column prop="meetName" label="会议名称" min-width="34%" >
              
                <template #default="scope">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="scope.row.meetName?scope.row.meetName:'无会议名称'"
                    placement="left"
                  >
                    <!-- 显示年月日时分 2023-8-23 00:00-00:00 -->
                    {{scope.row.meetName?scope.row.meetName:"无会议名称"}}
                  </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="借用人" min-width="15%" />
            <el-table-column prop="borrowNum" label="借用数量" min-width="15%" >
              <template #default="scope">
                  {{scope.row.borrowNum}}台
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="借用时间" min-width="33%">
              <!-- 自定义表头：借用时间 -->
              <!-- <template #header>
                <el-date-picker
                  v-model="appointmentValue"
                  type="date"
                  :prefix-icon="customPrefix"
                  popper-class="dzy_datePicker"
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
                  placeholder="借用时间"
                  size="small"
                  :disabled-date="disabledDate"
                  :editable="false"
                >
                </el-date-picker>
              </template> -->
              <template #default="scope">
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="(scope.row.startTime.slice(0, -3) +'~' +scope.row.endTime.split(' ')[1].slice(0, -3))"
                    placement="left"
                  >
                     <!-- 显示年月日时分 2023-8-23 00:00-00:00 -->
                     {{scope.row.startTime.slice(0, -3) +'~' +scope.row.endTime.split(" ")[1].slice(0, -3)}}
                  </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup lang="jsx">
import { ref, reactive, onMounted, computed, watch, nextTick ,shallowRef,h,onUnmounted,onBeforeUnmount} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import axios from 'axios'
import quertstring from 'querystring'
// import { el } from 'element-plus/es/locale';
import { request ,tabletRequest} from '@/utils/server.js'
// 轮播图
import { Swiper, SwiperSlide } from 'swiper/vue'
// Import Swiper styles
import 'swiper/css'
import { Autoplay } from 'swiper/modules'

const modules = [Autoplay]

// 1. ----------左侧当日借用信息 列表接口--------------
const getDayList=()=>{
  tabletRequest
    .post('/IotDeviHisCrtl/queryCurentHisRetulInfo', { 
      "borrowTime": dayTime.value,
      "borrowedStatus": dayState.value,
    })
    .then((response) => {
      // debugger
      // console.log('当日借用记录按条件查询成功:', response.data.result)
      // 轮播图处 全天/上午/下午 分别剩余可用的平板数量
      alldayNum.value=response.data.result.alldayNum
      mornNum.value=response.data.result.mornNum
      afterNum.value=response.data.result.afterNum

      dayTableData.value=response.data.result.data
     
    })
    .catch((error) => {
      console.log('当日借用记录按条件查询失败:', error)
    })
}

// 2.轮播图
const isshow=ref(false)
const alldayNum=ref(0)
const mornNum=ref(0)
const afterNum=ref(0)

// 轮询刷新
const setTimeoutZdy=(option)=>{
   setTimeout(function(){
      console.log(1111)
      // debugger
      try{
        if(typeof option.fn=="function"){
          option.fn()
          if(option.isClose){
            return
          }
        }
      }
      catch{
        
      }
    setTimeoutZdy(option)
   },option.time||60000)
}
var option={isClose:false,fn:()=>{
      // 调用接口
      getDayList()
      getAppointmentList()
      
  },time:300000}

onMounted(() => {
  getDayList()
  getAppointmentList()

  nextTick(()=>{
    isshow.value=true
  })
  
  setTimeoutZdy(option)

  // 定时刷新首页涉及接口
  
})

// 生命周期:销毁前
onBeforeUnmount(()=>{
  // clearInterval(timer)
  // 退出页面 停止轮询
  option.isClose=true
  
})

//2.当日借用信息
const today = ref('')
var time = new Date()
var y = time.getFullYear()
var m = time.getMonth() + 1
var d = time.getDate()
today.value = y + '年' + m + '月' + d + '日'

const dayTableData = ref([
  // {
  //       "borrowNum": 1,
  //       "borrowedStatus": "借用",
  //       "userName": "维康",
  //       "startTime": "2023-10-14 08:00:00",
  //       "startTime": "2023-10-16 08:00:00",
  //       "endTime": "2023-10-15 14:03:32"
  //     }
])
//自定义表头 --时间
const dayTime = ref('')
const dayTimeOptions = [
  {
    value: '',
    label: '全部'
  },
  {
    value: '1',
    label: '上午'
  },
  {
    value: '2',
    label: '下午'
  }
]

const onChange1 = (v) => {
  // debugger
  dayTime.value = v
  console.log(22222)
  getDayList()
}
// 选择的借用时间序号 对应上午/下午
const dayTimeStr = computed(() => {
  var x
  if (dayTime.value == '全部') {
    return '全部'
  }
  for (var i = 0; i < dayTimeOptions.length; i++) {
    if (dayTime.value == dayTimeOptions[i].label) {
      x = dayTimeOptions[i].label
      break
    }
  }
  return x
})

//自定义表头 --状态借用状态：1：待借用、2：借用中、3：完结、4：异常、5：取消
const dayState = ref('')
const dayStateOptions = [
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
const dayStateStr=computed(()=>{
  var x
  if(dayState.value=="全部"){
     return "全部"
  }
  for(var i=0;i<dayStateOptions.length;i++){
     if(dayState.value==dayStateOptions[i].value){
        x=dayStateOptions[i].label
        break
     }
  }
  return x
})


const onChange2 = (v) => {
  dayState.value = v
  getDayList()
}


//3.预约记录
// 3. ----------右侧预约记录 列表接口----------
const getAppointmentList=()=>{
  
  tabletRequest
    .post('/IotDeviHisCrtl/queryBorrowHisRetultInfo', {
        "endDayNum": 7,
        "showNum": 30
    })
    .then((response) => {
      // debugger
      // console.log('预约记录按条件查询成功:', response.data)
      appointmentTableData.value=response.data.result
     
    })
    .catch((error) => {
      console.log('预约记录按条件查询失败:', error)
    })
}
//自定义表头 --状态
const appointmentTime = ref('')
const appointmentOptions = []
const onChange3 = (v) => {
  appointmentTime.value = v
  appointmentGetList()
}
const appointmentTableData = ref([
  // {
  //   "id": 1,
  //   "personneId": 460003839,
  //   "borrowedName": "张小小",
  //   "borrowedNamePhone": "15295765073",
  //   "quantityBorrowed": 12,
  //   "borrowStartTime": "2022-8-8 17:00",
  //   "borrowEndTime":"2022-8-8 19:00",
  //   "borrowedState": null,
  //   "returnQuantity": null,
  //   "returnTime": null,
  //   "verificationCode": "3049",
  //   "mtName": "8.8日测试会议",
  //   "applyId": "340087888",
  //   "roomId": "35999887",
  //   "customTheme": null
  // },
  // {
  //   "roomID": "8559878580142080",
  //     "roomName": "A2-107",
  //     "meetID": "8646084058906624",
  //     "meetName": null,
  //     "verifyCode": "8611",
  //     "borrowNum": 3,
  //     "userName": "伟康",
  //     "startTime": "2023-10-13 08:00:00",
  //     "endTime": "2023-10-13 11:00:00"
  // }
])
// 今天之前的日期禁止选择
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7
}
const appointmentValue = ref('')
// 预约记录 时间选择

const customPrefix = shallowRef({
  render() {
    return <el-icon><ArrowDown /></el-icon>
  },
})

//3.跳转到取平板/还平板
const takeTablet = () => {
  router.push({
    path: '/validate-password'
  })
}
const returnTablet = () => {
  router.push({
    path: '/returnValidate-password'
  })
}
// watch(
//   () => appointmentValue.value,
//   () => {
//     appointmentGetList()
//   }
// )
</script>

<style lang="less">
// 右侧 借用时间下拉框
.dzy_datePicker {
  background: transparent !important;
  border: 0px !important ;
  margin-top: (-36/1080) * 100vh !important;
  margin-left: (0/1980) * 100vw !important;
  width: 300px!important;
  height: 300px!important;
  // inset:(262/1080) * 100vh  auto auto (1005/1080) * 100vh!important;

  .el-date-picker {
    zoom: 0.8;
    background: #05456e !important;
    
  }
  .el-popper__arrow {
    display: none !important;
  }
  .el-popper.is-pure {
    background-color: red;
  }
  .el-date-table td.disabled .el-date-table-cell {
    background-color: transparent;
  }
  .el-date-table th {
    border-color: rgba(235, 238, 245, 0.3);
  }
}
// 左侧 借用时间下拉框
.el-popper.zdy_select1 {
  // width: calc((197 / 1920) * 100vw - 12px) !important;
  width: calc((188 / 1920) * 100vw) !important;
  background: #05456e !important;
  border: 0px !important;
  margin-top: -10px;
  margin-left: -12px !important;
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
// 左侧 借用状态下拉框
.el-popper.zdy_select2 {
  // width: calc((182 / 1920) * 100vw - 12px) !important;
  width: calc((188 / 1920) * 100vw) !important;
  background: #05456e !important;
  border: 0px !important;
  margin-top: -10px;
  margin-left: -12px !important;
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
<style lang="less"  scoped>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */

.tabletBorrowed {
  padding-top: (68/1080) * 100vh;
  height: calc(100% - (8 / 1080) * 100vh);
  box-sizing: border-box;

  .tabletBorrowed-inner {
    display: flex;
    justify-content: space-between;
  }
  .scrollbar-flex-content {
    display: flex;
  }
  //公用
  .header {
    height: (35/1080) * 100vh;
    // margin-top: (60/1080)*100vh;
    margin-top: (30/1080) * 100vh;
    margin-bottom: (30/1080) * 100vh;
    display: flex;
    align-items: center;
    .img3 {
      width: (47/1920) * 100vw;
      height: (35/1080) * 100vh;
      margin-right: (10/1920) * 100vw;
    }
    span {
      color: rgba(255, 255, 255, 1);
      font-size: (24/1920) * 100vw;
      margin-right: (10/1920) * 100vw;
      text-align: left;
      font-family: SourceHanSansSC-regular;
      white-space: nowrap;
    }
    .img4 {
      width: (163/1920) * 100vw;
      height: (7/1080) * 100vh;
    }
    div {
      height: (30/1080) * 100vh;
      line-height:(30/1080) * 100vh;
      color: rgba(255, 255, 255, 1);
      font-size: (16/1920) * 100vw;
      white-space: nowrap;
      text-align: left;
      font-family: SourceHanSansSC-bold;
    }
    // 上午/下午剩余多少台
    // :deep(.el-carousel__item h3) {
    //     color: #475669;
    //     opacity: 0.75;
    //     line-height: 200px;
    //     margin: 0;
    //     text-align: center;
    //   }

    //   :deep(.el-carousel__item:nth-child(2n)) {
    //     background-color: #99a9bf;
    //     position: static;
    //   }

    //   :deep(.el-carousel__item:nth-child(2n + 1)){
    //     background-color: #d3dce6;
    //     position: static;
    //   }
  }

  :deep(.el-table) {
    height: (476/1080) * 100vh !important;
    background-color: transparent;
    font-size: (18/1920) * 100vw;
    color: rgba(255, 255, 255, 1);
    font-family: Roboto;
    //  border: 1px solid blue;
    .cell {
      line-height: (44/1080) * 100vh;
      white-space: nowrap;
      i {
        color: white;
      }
    }
    .el-table__inner-wrapper {
      height: (476/1080) * 100vh !important;
      //  height: auto;
      tr {
        background-color: transparent !important;
        td,
        th {
          background-color: transparent !important;
        }
      }

      .el-table__cell {
        height: (44/1080) * 100vh;
        text-align: center;
        border-bottom: 0px;
        padding:(5/1080) * 100vh 0;
      }
      thead {
        color: rgba(255, 255, 255, 1);
        tr th {
          border: (5/1080) * 100vh solid transparent;
          .cell {
            background: radial-gradient(
              0.5% 0.5% at 50% 50%,
              rgba(0, 207, 255, 0.1) 0%,
              rgba(0, 207, 255, 0.25) 100%
            ) !important;
            white-space: nowrap;
          }
        }
      }
      tbody {
        tr th {
          // height: (44/1080) * 100vh;
          
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
    .el-table__inner-wrapper::before {
      content: '';
      position: absolute;
      background-color: transparent;
      z-index: 3;
    }
  }
  // 1.左区 当日借用信息及功能菜单
  .borrowandmenu {
    width: 50%;
    height: 100%;

    // border: 1px solid red;
    //当日借用信息
    .dayBorrowinfo {
      width: 100%;
      box-sizing: border-box;
      height: (550/1080) * 100vh;
      padding-left: (60/1920) * 100vw;
      padding-right: (159/1920) * 100vw;
      //1.2 当日借用table表格
      :deep(.el-table) {
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
              text-align: center;
              color: rgba(255, 255, 255, 1) !important;
              font-size: (18/1920) * 100vw;
            }
          }
        }
      }
    }
    //功能菜单
    .menu {
      height: (342/1080) * 100vh;
      background-image: url(@/assets/tablet_borrowed/9.png);
      background-size: (894/1920) * 100vw (695/1080) * 100vh;
      background-repeat: no-repeat;
      background-position: (-62/1920) * 100vw (-84/1920) * 100vw;
      .header {
        margin-left: (60/1920) * 100vw;
      }
      .takeAndreturnTablet {
        margin-top: (61/1080) * 100vh;
        display: flex;
        justify-content: flex-start;

        div {
          width: (140/1920) * 100vw;
          height: (140/1920) * 100vw;
          // line-height: 35px;
          color: rgba(255, 255, 255, 1);
          font-size: (24/1920) * 100vw;
          text-align: center;
          font-family: Roboto;
          position: relative;
          span {
            white-space: nowrap;
            position: absolute;
            top: 50%;
            left:50%;
            transform: translate(-50%,-50%);
          }
        }
        div:nth-child(1) {
          margin-left: (200/1920) * 100vw;
          margin-right: (120/1920) * 100vw;
          background-image: url(@/assets/tablet_borrowed/5.png);
          background-size: (140/1920) * 100vw (140/1920) * 100vw;
          background-repeat: no-repeat;
        }
        div:nth-child(2) {
          background-image: url(@/assets/tablet_borrowed/6.png);
          background-size: (140/1920) * 100vw (140/1920) * 100vw;
          background-repeat: no-repeat;
        }
      }
    }
  }
  // 2.右区 预约记录
  .appointmentRecord {
    width: 50%;
    height: 100%;
    padding-right:  (76/1920) * 100vw;
    box-sizing: border-box;
    :deep(.el-table) {
      width: (765/1920) * 100vw;
      height: (800/1080) * 100vh !important;
      
      
      .el-table__inner-wrapper {
        height: auto !important;
      }
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
            text-align: center;
            color: rgba(255, 255, 255, 1) !important;
            font-size: (18/1920) * 100vw;
          }
          .el-input__inner {
            text-align: center;
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
        }
        
      }
      .el-date-editor.el-input {
        width:100% ;
        height: (44/1080) * 100vh;
        transform: translateX((-16/1980) * 100vw);
        text-align: center;
        &[aria-expanded=true]{
           .el-input__wrapper .el-input__prefix{

               .el-icon{
                   transform: rotate(180deg); 
                   transform-origin: center center;  
               }
  
           }
        }
        .el-input__wrapper {
          background-color: transparent;
          box-shadow: none;
          padding-left: (30/1920) * 100vw;
          padding-right: (30/1920) * 100vw;

          .el-input__prefix{
            position: absolute;
            right: 0;
          }
          .el-input__prefix-inner>:first-child, .el-input__prefix-inner>:first-child.el-input__icon{
            margin-left: 0!important;
          }
          .el-input__inner {
            text-align: center;
            color: rgba(255, 255, 255, 1) !important;
            font-size: (18/1920) * 100vw;
          }

        }
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
    }
  }
}
</style>
