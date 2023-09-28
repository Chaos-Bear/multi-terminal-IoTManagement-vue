<template>
  <div class="autoScanning">
    <!-- 1.左-->
    <div></div>
    <!-- 2.中间 -->
    <div class="content">
      <!-- 2.1会议信息 -->
      <div class="meetingInfo">
        <!-- <div>集团2023年5月度工作例会</div>
        <div>
          <span>借用人：张小花 </span>
          <span> 借用数量：10台</span>
          <span>借用时间：6月30日 </span>
        </div> -->
        <div>{{borrowedInfo.mtName}}</div>
        <div>
          <span>借用人：{{borrowedInfo.borrowedName}} </span>
          <span> 借用数量：{{borrowedInfo.quantityBorrowed}}台</span>
          <span>借用时间：{{borrowedInfo.borrowStartTime.slice(5,-3)+'～'+borrowedInfo.borrowEndTime.slice(10,-3)}} </span>
        </div>
      </div>
      <!--2.2扫描信息  -->.
      <div class="scanningInfo">
        <!-- 按钮 -->
        <div class="scanningBtn">
          <div class="topInfo">
            <div v-if="isSuccess">
              <span>自动扫描中</span>
              <img src="@/assets/tablet_borrowed/11.png" />
            </div>
            <div v-else>
              <span>归还完成</span>
            </div>
            <span>{{borrowedInfo.returnQuantity}}</span>
            <span>/{{borrowedInfo.quantityBorrowed}}</span>
          </div>
          <div>
            <!-- <el-button type="info" @click="submitScan" :disabled="borrowedInfo.quantityBorrowed==0 || borrowedInfo.usedNum==0 || borrowedInfo.usedNum -tableData.length < 0 || tableData.length==0">归还完成</el-button>  -->
            <el-button type="primary" @click="handOperated" :disabled="borrowedInfo.quantityBorrowed==0 || borrowedInfo.usedNum==0 || borrowedInfo.usedNum -tableData.length<=0">手动归还添加</el-button>
          </div>  
          <!--以下为 手动添加-------弹出框  -->
          <el-dialog v-model="dialogFormVisible" title="手动添加">
              <el-form :model="form">
                 <el-form-item label="选择设备&nbsp;&nbsp;&nbsp;" :label-width="formLabelWidth">
                  <el-select v-model="form.deviceName" placeholder="请选择设备"  @change="onDeviceNameChange" >
                    <el-option v-for="item in deviceList"
                    :key="item.id"
                    :label="item.deviceName"
                    :value="item.id"
                    :disabled="ishas(item)">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设备序列号" :label-width="formLabelWidth">
                  <!-- <el-input v-model="form.modelNumber" autocomplete="off" /> -->
                  <template v-for="(item,i) in deviceList" :key="i">
                    <span v-if="item.id==form.deviceName">{{item.modelNumber}}</span>
                  </template>
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="cancelHandOperated">取消</el-button>
                  <el-button type="primary" @click="submitHandOperated">
                    确定
                  </el-button>
                </span>
              </template>
          </el-dialog>
        </div>
        <!-- 扫描信息 -->
        <div class="scanning">
           <!-- 此处设置了滚动条组件 -->
          <el-scrollbar>
          <!-- 3.2 设备列表-->
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ background: '#F5F9FC' }"
            ref="table"
          >
            <el-table-column fixed type="index" min-width="14%" label="序号"/>
            <el-table-column prop="modelNumber" label="设备序列号" min-width="24%" />
            <el-table-column prop="deviceName" label="设备名称" min-width="20.5%" />
            <el-table-column prop="borrowedState" label="状态" min-width="20.5%" >
              <template #default="scope">
                  {{getDayStateStr(scope.row.borrowedState)}}
              </template>
            </el-table-column>  
            <el-table-column prop="" label="操作" min-width="16%" >
              <!-- scope.row   -->
              <template #default="scope">
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click.prevent="deleteitem(scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 2.3归还完成 -->
          <div class="finishBtn">
            <el-button type="info" v-if="isSuccess"  @click="submitScan" :disabled="borrowedInfo.quantityBorrowed==0 || borrowedInfo.usedNum==0 || borrowedInfo.usedNum -tableData.length < 0 || tableData.length==0">归还完成</el-button>
            <el-button v-else @click="continueScan">继续扫描</el-button>
            
          </div>  
          </el-scrollbar>
        </div>
      </div>
    </div>
    <!-- 3.右 -->
    <div></div>
  </div>
</template>
<script setup >
import { ref, reactive,onMounted, onBeforeMount, computed ,markRaw} from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import axios from "axios";
import {useRouter,useRoute} from "vue-router";
const router=useRouter();
const route=useRoute();
import {request,noderedrequest}  from "@/utils/server.js" 

