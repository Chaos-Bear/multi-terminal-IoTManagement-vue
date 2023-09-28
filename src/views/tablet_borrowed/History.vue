<template>
  <div class="history">
    <!-- 2.查询 -->
    <div class="searchInfo">
      <el-form :model="form">
        <el-form-item label="借用时间">
          <!--value-format设置成我们想要的时间格式就可以了，比如：value-format=“yyyy-MM-dd HH:mm:ss”； -->
          <!-- v-model中的值，对应两个值，一个开始时间，一个结束时间，以数组的形式存在 -->
          <el-date-picker
            v-model="value1"
            popper-class="dzy_datePickers"
            type="datetimerange"
            range-separator="～"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
            prefix-icon="false"
            :default-time="[
                new Date(2000, 1, 1, 0, 0, 0),
                new Date(2000, 2, 1, 23, 59, 59),
              ]"
            :disabled-date="disabledDate"
          />
          
        </el-form-item>

        <el-form-item label="借用人">
          <el-input v-model="form.borrowedName" placeholder="请输入借用人" />

        </el-form-item>

        <el-form-item label="借用状态">
          <el-select v-model="form.historyState" placeholder="全部" popper-class="zdy_select">
            <el-option v-for="item in historyStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
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
        <el-table-column fixed type="index" min-width="6%" label="序号"/>
        <el-table-column prop="mtName" label="会议名称" min-width="21%" />
        <el-table-column prop="borrowedName" label="借用人" min-width="12%" />
        <el-table-column prop="quantityBorrowed" label="借用数量" min-width="11%" />
        <el-table-column prop="borrowStartTime" label="借用时间" min-width="12%" >
          <template #default="scope">
            <!-- 显示年月日 2023-8-23 -->
            {{scope.row.borrowStartTime.split(" ")[0]}}
          </template>
        </el-table-column>
        <el-table-column prop="returnQuantity" label="归还数量" min-width="11%" >
          <template #default="scope">
            <!-- 未归还时，归还数量默认为0-->
            {{scope.row.returnQuantity==null ? 0 :scope.row.returnQuantity}}
          </template> 
        </el-table-column>
        <el-table-column prop="returnTime" label="归还时间" min-width="12%" >
          <template #default="scope">
            <!-- 显示年月日 2023-8-23 -->
            {{scope.row.returnTime==null ? '- - -' : (scope.row.returnTime.split(" ")[0])}}
          </template>
        </el-table-column>
        <el-table-column prop="borrowedState" label="状态" min-width="12%" >
           <!--此处声明了一个getDayStateStr()方法，将接口返回的状态号，映射成对应得状态文字  -->
          <template #default="scope">
            {{getDayStateStr(scope.row.borrowedState)}}
          </template> 
        </el-table-column>
      </el-table>
      </el-scrollbar>
    </div>
  </div>
</template>
<script setup>
// import TheWelcome from '../components/TheWelcome.vue';
import axios from 'axios'
import { reactive, ref ,onMounted, nextTick} from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter()
import {request,noderedrequest}  from "@/utils/server.js" 

