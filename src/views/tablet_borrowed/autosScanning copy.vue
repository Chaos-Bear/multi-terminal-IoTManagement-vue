<template>
  <div class="autoScanning">
    <!-- 1.左-->
    <div class="left">
      <!-- 1.1取平板 -->
      <div class="tip">取平板</div>
      <!-- 1.2会议信息 -->
      <div class="borrowedInfo">
        <!-- <div>集团2023年5月度工作例会</div>
        <div>
          <span>借用人：张小花 </span>
          <span> 借用数量：10台</span>
          <span>借用时间：6月30日 </span>
        </div> -->
        <div class="first">{{ borrowedInfo.mtName  ? borrowedInfo.mtName : "无会议信息" }}</div>
        <div class="second">
          <div>
            会议时间：
            <!-- {{
              borrowedInfo.borrowStartTime.slice(0, -3) +
              ' ～' +
              borrowedInfo.borrowEndTime.slice(10, -3)
            }} -->
          </div>
          <div>借用地点：A2-110</div>
        </div>
        <div class="third">
          <div>借用人：{{ borrowedInfo.userName }}</div>
          <div>借用数量：{{ borrowedInfo.borrowNum ? borrowedInfo.borrowNum : 0 }}台</div>
          <div>
            借用时间：
            <!-- {{
              borrowedInfo.borrowStartTime.slice(0, -3) +
              ' ～' +
              borrowedInfo.borrowEndTime.slice(10, -3)
            }} -->
          </div>
        </div>
        <div class="four">
          <!-- 1.4.1手动添加 -->
          <el-button
            type="primary"
            @click="handOperated"
            :disabled="
              borrowedInfo.quantityBorrowed == borrowedInfo.usedNum ||
              borrowedInfo.quantityBorrowed - borrowedInfo.usedNum - tableData.length <= 0
            "
            >手动添加</el-button
          >
          <!-- 1.4.2绑定完成 -->
          <!-- <div class="finishBtn"> -->
          <el-button
            type="info"
            @click="submitScan"
            v-if="isSuccess"
            :disabled="
              borrowedInfo.quantityBorrowed == borrowedInfo.usedNum ||
              borrowedInfo.quantityBorrowed - borrowedInfo.usedNum - tableData.length < 0 ||
              tableData.length <= 0
            "
            >绑定完成</el-button
          >
          <el-button v-else @click="continuetScan">继续扫描</el-button>

          <el-button type="primary" @click="goBack">返回</el-button>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- 2.中间 -->
    <div class="content">
      <!--2.1扫描信息  -->.
      <div class="scanningInfo">
        <!-- 按钮 -->
        <div class="scanningBtn">
          <div class="topInfo">
            <div v-if="isSuccess" class="topInfo1">
              <span>自动扫描中</span>
              <!-- <img src="@/assets/tablet_borrowed/11.png" /> -->
              <div class="contain">
                  <div class="zhizhen"></div>
              </div>
            </div>
            <div v-else>
              <span>绑定完成</span>
            </div>
            <span>{{ borrowedInfo.usedNum + tableData.length }}</span>
            <span>/{{ borrowedInfo.quantityBorrowed?borrowedInfo.quantityBorrowed:0 }}</span>
          </div>
        </div>
        <!-- 设备扫描信息 -->
        <div class="scanning">
          <!-- 此处设置了滚动条组件 -->
          <el-scrollbar>
            <!-- 2.2 设备列表-->
            <el-table
              :data="tableData"
              style="width: 100%"
              :header-cell-style="{ background: '#F5F9FC' }"
              ref="table"
            >
              <el-table-column fixed type="index" min-width="14%" label="序号" />
              <el-table-column prop="tabletID" label="设备序ID" min-width="24%" />
              <el-table-column prop="tabletName" label="设备名称" min-width="20.5%" />
              <el-table-column prop="tabletState" label="设备状态" min-width="20.5%">
                <!-- 自定义表头：设备状态 -->
                <template #header>
                  <el-select
                    :model-value="tabletState"
                    placeholder="设备状态"
                    @change="onChange1"
                    style="width: 100%"
                    popper-class="zdy_select3"
                  >
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
                  {{ getDayStateStr(scope.row.tabletState) }}
                </template>
              </el-table-column>
              <el-table-column prop="" label="操作" min-width="16%">
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
          </el-scrollbar>
        </div>
      </div>
      <!--以下为 手动添加-------弹出框  -->
    <el-dialog v-model="dialogFormVisible" title="手动添加">
      <el-form :model="form">
        <el-form-item label="选择设备&nbsp;&nbsp;&nbsp;" :label-width="formLabelWidth">
          <el-select
            v-model="form.deviceName"
            placeholder="请选择设备"
            @change="onDeviceNameChange"
            multiple
          >
            <el-option
              v-for="item in deviceList"
              :key="item.id"
              :label="item.deviceName"
              :value="item.id"
              :disabled="ishas(item)"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备序列号" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.modelNumber" autocomplete="off" /> -->
          <template v-for="(item1, ii) in form.deviceName" :key="ii">{{ii==0?'':','}}
            <template v-for="(item, i) in deviceList" :key="i">
              <span v-if="item.id == item1">{{ item.modelNumber }}</span>
            </template>
          </template>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHandOperated">取消</el-button>
          <el-button type="primary" @click="submitHandOperated"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    </div>
  </div>