const getBorrowInfo=()=>{
  noderedrequest
    .post('/tablet_borrowed/list', {
      id: route.query.id
    })
    .then((res) => {
      borrowedInfo.value=res.data.data.items[0] || {};
    })
    .catch((error) => {
      // debugger
      console.log('当日借用信息按条件查询失败:', error)
    })
}
const borrowedInfo = ref({
  id: "",
  personneId: "",
  borrowedName: '',
  borrowedNamePhone: '',
  quantityBorrowed: '',
  borrowStartTime: '',
  borrowEndTime: '',
  borrowedState: '',
  returnQuantity: "",
  returnTime:"",
  verificationCode: '',
  mtName: '',
  applyId: '',
  roomId: '',
  customTheme: "",
  startTime: '',
  usedNum: '',
  avaiableNum: ""
})
onBeforeMount(() => {
  getBorrowInfo()
})
const getList = () => {
  //查询 设备列表中，借用状态是2 ->使用用中设备 的设备列表，设备状态1 ->启用 ,设备类型"deviceType": "1"  展示在手动添加的 下拉设备下拉选项中
  // noderedrequest.get('/device/list?borrowedState=1&deviceState=1')
  noderedrequest.post('/device/list',
    {
      "borrowedState":2,
      "deviceState":1,
      "deviceType": 1,
  })
  .then((response) => {
      console.log('按条件查询成功:', response.data)
      
      // tableData.length = 0
      //使用push方法:结构后再赋值
      deviceList.value=response.data.data.items;
      console.log(deviceList.value)
      
  })
  .catch((error) => {
    console.log('按条件查询失败:', error)
  })
}

//2.1会议信息
const meetingInfo=[]
// 接收url query传参
console.log("归还query传参",route.query)

//2.2 已扫描 待绑定数组
const tableData =reactive( [
  // {
  //     "id": 9,
  //     "deviceId": "20",
  //     "deviceName": "220VA609WSMARTBULLB",
  //     "deviceIpAddress": "139.120.1.1",
  //     "port": 800000,
  //     "brand": "TTst1",
  //     "modelNumber": "220VA609WSMARTBULLB",
  //     "region": "A2-229会议室",
  //     "state": "在线",
  //     "createTime": "2023-08-10T01:55:21.000Z",
  //     "updateTime": "2023-08-10T05:59:56.000Z",
  //     "equipmentSerialNumber": "12345",
  //     "borrowedState": "可借用",
  //     "deviceType": "移动设备"  
  // }
])
// ----借用状态
const dayStateOptions = [
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
         a=dayStateOptions[i].label;
         break
       }
   }
   return a
}
// 2.2.1 绑定完成
// 同时调用更新设备接口 借用状态->2使用中，和 更新平板预约借用接口 借用状态->3借用中 （隐含调用无纸化接口）
const isSuccess=ref(true)
const submitScan=()=>{
  console.log(1111)
  if(borrowedInfo.quantityBorrowed==0 || borrowedInfo.usedNum==0 || borrowedInfo.usedNum -tableData.length < 0 ||tableData.length==0){
   return
  }
  var PromiseArr=[]
  // 发请求
  // 根据 手动选择的设备id ,和志培确认要不要将设备状态从 可借用->使用中
  for(var i=0;i<tableData.length;i++){
    PromiseArr.push(
      // 更新设备接口设备
      noderedrequest.put("/device/update",
        {
              "id": tableData[i].id,  
              //借用状态 在此时->1 空闲中
              "borrowedState": "1",
        }
      ),
      // 更新平板预约借用接口
      noderedrequest.put("/tablet_borrowed/update",
        {
              "id": route.query.id,  
              // 借用状态 在此时->1/2 完结/异常
              "borrowedState": (tableData.length + borrowedInfo.value.returnQuantity)==borrowedInfo.value.quantityBorrowed ? 1 : 2,
              // 归还数量
              "returnQuantity": borrowedInfo.value.returnQuantity + tableData.length,
              
              "usedNum":borrowedInfo.value.usedNum - tableData.length,
              // 归还时间------------------------
              
          } 
      )
    )
  }
  Promise.all(PromiseArr).then(function (posts) {
      console.log("ok")
      console.log('Contents: ' + posts);
      getBorrowInfo()
        // 成功提示
        ElMessageBox.confirm(
          '您已成功归还'+tableData.length+'台平板至【'+borrowedInfo.value.mtName+'】下。',
          '提示',
            {
              confirmButtonText: '确认',
              cancelButtonText: ' 取消',
              type: 'success',
              'custom-class':'zdyclass'
            }
          )
          .then(() => {
            // 绑定完成功，关闭确认按钮后，展示继续扫描按钮
           isSuccess.value=false
          })
          .catch(() => {
            
          })
      //清空tableData表格
      tableData.length=0;
    }).catch(function(reason){
        console.log('出错了',reason)
        //失败提示
        ElMessageBox.confirm(
          '绑定失败！请先删除状态为【已借用】、【不可用】、【已超出】的设备！',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: ' 取消',
            type: 'warning',
          }
        )
          .then(() => {
            
          })
          .catch(() => {
            
          })
    }); 
}

   
// 2.2.2 手动添加
const formLabelWidth = '(542/1920)*100vw';
const dialogFormVisible=ref(false);

