<template>
  <div class="autoScanning">
    <!-- 1.左-->
    <div class="left">
      <!-- 1.1取平板 -->
      <div class="tip">借用平板</div>
      <!-- 1.2会议信息 -->
      <div class="borrowedInfo">
        <!-- <div>集团2023年5月度工作例会</div>
        <div>
          <span>借用人：张小花 </span>
          <span> 借用数量：10台</span>
          <span>借用时间：6月30日 </span>
        </div> -->
        <div class="first">
          {{ borrowedInfo.meetName ? borrowedInfo.meetName : '暂无会议信息' }}
        </div>
        <div class="second">
          <div>
            会议时间：
            {{
              borrowedInfo.meetStartTime && borrowedInfo.meetEndTime
                ? borrowedInfo.meetStartTime.slice(0, -3) +
                  ' ～' +
                  borrowedInfo.meetEndTime.slice(10, -3)
                : '暂无会议时间'
            }}
          </div>
          <div>借用地点：{{ borrowedInfo.roomName ? borrowedInfo.roomName : '暂无会议地点' }}</div>
        </div>
        <div class="third">
          <div>借用人：{{ borrowedInfo.userName ? borrowedInfo.userName : '暂无借用人' }}</div>
          <div>借用数量：{{ borrowedInfo.borrowNum ? borrowedInfo.borrowNum : 0 }}台</div>
          <div>
            借用时间：
            {{
              borrowedInfo.borrowStartTime && borrowedInfo.borrowEndTime
                ? borrowedInfo.borrowStartTime.slice(0, -3) +
                  ' ～' +
                  borrowedInfo.borrowEndTime.slice(10, -3)
                : '暂无借用时间'
            }}
          </div>
        </div>
        <div class="four">
          <!-- 1.4.1手动添加 -->
          <el-button
            type="primary"
            @click="handOperated"
            :disabled="borrowedInfo.borrowNumNum - tableData.length <= 0"
            >手动添加</el-button
          >
          <!-- 1.4.2绑定完成 -->
          <!-- <div class="finishBtn"> -->
          <el-button
            type="info"
            @click="submitScan"
            v-if="isSuccess"
            :disabled="tableData.length <= 0"
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
                <div class="zhizhen1"></div>
              </div>
              <span>扫描到 {{ willBorrowCount ? willBorrowCount : 0 }} 台 </span>
            </div>
            <div v-else class="topInfo1">
              <span>停止扫描</span>
              <div class="contain">
                <div class="zhizhen2"></div>
              </div>
              <span :style="tableData.length > borrowedInfo.borrowNum ? 'color:red' : ''">{{
                tableData.length
              }}</span>
              <span>/{{ borrowedInfo.borrowNum ? borrowedInfo.borrowNum : 0 }}</span>
            </div>
          </div>
        </div>
        <!-- 设备扫描信息 -->
        <div class="scanning">
          <!-- 此处设置了滚动条组件 -->
          <!-- <el-scrollbar> -->
          <!-- 2.2 设备列表-->
          <el-table
            :data="tableDataForRender"
            style="width: 100%"
            :header-cell-style="{ background: '#F5F9FC' }"
            ref="table"
          >
            <el-table-column fixed type="index" min-width="8%" label="序号">
              <template #default="scope">
                {{ scope.$index + 1 }}
                <div class="isReturned" v-if="scope.row.borrowedStatus == 3"></div>
              </template>
            </el-table-column>
            <el-table-column prop="tabletID" label="设备序ID" min-width="30%">
              <template #default="scope">
                {{ scope.row.tabletID }}
                <div class="isReturned" v-if="scope.row.borrowedStatus == 3"></div>
              </template>
            </el-table-column>
            <el-table-column prop="tabletName" label="设备名称" min-width="20.5%">
              <template #default="scope">
                {{ scope.row.tabletName }}
                <div class="isReturned" v-if="scope.row.borrowedStatus == 3"></div>
              </template>
            </el-table-column>

            <el-table-column prop="borrowedStatus" label="设备状态" min-width="20.5%">
              <!-- 自定义表头：设备状态 -->
              <template #header>
                <el-select
                  v-model="borrowedStatusValue"
                  placeholder="设备状态"
                  style="width: 100%"
                  popper-class="zdy_select3"
                >
                  <template #prefix> 设备状态 </template>
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
                <div class="isReturned" v-if="scope.row.borrowedStatus == 3"></div>
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
                  :disabled="scope.row.borrowedStatus == 1 || scope.row.borrowedStatus == 3"
                  :style="
                    scope.row.borrowedStatus == 1 || scope.row.borrowedStatus == 3
                      ? 'color:gray'
                      : ''
                  "
                >
                  删除
                </el-button>
                <div class="isReturned" v-if="scope.row.borrowedStatus == 3"></div>
              </template>
            </el-table-column>
          </el-table>
          <!-- </el-scrollbar> -->
        </div>
        <!-- 提示 -->
        <!-- <div class="tips">
           <span>提示：</span>
           <span style="color:red;font-weight:800">红色字体</span>
           <span>表示该借出的设备未被扫描检测到；</span>
           <span style="font-weight:800">白色字体</span>
           <span>为该设备被扫描检测到或已被借出；</span>
           <span style="color:rgba(255, 255, 255, 0.6)">黑色背景行</span>
           <span>表示该借出的设备已经被归还。</span>
           
        </div> -->
      </div>
      <!--以下为 手动添加-------弹出框  -->
      <el-dialog v-model="dialogFormVisible" title="手动添加">
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
            <template v-for="(item1, ii) in form.tabletNames" :key="ii"
              >{{ ii == 0 ? '' : ',' }}
              <span>{{ item1.tabletID }}</span>
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
<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
import { tabletRequest } from '@/utils/server.js'
import { createWebSocket } from '@/utils/websocket.js'
var wsbaseURL = import.meta.env.VITE_BASE_URL4

