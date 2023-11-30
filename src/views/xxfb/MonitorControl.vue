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
          <!-- 2.2.1会议信息 -->
          <div class="controlArea">
            <div class="top1">发布屏控制</div>
            <div class="controlInfo">
              <div class="controlItem" @click="isOpenOrClose">
                <img v-if="isOpenOrCloseValue" src="@/assets/xxfb/screenshots/1.png" />
                <img v-else src="@/assets/xxfb/screenshots/5.png" />
                <div v-if="isOpenOrCloseValue">开机</div>
                <div v-else>关机</div>
              </div>
              <div
                class="controlItem"
                @click="isrestart"
                :style="!isOpenOrCloseValue ? 'pointer-events: none;' : ''"
              >
                <img src="@/assets/xxfb/screenshots/2.png" />
                <div>重启</div>
              </div>
              <div
                class="controlItem"
                @click="isbrightScreen"
                :style="!isOpenOrCloseValue ? 'pointer-events: none;' : ''"
              >
                <img v-if="isbrightScreenValue" src="@/assets/xxfb/screenshots/3.png" />
                <img v-else src="@/assets/xxfb/screenshots/6.png" />
                <div v-if="isbrightScreenValue">亮屏</div>
                <div v-else>熄屏</div>
              </div>
              <div
                class="controlItem"
                @click="isrefresh"
                :style="
                  !isOpenOrCloseValue || isrefreshValue == false ? 'pointer-events: none;' : ''
                "
              >
                <img v-if="isrefreshValue" src="@/assets/xxfb/screenshots/4.png" />
                <img v-else src="@/assets/xxfb/screenshots/7.png" />
                <div v-if="isrefreshValue">截图</div>
                <div v-else>截图中...</div>
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
          <div>关机</div>
          <span>Windows将在1分钟内关闭</span>
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
import PreEdit from '@/components/xxfb/PreEdit.vue'
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { request, releaseRequest } from '@/utils/server.js'
const roomName = route.query.roomName
const roomId = route.query.roomID

const ipValue = ref('')
// 1. 根据会议室名称 查询会议室绑定的设备ip接口----------------
const getIp = (item) => {
  releaseRequest
    .post('/PublishFlowCtrl/queryIotDeviceByName', {
      roomName: roomName
    })
    .then((res) => {
      console.log('获取会议室绑定设备ip成功:', res.data.result.deviceIP)
      if (res.data.repCode == 200) {
        ipValue.value = res.data.result.deviceIP
      }

      // 调用截屏接口
      terminalControlRequest('screenshot')
    })
    .catch((error) => {
      // debugger
      console.log('获取会议室绑定设备ip失败:', error)
    })
}
// -------1.发布屏设备控制接口-------
const imgSrc = ref('')
const terminalControlRequest = (operateType) => {
  releaseRequest
    .post('/TerminalCtrl/opert', {
      // .post('', {
      operate: operateType,
      // "openTopic": "A2-206/206-RFID-UP",
      openTopic: 'screen/test',
      ip: ipValue.value
      // ip: '192.168.42.154'
    })
    .then((response) => {
      // debugger
      // console.log('发布屏设备控制成功:', response.data.result)
      if (operateType == 'screenshot' && response.data.repCode == 200) {
        imgSrc.value = ''
        imgSrc.value = response.data.result
        isrefreshValue.value = true
      }
      if (operateType == 'screenshot' && response.data.repCode != 200) {
        ElMessage.error(response.data.repMsg)
      }
    })
    .catch((error) => {
      console.log('发布屏设备控制成功失败:', error)
      if (operateType == 'screenshot') {
        ElMessage.error('截图失败！')

        isrefreshValue.value = true
      }
    })
}
onMounted(() => {
  getIp()
})

// 关机弹出框
const closeDialogVisible = ref(false)

// 1.开关机
const isOpenOrCloseValue = ref(true)
// 点击关机按钮
const isOpenOrClose = () => {
  // debugger
  // 如是开机状态点击 则展示关机弹框
  if (isOpenOrCloseValue.value == true) {
    closeDialogVisible.value = true
  } else {
    // 直接调用开机接口
    isOpenOrCloseValue.value = true
  }
}
// 关机弹框中的 确认 按钮
const confirmClose = () => {
  //调用发布屏设备控制 关机接口
  terminalControlRequest('shutdown')

  isOpenOrCloseValue.value = !isOpenOrCloseValue.value
  closeDialogVisible.value = false
}
// 关机弹框中的 取消 按钮
const cancelClose = () => {
  terminalControlRequest('cancel')
  closeDialogVisible.value = false
  isOpenOrCloseValue.value = true
}

// 2.重启
// 重启弹出框
const restartDialogVisible = ref(false)

// 点击重启按钮
const isrestart = () => {
  restartDialogVisible.value = true
}

// 重启弹框中的 确认 按钮
const confirmRestart = () => {
  // 调用重启接口
  terminalControlRequest('restart')

  restartDialogVisible.value = false
}
// 重启弹框中的 取消 按钮
const cancelRestart = () => {
  terminalControlRequest('cancel')
  restartDialogVisible.value = false
}

// 3.息屏/亮屏
const isbrightScreenValue = ref(true)
const isbrightScreen = () => {
  //调用发布屏设备控制接口
  if (isbrightScreenValue.value == true) {
    // 息屏
    terminalControlRequest('bright_screen.bat')
  } else {
    // 亮屏
    terminalControlRequest('wake_screen.bat')
  }
  isbrightScreenValue.value = !isbrightScreenValue.value
}
// 4.截图
const isrefreshValue = ref(true)
const isrefresh = () => {
  terminalControlRequest('screenshot')
  isrefreshValue.value = false
}
</script>

<style lang="less" scoped>
.edit {
  width: 100%;
  height: 100vh;
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
      width: calc(100vw - 443px);
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
      // 2.2.1会议信息
      .controlInfo {
        display: flex;
        flex-wrap: wrap;

        .controlItem {
          width: 180px;
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
          div {
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
