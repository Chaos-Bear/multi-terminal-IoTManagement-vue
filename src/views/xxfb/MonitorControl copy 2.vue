<template>
  <div class="edit">
    <!-- 1. 顶部 -->
    <div class="top">
      <div class="name">
        <img src="@/assets/xxfb/screenshots/8.png" />
        <div>{{ roomName }}</div>
      </div>
      <div class="btn">
        <div @click="router.push('/xxfb-monitorlist?roomName=' + roomName + '&roomID=' + roomId)">
          <img src="@/assets/xxfb/4.png" />
          <div>返回</div>
        </div>
      </div>
    </div>
    <!-- 2. 截图及控制区 -->
    <div class="content">
      <!-- 2.1 截图 -->
      <el-scrollbar height="100%" width="443px" class="preScrollBar">
        <div class="pre">
          <div class="preTop">
            <div>发布屏状态：</div>
            <div>点击截图后自动更新</div>
          </div>
          <div class="screenshots">
            <img :src="'data:image/png;base64,' + imgSrc" />
          </div>
        </div>
      </el-scrollbar>
      <!-- 2.2 发布屏控制 -->
      <el-scrollbar height="100%" width="100%" class="editScrollBar">
        <div class="editInfo">
          <!-- 2.2.1手动控制 -->
          <div class="controlArea">
            <div class="top1">手动控制</div>
            <div class="controlInfo">
              <div class="controlItem" @click="openDevice">
                  <img src="@/assets/xxfb/screenshots/1.png" />
                  <div>开机</div>
              </div>
              <div class="controlItem" @click="shutdownDevice">
                  <img src="@/assets/xxfb/screenshots/5.png" />
                  <div>关机</div>
              </div>
              <!--规则： 如果时关机状态，那么息屏/亮屏/ 截图 功能点击无效 -->
              <div class="controlItem" @click="isrestart">
                <img  src="@/assets/xxfb/screenshots/2.png" />
                <div>重启</div>
              </div>
              <div class="controlItem"  @click="isrefresh">
                <template v-if="isrefreshValue">
                  <img src="@/assets/xxfb/screenshots/4.png" />
                  <div>截图</div>
                </template>
                <template v-else>
                  <img src="@/assets/xxfb/screenshots/7.png" />
                  <div>截图中...</div>
                </template>
              </div>
            </div>
          </div>
          <!-- 2.2.1定时开、关机 -->
          <div class="timingSwitch">
            <div class="top1">定时开、关机</div>
            <div class="controlInfo">
              <div>设备运行时间</div>
              <div>
                <el-time-select
                    v-model="timingForm.startTimeValue"
                    :max-time="timingForm.shutTimeValue"
                    start="01:00"
                    step="01:00"
                    end="23:00"
                    placeholder="开机时间"
                />～
                <el-time-select
                  v-model="timingForm.shutTimeValue"
                  :min-time="timingForm.startTimeValue"
                  start="01:00"
                  step="01:00"
                  end="23:00"
                  placeholder="关机时间"
                />
              </div>
              <div>
                <el-button type="primary" @click="timingConfirmBtn">应用</el-button>
                <el-button type="primary" @click="cancelTiming">取消应用</el-button>
                <!-- <el-button type="primary" @click="timingConfirmBtn" disabled>应用到所有发布屏</el-button> -->
                
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>

    <!--2.关机弹框  -->
    <div class="closeDialog">
      <el-dialog v-model="closeDialogVisible" title="">
        <div class="tips">
          <img src="@/assets/xxfb/screenshots/12.png" />
          <div class="tips1">关机</div>
          <span>Windows将在1分钟内关闭</span>
          <div style="color:red;'font-size':12px">提示：点击关机后，3分钟之后才能进行开机操作！</div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="cancelClose">取消</el-button>
            <el-button type="primary" @click="confirmClose">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!--2.重启弹框  -->
    <div class="closeDialog">
      <el-dialog v-model="restartDialogVisible" title="">
        <div class="tips">
          <img src="@/assets/xxfb/screenshots/12.png" />
          <div>重启</div>
          <span>Windows将在1分钟内重启</span>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="cancelRestart">取消</el-button>
            <el-button type="primary" @click="confirmRestart">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage} from 'element-plus'
