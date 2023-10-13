<template>
  <div class="autoScanning">
    <!-- 1.左-->
    <div class="left">
      <!-- 1.1还平板 -->
      <div class="tip">还平板</div>
      <!-- 1.2会议信息 -->
      <div class="meetingInfo">
        <div class="first">{{ borrowedInfo.mtName  ? borrowedInfo.mtName : "暂无会议信息"}}</div>
        <div class="second">
          <div>
            会议时间：暂无会议时间
            <!-- {{
              borrowedInfo.borrowStartTime.slice(0, -3) +' ～'+borrowedInfo.borrowEndTime.slice(10, -3)
            }} -->
          </div>
          <div>借用地点：暂无会议地点</div>
        </div>
        <div class="third">
          <div>借用人：{{ borrowedInfo.userName ? borrowedInfo.userName : "" }}</div>
          <div>借用数量：{{ borrowedInfo.borrowNum? borrowedInfo.borrowNum: 0}} 台</div>
          <div>
            借用时间：{{borrowedInfo.borrowTime}}
            <!-- {{
              borrowedInfo.borrowStartTime.slice(0, -3) +
              ' ～' +:
              borrowedInfo.borrowEndTime.slice(10, -3)
            }} -->
          </div>
        </div>
        <div class="four">
          <!-- <el-button
            type="primary"
            @click="handOperated"
            :disabled="!isSuccess"
            >手动归还添加</el-button
          > -->
          <!-- 1.4归还完成 -->
          <el-button
            type="info"
            v-if="isSuccess"
            @click="submitScan"
            :disabled="
               tableData.length < 0 ||
              tableData.length == 0
            "
            >归还完成</el-button
          >
          <el-button v-else @click="continueScan">继续扫描</el-button>
          <el-button type="primary" @click="goBack">返回</el-button>
        </div>
      </div>
    </div>
    <!-- 2.中间 -->
    <div class="content">
      <!--2.2扫描信息  -->.
      <div class="scanningInfo">
        <!-- 按钮 -->
        <div class="scanningBtn">
          <div class="topInfo">
            <div v-if="isSuccess" class="topInfo1">
              <span>自动扫描中</span>
              <div class="contain">
                  <div class="zhizhen1"></div>
              </div>
              <!-- <span :style="(tableData.length < borrowedInfo.borrowNum) ? 'color:red':''">{{ num}}</span>
              <span>/{{ borrowedInfo.borrowNum ? borrowedInfo.borrowNum : 0 }}</span> -->
              <span>扫描到 {{ willReturnCount ? willReturnCount : 0 }} 台 </span>
            </div>
            <div v-else class="topInfo1">
              <span>停止扫描</span>
              <div class="contain">
                  <div class="zhizhen2"></div>
              </div>
              <span :style="(tableData.length < borrowedInfo.borrowNum) ? 'color:red':''">{{ returnNum }}</span>
              <span>/{{ borrowedInfo.borrowNum ? borrowedInfo.borrowNum : 0 }}</span>
            </div>
            <!-- <span :style="(tableData.length>borrowedInfo.borrowNum) ? 'color:red':''">{{ returnNum }}</span>
            <span>/{{ borrowedInfo.borrowNum ? borrowedInfo.borrowNum : 0 }}</span> -->
          </div>
          
        </div>
        <!-- 扫描信息 -->
        <div class="scanning">
          <!-- 此处设置了滚动条组件 -->
          <el-scrollbar>
            <!-- 3.2 设备列表-->
            <el-table
              :data="tableDataForRender"
              style="width: 100%"
              :header-cell-style="{ background: '#F5F9FC' }"
              ref="table"
            >
              <el-table-column fixed type="index" min-width="8%" label="序号" >
                  <template #default="scope">
                    {{scope.$index+1}}
                  <div class="isReturned" v-if="scope.row.borrowedStatus==3"></div>
                </template>
              </el-table-column>
              <el-table-column prop="tabletID" label="设备序列号" min-width="30%" >
                <template #default="scope">
                  <!-- {{scope.row['isscaned']}} -->
                  <div :style="(scope.row['isscaned'] || scope.row.borrowedStatus==3)? 'color:#fff':'color:red'">{{scope.row.tabletID}}</div>
                  <div class="isReturned" v-if="scope.row.borrowedStatus==3"></div>
                </template>
              </el-table-column>
              <el-table-column prop="tabletName" label="设备名称" min-width="20.5%" >
                 <template #default="scope">
                    {{scope.row.tabletName}}
                  <div class="isReturned" v-if="scope.row.borrowedStatus==3"></div>
                </template>
              </el-table-column>
              <el-table-column prop="borrowedStatus" label="设备借用状态" min-width="20.5%">
                 <!-- 自定义表头：设备状态  @change="onChange1"-->
                <template #header>
                  <el-select
                    v-model="borrowedStatusValue"
                    placeholder="设备借用状态"
                   
                    style="width: 100%"
                    popper-class="zdy_select4"
                    class="zdy"
                  >
                   <template #prefix>
                     设备借用状态
                   </template>
                    <el-option
                      v-for="item in deviceStateOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                  </el-select>
                </template>
                <template #default="scope">
                  {{ getDayStateStr(scope.row.borrowedStatus) }}
                  <div class="isReturned" v-if="scope.row.borrowedStatus==3"></div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="操作" min-width="16%">
                <!-- scope.row   -->
                <template #default="scope">
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="handReturn(scope.row)"
                    :disabled="scope.row.borrowedStatus==3 || scope.row['isscaned']"
                    :style="(scope.row.borrowedStatus==3|| scope.row['isscaned'])?'color:gray':''"
                  >
                    手动归还
                  </el-button>
                  <el-button
                    link
                    type="primary"
                    size="small"
                    @click.prevent="deleteitem(scope.row)"
                    :disabled="scope.row.borrowedStatus==3"
                    :style="scope.row.borrowedStatus==3?'color:gray':''"
                  >
                    删除
                  </el-button>
                  <div class="isReturned" v-if="scope.row.borrowedStatus==3"></div>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <!--以下为 手动添加-------弹出框  -->
          <!-- <el-dialog v-model="dialogFormVisible" title="手动添加">
            <el-form :model="form">
              <el-form-item label="选择设备&nbsp;&nbsp;&nbsp;" :label-width="formLabelWidth">
                <el-select
                  v-model="form.tabletIDs"
                  placeholder="请选择设备"
                  @change="ontabletNameChange"
                  multiple
                >
                  <el-option
                    v-for="item in deviceList"
                    :key="item.tabletID"
                    :label="item.tabletName"
                    :value="item.tabletID"
                    :disabled="ishas(item)"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="设备序列号" :label-width="formLabelWidth">
               
               <template v-for="(item1, ii) in form.tabletNames" :key="ii">{{ii==0?'':','}}
                
                  <span >{{ item1.tabletID }}</span>
                  
                </template>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="cancelHandOperated">取消</el-button>
                <el-button type="primary" @click.prevent="submitHandOperated"> 确定 </el-button>
              </span>
            </template>
          </el-dialog> -->
  </div>
