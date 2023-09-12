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
                <img src="@/assets/tablet_borrowed/3.png" class="img3">
                <span>当日借用信息</span><span>({{today}})</span>
                <img src="@/assets/tablet_borrowed/4.png" class="img4">
            </div>
            <!-- 表格 -->
            <div calss="table">
                <el-table
                  :data="dayTableData"
                  style="width: 100%"
                  :header-cell-style="{ background: '#F5F9FC' }"
                  ref="table"
                >
                  <el-table-column fixed type="index" min-width="15%" label="序号"/>
                  <el-table-column prop="borrowedName" label="借用人" min-width="17%" />
                  <el-table-column prop="quantityBorrowed" label="借用数量" min-width="20%" />
                  <el-table-column prop="borrowStartTime" label="借用时间" min-width="32%" >
                    <template #default="scope">
                      <!-- 显示时分 00:00 -->
                       {{scope.row.borrowStartTime.split(" ")[1].slice(0,-3)+'～'+scope.row.borrowEndTime.split(" ")[1].slice(0,-3)}}
                    </template>
                    <!-- 自定义表头：借用时间 -->
                    <template #header>
                       <el-select :model-value="'借用时间'+(dayTime?'('+dayTimeStr+')':'')" placeholder="借用时间" @change="onChange1" style="width:100%">
                        <el-option
                          v-for="item in dayTimeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :disabled="item.disabled"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="borrowedState" label="借用状态" min-width="20%" >
                    <template #default="scope">
                       {{getDayStateStr(scope.row.borrowedState)}}
                    </template>  
                    <!-- 自定义表头：借用状态 -->
                    <template #header>
                       <el-select model-value="借用状态" placeholder="借用状态" @change="onChange2" style="width:100%">
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
              <img src="@/assets/tablet_borrowed/3.png" class="img3">
              <span>功能菜单</span>
              <img src="@/assets/tablet_borrowed/4.png" class="img4">
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
              <img src="@/assets/tablet_borrowed/3.png" class="img3">
              <span>预约记录</span>
              <img src="@/assets/tablet_borrowed/4.png" class="img4">
            </div>
            <!-- 表格 -->
            <el-table
              :data="appointmentTableData"
              style="width: 100%"
              :header-cell-style="{ background: '#F5F9FC' }"
              ref="table"
            >
              <el-table-column fixed type="index" min-width="12%" label="序号"/>
              <el-table-column prop="mtName" label="会议名称" min-width="40%" />
              <el-table-column prop="borrowedName" label="借用人" min-width="12%" />
              <el-table-column prop="quantityBorrowed" label="借用数量" min-width="15%" />
              <el-table-column prop="borrowStartTime" label="借用时间" min-width="30%" >
                <!-- 自定义表头：借用时间 -->
                <template #header>
                  <!-- <el-select :model-value="'借用时间'+appointmentTime" placeholder="借用时间" @change="onChange3" style="width:100%"> -->
                    <el-date-picker
                      v-model="appointmentValue"
                      type="date"
                      
                      format="YYYY-MM-DD"
                      value-format="YYYY-MM-DD"
                      placeholder="借用时间"
                      size="small"
                      :disabled-date="disabledDate"
                    />
                    <!-- <el-option
                      v-for="item in appointmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                      /> -->
                  <!-- </el-select> -->
                </template>
                <template #default="scope">
                  <!-- 显示年月日时分 2023-8-23 00:00-00:00 -->
                    {{formatBorrowTime(scope)}}
                </template>
             </el-table-column>
            </el-table>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { ref ,reactive,onMounted,computed,watch} from 'vue';
import {useRouter} from "vue-router";
const router=useRouter();
import axios from "axios";
import quertstring from "querystring"
// import { el } from 'element-plus/es/locale';
import {request,noderedrequest}  from "@/utils/server.js" 