const form = reactive({
  deviceName: '',
  modelNumber: '',
})
const deviceList=ref([
    
])
// 监听选择的设备名称，发请求获取该设备名称对应的设备序列号，展示在设备序列号输入框
// 声明手动选择的 设备id  
var id
const onDeviceNameChange=(v)=>{
  form.deviceName=v;
}
//手动添加按钮
const handOperated=()=>{
  if(borrowedInfo.quantityBorrowed==0 || borrowedInfo.usedNum==0 || borrowedInfo.usedNum -tableData.length<=0){
   return
  }
   dialogFormVisible.value=true;
   getList()
   form.deviceName='';
   form.modelNumber='';
}
// 取消手动添加
const cancelHandOperated=()=>{
   dialogFormVisible.value = false;
   form.deviceName='';
   form.modelNumber='';
}
const  ishas=(item)=>{
    for(var i=0;i<tableData.length;i++){
      // debugger
      if(item.id==tableData[i].id){
          return true
      }
    }
    return  false
}
// 确定手动添加，将选择的设备添加到待绑定列表   
const submitHandOperated=()=>{
  //-----调用查询设备接口  -----根据手动选择的设备名称
  console.log("form.deviceName：",form.deviceName)
  // noderedrequest.get('/device/list?id='+form.deviceName)
  noderedrequest.post('/device/list',
  {
      "id":form.deviceName,
  })
  .then((response) => {
    // debugger
      console.log('查询手动选择的设备:', response.data)
      
      // tableData.length = 0
      //使用push方法:结构后再赋值
      tableData.push(...response.data.data.items);
      console.log("tableData",tableData)
      
  })
  .catch((error) => {
    console.log('按条件查询失败:', error)
  })
  dialogFormVisible.value = false;

}

//删除
const deleteitem=(v)=>{
  //  debugger 
   for(var i=0;i<tableData.length;i++){
      if(v.id==tableData[i].id){
          tableData.splice(i,1)
      }
   }
}
// 继续扫描按钮
const continueScan=()=>{
  isSuccess.value=true
}

</script>