</template>
<script setup >
import { ref, reactive, onMounted, onBeforeMount, computed, markRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { request, noderedrequest ,tabletRequest,tabletWSRequest} from '@/utils/server.js'
import {createWebSocket} from "@/utils/websocket.js"
var wsbaseURL=import.meta.env.VITE_BASE_URL4

// 接收url query传参
console.log('借用query传参', route.query)
// 用于ws连接参数
const repCode=route.query.verifyCode
const repMsg=route.query.repMsg

// 1.根据验证码查询预约信息接口,渲染左侧会议信息
// debugger
const getBorrowInfo = () => {
  tabletRequest
    .post('/IotDeviRevertCrtl/queryTabletRevert', {
      "verifyCode": route.query.verifyCode
    })
    .then((res) => {
      // debugger
      console.log('根据验证码查询借出的平板信息成功:',res)
      borrowedInfo.value = res.data.result
      
    })
    .catch((error) => {
      console.log('根据验证码查询借出的平板信息失败:', error)
    })
}
// 2.根据验证码查询归还数量
// debugger
const returnNum=ref(0)
const getReturnInfo = () => {
  tabletRequest
    .post('/IotBabletBorrowCrtl/queryBorrowInfo', {
      "verifyCode": route.query.verifyCode
    })
    .then((res) => {
      // debugger
      console.log('根据验证码查询归还数量成功:',res)
      returnNum.value = res.data.returnNum
      
    })
    .catch((error) => {
      console.log('根据验证码查询归还数量失败:', error)
    })
}

//1.1会议信息
const borrowedStatusValue=ref("-1")
// debugger
const tableDataForRender=computed(() => {
  // debugger
  if(borrowedStatusValue.value == -1){
    return tableData.value
  }
  return tableData.value.filter((item)=>{
    return item.borrowedStatus == borrowedStatusValue.value
  }) 
})

const num=computed(()=>{
  var count=0
    tableData.value.forEach((item)=>{
       if(item['isscaned'] || item.borrowedStatus==3){
           count++
       }
    })
    return count
})


const borrowedInfo = ref(
  {
    // "roomName": "8559878580142080",
    // "meetName": "8646084058906624",
    // "meetTime": null,
    // "userName": "维康",
    // "borrowNum": 1,
    // "borrowTime": "2023-10-08 11:00:00"
  },
)
onMounted(() => {
  getBorrowInfo()
  getList()
  getTabletList()
  //进入扫描页面，立即调用打开扫描设备接口
  openScanDevice()

  // getReturnInfo()
})
const openScanDevice=()=>{
   tabletRequest
    .post('/IotDeviRevertCrtl/startBindBorroFlow', 
      {
        "message": "ON",
        "openTopic": "A2-206/206-RFID-DOWN",
        "qos": 2,
        "topic": repMsg,
        "verifyCode":repCode 
      }
    )
    .then((res) => {
      // debugger
      if(res.data.repCode==200){
         console.log('扫描设备已打开成功:', res)
      }
    })
    .catch((error) => {
      console.log('扫描设备已打开失败:', error)
    })
}

// 建立ws连接
// debugger  
var websocket=createWebSocket(wsbaseURL+'/websocket/'+repMsg,{onopen(e){
  console.log('建立了websocket连接')
  
  // 重新调用会议室最新消息列表-----------------------
},onmessage(e){
  // debugger
  // console.log('接收服务器消息：', e.data)
  // 如果e.data是所有消息，则判断是否是当前会议室消息
  if(e.data=='HeartBeat'){
     return
  }else{
    var list = JSON.parse(e.data)
    
    list.data.forEach((item)=>{
      let it=getItemById(tableData.value,item.tabletID,'tabletID')
       if(it){
        // debugger
        it.isscaned=true
          
       }else{
        // 不在该验证码对应的设备列表中的 ，不放入归还列表
        // var itemx=JSON.parse(JSON.stringify(item))
        // itemx.isscaned=true
        // tableData.value.push(itemx)
       } 
    })
    
    // tableData.value.push(...list.data)
    // console.log('接收设备扫描信息：', tableData.value)
  }
  
},onerror(){

},onclose(){
  
},onbeforeunload(){
   
},onreconnect(ws){
  websocket=ws
 
}})

// 1.4.1 手动添加
// const formLabelWidth = '(542/1920)*100vw'
// const dialogFormVisible = ref(false)

// const form = reactive({
//   tabletName: '',
//   tabletID: ''
// })
//2.获取借出平板设备列表接口
const getList = () => {
  //查询 设备列表中，借用状态是1 ->使用中 的设备列表， 展示在手动添加的 下拉设备下拉选项中
  tabletRequest
    .post('/IotBabletBorrowCrtl/queryBorrowRetultInfo', {
      "borrowedStatus":"1",
      "verifyCode": repCode
    })
    .then((response) => {
      console.log('借出设备列表查询成功:', response.data.result)
      // debugger
      deviceList.value = response.data.result
      console.log(deviceList.value)
    })
    .catch((error) => {
      console.log('借出设备列表查询失败:', error)
    })
}
const deviceList = ref([
  // {
  //     "tabletID": "E280689400004020F535A17F",
  //     "tabletName": "平板01",
  //     "tabletModel": "A2764",
  //     "tabletBrand": "联想",
  //     "tabletIP": "172.28.5.141",
  //     "tabletPort": "17000",
  //     "tabletState": "1",
  //     "borrowedStatus": "1",
  //     "tabletOrder": 0,
  //     "verifyCode": null
  //   }
    ])
// 监听选择的设备名称，发请求获取该设备名称对应的设备序列号，展示在设备序列号输入框
// 声明手动选择的 设备id

const getItemById=(arr,id,idstr)=>{
  let rs
  for(let i=0;i<arr.length;i++){
     if(id ==arr[i][idstr] ){
        rs=arr[i]
        break
     }
  }
  return rs
}
const ontabletNameChange = (v) => {
  var arr=[]
  // debugger
  form.tabletIDs.forEach((tabletID)=>{
     var it=getItemById(deviceList.value,tabletID,'tabletID')
     if(it){
         arr.push(it)
     }
  })
  form.tabletNames=arr
}

//手动添加按钮
// const handOperated = () => {
  
//   dialogFormVisible.value = true
  
//   form.tabletNames =[]
//   form.tabletIDs = []
// }
// 取消手动添加
// const cancelHandOperated = () => {
//   dialogFormVisible.value = false
//   form.tabletNames = []
//   form.tabletIDs = []
// }

//手动归还
const handReturn=(v)=>{
  //  debugger
   v.isscaned=true
   
}

const ishas = (item) => {
  for (var i = 0; i < tableData.value.length; i++) {
    // debugger
    if (item.tabletID == tableData.value[i].tabletID) {
      return true
    }
  }
  return false
}
// 确定手动添加，将选择的设备添加到待绑定列表
// const submitHandOperated = () => {
//   // debugger
//   form.tabletNames.forEach((item)=>{
//     let it=getItemById(tableData.value,item.tabletID,'tabletID')
//        if(it){
           
//        }else{
//           var itemx=JSON.parse(JSON.stringify(item))
//           itemx.isscaned=false

//           tableData.value.push(itemx)
//        } 
//   })
  
//   // console.log('tableData000000000000000000000', tableData.value)
//   dialogFormVisible.value = false
// }

// 1.4.2 归还完成
const willReturnCount=computed(()=>{
   let count=0
   for(var i=0 ;i<tableData.value.length;i++){
    //如果tableData中有 扫描归还 或者 手动归还的数量 且借用状态不为3已归还,则累加willReturnCount
    if(tableData.value[i].isscaned==true && tableData.value[i].borrowedStatus!=3){
       count++
    }
  }
  return count
})
const postsubmitScan = () => {
  // debugger
  let returnList=[]
  
  // if(tableData.value.length==1 && tableData.value[i].isscaned==false){
  // 如 将归还数量为0,则做如下提示
  if(willReturnCount.value==0){
      ElMessage({
        type: 'info',
        message: '请扫描 或 点击【手动归还】添加要归还的设备'
      })
      return
    }
  for(var i=0 ;i<tableData.value.length;i++){
    if(tableData.value[i].isscaned==false){
      
    }else{
      returnList.push(tableData.value[i])
    }
  }

  tabletRequest
    .post('/IotDeviRevertCrtl/returnTablet', {
      "borrowNum": borrowedInfo.value.borrowNum,
      "iotBindTabletList": returnList,
      // "returnNum": 10,
      "topic":  repMsg,
      "verifyCode":repCode,
    })
    .then((res) => {
      // debugger
      console.log('平板归还绑定完成:', res)
      // 成功提示
      // debugger
      ElMessageBox.confirm(
        // '您已成功归还' + tableData.value.length + '台平板至【' + borrowedInfo.value.mtName + '】下。',
        '您已成功归还' + willReturnCount.value + '台平板!',

        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: ' 取消',
          type: 'success',
          'custom-class': 'zdyclass'
        }
      )
        .then(() => {
          // 绑定完成功，关闭确认按钮后，展示继续扫描按钮
          isSuccess.value = false

          // 调用已归还完成的设备列表接口
          getsubmitScanSuccessList()
          //调用根据验证码查询归还数量接口
          getReturnInfo()
        })
        .catch(() => {})
      //清空tableData表格
      // tableData.length = 0
    })
    .catch((error) => {
      console.log('平板归还绑定失败:', error)
    })
}