// 接收url query传参
console.log('借用query传参', route.query)
// 用于ws连接参数
const repCode = route.query.verifyCode
const repMsg = route.query.repMsg

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
// 2.根据验证码查询归还数量
// debugger
// const returnNum=ref(0)
// const getReturnInfo = () => {
//   tabletRequest
//     .post('/IotBabletBorrowCrtl/queryBorrowInfo', {
//       "verifyCode": route.query.verifyCode
//     })
//     .then((res) => {
//       // debugger
//       console.log('根据验证码查询归还数量成功:',res)
//       returnNum.value = res.data.returnNum

//     })
//     .catch((error) => {
//       console.log('根据验证码查询归还数量失败:', error)
//     })
// }
// 3.结算已扫描到的数量
const willBorrowCount = computed(() => {
  let count = 0
  for (var i = 0; i < tableData.value.length; i++) {
    if (tableData.value[i].borrowedStatus == 2) {
      count++
    }
  }
  return count
})

const borrowedInfo = ref({
  // "roomName": "A2-205",
  // "meetName": "江苏采集2.0建设研讨会",
  // "meetStartTime": "2023-01-20 16:00:00",
  // "meetEndTime": "2023-01-20 18:00:00",
  // "userName": "维康",
  // "borrowNum": 2,
  // "borrowStartTime": "2023-10-17 08:00:00",
  // "borrowEndTime": "2023-10-17 11:00:00"
})

onMounted(() => {
  getBorrowInfo()

  // 调用该验证码以经取到的设备列表
  getsubmitScanSuccessList()
  // 进入扫描页面，立即调用打开扫描设备接口
  openScanDevice()
})
const openScanDevice = () => {
  tabletRequest
    .post('/IotBabletBindCrtl/startBindBorroFlow', {
      message: 'ON',
      openTopic: 'A2-206/206-RFID-DOWN',
      qos: 2,
      topic: repMsg,
      verifyCode: repCode
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('扫描设备已打开成功:', res)
      }
    })
    .catch((error) => {
      console.log('扫描设备已打开失败:', error)
    })
}
// 建立ws连接
// debugger
var websocket = createWebSocket(wsbaseURL + '/websocket/' + repMsg, {
  onopen(e) {
    console.log('建立了websocket连接', e)

    // 重新调用会议室最新消息列表-----------------------
  },
  onmessage(e) {
    // debugger
    // console.log('接收服务器消息：', e.data)
    // 如果e.data是所有消息，则判断是否是当前会议室消息
    if (e.data == 'HeartBeat') {
      return
    } else {
      var list = JSON.parse(e.data)

      list.data.forEach((item) => {
        let it = getItemById(tableData.value, item.tabletID, 'tabletID')
        if (!it) {
          tableData.value.push(item)
        }
      })

      // console.log('接收设备扫描信息：', tableData)
    }
  },
  onerror() {},
  onclose() {},
  onbeforeunload() {},
  onreconnect(ws) {
    websocket = ws
  }
})