const table=ref(null)
const getList=()=>{
  var borrowStartTime=value1.value[0] || '';
  var borrowEndTime=value1.value[1] || '';
  
  var json={
        
        "borrowedName":{
            "_lk":form.borrowedName,
        },
        "borrowedState":form.historyState,

   }
  if(value1.value>0){
    // debugger
      json.borrowStartTime={
            "_gre":borrowStartTime,
            "_timestamp":true
      }
      json.borrowEndTime={
            "_lee":borrowEndTime,
            "_timestamp":true
      }
      json.order={sortFeild: 'borrowStartTime',sortType:'ASC',"_timestamp":true}
  }else{
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
    var time=Y+'-'+M+'-'+D+' '+'00:00:00'
    // debugger
    json.borrowEndTime={
      "_le":time,
      "_timestamp":true
    }
    json.order={sortFeild: 'borrowStartTime',sortType:'ASC',"_timestamp":true}
  }
   noderedrequest.post("/tablet_borrowed/list",json
   )
  //  noderedrequest.get("/tablet_borrowed/list?borrowedName="+form.borrowedName+"&borrowedState="+form.historyState)
  .then(response => {
    console.log("历史列表按条件查询成功:",response.data);
    
    tableData.length=0;
    //使用push方法:结构后再赋值
    tableData.push(...response.data.data.items);

  })
  .catch(error => {
    console.log("按条件查询失败:",error);
  });
}
//2.按要求查询
//借用时间
const value1 = ref([
  
])
const form = reactive({
  // borrowStartTime: '',
  // borrowEndTime:'',
  borrowedName: '',
  historyState: '',
})
// 借用状态
const historyStateOptions = [
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
const getDayStateStr=(v)=>{
  let a
  for(var i=0;i<historyStateOptions.length;i++){
     if(v==historyStateOptions[i].value){
        a= historyStateOptions[i].label;
        break
     }
  }
  return a
}
// 条件查询(设备名称、设备id地址、区域)
const searchbtn=()=>{
  console.log(value1.value[0],value1.value[1])
  // form.borrowStartTime=value1.value[0];
  // form.borrowEndTime=value1.value[1];
  console.log(form.borrowedName,form.historyState);
  getList()
    
}
const disabledDate=(time)=> {
  return time.getTime() > Date.now()- 8.64e7;
}
// 重置
const resetbtn=()=>{
  form.borrowStartTime="";
  form.borrowEndTime="";
  // 重置 时分别清空输入框的 借用时间 借用人 借用状态,并重新调用历史列表
  value1.value="";
  form.borrowedName="";
  form.historyState="";
  // debugger
  getList()
  
}

//3 设备信息
// 3.2设备列表
const tableData =reactive( [
  // {
  //     "id": 10,
  //     "personneId": 460002033,
  //     "borrowedName": "name1",
  //     "borrowedNamePhone": "15295765073",
  //     "quantityBorrowed": 5,
  //     "borrowStartTime": "2023-08-23 10:00:00",
  //     "borrowEndTime": "2023-08-23 12:00:00",
  //     "borrowedState": "2",
  //     "returnQuantity": null,
  //     "returnTime": null,
  //     "verificationCode": "4520",
  //     "mtName": "8.8日测试会议",
  //     "applyId": "340087888",
  //     "roomId": "35999887",
  //     "customTheme": null
  // },
])
//----启用 禁用
const isDisabled = ref(true)

//初始化渲染
onMounted(()=>{
  getList()
});

// 4.分页
const currentPage = ref(1);
const pageSize = ref(10);
const total=ref(0);
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
  .el-popper.dzy_datePickers{
     border: 0px!important ;
    
    
     .el-popper__arrow{
        display: none!important;
     }
   
    .el-date-table td.disabled .el-date-table-cell{
       background-color: transparent;
    }
    .el-date-table th{
      border-color:rgba(235, 238, 245,0.3); 
    }

    .el-picker-panel{
      background: #05456e!important;
       
    }
    
    .el-input__wrapper{
      background: #05456e!important;
      border:1px solid  rgba(235, 238, 245,0.3)!important;
    }
    .el-date-range-picker__time-header{
      border-bottom:1px solid  rgba(235, 238, 245,0.3)!important;
    }
    .el-picker-panel__footer{
      background-color: #05456e!important;
      border-top:1px solid  rgba(235, 238, 245,0.3)!important;

    }
    .el-date-range-picker__content.is-left{
       border-right:1px solid  rgba(235, 238, 245,0.3)!important;
    }
    .el-input--small .el-input__inner{
          &::-webkit-input-placeholder{
            color: #fff;
          }
          &:-moz-placeholder{
            color: #fff;
          }
          &::-moz-placeholder{
            color: #fff;
          }
          &:-ms-input-placeholder{
            color: #fff;
          }
        }
    .el-picker-panel,{
       color:#ffffff;
    }
  }
  
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
.history {
  margin: 0 (58/1920)*100vw;
  padding-top: (68/1080)*100vh;
  height: calc(100% - (8/1080)*100vh);
  box-sizing: border-box;
  overflow: hidden;
  // 2. 查询
  .searchInfo {
    width: 100%;
    height: (82/1080)*100vh;
    display: flex;
    justify-content: space-between;
    border:calc((5/1920) * 100vw + 1px)  solid transparent;
    border-width:0px  calc((5/1920) * 100vw + 1px);
    box-sizing: border-box;
    :deep(.el-form) {
      display: flex;
      margin-top: (38/1080)*100vh;

      .el-form-item {
        display: flex;
        align-items: center;
        margin-right: (60/1920)*100vw;

        .el-form-item__label {
          // height: (20/1920)*100vw;
          // margin-bottom: (8/1080)*100vh;
          color: rgba(255, 255, 255, 1);
          font-size: (20/1920)*100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        .el-input__wrapper{
          background-color: transparent;
          width: (240/1920)*100vw;
          height: (50/1080)*100vh;
        }
      }
      .el-form-item:nth-child(1){
         width: (414/1920)*100vw;
      }
    }

    .searchbtn {
      display: flex;
      justify-content: flex-end;
      height: (32/1080)*100vh;
      margin-top: (18/1080)*100vh;
      .el-button {
        width: (120/1920)*100vw;
        height: (50/1080)*100vh;
        line-height: (50/1080)*100vh;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        background-color: transparent;
        font-size: (20/1920)*100vw;
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
    height: calc(100% - (8/1080)*100vh);
    
    .scrollbar-flex-content {
      display: flex;
      
    }
    // 编辑/删除按钮
    .addbtn, .deletebtn {
      margin-bottom: (16/1080)*100vh;
      width: (80/1920)*100vw;
      height: (32/1080)*100vh;
      line-height: (20/1080)*100vh;
      margin-right: (8/1080)*100vh;
      border-radius: 2px;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(79, 168, 249, 1);
      font-size: (14/1920)*100vw;
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
      
      .el-form-item{
        width: 45%;

        .el-form-item__label{
           justify-content: flex-start;
        }
        
      }
    }

    //3.2设备列表
    :deep(.el-table ) {
      height: (800/1080)*100vh!important;
      background-color: transparent;
      font-size: (18/1920)*100vw;
      color: rgba(255, 255, 255, 1);
      font-family: Roboto;
      border: 1px solid transparent;
      
      .el-table__inner-wrapper{
        height: (800/1080)*100vh!important;
        // height:auto;
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
        tr{
          background-color: transparent!important;
          td,th{
            background-color: transparent!important;
          }
        }
        .el-table__cell{
            height: (44/1080)*100vh;
            text-align: center;
            border-bottom:0px !important;
             padding:(5/1080) * 100vh 0;
        }
        thead {
          color:  rgba(255, 255, 255, 1);
          tr th{
            border:(5/1920)*100vw solid transparent;
            .cell{
              background: radial-gradient(0.5% 0.5% at 50% 50%, rgba(0,207,255,0.1) 0%,rgba(0,207,255,0.25) 100%)!important;
              border: 0px;
              white-space: nowrap;
            }
          }
        }
        .el-table__body-wrapper{
           margin-left: (5/1920)*100vw;
        }
        tbody{
          margin-left: (5/1920)*100vw;
          tr td{
          height: (44/1080)*100vh;
           
           .el-button{
              color: rgba(24, 144, 255, 1);
              font-size: (14/1920)*100vw;
              text-align: left;
              font-family: SourceHanSansSC-regular;
              // :deep(.el-switch__label .is-active){
              //   color: rgba(255, 255, 255, 1);
              //   font-size: 18px;
              //   text-align: left;
              //   font-family: SourceHanSansSC-regular;
              // }
           }
           .el-button:nth-child(2){
              color: red;
           }
           .cell{
             white-space: nowrap;
             background-color: rgba(24, 144, 255, 0.1);
             margin-right: (10/1920)*100vw;
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