// 2. 还平板 绑定完成后 获取设备列表，并展示
const getsubmitScanSuccessList = () => {
  tabletRequest
    // .post('/IotDeviRevertCrtl/queryRevertTabletInfo', {
    .post('/IotBabletBorrowCrtl/queryBorrowRetultInfo', {
      "verifyCode":repCode,
    })
    .then((res) => {
      // debugger
      console.log('已绑定完成的设备列表获取成功:', res)
      res.data.result.forEach((item)=>{
        if(item.borrowedStatus==1){
          item.isscaned=false
        }else{
          item.isscaned=true
        }
         
      })
      tableData.value=res.data.result
    })
    .catch((error) => {
      console.log('已绑定完成的设备列表获取失败:', error)
    })
}

const isSuccess = ref(true)
const submitScan = () => {
  console.log(1111)
  if (tableData.value.length <= 0) {
    return
  }
  if (borrowedInfo.value.borrowNum - tableData.value.length < 0) {
    ElMessageBox.confirm(
        '绑定失败！请先检查数量是否超出或设备状态有【已禁用】的设备。如有请删除！',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: ' 取消',
          type: 'warning'
        }
      )
        .then(() => {})
        .catch(() => {})
    return
  }

  // 调用归还绑定接口
  postsubmitScan()
  
}