import {  } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import {releaseRequest } from '@/utils/server.js'

const roomName = route.query.roomName
const roomId = route.query.roomID

const ipValue = ref('')
// 1. 根据会议室名称 查询会议室绑定的设备ip接口----------------
const getIp = () => {
  releaseRequest
    .post('/PublishFlowCtrl/queryIotDeviceByName', {
      roomName: roomName
    })
    .then((res) => {
      if (res.data.repCode == 200) {
        ipValue.value = res.data.result.deviceIP?res.data.result.deviceIP:''
      }
      console.log('获取会议室绑定设备ip成功:', res.data.result.deviceIP)
      // 调用截屏接口
      terminalControlRequest('screenshot','screen/test')
    })
    .catch((error) => {
      // debugger
      console.log('获取会议室绑定设备ip失败:', error)
      ElMessage.error(error?error:'获取会议室绑定设备ip失败')
      
    })
}
// -------2.发布屏设备控制接口-------
const imgSrc = ref('')
const terminalControlRequest = (operateType,topic) => {
  isrefreshValue.value=false
  releaseRequest
    .post('/TerminalCtrl/opert', {
      roomName: roomName,
      operate: operateType,
      openTopic: topic,
      ip: ipValue.value
    })
    .then((response) => {
      // debugger
      // console.log('发布屏设备控制成功:', response.data.result)
      if (operateType == 'screenshot' && response.data.repCode == 200) {
        imgSrc.value = ''
        imgSrc.value = response.data.result
      }
      if (operateType == 'screenshot' && response.data.repCode != 200) {
        ElMessage.error(response.data.repMsg)
      }
    })
    .catch((error) => {
      console.log('发布屏设备控制成功失败:', error)
      if (operateType == 'screenshot') {
        ElMessage.error('截图失败！')

      }
    })
    .finally(()=>{
      isrefreshValue.value = true
    })
}

// -------3.定时开关控制接口-------
const timingSwitchRequest = () => {
//   debugger
  releaseRequest
    .post('/TerminalCtrl/editTerminalTask', {
      roomName: roomName,
      startTime:timingForm.value.startTimeValue ? timingForm.value.startTimeValue.slice(0,-3) : '',
      shutTime:timingForm.value.shutTimeValue ? timingForm.value.shutTimeValue.slice(0,-3) : '',
    })
    .then((response) => {
      // debugger
      if ( response.data.repCode == 200) {
        console.log('定时开、关机设置成功:', response.data.result)
        ElMessage({
          type: 'success',
          message: '定时开、关机设置成功',
        })
      }else{
        ElMessage({
          type: 'error',
          message: response.data.repMsg,
        })
      }
      
    })
    .catch((error) => {
      console.log('定时开、关机设置失败:', error)
      ElMessage.error('定时开、关机设置失败！')
    })
}
// -------4.查询定时开关时间接口-------
const getTimingRequest = () => {
  // debugger
  releaseRequest
    .post('/TerminalCtrl/queryTerminalTask', {
      roomName: roomName,
    })
    .then((response) => {
      // debugger
      if ( response.data.repCode == 200) {
        console.log('查询定时开关机时间成功:', response.data.result)
        timingForm.value.startTimeValue=response.data.result.startTime ? (response.data.result.startTime+':00') : '';
        timingForm.value.shutTimeValue=response.data.result.shutTime ? (response.data.result.shutTime+':00') : '';
      }else{
        ElMessage({
          type: 'error',
          message: response.data.repMsg?response.data.repMsg:'',
        })
      }
      
    })
    .catch((error) => {
      console.log('查询定时开关机时间失败:', error)
      ElMessage.error('查询定时开关机时间失败！')
    })
}
onMounted(() => {
  getIp()
  
  getTimingRequest()
})