</template>
<script setup >
import { ref, reactive, onMounted, onBeforeMount, computed, markRaw } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { request, noderedrequest ,tabletRequest} from '@/utils/server.js'
import {createWebSocket} from "@/utils/websocket.js"
import { dataType } from 'element-plus/es/components/table-v2/src/common'

// 接收url query传参
console.log('借用query传参', route.query)
// 用于ws连接参数
const repCode=route.query.verifyCode
const repMsg=route.query.repMsg

// 1. 取平板前通过借还验证码查询预约信息接口,渲染左侧会议信息
const getBorrowInfo = () => {
  tabletRequest
    .post('/IotBabletBindCrtl/queryBindInfo', {
      verifyCode: route.query.verifyCode
    })
    .then((res) => {
      // debugger
      borrowedInfo.value = res.data.result
    })
    .catch((error) => {
      console.log('当日借用信息按条件查询失败:', error)
    })
}
const borrowedInfo = ref({
  "roomName": "8559878580142080",
  "meetName": "8646084058906624",
  "meetTime": null,
  "userName": "维康",
  "borrowNum": 2,
  "borrowStartTime": "2023-10-08 11:00:00",

  "borrowEndTime": "2023-10-08 17:00:00",
  "mtName":""   //会议名称
})

onMounted(() => {
  getBorrowInfo()
  
  // 进入扫描页面，立即调用打开扫描设备接口
  openScanDevice()
})
const openScanDevice=()=>{
   tabletRequest
    .post('/IotBabletBindCrtl/startBindBorroFlow', 
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
var websocket=createWebSocket('ws://10.31.0.251:8082/tablet-borrowed-service/websocket/'+repMsg,{onopen(e){
 
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
    
    tableData.length=0
    tableData.push(...list.data)
   
    console.log('接收设备扫描信息：', tableData)
  }
  
},onerror(){

},onclose(){
  
},onbeforeunload(){
   
},onreconnect(ws){
  websocket=ws
 
}})

// 1.4.1 手动添加
const formLabelWidth = '(542/1920)*100vw'
const dialogFormVisible = ref(false)

const form = reactive({
  deviceName: '',
  modelNumber: ''
})
const deviceList = ref([{
  id:1,deviceName:1
},{
  id:2,deviceName:2
},{
  id:3,deviceName:3
}])
// 监听选择的设备名称，发请求获取该设备名称对应的设备序列号，展示在设备序列号输入框
// 声明手动选择的 设备id
var id
const onDeviceNameChange = (v) => {
  form.deviceName = v
}
//手动添加按钮
const handOperated = () => {
  if (
    borrowedInfo.value.quantityBorrowed == borrowedInfo.value.usedNum ||
    borrowedInfo.value.quantityBorrowed - borrowedInfo.value.usedNum - tableData.length <= 0
  ) {
    return
  }
  dialogFormVisible.value = true
  getList()
  form.deviceName = ''
  form.modelNumber = ''
}
// 取消手动添加
const cancelHandOperated = () => {
  dialogFormVisible.value = false
  form.deviceName = ''
  form.modelNumber = ''
}
const ishas = (item) => {
  for (var i = 0; i < tableData.length; i++) {
    // debugger
    if (item.id == tableData[i].id) {
      return true
    }
  }
  return false
}
// 确定手动添加，将选择的设备添加到待绑定列表
const submitHandOperated = () => {
  //-----调用查询设备接口  -----根据手动选择的设备名称
  console.log('form.deviceName：', form.deviceName)
  // noderedrequest.get('/device/list?id='+form.deviceName)
  noderedrequest
    .post('/device/list', {
      id: form.deviceName
    })
    .then((response) => {
      // debugger
      console.log('查询手动选择的设备:', response.data)

      // tableData.length = 0
      //使用push方法:结构后再赋值
      tableData.push(...response.data.data.items)
      console.log('tableData', tableData)
    })
    .catch((error) => {
      console.log('按条件查询失败:', error)
    })
  dialogFormVisible.value = false
}

// 继续扫描按钮
const continuetScan = () => {
  isSuccess.value = true
}

// 1.4.2 绑定完成
// 同时调用更新设备接口 借用状态->2使用中，和 更新平板预约借用接口 借用状态->3借用中 （隐含调用无纸化接口）
// 1. 取平板 绑定完成 请求接口
const postsubmitScan = () => {
  tabletRequest
    .post('/IotBabletBindCrtl/takeBabletBind', {
      "bindNum": 0,
      "iotBindTabletList": tableData,
      "topic": repMsg,
      "verifyCode":repCode,
    })
    .then((res) => {
      // debugger
      console.log('平板借用绑定完成:', res)
      
    })
    .catch((error) => {
      console.log('平板借用绑定失败:', error)
    })
}
const isSuccess = ref(true)
const submitScan = () => {
  // debugger
  console.log(1111)
  if (tableData.length <= 0) {
    return
  }
  if (
    borrowedInfo.value.quantityBorrowed == borrowedInfo.value.usedNum ||
    borrowedInfo.value.quantityBorrowed - borrowedInfo.value.usedNum - tableData.length < 0
  ) {
    return
  }
  postsubmitScan()
  // var PromiseArr = []
  // 发请求
  // 根据 手动选择的设备id ,和志培确认要不要将设备状态从 可借用->使用中
  // for (var i = 0; i < tableData.length; i++) {
  //   PromiseArr.push(
  //     // 更新设备接口设备
  //     noderedrequest.put('/device/update', {
  //       id: tableData[i].id,
  //       //借用状态 在此时->2 使用中
  //       tabletState: '2'
  //     }),
  //     // 更新平板预约借用接口
  //     noderedrequest.put('/tablet_borrowed/update', {
  //       id: route.query.id,
  //       //借用状态 在此时->3 借用中
  //       tabletState: '3',
  //       // 可借用数量
  //       usedNum: borrowedInfo.value.usedNum + tableData.length
  //       // "avaiableNum": null
  //     })
  //   )

  //   // .then(res=>{
  //   //   console.log("设备列表修改成功:",res)
  //   //   if(res.data.code==200){
  //   //     //重新发请求，渲染设备列表
  //   //     getList()
  //   //   }
  //   // });

  //   // .then(res=>{
  //   //   console.log("设备列表修改成功:",res)
  //   //   if(res.data.code==200){
  //   //     //重新发请求，渲染设备列表
  //   //     getList()
  //   //   }
  //   // });
  // }
  Promise.all(PromiseArr)
    .then(function (posts) {
      console.log('ok')
      console.log('Contents: ' + posts)
      getBorrowInfo()
      // 成功提示
      ElMessageBox.confirm(
        '您已成功绑定' + tableData.length + '台平板至【' + borrowedInfo.value.mtName + '】下。',
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
        })
        .catch(() => {})
      //清空tableData表格
      tableData.length = 0
    })
    .catch(function (reason) {
      console.log('出错了', reason)
      //失败提示
      ElMessageBox.confirm(
        '绑定失败！请先删除状态为【已借用】、【不可用】、【已超出】的设备！',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: ' 取消',
          type: 'warning'
        }
      )
        .then(() => {})
        .catch(() => {})
    })
}
// 1.4.3 返回首页
const goBack = () => {
  router.push('/tablet')
}