// 1.4.3继续扫描按钮
const continueScan = () => {
  isSuccess.value = true
}
// 1.4.4 返回首页
const goBack = () => {
  router.push('/tablet')
}

//2.2 打开归还页面，直接获取该验证码对应的借用设备列表，并展示
const getTabletList = () => {
  tabletRequest
    // .post('/IotDeviRevertCrtl/queryRevertTabletInfo', {
    .post('/IotBabletBorrowCrtl/queryBorrowRetultInfo', {
      "verifyCode": repCode

    })
    .then((response) => {
      console.log('验证码对应的借出设备列表查询成功:', response.data.result)
      // debugger
      response.data.result.forEach((item)=>{
          item.isscaned=false
      })
      tableData.value=response.data.result
      console.log(tableData.value)
    })
    .catch((error) => {
      console.log('验证码对应的借出设备列表查询失败:', error)
    })
}
const tableData = ref([
  // {
  //     "tabletID": "E280689400004020F535A17F",
  //     "tabletName": "平板01",
  //     "tabletModel": "A2764",
  //     "tabletBrand": "联想",
  //     "tabletIP": "172.28.5.141",
  //     "tabletPort": "17000",
  //     "tabletState": "1",
  //     "borrowedStatus": "1",
  //     "tabletOrder": 0,
  //     "verifyCode": null
  //   },
])