// 1.4.1 手动添加
const formLabelWidth = '(542/1920)*100vw'
const dialogFormVisible = ref(false)

const form = reactive({
  tabletNames: [],
  tabletIDs: []
})
//2.获取平板设备列表接口
const getList = () => {
  //查询 设备列表中，借用状态是2 ->空闲中 设备状态是1->启用 的设备列表， 展示在手动添加的 下拉设备下拉选项中
  tabletRequest
    .post('/IotBabletEditCrtl/queryMageBablet', {
      borrowedStatus: '2',
      tabletState: 1
    })
    .then((response) => {
      console.log('空闲中设备列表查询成功:', response.data.result)
      // debugger
      deviceList.value = response.data.result
      console.log(deviceList.value)
    })
    .catch((error) => {
      console.log('按条件查询失败:', error)
    })
}
// 借用状态为空闲中的设备列表
const deviceList = ref([
  // {
  //     "tabletID": "E280689400004020F535A17F",
  //     "tabletName": "平板01",
  //     "tabletModel": "A2764",
  //     "tabletBrand": "联想",
  //     "tabletIP": "172.28.5.141",
  //     "tabletPort": "17000",
  //     "tabletState": "1",
  //     "borrowedStatus": "2",
  //     "tabletOrder": 0,
  //     "verifyCode": null
  //   }
])
// 监听选择的设备名称，发请求获取该设备名称对应的设备序列号，展示在设备序列号输入框
// 声明手动选择的 设备id
// var id
const getItemById = (arr, id, idstr) => {
  let rs
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i][idstr]) {
      rs = arr[i]
      break
    }
  }
  return rs
}
const ontabletNameChange = (v) => {
  console.log(v)
  var arr = []
  // debugger
  form.tabletIDs.forEach((tabletID) => {
    var it = getItemById(deviceList.value, tabletID, 'tabletID')
    if (it) {
      arr.push(it)
    }
  })
  form.tabletNames = arr
}
//手动添加按钮
const handOperated = () => {
  dialogFormVisible.value = true
  // debugger
  getList()

  form.tabletNames = []
  form.tabletIDs = []
}
// 取消手动添加
const cancelHandOperated = () => {
  dialogFormVisible.value = false
  form.tabletNames = []
  form.tabletIDs = []
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
const submitHandOperated = () => {
  form.tabletNames.forEach((item) => {
    let it = getItemById(tableData.value, item.tabletID, 'tabletID')
    if (it) {
    } else {
      tableData.value.push(item)
    }
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
  // 如 扫描到的数量为0,则做如下提示
  if (willBorrowCount.value == 0) {
    ElMessage({
      type: 'error',
      message: '请扫描或添加要借取的设备'
    })
    return
  }
  tabletRequest
    .post('/IotBabletBindCrtl/takeBabletBind', {
      iotBindTabletList: tableData.value,
      topic: repMsg,
      verifyCode: repCode
    })
    .then((res) => {
      // debugger
      console.log('平板借用绑定完成:', res)
      // 成功提示
      ElMessageBox.alert(
        // '您已成功绑定' + tableData.value.length + '台平板至【' + borrowedInfo.value.mtName + '】下。',
        '您已成功绑定' + willBorrowCount.value + '台平板!',

        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: ' 取消',
          type: 'success',
          'custom-class': 'zdyclass',
          'show-cancel-button': false
        }
      )
        .then(() => {
          // 绑定完成功，关闭确认按钮后，展示继续扫描按钮
          isSuccess.value = false

          // 调用已绑定完成的设备列表接口
          getsubmitScanSuccessList()
          //调用根据验证码查询归还数量接口
          // getReturnInfo()
        })
        .catch(() => {})
    })
    .catch((error) => {
      console.log('平板借用绑定失败:', error)
    })
}
// 2. 取平板 绑定完成后 获取设备列表，并展示
const getsubmitScanSuccessList = () => {
  tabletRequest
    // .post('/IotDeviRevertCrtl/queryRevertTabletInfo', {
    .post('/IotBabletBorrowCrtl/queryBorrowRetultInfo', {
      verifyCode: repCode
    })
    .then((res) => {
      // debugger
      console.log('已绑定完成的设备列表获取成功:', res)
      tableData.value = res.data.result
    })
    .catch((error) => {
      console.log('已绑定完成的设备列表获取失败:', error)
    })
}
const isSuccess = ref(true)
const submitScan = () => {
  // debugger
  console.log(1111)
  if (tableData.value.length <= 0) {
    return
  }
  if (borrowedInfo.value.borrowNum - tableData.value.length < 0) {
    ElMessageBox.alert('绑定失败！已超出总借用数量。请删除超出部分！', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      'show-cancel-button': false
    })
      .then(() => {})
      .catch(() => {})
    return
  }
  postsubmitScan()
}
// 1.4.3 返回首页
// 关闭设备接口
const closeScanDevice = () => {
  tabletRequest
    .post('/IotBabletBindCrtl/closeScannDevice', {
      message: 'OFF',
      closeTopic: 'A2-206/206-RFID-DOWN',
      qos: 2,
      retained: false
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('扫描设备已关闭成功:', res)
      }
    })
    .catch((error) => {
      console.log('扫描设备已关闭失败:', error)
    })
}
// 重置接口
const resetScanDevice = () => {
  tabletRequest
    .post('/IotBabletBindCrtl/resetDeviceBind', {
      topic: repMsg,
      verifyCode: repCode
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('重置成功:', res)
      }
    })
    .catch((error) => {
      console.log('重置失败:', error)
    })
}
const goBack = () => {
  router.push('/tablet')
  // 调用Promise.all().then(res=>{})
  Promise.all([closeScanDevice(), resetScanDevice()])
    .then((val) => {
      console.log('关闭及重置成功', val)
      // 相关操作
    })
    .catch((err) => {
      console.log('err', err)
    })
}