const dayGetList=()=>{
    // 获取当前时间，定义上午和下午的开始时间，结束时间
    var d=new Date();
    var Y=d.getFullYear();
    var M=d.getMonth()+1;
        if(M<=9){
           M="0"+M
        }
    var D=d.getDate();
       if(D<=9){
           D="0"+D
        }
    var borrowStartTime;
    var borrowEndTime;
    if(dayTime.value!=1 && dayTime.value!=2){
      //全天
      borrowStartTime=Y+'-'+M+'-'+D+' '+'00:00:00'
      borrowEndTime=Y+'-'+M+'-'+D+' '+'23:59:59'
    }else if(dayTime.value==1){
      //上午
      borrowStartTime=Y+'-'+M+'-'+D+' '+'00:00:00'
      borrowEndTime=Y+'-'+M+'-'+D+' '+'12:00:00'
    }else{
      //下午
      borrowStartTime=Y+'-'+M+'-'+D+' '+'12:00:01'
      borrowEndTime=Y+'-'+M+'-'+D+' '+'23:59:59'
    };
  //  debugger
   console.log("11111",borrowStartTime,borrowEndTime)
   
  // noderedrequest.get("/tablet_borrowed/list?borrowStartTime="+borrowStartTime+"&borrowEndTime="+borrowEndTime+"&borrowedState="+dayState.value)
   noderedrequest.post("/tablet_borrowed/list",
   {
        "borrowStartTime":{
            "_gre":borrowStartTime,
            "_timestamp":true
        },
        "borrowEndTime":{
            "_lee":borrowEndTime,
            "_timestamp":true
        },
        "borrowedState":dayState.value,
        "order":{sortFeild: 'borrowStartTime',sortType:'ASC',"_timestamp":true}
   })
  .then(response => {
    console.log("当日借用信息按条件查询成功:",response.data);
    
    dayTableData.length=0;
    //使用push方法:结构后再赋值
    dayTableData.push(...response.data.data.items);
    
  })
  .catch(error => {
    // debugger
    console.log("当日借用信息按条件查询失败:",error);
  });
}
const appointmentGetList=()=>{
  // 获取当天的时间 如：2020-8-29 00:00:00
  var d=new Date();
  var Y=d.getFullYear();
  var M=d.getMonth()+1;
      if(M<=9){
       M="0"+M
  }
  var D=d.getDate();
      if(D<=9){
      D="0"+D
  }
  var time=Y+'-'+M+'-'+D+' '+'00:00:00';
  // 选择借用时间 和 未选择借用时间：
  var borrowStartTime;
  if(appointmentValue.value){
    borrowStartTime={
            "_lk":appointmentValue.value,
        }
    
  }else{
    borrowStartTime={
            "_gre":time,
            "_timestamp":true
        }
  }
  //  noderedrequest.get("/tablet_borrowed/list?borrowStartTime="+appointmentTime.value)  ASC  DESC
  noderedrequest.post("/tablet_borrowed/list",
   {
        "borrowStartTime":borrowStartTime, 
        "order":{sortFeild: 'borrowStartTime',sortType:'ASC',"_timestamp":true}
   })
  .then(response => {
    console.log("预约记录按条件查询成功:",response.data);
    
    appointmentTableData.length=0;
    //使用push方法:结构后再赋值
    appointmentTableData.push(...response.data.data.items);
    
  })
  .catch(error => {
    console.log("预约记录按条件查询失败:",error);
  });
}

//1.当日借用信息
const today=ref("")
var time=new Date()
var y=time.getFullYear()
var m=time.getMonth()+1
var d=time.getDate()
today.value=y+'年'+m+'月'+d+'日';

const dayTableData =reactive( [
  // {
  //   "id": 1,
  //   "personneId": 460003839,
  //   "borrowedName": "张小小",
  //   "borrowedNamePhone": "15295765073",
  //   "quantityBorrowed": 12,
  //   "borrowStartTime": "2022-8-8 17:00",
  //   "borrowEndTime": "2022-8-8 19:00",
  //   "borrowedState": 2,
  //   "returnQuantity": null,
  //   "returnTime": null,
  //   "verificationCode": "3049",
  //   "mtName": "8.8日测试会议",
  //   "applyId": "340087888",
  //   "roomId": "35999887",
  //   "customTheme": null
  // }
])
//自定义表头 --时间
const dayTime=ref("");
const dayTimeOptions = [
  {
    value: '',
    label: '全部',
  },
  {
    value: '1',
    label: '上午',
  },
  {
    value: '2',
    label: '下午',
  }
]