<style lang="less" scoped>
.autoScanning {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-image: url(@/assets/tablet_borrowed/1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // position: relative;
  // 1.左
  & > div:nth-child(1) {
    width: (589/1920) * 100vw;
    height: 100vh;
    background-image: url(@/assets/tablet_borrowed/7.png);
    background-size: (400/1920)*100vw   (400/1920)*100vw;
    background-repeat: no-repeat;
    background-position-x: (100/1920)*100vw;
    background-position-y: (600/1080)*100vh;
    
  }

  // 2.中间区域
  .content {
    width: (742/1920) * 100vw;
    //2.1. 会议信息
    .meetingInfo {
      width: 100%;
      height: (247/1080)*100vh;
      padding-top: (68/1080)*100vh;
      // margin-bottom: (80/1080)*100vh;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-family: SourceHanSansSC-regular;
      &>div{
        font-size: (34/1920)*100vw;
        margin-bottom: (10/1080)*100vh;
      }
      &>div:nth-child(2){
        display: flex;
        justify-content: flex-start;
        span{
          font-size: (24/1920)*100vw;
          text-align: left;
        }
        span:nth-child(1){
          width:(240/1920)*100vw;
        }
        span:nth-child(2){
          width:(200/1920)*100vw;
        }
        span:nth-child(3){
          width:(302/1920)*100vw;
        }
      }
    }
    //2.2 扫描信息
    .scanningInfo {
      width:(660/1920)*100vw ;
      margin-left:(40/1920)*100vw ;
      .scanningBtn{
        margin-bottom: (54/1080)*100vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topInfo {
          display: flex;
          align-items: center;
          div:nth-child(1){
            margin-right: (20/1920) * 100vw;
            display: flex;
            align-items: center;
          }
          span {
              // height: (50/1080) * 100vh;
              // margin-right: (10/1920) * 100vw;
              color: rgba(255, 255, 255, 1);
              font-size: (34/1920) * 100vw;
              text-align: left;
              font-family: SourceHanSansSC-regular;
              display: inline-block;
          }
          span:nth-child(1) {
            width: (170/1920)*100vw;
          }
         
          img{
            width: (54/1920)*100vw;
            height: (54/1920)*100vw;
          }
          :deep(.el-button){
            width: (160/1920)*100vw;
            height: (60/1080)*100vh;
            border-radius: (2/1920)*100vw;
            background-color: rgba(255, 169, 64, 0.2);
            color: rgba(255, 255, 255, 1);
            // font-size: (28/1920)*100vw;
            font-size: (18/1920)*100vw;
            text-align: center;
            font-family: Roboto;
            border: 1px solid rgba(255, 169, 64, 1);
          }
          .el-button:nth-child(2){
              background-color: rgba(15, 204, 249, 0.3);
              color: rgba(255, 255, 255, 1);
              border: (1/1920)*100vw solid rgba(15, 204, 249, 1);
          }
        }
        :deep(.el-dialog){
           width: (542/1920)*100vw;
           height: (327/1080)*100vh;
           margin-top:(417/1080)*100vh;
           .el-dialog__header{
              padding-left:(24/1920)*100vw;
              padding-top:(14/1080)*100vh;
              padding-bottom:(14/1080)*100vh;
              border-bottom: 1px solid rgba(239, 239, 239, 1);
              span{
                color: rgba(0, 0, 0, 1);
                font-size: (18/1920)*100vw;
                text-align: left;
                font-family: SourceHanSansSC-regular;
              }
              .el-dialog__headerbtn{
                // width: (18/1920)*100vw!important;
                height: (18/1080)*100vw;
                right:(-10/1920)*100vw ;
                top: (10/1080)*100vw;
              }
           }
           .el-dialog__body{
              padding: (24/1080)*100vh (48/1920)*100vw (1/1080)*100vh (48/1920)*100vw;
              .el-form-item{
                height: (32/1080)*100vh;
                margin-bottom:(36/1080)*100vh;
                position: relative;
                .el-form-item__label {
                  height: (32/1080)*100vh;
                  line-height: (47/1080)*100vh;
                  color: rgba(79, 79, 79, 1);
                  font-size: (14/1920)*100vw;
                  text-align: left;
                  font-family: SourceHanSansSC-regular;
                }
                .el-input__wrapper{
                  height:(42/1080)*100vh;
                  .el-input__inner{
                    font-size: (14/1920)*100vw;
                    text-align: left;
                    font-family: SourceHanSansSC-regular;
                  }
                }
                // 手动添加弹框中的序列号
                span{
                  color: #4f4f4f;
                  font-size:(14/1920)*100vw;
                  
                }
              }
              .el-form-item:nth-child(2){
                .el-input__wrapper{
                   box-shadow: none;
                }
              }
              
           }
           .el-dialog__footer{
            padding-top: 0px;
            &>span{
              margin-right:(127/1920)*100vw;
              .el-button{
                width: (90/1920)*100vw;
                height: (42/1080)*100vh;
                // line-height: 20px;
                // margin-right: (2/1920)*100vw;
                border-radius: (2/1920)*100vw;
                background-color: rgba(79, 168, 249, 1);
                color: rgba(255, 255, 255, 1);
                font-size: (14/1920)*100vw;;
                text-align: center;
                font-family: Roboto;
              }
              .el-button:nth-child(2){
                color: rgba(51, 51, 51, 1);
                background-color: rgba(217, 217, 217, 1);
                border: 1px solid rgba(206, 206, 206, 1);
              }
            }
              
           }
        }
      }
      .scanning{
        width: 100%;
         //2.2设备列表
        :deep(.el-table ) {
          height: (584/1080)*100vh!important;
          background-color: transparent;
          font-size: (18/1920)*100vw;
          color: rgba(255, 255, 255, 1);
          font-family: Roboto;
          // border: 1px solid blue;
          // overflow: hidden;

          .el-table__inner-wrapper{
            // height: (800/1080)*100vh!important;
            // height:auto;
            &::before{
              background-color: transparent;
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
                background-color: rgba(24, 144, 255, 0.1);
                margin-right: (10/1920)*100vw;
              }
            }
          }
          }
        }

        //2.3绑定完成/继续扫描
        .finishBtn{
          :deep(.el-button){
            width: (677/1920) * 100vw;
            height: (71/1080) * 100vh;
            border-radius: (2/1920) * 100vw;
            background-color: rgba(24, 144, 255, 1);
            color: rgba(255, 255, 255, 1);
            font-size: (34/1920) * 100vw;
            text-align: center;
            font-family: Roboto;
            border: 0px;

          }
        }
      }
    }
  }
  // 3.右
  & > div:nth-child(3) {
    width: (589/1920) * 100vw;
    height: 100vh;
    background-image: url(@/assets/tablet_borrowed/7.png);
    background-size: (400/1920)*100vw   (400/1920)*100vw;
    background-repeat: no-repeat;
    background-position-x: (250/1920)*100vw;
    background-position-y: (-150/1080)*100vh;
  }
}
</style>