//2.获取平板设备列表接口
const getList = () => {
  //查询 设备列表中，借用状态是1 ->可用设备 的设备列表，设备状态1 ->启用 设备类型"deviceType": 1  展示在手动添加的 下拉设备下拉选项中
  // noderedrequest.get('/device/list?tabletState=1&deviceState=1')
  noderedrequest
    .post('/device/list', {
      tabletState: 1,
      deviceState: 1,
      deviceType: 1
    })
    .then((response) => {
      console.log('按条件查询成功:', response.data)
      // debugger
      // tableData.length = 0
      //使用push方法:结构后再赋值
      deviceList.value = response.data.data.items
      console.log(deviceList.value)
    })
    .catch((error) => {
      console.log('按条件查询失败:', error)
    })
}

//2 已扫描 待绑定数组
const tableData = reactive([
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
  //     "tabletState": "可借用",
  //     "deviceType": "移动设备"
  // },
  // {
  //     "borrowedStatus": "2",
  //     "tabletBrand": "华为",
  //     "tabletID": "E280689400005020F535A57F",
  //     "tabletIP": "10.31.0.227",
  //     "tabletModel": "1",
  //     "tabletName": "平板01",
  //     "tabletOrder": 0,
  //     "tabletPort": "3308",
  //     "tabletState": "1"
  // }
])
// ----设备借用状态
const deviceStateOptions = ref([
  {
    value: 0,
    label: '已禁用'
  },
  {
    value: 1,
    label: '空闲中'
  },
  {
    value: '2',
    label: '使用中'
  }
])
// debugger
const getDayStateStr = (v) => {
  // debugger
  let a
  for (var i = 0; i < deviceStateOptions.value.length; i++) {
    if (v == deviceStateOptions.value[i].value) {
      a = deviceStateOptions.value[i].label
      console.log(a)
      break
    }
  }
  return a
}