const onChange1=(v)=>{
  dayTime.value=v
  console.log(22222)
  dayGetList()
}
// 选择的借用时间序号 对应上午/下午
const dayTimeStr=computed(()=>{
  var x
  if(dayTime.value==''){
     return ""
  }
  for(var i=0;i<dayTimeOptions.length;i++){
     if(dayTime.value==dayTimeOptions[i].value){
        x=dayTimeOptions[i].label;
        break
     }
  }
  return x
})

//自定义表头 --状态
const dayState=ref("");
const dayStateOptions = [
  {
    value: '',
    label: '全部',
  },
  {
    value: '1',
    label: '待借用',
  },
  {
    value: '2',
    label: '未审批',
  },
  {
    value: '3',
    label: '借用中',
  },
  {
    value: '4',
    label: '完结',
  },{
    value: '5',
    label: '异常',
  },
  {
    value: '6',
    label: '取消',
  }
]
const onChange2=(v)=>{
  dayState.value=v;
  dayGetList()
}
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

onMounted(()=>{
  dayGetList()
  appointmentGetList()
})


//2.预约记录
//自定义表头 --状态
const appointmentTime=ref("");
const appointmentOptions = [
  
];
const onChange3=(v)=>{
   appointmentTime.value=v;
   appointmentGetList();
   
}
const appointmentTableData =reactive( [
  {
    "id": 1,
    "personneId": 460003839,
    "borrowedName": "张小小",
    "borrowedNamePhone": "15295765073",
    "quantityBorrowed": 12,
    "borrowTime": "2022-8-8 17：00-19：00",
    "borrowedState": null,
    "returnQuantity": null,
    "returnTime": null,
    "verificationCode": "3049",
    "mtName": "8.8日测试会议",
    "applyId": "340087888",
    "roomId": "35999887",
    "customTheme": null
  }
])
// 今天之前的日期禁止选择 
const disabledDate = (time) => {
  return  time.getTime() < Date.now() - 8.64e7;
}
const  appointmentValue=ref("");
// 预约记录 时间选择
const formatBorrowTime=(scope)=>{
  if(scope.row.borrowStartTime && scope.row.borrowEndTime){
      return scope.row.borrowStartTime.split(" ")[0]+' '+scope.row.borrowStartTime.split(" ")[1].slice(0,-3)+'～'+scope.row.borrowEndTime.split(" ")[1].slice(0,-3)
  }else{
     return ''
  }
}
//3.跳转到取平板/还平板
const takeTablet=()=>{
   router.push({
    path:'/validate-password'
   })
}
const returnTablet=()=>{
   router.push({
    path:'/returnValidate-password'
   })
}
watch(()=>appointmentValue.value,()=>{
    appointmentGetList()
})

</script>
<style lang="less" scoped>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */

.tabletBorrowed{
  padding-top: (68/1080)*100vh;
  height: calc(100% - (8/1080)*100vh);
  box-sizing: border-box;
  
  .tabletBorrowed-inner{
    display: flex;
    justify-content: space-between;
     
  }
  .scrollbar-flex-content {
      display: flex;
    }
  //公用
  .header{
    height: (35/1080)*100vh;
    // margin-top: (60/1080)*100vh;
    margin-top: (30/1080)*100vh;
    margin-bottom: (30/1080)*100vh;
    display: flex;
    align-items: center;
    .img3{
      width: (47/1920)*100vw;
      height: (35/1080)*100vh;
      margin-right: (10/1920)*100vw;
    }
    span{
      color: rgba(255, 255, 255, 1);
      font-size: (24/1920)*100vw;
      margin-right:(10/1920)*100vw;
      text-align: left;
      font-family: SourceHanSansSC-regular;
    }
    .img4{
      width: (163/1920)*100vw;
      height: (7/1080)*100vh;
    }
  }
  
  :deep(.el-table){
    height: (476/1080)*100vh!important;
    background-color: transparent;
    font-size: (18/1920)*100vw;
    color: rgba(255, 255, 255, 1);
    font-family: Roboto;
    //  border: 1px solid blue;
     
    .el-table__inner-wrapper{
      height: (476/1080)*100vh!important;
      //  height: auto;
      tr{
        background-color: transparent!important;
        td,th{
          background-color: transparent!important;
        }
      }
      
      .el-table__cell{
          height: (44/1080)*100vh;
          text-align: center;
          border-bottom:0px;
      }
      thead {
        color:  rgba(255, 255, 255, 1);
        tr th{
          border: (5/1080)*100vh solid transparent;
          .cell{
            background: radial-gradient(0.5% 0.5% at 50% 50%, rgba(0,207,255,0.1) 0%,rgba(0,207,255,0.25) 100%)!important;
            white-space: nowrap;
          }
        }
      }
      tbody{
          tr th{
          height: (44/1080)*100vh;
          
        }
      }
    }
    .el-table__inner-wrapper::before {
      content: "";
      position: absolute;
      background-color: transparent; 
      z-index: 3;
    }
  }
  // 1.左区 当日借用信息及功能菜单
  .borrowandmenu{
    width: 50%;
    height: 100%;
    
    // border: 1px solid red;
      //当日借用信息
      .dayBorrowinfo{
        width: (654/1920)*100vw;
        height:(550/1080)*100vh;
        margin-left: (60/1920)*100vw;
        //1.2 当日借用table表格
        :deep(.el-table){
          .el-select {
             .el-input {
                

              }
              .el-input__wrapper{
                height: (44/1080)*100vh;
                border-radius: 0px;
                padding: 0;
                background-color: transparent;
                box-shadow:none!important;
                .el-input__inner{
                  color: rgba(255, 255, 255, 1)!important;
                  font-size: (18/1920)*100vw;
                }
              }

          }
          // thead tr th:nth-child(4){
          //   :deep(.select-trigger){
          //       width:(210/1080)*100vh; 
          //   }
          //   :deep(.el-input__suffix-inner){
          //       width:(14/1080)*100vh; 
          //   }
          // }
        }
      }
      //功能菜单
      .menu{
        height: (342/1080)*100vh;
        background-image:url(@/assets/tablet_borrowed/9.png) ;
        background-size:(894/1920)*100vw (695/1080)*100vh;
        background-repeat: no-repeat;
        background-position: (-62/1920)*100vw (-84/1920)*100vw;
         .header{
          margin-left: (60/1920)*100vw;
         }
         .takeAndreturnTablet{
            margin-top: (61/1080)*100vh;
            display: flex;
            justify-content: flex-start;

            div{
              width: (140/1920)*100vw;
              height: (140/1080)*100vh;
              // line-height: 35px;
              color: rgba(255, 255, 255, 1);
              font-size: (24/1920)*100vw;
              text-align: center;
              font-family: Roboto;
              span{
                display: inline-block;
                margin-top: 27%;
                
              }
            }
            div:nth-child(1){
              margin-left:(200/1920)*100vw ;
              margin-right:(120/1920)*100vw ;
              background-image:url(@/assets/tablet_borrowed/5.png) ;
              background-size:(140/1920)*100vw (140/1920)*100vw;
              background-repeat: no-repeat;
            }
            div:nth-child(2){
              background-image:url(@/assets/tablet_borrowed/6.png) ;
              background-size:(140/1920)*100vw (140/1920)*100vw;
              background-repeat: no-repeat;
            }
         }
      }

  }
  // 2.右区 预约记录
  .appointmentRecord{
    width: 50%;
    // height: (800/1920)*100vw;
    height: 100%;
    margin-right: (76/1920)*100vw;

     :deep(.el-table){
       height: (800/1080)*100vh!important;

       .el-table__inner-wrapper{
          height: auto!important;
          
        }
        .el-select {
             .el-input {
                
              }
              .el-input__wrapper{
                height: (44/1080)*100vh;
                border-radius: 0px;
                padding: 0;
                background-color: transparent;
                box-shadow:none!important;
                .el-input__inner{
                  color: rgba(255, 255, 255, 1)!important;
                  font-size: (18/1920)*100vw;
                }
              }
          }
          .el-date-editor.el-input{
              width:(210/1980)*100vw ;
              height: (44/1080)*100vh;
              transform: translateX((-16/1980)*100vw);
              .el-input__wrapper{
                background-color: transparent;
                box-shadow:none;
                padding-left: 0px;
              }
          }
     }
  }
}
</style>