// const controlForm = ref({
//   isOpenOrCloseValue: '',
//   restartDialogVisible: '',
//   isbrightScreenValue: '',
//   isrefreshValue: ''
// })

// 1.点击开机按钮--开机
const openDevice = () => {
  // debugger
  // 调用用开机接口
  terminalControlRequest('startup','screen/test')
  
}
// 2.关机弹出框
const closeDialogVisible = ref(false)
//点击关机按钮--关机
const shutdownDevice=()=>{
  // 则展示关 弹框，然后调用关机接口
  closeDialogVisible.value = true
}
// 关机弹框中的 确认 按钮
const confirmClose = () => {
  //调用发布屏设备控制 关机接口
  terminalControlRequest('shutdown','screen/test')
  
  closeDialogVisible.value = false
}
// 关机弹框中的 取消 按钮
const cancelClose = () => {
  // terminalControlRequest('cancel','screen/test')
  closeDialogVisible.value = false
}

// 3.重启
// 重启弹出框
const restartDialogVisible = ref(false)

// 点击重启按钮
const isrestart = () => {
  restartDialogVisible.value = true
}

// 重启弹框中的 确认 按钮
const confirmRestart = () => {
  // 调用重启接口
  terminalControlRequest('restart','screen/test')

  restartDialogVisible.value = false
}
// 重启弹框中的 取消 按钮
const cancelRestart = () => {
  terminalControlRequest('cancel','screen/test')
  restartDialogVisible.value = false
}

// 4.息屏/亮屏
const isbrightScreenValue = ref(true)
const isbrightScreen = () => {
  //调用发布屏设备控制接口
  if (isbrightScreenValue.value == true) {
    // 亮屏
    terminalControlRequest('wake_screen.bat','screen/test')
  } else {
    // 息屏
    terminalControlRequest('bright_screen.bat','screen/test')
  }
  isbrightScreenValue.value = !isbrightScreenValue.value
}

// 5.截图----默认显示截图
const isrefreshValue = ref(true)
const isrefresh = () => {
  // 点击截图按钮，变为截图中...
  isrefreshValue.value = false
  terminalControlRequest('screenshot','screen/test')
}


// 2.2 定时开关机
const timingForm=ref({
  startTimeValue:'',
  shutTimeValue:"",
})
const timingConfirmBtn=()=>{
  if (
    timingForm.value.startTimeValue === null ||
    timingForm.value.startTimeValue == '' ||
    timingForm.value.shutTimeValue === null ||
    timingForm.value.shutTimeValue == ''
  ) {
    ElMessage.error('开机时间和关机时间不能为空！')
  } else if (
    timingForm.value.startTimeValue != '' &&
    timingForm.value.shutTimeValue != '' &&
    timingForm.value.startTimeValue >= timingForm.value.shutTimeValue
  ) {
    ElMessage.error('关机时间需大于开机时间！')
  } else {
    // 调用定时开关
    timingSwitchRequest()
  }
}
// 取消定时开关机
const cancelTiming=()=>{
  
}

</script>