//删除
const deleteitem = (v) => {
  //  debugger
  for (var i = 0; i < tableData.length; i++) {
    if (v.id == tableData[i].id) {
      tableData.splice(i, 1)
    }
  }
}
</script>
<style lang="less">
  .el-popper.zdy_select3{
      // width: calc((261/1920)*100vw - 12px)!important;
      width: calc((240/1920)*100vw)!important;
       background: #05456e!important;
       border: 0px!important;
       margin-top: -10px;
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
*{
  margin: 0;
  // padding: 0;
}
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
    //1.1 取平板
    .tip{
      // margin-top: (69/1080) * 100vh;
      margin-top: (57/1080) * 100vh;
      margin-bottom: (22/1080) * 100vh;
      height: (50/1080) * 100vh;
      color: rgba(255, 255, 255, 1);
      font-size: (34/1920) * 100vw;
      text-align: left;
      font-family: SourceHanSansSC-regular;
    }
    //1.2 会议信息
    .borrowedInfo {
      height: (879/1080) * 100vh;
      // border: 1px solid red;
      
      padding: (40/1080) * 100vh (0/1920) * 100vw (40/1080) * 100vh (40/1920) * 100vw;
      color: rgba(255, 255, 255, 1);
      background-color: rgba(24, 144, 255, 0.2);
      text-align: center;
      font-family: SourceHanSansSC-regular;

      .first {
        width: (420/1920) * 100vw;
        // height: (98/1080) * 100vh;
        margin-top: (40/1080) * 100vh;
        margin-bottom: (40/1080) * 100vh;
        color: rgba(255, 255, 255, 1);
        font-size: (34/1920) * 100vw;
        text-align: center;
        font-family: SourceHanSansSC-regular;
      }
      .second {
        height: (77/1080) * 100vh;
        margin-bottom: (40/1080) * 100vh;

        div {
          white-space: nowrap;
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
          color: rgba(255, 255, 255, 1);
          font-size: (24/1920) * 100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }
      .four {
        height: (257/1080) * 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
        :deep(.el-button):nth-child(1) {
          background-color: rgba(15, 204, 249, 0.3);
          font-size: (28/1920) * 100vw;
        }
        //2.3绑定完成/继续扫描
        :deep(.el-button):nth-child(2) {
          background-color: rgba(24, 144, 255, 1);
        }
        :deep(.el-button):nth-child(3) {
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
        // margin-bottom: (22/1080) * 100vh;
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
              .zhizhen{
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
            width: (170/1920) * 100vw;
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
              height: (44/1080)*100vh;
              border-radius: 0px;
              padding: 0;
              background-color: transparent;
              box-shadow:none!important;
                .el-input__inner{
                  width: 5em;
                  height: 100%;
                  flex: none;
                  color: rgba(255, 255, 255, 1)!important;
                  font-size: (18/1920)*100vw;
                  text-align: center;
                }
            }
            .el-input__suffix-inner>:first-child {
                // margin-left: 0px; 
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
              height: (44/1080) * 100vh!important;
              text-align: center;
              border-bottom: 0px !important;
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
                  background-color: rgba(24, 144, 255, 0.1);
                  margin-right: (10/1920) * 100vw;
                }
              }
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