// ----设备借用状态
const deviceStateOptions = [
  {
    value: '-1',
    label: '全部'
  },
  // {
  //   value: 0,
  //   label: '已禁用'
  // },
  {
    value: '1',
    label: '使用中'
  },
  // {
  //   value: '2',
  //   label: '空闲中'
  // },
  {
    value: '3',
    label: '已归还'
  }
]
const getDayStateStr = (v) => {
  let a
  for (var i = 0; i < deviceStateOptions.length; i++) {
    if (v == deviceStateOptions[i].value) {
      a = deviceStateOptions[i].label
      break
    }
  }
  return a
}
//删除
const deleteitem = (v) => {
  //  debugger
  for (var i = 0; i < tableData.value.length; i++) {
    if (v.tabletID == tableData.value[i].tabletID) {
      tableData.value.splice(i, 1)
    }
  }
}

</script>
<style lang="less">
  .el-popper.zdy_select4{
      // width: calc((257/1920)*100vw - 12px)!important;
      width: calc((240/1920)*100vw)!important;
       background: #05456e!important;
       border: 0px!important;
       margin-top: -4px!important;
       margin-left: -12px!important;
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
  .left {
    width: (500/1920) * 100vw;
    margin-left: (100/1920) * 100vw;
    margin-right: (46/1920) * 100vw;
    height: 100vh;
    background-image: url(@/assets/tablet_borrowed/7.png);
    background-size: (400/1920) * 100vw (400/1920) * 100vw;
    background-repeat: no-repeat;
    background-position-x: left;
    background-position-y: (599/1080) * 100vh;
    //1.1 还平板
    .tip{
      // margin-top: (69/1080) * 100vh;
      margin-top: (60/1080) * 100vh;
      margin-bottom: (32/1080) * 100vh;
      height: (50/1080) * 100vh;
      color: rgba(255, 255, 255, 1);
      font-size: (34/1920) * 100vw;
      text-align: left;
      font-family: SourceHanSansSC-regular;
      box-sizing: border-box;
    }
    //1.2 会议信息
    .meetingInfo {
      height: (879/1080) * 100vh;
    
      padding: (40/1080) * 100vh (0/1920) * 100vw (40/1080) * 100vh (40/1920) * 100vw;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(24, 144, 255, 0.2);
      text-align: center;
      font-family: SourceHanSansSC-regular;
      box-sizing: border-box;
      position: relative;
      .first {
        width: (420/1920) * 100vw;
        // height: (98/1080) * 100vh;
        margin-top: (40/1080) * 100vh;
        margin-bottom: (40/1080) * 100vh;
        color: rgba(255, 255, 255, 1);
        font-size: (34/1920) * 100vw;
        text-align: center;
        font-family: SourceHanSansSC-regular;
        word-wrap: break-word;
      }
      .second {
        height: (77/1080) * 100vh;
        margin-bottom: (40/1080) * 100vh;

        div {
          white-space: nowrap;
          overflow: hidden;
          color: rgba(255, 255, 255, 1);
          font-size: (24/1920) * 100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }

      .third {
        height: (202/1080) * 100vh;
        margin-bottom: (40/1080) * 100vh;

        div {
          white-space: nowrap;
          overflow: hidden;
          color: rgba(255, 255, 255, 1);
          font-size: (24/1920) * 100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }
      .four {
        // height: (257/1080) * 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
        bottom: (40/1080) * 100vh;
        :deep(.el-button) {
          width: (420/1920) * 100vw;
          height: (71/1080) * 100vh;
          margin-bottom: (20/1080) * 100vh;
          margin-left: (0/1920) * 100vw!important;
          color: rgba(255, 255, 255, 1);
          border: (1/1920) * 100vw solid rgba(15, 204, 249, 1);
          border-radius: (2/1920) * 100vw;
          font-size: (34/1920) * 100vw;
          text-align: center;
          font-family: Roboto;
        }
        // :deep(.el-button):nth-child(1) {
        //   background-color: rgba(15, 204, 249, 0.3);
        //   font-size: (28/1920) * 100vw;
        // }
        //2.3绑定完成/继续扫描
        :deep(.el-button):nth-child(1) {
          background-color: rgba(24, 144, 255, 1);
        }
        :deep(.el-button):nth-child(2) {
          background-color: transparent;
          margin-bottom: (0/1080) * 100vh;
        }
      }
    }
  }

  // 2.中间区域
  .content {
    width: (1274/1920) * 100vw;
    background-image: url(@/assets/tablet_borrowed/7.png);
    background-size: (400/1920) * 100vw (400/1080) * 100vh;
    background-repeat: no-repeat;
    background-position-x: (940/1920) * 100vw;
    background-position-y: (-180/1080) * 100vh;
    //2.2 扫描信息
    .scanningInfo {
      width: (1174/1920) * 100vw;
      
      .scanningBtn {
        height: (50/1080) * 100vh;
        margin-top: (26/1080) * 100vh;
        margin-bottom: (20/1080) * 100vh;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topInfo {
          display: flex;
          align-items: center;
          .topInfo1{
            margin-right: (20/1920) * 100vw;
            display: flex;
            align-items: center;
            .contain{
              width: (54/1920) * 100vw;
              height: (54/1920) * 100vw;
              margin-left: (10/1920) * 100vw;
              margin-right: (49/1920) * 100vw;
              border: 3px solid #fff;
              border-radius: 50%;
              position: relative;
              box-sizing: border-box;
             
              display: flex;
              justify-content: center;
              align-items: center;

              @keyframes rotate {
                from {
                  transform: rotate(0deg) ;
                }
                to {
                  transform: rotate(360deg) ;
                }
              }
              .zhizhen1{
                width: (54/1920) * 100vw;
                height: (3/1920) * 100vw;
                flex: none;
                animation: rotate 4s linear infinite;
               
                &::after{
                    content: "";
                    width: 6px;
                    height: 3px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-top: -3px;
                    background-color: #011841;
                }
                &::before{
                    content: "";
                    width:calc(50% - 2px) ;
                    height: 3px;
                    position: absolute;
                    left: 2px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: #fff;
                }
                
              }
              .zhizhen2{
                width: (54/1920) * 100vw;
                height: (3/1920) * 100vw;
                flex: none;
                // animation: rotate 4s linear infinite;
               
                &::after{
                    content: "";
                    width: 6px;
                    height: 3px;
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    margin-top: -3px;
                    background-color: #011841;
                }
                &::before{
                    content: "";
                    width:calc(50% - 2px) ;
                    height: 3px;
                    position: absolute;
                    left: 2px;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: #fff;
                }
                
              }
            }
            
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
            // width: (170/1920) * 100vw;
          }

          img {
            width: (54/1920) * 100vw;
            height: (54/1920) * 100vw;
          }
        }

      }
      .scanning {
        width: 100%;
        margin-left: (-2/1920) * 100vw;
        //2.2设备列表
        :deep(.el-table) {
          height: (584/1080) * 100vh !important;
          background-color: transparent;
          font-size: (18/1920) * 100vw;
          color: rgba(255, 255, 255, 1);
          font-family: Roboto;
          .el-select {
            .el-input {
                .el-icon svg {
                  color: #fff;
              }
            }
            .el-input__wrapper{
              border-radius: 0px;
              padding: 0;
              background-color: transparent;
              box-shadow:none!important;
             
                .el-input__inner{
                  width: 6em;
                  height: 100%;
                  flex: none;
                  color: rgba(255, 255, 255, 1)!important;
                  font-size: (18/1920)*100vw;
                  text-align: center;
                  display: none;
                }
                .el-input__prefix{
                  height: 4.07407407vh !important;
                  line-height: 4.07407407vh !important;
                  color: #fff;
                  font-size:(18/1920)*100vw ;
                }
            }
            .el-input__inner {
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
         
          .el-table__inner-wrapper {
            &::before {
              background-color: transparent;
            }
            tr {
              background-color: transparent !important;
              td,
              th {
                background-color: transparent !important;
              }
            }
            .el-table__cell {
              // height: (44/1080) * 100vh;
              text-align: center;
              border-bottom: 0px !important;
              padding:(5/1080) * 100vh 0;
            }
            thead {
              color: rgba(255, 255, 255, 1);
              tr th {
                border: (5/1920) * 100vw solid transparent;
                .cell {
                  height: (44/1080) * 100vh!important;
                  line-height: (44/1080) * 100vh!important;
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
                .cell:has(.isReturned){
                  background-color: rgba(90, 90, 90, 0.2);
                }
              }
            }
          }
          
          .el-input--small .el-input__inner{
            &::-webkit-input-placeholder{
              color: #fff!important;
            }
            &::-moz-placeholder{
              color: #fff!important;;
            }
            &:-ms-input-placeholder{
              color: #fff!important;;
            }
          }
        }
      }
    }
  }

  :deep(.el-dialog) {
          width: (542/1920) * 100vw;
          // height: (327/1080) * 100vh;
          margin-top: (417/1080) * 100vh;
          .el-dialog__header {
            padding-left: (24/1920) * 100vw;
            padding-top: (14/1080) * 100vh;
            padding-bottom: (14/1080) * 100vh;
            border-bottom: 1px solid rgba(239, 239, 239, 1);
            span {
              color: rgba(0, 0, 0, 1);
              font-size: (18/1920) * 100vw;
              text-align: left;
              font-family: SourceHanSansSC-regular;
            }
            .el-dialog__headerbtn {
              // width: (18/1920)*100vw!important;
              height: (18/1080) * 100vw;
              right: (-10/1920) * 100vw;
              top: (10/1080) * 100vw;
            }
          }
          .el-dialog__body {
            padding: (24/1080) * 100vh (48/1920) * 100vw (1/1080) * 100vh (48/1920) * 100vw;
            .el-form-item {
              // height: (32/1080) * 100vh;
              margin-bottom: (36/1080) * 100vh;
              position: relative;
              .el-form-item__label {
                height: (32/1080) * 100vh;
                line-height: (47/1080) * 100vh;
                color: rgba(79, 79, 79, 1);
                font-size: (14/1920) * 100vw;
                text-align: left;
                font-family: SourceHanSansSC-regular;
              }
              .el-input__wrapper {
                // height: (42/1080) * 100vh;
                .el-input__inner {
                  font-size: (14/1920) * 100vw;
                  text-align: left;
                  font-family: SourceHanSansSC-regular;
                }
              }
              // 手动添加弹框中的序列号
              span {
                color: #4f4f4f;
                font-size: (14/1920) * 100vw;
              }
            }
            .el-form-item:nth-child(2) {
              .el-input__wrapper {
                box-shadow: none;
              }
            }
          }
          .el-dialog__footer {
            padding-top: 0px;
            & > span {
              margin-right: (127/1920) * 100vw;
              .el-button {
                width: (90/1920) * 100vw;
                height: (42/1080) * 100vh;
                // line-height: 20px;
                // margin-right: (2/1920)*100vw;
                border-radius: (2/1920) * 100vw;
                background-color: rgba(79, 168, 249, 1);
                color: rgba(255, 255, 255, 1);
                font-size: (14/1920) * 100vw;
                text-align: center;
                font-family: Roboto;
              }
              .el-button:nth-child(1) {
                color: rgba(51, 51, 51, 1);
                background-color: rgba(217, 217, 217, 1);
                border: 1px solid rgba(206, 206, 206, 1);
              }
            }
          }
  }
}
</style>