<style lang="less" scoped>
.edit {
  height: 100%;
  margin-left: 24px;
  margin-right: 24px;
  // 1.顶部
  .top {
    height: 60px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    position: relative;
    display: flex;
    justify-content: space-between;
    justify-items: center;

    .name {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      div {
        color: rgba(16, 16, 16, 1);
        font-size: 20px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
    }
    .btn {
      height: 60px;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      & > div {
        width: 32px;
        margin-top: 6px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        div {
          width: 32px;
          height: 24px;
          color: rgba(64, 64, 64, 1);
          font-size: 16px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }
    }
  }

  //2. 截图及发布屏控制
  .content {
    height: calc(100vh - 60px);
    display: flex;
    justify-content: flex-start;

    // 左侧截图
    .preScrollBar {
      width: 443px;
      flex: none;
    }
    .pre {
      height: 100%;
      padding-left: 12px;
      padding-top: 24px;
      padding-right: 22px;
      background-color: #f5f5f5;
      .preTop {
        display: flex;
        justify-content: space-between;
        margin-right: 34px;
      }
      .screenshots {
        width: 375px;
        height: 675px;
        border: 1px solid blue;
        img {
          width: 375px;
          height: 675px;
        }
      }
    }

    //2.发布屏控制
    .editScrollBar {
      width: calc(100% - 443px);
      flex: none;
    }
    .editInfo {
      height: 100%;
      padding-left: 24px;
      // padding-right:24px ;
      display: flex;
      flex-direction: column;
      flex: 1;

      //公共部分
      .top1 {
        height: 62px;
        line-height: 62px;
        border-bottom: 1px solid rgba(51, 157, 243, 0.6);
        color: rgba(51, 157, 243, 1);
        font-size: 18px;
        white-space: nowrap;
        text-align: left;
        font-family: PingFangSC-regular;
      }
      // 2.1 手动控制
      .controlArea {
        // 2.2.1会议信息
        .controlInfo {
          display: flex;
          flex-wrap: wrap;

          .controlItem {
            // width: 180px;
            width: 170px;
            height: 120px;
            margin-top: 23px;
            margin-right: 20px;
            border-radius: 8px;
            background-color: rgba(230, 247, 255, 0.2);
            text-align: center;
            border: 1px solid rgba(24, 144, 255, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
              width: 34px;
              height: 34px;
              margin-top: 24px;
              margin-bottom: 14px;
            }
            div {
              color: rgba(16, 16, 16, 1);
              font-size: 18px;
              text-align: center;
              font-family: SourceHanSansSC-regular;
            }
            &:hover {
              border: 1px solid rgba(24, 144, 255, 0.5);
            }
          }
        }
      }
      
      // 2.2 定时开关机
      .timingSwitch {
        .top1{
          margin-top: 25px;
        }
        .controlInfo{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          &>div{
            margin-top: 24px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            :deep(.el-select){
              .el-input{
                 max-width: 200px; 
              }
            }
          }
          &>div:nth-child(1){
            width: 96px;
            height: 24px;
            margin-right: 24px;
            color: rgba(16, 16, 16, 1);
            font-size: 16px;
            text-align: left;
            font-family: SourceHanSansSC-regular;
            
          }
          &>div:nth-child(2){
            //  margin-left: 24px;
             margin-right: 34px;
          }
          &>div:nth-child(3){
            .el-button:nth-child(1){
              // border:0px;
              // background-color: #8AC7FF;
              background-color: rgba(24, 144, 255, 1);
            }
            
          } 
        }
      }
    }
  }

  // 3.关机/重启 弹出框
  .closeDialog {
    :deep(.el-dialog) {
      --el-dialog-width: 40%;
      width: 368px;
      .el-dialog__header {
      }
      .el-dialog__body {
        .tips {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
          }
          .tips1 {
            height: 26px;
            color: rgba(0, 0, 0, 1);
            font-size: 18px;
            text-align: center;
            margin-top: 24px;
            margin-bottom: 14px;
            font-family: SourceHanSansSC-regular;
          }
          span {
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
            text-align: center;
            font-family: PingFangSC-regular;
          }
         
        }
      }
      .el-dialog__footer {
        text-align: center;

        .el-button {
          width: 80px;
          height: 32px;
          line-height: 20px;
          border-radius: 2px;
          font-size: 14px;
          text-align: center;
          font-family: Roboto;
        }
        .el-button:nth-child(1) {
          background-color: rgba(217, 217, 217, 1);
          color: rgba(51, 51, 51, 1);
          border: 1px solid rgba(206, 206, 206, 1);
        }
      }
    }
  }
}
</style>