//2 已扫描 待绑定数组
const tableData = ref([
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
// ----设备借用状态：1：使用中  2.空闲中 0：已禁用 3已归还
const deviceStateOptions = ref([
  {
    value: '-1',
    label: '全部'
  },
  // {
  //   value: 0,
  //   label: '已禁用'
  // },
  {
    value: 1,
    label: '使用中'
  },
  {
    value: '2',
    label: '空闲中'
  },
  {
    value: '3',
    label: '已归还'
  }
])

// table列中 设备借用状态下拉 选项 刷选
const borrowedStatusValue = ref('-1')
const tableDataForRender = computed(() => {
  // debugger
  if (borrowedStatusValue.value == -1) {
    return tableData.value
  }
  return tableData.value.filter((item) => {
    return item.borrowedStatus == borrowedStatusValue.value
  })
})

// debugger
const getDayStateStr = (v) => {
  // debugger
  let a
  for (var i = 0; i < deviceStateOptions.value.length; i++) {
    if (v == deviceStateOptions.value[i].value) {
      a = deviceStateOptions.value[i].label
      // console.log(a)
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
.el-popper.zdy_select3 {
  // width: calc((261/1920)*100vw - 12px)!important;
  width: calc((240 / 1920) * 100vw) !important;
  background: #05456e !important;
  border: 0px !important;
  margin-top: -10px !important;
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
<style lang="less" scoped>
* {
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
    .tip {
      // margin-top: (69/1080) * 100vh;
      margin-top: (69/1080) * 100vh;
      margin-bottom: (32/1080) * 100vh;
      height: (50/1080) * 100vh;
      color: rgba(255, 255, 255, 1);
      font-size: (34/1920) * 100vw;
      text-align: left;
      font-family: SourceHanSansSC-regular;
      box-sizing: border-box;
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
        height: (257/1080) * 100vh;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        position: absolute;
        bottom: (40/1080) * 100vh;
        :deep(.el-button) {
          width: (420/1920) * 100vw;
          height: (71/1080) * 100vh;
          margin-bottom: (20/1080) * 100vh;
          margin-left: (0/1920) * 100vw !important;
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
        margin-bottom: (22/1080) * 100vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .topInfo {
          display: flex;
          align-items: center;
          .topInfo1 {
            margin-right: (20/1920) * 100vw;
            display: flex;
            align-items: center;
            .contain {
              width: (54/1920) * 100vw;
              height: (54/1920) * 100vw;
              margin-left: (10/1920) * 100vw;
              border: 3px solid #fff;
              border-radius: 50%;
              position: relative;
              box-sizing: border-box;
              margin-right: (30/1920) * 100vw;
              display: flex;
              justify-content: center;
              align-items: center;

              @keyframes rotate {
                from {
                  transform: rotate(0deg);
                }
                to {
                  transform: rotate(360deg);
                }
              }
              .zhizhen1 {
                width: (54/1920) * 100vw;
                height: (3/1920) * 100vw;
                flex: none;
                animation: rotate 4s linear infinite;

                &::after {
                  content: '';
                  width: 6px;
                  height: 3px;
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  margin-top: -3px;
                  background-color: #011841;
                }
                &::before {
                  content: '';
                  width: calc(50% - 2px);
                  height: 3px;
                  position: absolute;
                  left: 2px;
                  top: 50%;
                  transform: translateY(-50%);
                  background-color: #fff;
                }
              }
              .zhizhen2 {
                width: (54/1920) * 100vw;
                height: (3/1920) * 100vw;
                flex: none;
                // animation: rotate 4s linear infinite;

                &::after {
                  content: '';
                  width: 6px;
                  height: 3px;
                  position: absolute;
                  left: 0;
                  top: 50%;
                  transform: translateY(-50%);
                  margin-top: -3px;
                  background-color: #011841;
                }
                &::before {
                  content: '';
                  width: calc(50% - 2px);
                  height: 3px;
                  position: absolute;
                  left: 2px;
                  top: 50%;
                  transform: translateY(-50%);
                  background-color: #fff;
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
            .el-input__wrapper {
              height: (44/1080) * 100vh;
              border-radius: 0px;
              padding: 0;
              background-color: transparent;
              box-shadow: none !important;
              .el-input__inner {
                width: 6em;
                height: 100%;
                flex: none;
                color: rgba(255, 255, 255, 1) !important;
                font-size: (18/1920) * 100vw;
                text-align: center;
                display: none;
              }
              .el-input__prefix {
                height: 4.07407407vh !important;
                line-height: 4.07407407vh !important;
                color: #fff;
                font-size: (18/1920) * 100vw;
              }
            }
            .el-input__suffix-inner > :first-child {
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
              // height: (44/1080) * 100vh!important;
              text-align: center;
              border-bottom: 0px !important;
              padding: (5/1080) * 100vh 0;
            }
            thead {
              color: rgba(255, 255, 255, 1);
              tr th {
                border: (5/1920) * 100vw solid transparent;
                .cell {
                  height: (44/1080) * 100vh !important;
                  line-height: (44/1080) * 100vh !important;
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
                .cell:has(.isReturned) {
                  background-color: rgba(90, 90, 90, 0.2);
                  color: rgba(255, 255, 255, 0.6);
                }
              }
            }
          }
        }
      }
      //提示
      .tips {
        margin-top: (24/1080) * 100vh;
        span {
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        span:nth-child(4) {
          display: inline-block;
          height: (40/1080) * 100vh;
          line-height: (40/1080) * 100vh;
          background-color: rgba(90, 90, 90, 0.2);
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

// 提示取消按钮
:deep(.el-overlay.is-message-box) {
  .el-message-box__btns {
    .el-button {
      display: none !important;
      border: 0px;
    }
  }
}
</style>
