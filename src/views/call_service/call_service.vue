<template>
  <div class="call_service_style">
    <div class="call_service">
      <el-scrollbar class="content">
        <el-container>
          <el-header style="height: 8.148vh">
            <div style="width: 14.494vw; height: 5.277vh; margin: 0 auto">
              <span class="call_service_title">
                <b>呼叫服务管理端</b>
              </span>
            </div>
          </el-header>
          <el-container>
            <!-- 1. 侧边栏 -->
            <el-aside style="width: 19.167vw; height: 83.33vh; margin-left: 1.1212vw;flex-grow:0">
              <!-- 1.1 搜索框 -->
              <el-scrollbar always height="83.33vh" view-class="call_service_scrollbar">
                <div class="search">
                  <el-input
                    v-model="input1"
                    class="w-50 m-2"
                    placeholder="搜索"
                    :prefix-icon="Search"
                    @input="inputChange"
                  />
                </div>
                <!-- 1.1.1 搜索列表-->
                <div v-if="input1 != ''" class="searchList">
                  <div>会议室 ({{ roomNameList.length }})</div>
                  <!-- 搜索到的会议室 -->
                  <div>
                    <div v-for="(item, i) in roomNameList" @click="searchClick(item.data)" :key="i">
                      <!-- <span class="jianxie">210</span>
                      <span class="roomName">A2-210会议室</span> -->
                      <span class="jianxie">{{ item.roomName.split('-')[1] }}</span>
                      <span class="roomName">{{ item.roomName }}会议室</span>
                    </div>
                  </div>
                </div>
                <!-- 1.2  根据chatState的已读/未读 ，判断是否显示红点 -->
                <div
                  v-else
                  :id="'roomID' + item.roomID"
                  :class="[
                    'roomList',
                    currentMeetingIndex == item.roomID ? 'active' : '',
                    item && item.chatState && item.chatState != '已读' ? 'hasmsg' : ''
                  ]"
                  v-for="(item, i) in roomInfo"
                  @click="clickRoomName(item)"
                  :key="i"
                >
                  <!-- 会议室名称 -->
                  <div class="roominfo">
                    <span>{{ item.roomName.split('-')[1] }}</span>
                    <span>{{ item.roomName }}会议室</span>
                    <span>{{
                      item.chatTime &&
                      (item.chatTime.indexOf(dayTime) == -1
                        ? item.chatTime.split(' ')[0]
                        : item.chatTime.split(' ')[1].slice(0, -3))
                    }}</span>
                  </div>
                  <!-- 最近的聊天信息 -->
                  <div class="msgInfo">
                    <span>{{ item.lastChat }}</span>
                  </div>
                </div>
              </el-scrollbar>
            </el-aside>
            <!--  2.中间聊天部分-->
            <el-main>
              <div>
                <div style="height: 12.9629vh">
                  <!-- 2.1 中间 顶部-->
                  <div class="centerHeader">
                    <!-- 2.0 消息记录提示 -->
                    <div class="tip">
                      <img src="@/assets/call_service/2.png" />
                      <span>仅支持查看6个月内的消息记录哦</span>
                    </div>
                    <!-- 2.1 会议状态 -->
                    <div class="meetingState">
                      <div class="call_service_main_num">
                        <!-- 2.1 中间 顶部圆圈展示数据 -->
                        <span>
                          {{
                            meetingInfo.obj.roomName ? meetingInfo.obj.roomName.split('-')[1] : ''
                          }}</span
                        >
                        <!-- <span style="vertical-align: middle"> 225 </span> -->
                      </div>

                      <!-- 2.1 中间 顶部会议消息 -->
                      <div class="centerMeetingInfo">
                        <div>
                          <div>
                            {{ meetingInfo.obj.roomName }}
                          </div>
                          <div class="meetingInfo2">
                            <!-- 会议状态/会议名称/会议开始-结束时间 -->
                            <span class="call_service_span_img" style="width: 6.06vw">
                              <span class="call_service_img call_service_online_img_meeting"></span>
                              {{ meetingInfo.obj.meetStat }}
                            </span>
                            <span class="call_service_span_img">
                              <span class="call_service_img call_service_online_img_rank"></span>
                              {{ meetingInfo.obj.meetName }}
                            </span>
                            <span class="call_service_span_img">
                              <span class="call_service_img call_service_online_img_time"></span>
                              {{ meetingInfo.obj.meetTime }}
                              <!-- 2023.6.28 9:00 ~ 12:00 -->
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-divider style="margin-bottom: 2.7777vh" />
                  <div style="flex: 1">
                    <el-scrollbar
                      :class="['custom-el-scrollbar', isShow ? 'active' : '']"
                      ref="scrollbarRef"
                      always
                      scrollTo="1000"
                      @scroll="onScroll"
                    >
                      <!--2.2 中间 中部消息展示区  -->
                      <div class="call_service_msg_area">
                        <template v-for="(item, i) in historyMsgList" :key="i">
                          <!-- 2.2.1 他人消息 -->
                          <!-- <div class="othersMsg" v-if="item.userID != route.query.userID"> -->
                          <div class="othersMsg" v-if="item.userID != userId">
                            <div class="call_service_chat_messages_name">
                              <span>{{ item.userName ? item.userName : 'NARI' }}</span>
                              <span>{{
                                item.chatTime.indexOf(dayTime) == -1
                                  ? item.chatTime.slice(0, -3)
                                  : item.chatTime.split(' ')[1].slice(0, -3)
                              }}</span>
                            </div>
                            <div class="msgcont">
                              <div class="call_service_chat_messages">
                                <div
                                  class="call_service_chat"
                                  style="border-radius: 0 20px 20px 20px"
                                >
                                  <span>{{ item.chatMsg }} </span>
                                </div>
                              </div>
                              <!-- <div>{{ item.chatTime.indexOf(dayTime)==-1 ? item.chatTime.slice(0,-3):item.chatTime.split(" ")[1].slice(0,-3)}}</div> -->
                            </div>
                          </div>
                          <!-- 2.2.2 自己消息 v-if="item.chatTime!=historyMsgList[i+1].chatTime"-->
                          <div class="myMsg" v-else>
                            <div class="call_service_chat_messages_name">
                              <span>{{ item.userName ? item.userName : item.userID }} </span>
                              <span>{{
                                item.chatTime.indexOf(dayTime) == -1
                                  ? item.chatTime.slice(0, -3)
                                  : item.chatTime.split(' ')[1].slice(0, -3)
                              }}</span>
                            </div>
                            <div class="mymsgcont">
                              <div class="call_service_chat_messages">
                                <div class="call_service_chat">
                                  <span> {{ item.chatMsg }}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <!--  显示'历史记录'字样：根据会议meetID 的不同，判断是否显示，如果只有一个会议的历史记录，则没法判断----不显示 -->
                          <!-- <div class="historyInfo" v-if="item.lastw||(i<historyMsgList.length-1 && item.meetID != historyMsgList[i+1].meetID)"> -->
                          <div
                            class="historyInfo"
                            v-if="
                              i < historyMsgList.length - 1 &&
                              item.meetID != historyMsgList[i + 1].meetID
                            "
                          >
                            <span>
                              — 以上为{{ item.chatTime.slice(0, -3) }}场次呼叫服务历史记录 —
                            </span>
                          </div>
                        </template>

                        <!-- 2.2.3 暂无记录 -->"
                        <div class="noMessageRecode" v-if="historyMsgList.length <= 0">
                          <span> 暂无记录 </span>
                        </div>
                        <!-- <div class="historyInfo" v-else>
                            <span>
                              —  以上为{{ showHis[0].meetTime}}场次呼叫服务历史记录  —
                            </span>
                        </div>    -->
                      </div>
                    </el-scrollbar>
                  </div>
                  <el-divider />
                  <!-- 2.3 中间 底部发送消息区域 -->
                  <div :class="['centerBottom', isShow ? 'active1' : '']">
                    <div class="inputMsgInfo">
                      <el-button @click="commonLanguage">
                        <ChatDotRound class="chatimg" />
                        <span>常用语</span>
                      </el-button>

                      <el-input
                        class="call_service_input_msg"
                        size="large"
                        placeholder="新信息"
                        v-model="inputMsg"
                        @keyup.enter="onChangeMsgInfo($event)"
                      />
                      <el-button type="primary" @click="onChangeMsgInfo($event)">发送</el-button>
                    </div>
                    <!--2. 点击常用语  -->
                    <el-scrollbar v-if="isShow" height="17.777vh">
                      <ul>
                        <li
                          v-for="(item, i) in commonLanguageArr"
                          @click="onCommonMsgInfo($event)"
                          :key="i"
                        >
                          {{ item }}
                        </li>
                      </ul>
                    </el-scrollbar>
                  </div>
                </div>
              </div>
            </el-main>
            <!-- 3.右侧 楼层展示 23.5vw;-->
            <el-aside
              style="width: 26.4vw; height: 83.33vh; background-color: #022659; flex-grow: 0"
            >
              <el-scrollbar
                style="background-color: #022151"
                always
                height="83.33vh"
                view-class="call_service_scrollbar"
              >
                <el-collapse
                  style="padding: 0.9259vh 1.01vw;color='#fff'"
                  v-for="(item, i) in floorInfo"
                  :key="i"
                  v-model="activeNames"
                >
                  <!-- 楼层 -->
                  <el-collapse-item style="color: #ffffff" :title="item.roomFloor" :name="i">
                    <!-- 各个会议室 -->
                    <div
                      v-for="(item1, i1) in item.callIoTDeviceList"
                      class="sensingInfo"
                      :key="i1"
                    >
                      <span class="call_service_floor_span">{{
                        item1 && item1.roomName ? item1.roomName : '暂无'
                      }}</span>
                      <span class="call_service_floor_span"
                        >温度:{{ item1 && item1.roomTemp ? item1.roomTemp : '暂无' }}</span
                      >
                      <span class="call_service_floor_span"
                        >湿度:{{ item1 && item1.roomHum ? item1.roomHum : '暂无' }}</span
                      >
                      <!-- <span class="call_service_floor_span">灯光:{{item1.roomLhtStat?"已开启":"已关闭"}}</span> -->
                      <span class="call_service_floor_span"
                        >灯光:{{ item1.roomDoLkStat >=100  ? '已开启' : '已关闭' }}
                        <!-- <el-switch
                          class="ml-2"
                          size="small"
                          v-model="item1.roomLhtStat"
                          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                          active-text=""
                          inactive-text=""
                          active-value="ON"
                          inactive-value="OFF"
                          @change="
                            (v) => {
                              isOpen(v, item1)
                            }
                          "
                        /> -->
                      </span>
                      <!-- 系统 使用的灯光字段  roomDoLkStat主题 -->
                      <span class="call_service_floor_span"
                            >系统:
                            <el-switch
                              class="ml-2"
                              size="small"
                              v-model="item1.roomLhtStat"
                              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                              active-text=""
                              inactive-text=""
                              active-value="ON"
                              inactive-value="OFF"
                              @change="
                                (v) => {
                                  isOpen(v, item1)
                                }
                              "
                            />
                      </span>
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </el-scrollbar>
            </el-aside>
          </el-container>
        </el-container>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onDeactivated, onMounted, reactive, ref, computed } from 'vue'
import { ChatDotRound, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRoute } from 'vue-router'
import { createWebSocket } from '@/utils/websocket.js'

import { request, noderedrequest } from '@/utils/server.js'
// 中间聊天区域wsbaseURL11
var wsbaseURL11 = import.meta.env.VITE_BASE_URL11
// 右侧楼层区域wsbaseURL12
var wsbaseURL12 = import.meta.env.VITE_BASE_URL12

// debugger
const route = new useRoute()
// 获取当前日期,如是当日日期，则不显示日期，只显示时间
var d = new Date()
var Y = d.getFullYear()
var M = d.getMonth() + 1
if (M <= 9) {
  M = '0' + M
}
var D = d.getDate()
if (D <= 9) {
  D = '0' + D
}
var dayTime = Y + '-' + M + '-' + D
var hisdateTime = ref('')
// 获取组织信息，并传递给后端  **此处相关 部署时记得打开注释  待处理
var showName = ref('')
const userId = ref(sessionStorage.getItem('userId') || '4600072255')
console.log(userId.value, showName.value)
const postUserInfo = () => {
  request
    .post('/CallUserCtrl/queryUserByOrgService', {
      erpbh: userId.value
      // "erpbh":"4600072255"
    })
    .then((res) => {
      console.log('用户信息查询成功:', res.data)
      //将工号查询返回的对应姓名存下来
      // debugger
      showName.value = res.data.result[0].xm
      // erpbh: "4600072255" orgeh: "46004475" orgehName: null  xm: "益伟康"
    })
    .catch((error) => {
      // console.log('用户信息查失败:', error)
    })
}

const roomInfo = ref([
  // { "chatState":null,
  // "chatTime": "2023-08-28 23:12:15",
  // "createTime": 1693235535,
  // "lastChat": "陛下",
  // "meetName": "国网公司2023年第二批指南科技项目申报（用电组）",
  // "roomID": "8297093077499904",
  // "roomImg": null,
  // "roomName": "A2-212",
  // },
  // {
  // "chatTime":"2023-09-14 20:57:34",
  // "createTime":1694696254,
  // "lastChat":"爱思考从",
  // "meetID":"8824025788153856",
  // "meetName":"三门核电总经理吴元明带队调研南瑞集团",
  // "roomID":"8297138667683840",
  // "roomName":"A2-208"
  // }
])

// 获取会议室状态接口
const getMeetingInfo = () => {
  request
    .post('/ShowCatCtrl/queryCallRmStatInfo', {
      meetID: meetingInfo.value.meetID,
      roomID: meetingInfo.value.roomID
    })
    .then((res) => {
      console.log('会议状态查询成功:', res.data)

      meetingInfo.value.obj = res.data
    })
    .catch((error) => {
      console.log('会议状态查询失败:', error)
    })
}
// 获取历史消息接口
const historyParams = ref({ lastChatTime: '', count: 10, roomID: '', source: '1' })
// 是否滚动到底部
const isScrollToBottom = ref(true)
const showHis = ref([])
const getHistoryInfo = () => {
  if (isHisLocked.value) {
    return
  }
  isHisLocked.value = true
  request
    .post('/ShowCatCtrl/showLgScrnChatHis', historyParams.value)
    .then((res) => {
      console.log('历史消息查询成功:', res.data)
      var list = []

      historyParams.value.lastChatTime = res.data.chatTime
      // debugger
      showHis.value = res.data.callMsgAllList
      res.data.callMsgAllList.forEach((item) => {
        item.list.forEach((chatItem) => {
          list.push(chatItem)
        })
      })
      // debugger
      historyMsgList.value.unshift(...list)

      // 最新的历史记录 最后一条 ，加 lastw 字段
      historyMsgList.value[historyMsgList.value.length - 1].lastw = true

      if (isScrollToBottom.value) {
        nextTick(() => {
          scrollbarRef.value &&
            scrollbarRef.value.scrollTo(0, scrollbarRef.value.wrapRef.scrollHeight)
        })
        isScrollToBottom.value = false
      }
    })
    .catch((error) => {
      console.log('历史消息查询查询失败:', error)
    })
    .finally(() => {
      isHisLocked.value = false
    })
}

onMounted(() => {
  // 获取用户信息
  postUserInfo()

  // getmsgList()
  // getHistoryInfo()
})

// 1.1左侧顶部搜索框
const input1 = ref('')
function debounce(func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) {
      clearTimeout(timeout)
    }
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) {
        typeof func === 'function' && func.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        typeof func === 'function' && func.apply(context, args)
      }, wait)
    }
  }
}

const roomNameList = ref([])
// roomInfo.value

// 搜索框输入内容变化，搜索出对应会议室
const inputChangeFn = () => {
  console.log(input1.value)
  // debugger
  if (input1.value != '') {
    var arr = []
    for (var i = 0; i < roomInfo.value.length; i++) {
      if (roomInfo.value[i].roomName.indexOf(input1.value) > -1) {
        arr.push({
          index: i,
          roomName: roomInfo.value[i].roomName,
          data: roomInfo.value[i]
        })
      }
    }
    roomNameList.value = arr
  }
}
const inputChange = debounce(inputChangeFn, 300, false)

// 点击搜索到的会议室
const searchClick = (data) => {
  var room
  for (var i = 0; i < roomInfo.value.length; i++) {
    if (roomInfo.value[i].roomID == data.roomID) {
      room = i
      break
    }
  }
  // 调用点击事件--跳转到对应会议室
  clickRoomName(roomInfo.value[room])
  ;(input1.value = ''), (roomNameList.value = [])
  nextTick(() => {
    var element = document.getElementById('roomID' + roomInfo.value[room].roomID)
    // 该方法支持，将元素滚动到浏览器可视窗口区域
    element.scrollIntoView({ block: 'start', inline: 'nearest' })
  })
}

const meetingInfo = ref({
  obj: {}
})
// 1.2点击左侧每个会议室
const clickRoomName = (item) => {
  // debugger

  isScrollToBottom.value = true
  // debugger
  console.log('33333333333333333333', item)
  meetingInfo.value = Object.assign(meetingInfo.value, item)
  currentMeetingIndex.value = item.roomID

  historyParams.value.roomID = item.roomID
  historyParams.value.lastChatTime = item.chatTime
  // 跳转会议室之前清除当前会议室历史记录
  historyMsgList.value = []
  // debugger
  var initmsg = {
    callUser: {
      // userID: '4600072255',
      userID: userId.value,
      userName: showName.value
    },
    chatMsg: '',
    // "chatTime": "2023-08-07 10:22:54",
    meetID: item.meetID,
    roomID: item.roomID,
    state: 1,
    type: 'init'
  }

  websocket.send(JSON.stringify(initmsg))

  // 会议室状态接口
  getMeetingInfo()
  //历史记录接口
  getHistoryInfo()
}
// 2.4输入消息
const inputMsg = ref('')

// 2.3历史消息列表表
const historyMsgList = ref([])

// 最新消息列表表
// const currentMsgList=ref([])
const currentMeetingIndex = ref(0)

const scrollbarRef = ref(null)
const isHisLocked = ref(false)
const onScroll = (top) => {
  //上面隐藏内容的高度
  // console.log(top.scrollTop)
  // 容器高度
  // console.log(scrollbarRef.value.wrapRef.clientHeight)
  // 内容高度
  // console.log(scrollbarRef.value.wrapRef.scrollHeight)

  if (top.scrollTop <= 20) {
    if (historyMsgList.value.length > 0) {
      historyParams.value.lastChatTime = historyMsgList.value[0].chatTime
    }

    getHistoryInfo()
  }
}

// 2.2 websocket连接
//--------创建中间聊天区域websocket对象
var websocket = createWebSocket(wsbaseURL11, {
  onopen(e) {
    console.log('建立了websocket连接')
    console.log(e)
    if (roomInfo.value.length > 0) {
      let index
      for (var i = 0; i < roomInfo.value.length; i++) {
        if (currentMeetingIndex.value == roomInfo.value[i].roomID) {
          index = i
          break
        }
      }
      clickRoomName(roomInfo.value[index])
    }
    // 重新调用会议室最新消息列表-----------------------
    // getmsgList()
  },
  onmessage(e) {
    // debugger
    console.log('接收服务器消息：', e.data)
    // 如果e.data是所有消息，则判断是否是当前会议室消息

    var data = JSON.parse(e.data)

    // 最新消息push到历史消息最后面
    historyMsgList.value.push(data)
    // debugger
    for (var i = 0; i < roomInfo.value.length; i++) {
      if (currentMeetingIndex.value == roomInfo.value[i].roomID) {
        roomInfo.value[i].lastChat = data.chatMsg
        roomInfo.value[i].chatTime = data.chatTime
        break
      }
    }
    nextTick(() => {
      scrollbarRef.value && scrollbarRef.value.scrollTo(0, scrollbarRef.value.wrapRef.scrollHeight)
    })
  },
  onerror() {},
  onclose() {},
  onbeforeunload() {},
  onreconnect(ws) {
    websocket = ws
  }
})

// 监听输入框消息变化
const onChangeMsgInfo = (e) => {
  if (!inputMsg.value && e.target.innerHTML == '发送') {
    ElMessage({
      type: 'warning',
      message: '请输入消息',
      offset: 16
    })
    return
  }
  var sendmsg = {
    callUser: {
      userID: userId.value,
      userName: showName.value
      // userID: '4600072255',
      // userName: '益伟康'
    },
    chatMsg: inputMsg.value || (e.target.innerHTML ? e.target.innerHTML : ''),
    // "chatTime": "2023-08-07 10:22:54",
    meetID: meetingInfo.value.obj.meetID ? meetingInfo.value.obj.meetID : '',
    roomID: meetingInfo.value.obj.roomID,
    state: '1',
    type: 'msg'
    // chatState:'未读'
  }
  //点击按钮发送数据给服务器
  // debugger
  console.log('用户输入消息：', inputMsg.value)
  console.log('常用于选择', e.target.innerHTML)
  console.log('发送消息：', sendmsg)
  //数据是字符串、ArrayBuffer或Blob中的一种4

  websocket.send(JSON.stringify(sendmsg))
  inputMsg.value = ''
}

// 断开重连

// 常用语
const commonLanguageArr = [
  '好的！马上到！',
  '已联系相关人员，请稍等一下～',
  '已帮您处理完毕，有需求随时沟通哦～'
]
const isShow = ref(false)
const commonLanguage = () => [(isShow.value = !isShow.value)]

// 点击常用语
const onCommonMsgInfo = (e) => {
  // debugger
  onChangeMsgInfo(e)
}

var isLocked = true
// 3 websocket连接
//--------创建右侧websocket对象------***
var ws1 = createWebSocket(wsbaseURL12 + '/websocket/' + userId.value, {
  onopen(e) {
    console.log('建立了ws1连接')
  },
  onmessage(e) {
    // console.log('接收ws1服务器消息:', e)
    // 如果e.data是所有消息，则判断是否是当前会议室消息
    // debugger
    if (e.data == 'HeartBeat') {
      return
    } else {
      // debugger
      var data = JSON.parse(e.data)
      if (data.msg == 'roomDisplayList') {
        //左侧会议室列表
        roomInfo.value = []
        roomInfo.value = data.result

        // console.log("左侧会议室列表",roomInfo.value)

        //会议室列表初始化完毕，调用一次改默认第一个会议室 的点击事件，渲染中间部分
        if (isLocked) {
          if (roomInfo.value.length > 0) {
            clickRoomName(roomInfo.value[0])
          }
          isLocked = false
        } else {
          return
        }
      } else {
        // 右侧楼层信息
        floorInfo.value = []
        floorInfo.value = data.result
        // console.log("右侧楼层信息",floorInfo.value)
      }
    }
  },
  onerror() {},
  onclose() {},
  onbeforeunload() {},
  onreconnect(ws) {
    ws1 = ws
  }
})

// 3.右侧楼层
// 3.1 右侧折叠栏默认打开
const activeNames = ref([0, 1, 2])

// 楼层及会议信息
const floorInfo = ref([])

// 3.2灯光控制待完成

const isOpen = (v, item1) => {
  // debugger
  console.log(v, item1)
  // 此处需要加灯光控制接口
  // var lightMsg = {

  // }
  // ws1.send(JSON.stringify(lightMsg)){

  // A2-228/228-power  A2-107
  var topic
  if (item1.roomName != '') {
    // topic = item1.roomName + '/' + item1.roomName.split('-')[1] + '-power'
    topic = item1.roomName + '/' + item1.roomName.split('-')[1] + '-chazuodown'
  }
  // debugger
  if (item1.topic != '') {
    request
      .post('/MqttCrtl/crtIotopic', {
        message: v,
        pubTopic: topic,
        qos: 2,
        retained: true,
        roomID: item1.roomID
      })
      .then((res) => {
        // console.log('控制设备发送成功', res)
        console.log("主题打印",topic)
      })
      .catch((error) => {
        console.log('控制设备发送失败', error)
      })
  }
}
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.call_service {
  :deep(.el-container) {
    // margin-top: (10/1080) * 100vh;
    // 1.左侧侧边栏
    // .el-side:nth-child(1){
    // 1.1搜索框
    .search {
      width: (340/1920) * 100vw;
      margin-bottom: (20/1080) * 100vh;

      .el-input {
        height: (50/1080) * 100vh;
        border-radius: (8/1920) * 100vw;
        font-size: (18/1920) * 100vw;
        text-align: center;
        font-family: Roboto;
        border: 1px solid rgba(0, 207, 255, 1);
        .el-input__wrapper {
          background-color: rgba(255, 255, 255, 0.08);
          box-shadow: none;
          .el-icon svg {
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .el-input__inner {
          color: rgba(255, 255, 255, 1);
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
    // 1.2搜索列表
    .searchList {
      & > div:nth-child(1) {
        height: (20/1080) * 100vh;
        line-height: (20/1080) * 100vh;
        margin-bottom: (10/1080) * 100vh;
        color: rgba(255, 255, 255, 0.8);
        font-size: (14/1920) * 100vw;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
      & > div:nth-child(2) {
        div {
          width: (340/1920) * 100vw;
          height: (83/1080) * 100vh;
          margin-bottom: (10/1080) * 100vh;
          border-radius: (10/1920) * 100vw;
          background-color: rgba(24, 144, 255, 0.1);
          text-align: center;
          display: flex;
          align-items: center;
          .jianxie {
            width: (43/1920) * 100vw;
            height: (43/1920) * 100vw;
            line-height: (43/1080) * 100vh;
            margin-left: (34/1920) * 100vw;
            margin-right: (11/1920) * 100vw;
            border-radius: 50%;
            background-color: rgba(24, 144, 255, 0.5);
            color: rgba(255, 255, 255, 1);
            font-size: (20/1920) * 100vw;
            text-align: center;
            font-family: Roboto;
          }
          .roomName {
            height: (26/1080) * 100vh;
            color: rgba(255, 255, 255, 1);
            font-size: (18/1920) * 100vw;
            text-align: left;
            font-family: SourceHanSansSC-regular;
          }
          &:hover {
            background-color: rgba(22, 208, 255, 0.8);
          }
        }
      }
    }

    // 1.3会议室列表
    .roomList {
      display: flex;
      flex-direction: column;
      width: (340/1920) * 100vw;
      height: (145/1080) * 100vh;
      margin-bottom: (15/1080) * 100vh;
      padding-left: (24/1920) * 100vw;
      line-height: (20/1080) * 100vh;
      border-radius: (10/1920) * 100vw;
      background-color: rgba(24, 144, 255, 0.1);
      text-align: center;
      //   border: 1px solid red;

      .roominfo {
        height: (44/1080) * 100vh;
        line-height: (44/1080) * 100vh;
        display: flex;
        justify-content: flex-start;
        margin-top: (20/1920) * 100vw;
        margin-bottom: (17/1080) * 100vh;

        & > span:nth-child(1) {
          border-radius: 50%;
          height: (44/1920) * 100vw;
          width: (44/1920) * 100vw;
          background-color: #0d58a5;
          text-align: center;
          line-height: (43/1920) * 100vw;
          color: #ffffff;
          font-size: (20/1920) * 100vw;
          display: inline-block;
        }
        & > span:nth-child(2) {
          display: inline-block;
          width: (140/1920) * 100vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-left: (10/1920) * 100vw;
          margin-right: (0/1920) * 100vw;
          color: rgba(255, 255, 255, 1);
          font-size: (16/1920) * 100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        & > span:nth-child(3) {
          width: (110/1920) * 100vw;
          margin-right: (20/1920) * 100vw;
          color: rgba(255, 255, 255, 1);
          font-size: (14/1920) * 100vw;
          text-align: right;
          font-family: SourceHanSansSC-regular;
        }
      }
      .msgInfo {
        width: (290/1920) * 100vw;
        margin-left: (10/1920) * 100vw;
        color: white;
        text-align: left;
        span {
          display: inline-block;
          width: (282/1920) * 100vw;
          color: rgba(255, 255, 255, 1);
          font-size: (14/1920) * 100vw;
          margin-left: -3px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      &.active {
        background-color: rgba(22, 208, 255, 0.8);
      }
      &.hasmsg {
        &::before {
          content: '';
          width: (5/1920) * 100vw;
          height: (5/1920) * 100vw;
          background-color: red;
          border-radius: 50%;
          position: relative;
          top: (44/1080) * 100vh;
          left: -(13/1920) * 100vw;
        }
      }
    }
    // }
    // 2.中间区域
    .el-main {
      height: (900/1080) * 100vh;
      background-color: #02285f;
      // width: (1000/1920) * 100vw;
      // flex-basis: (1000/1920) * 100vw;
      width: (940/1920) * 100vw;
      flex-basis: (940/1920) * 100vw;
      flex-grow: 0;
      margin: 0 (10/1920) * 100vw;
      padding: 0;
      overflow: hidden;
      // 公用部分
      .call_service_chat_messages_name {
        color: white;
        position: relative;
        word-break: break-all;
        display: flex;
        margin-bottom: -(20/1080) * 100vh;
        display: flex;
        align-items: center;
        span:nth-child(1) {
          margin-right: (10/1920) * 100vw;
        }
        span:nth-child(2) {
          color: rgba(255, 255, 255, 0.8);
          font-size: (14/1920) * 100vw;
          text-align: right;
          font-family: SourceHanSansSC-regular;
        }
      }
      .call_service_chat_messages {
        color: white;
        margin-bottom: (28/1080) * 100vh;
        position: relative;
        min-height: (60/1080) * 100vh;
        // margin-top: (25/1080)*100vh;
        margin-top: (14/1080) * 100vh;
        font-size: (18/1920) * 100vw;
        word-break: break-all;
        display: flex;
      }
      .call_service_card {
        width: (340/1920) * 100vw;
        height: (145/1080) * 100vh;
        margin: 0 (10/1920) * 100vw (5/1080) * 100vh (10/1920) * 100vw;
        background-color: #02285f;
        color: #ffffff;
        border-radius: (900/1920) * 100vw;
        border: 0;
      }
      // 2.1 中间顶部
      .centerHeader {
        height: (120/1080) * 100vh;
        display: flex;
        flex-direction: column;
        margin: (10/1920) * 100vw;
        .tip {
          margin-bottom: (10/1080) * 100vh;
          margin-right: (10/1920) * 100vw;
          display: flex;
          align-items: normal;
          justify-content: flex-end;
          img {
            width: (20/1920) * 100vw;
            height: (20/1920) * 100vw;
          }
          span {
            height: (20/1080) * 100vh;
            line-height: (26/1080) * 100vh;
            margin-left: (4/1920) * 100vw;
            color: rgba(255, 255, 255, 0.5);
            font-size: (14/1920) * 100vw;
            text-align: left;
            font-family: SourceHanSansSC-regular;
          }
        }
        .meetingState {
          display: flex;
          align-items: center;
          margin-left: (30/1920) * 100vw;
          margin-bottom: (40/1080) * 100vh;
          .call_service_main_num {
            border-radius: 50%;
            height: (60/1080) * 100vh;
            width: (60/1080) * 100vh;
            background-color: #0d58a5;
            text-align: center;
            line-height: (60/1080) * 100vh;
            color: #ffffff;
            font-size: (20/1920) * 100vw;
            display: inline-block;
            flex: none;
          }
          .centerMeetingInfo {
            display: inline-block;
            margin-left: (14/1920) * 100vw;
            & > div > div:nth-child(1) {
              color: #ffffff;
              font-size: (24/1920) * 100vw;
            }
            .meetingInfo2 {
              display: flex;
              span {
                white-space: nowrap;
              }
              span:nth-child(2) {
                width: 40%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
      //2.1 他人消息
      .msgcont {
        display: flex;
        justify-content: space-between;
        & > div {
          margin-right: (20/1920) * 100vw;
          color: rgba(255, 255, 255, 0.8);
          font-size: (14/1920) * 100vw;
          text-align: right;
          font-family: SourceHanSansSC-regular;
          transform: translateY((14/1080) * 100vh);
        }
        .call_service_chat {
          text-align: left;
        }
      }

      //2.2 自己消息
      .myMsg {
        & > div {
          justify-content: flex-end;
          right: (20/1920) * 100vw;

          .call_service_chat {
            border-radius: (20/1080) * 100vh 0 (20/1080) * 100vh (20/1920) * 100vw;
            right: (20/1920) * 100vw;
          }
        }
        .mymsgcont {
          display: flex;
          justify-content: flex-end !important;
          & > div {
            // height: (20/1080)*100vh;
            color: rgba(255, 255, 255, 0.8);
            font-size: (14/1920) * 100vw;
            text-align: left;
            font-family: SourceHanSansSC-regular;
            transform: translateY((14/1080) * 100vh);
          }
        }
      }
      //2.3 历史记录字样
      .historyInfo {
        text-align: center;
        span {
          color: rgba(255, 255, 255, 0.4);
          width: (290/1920) * 100vw;
        }
        .call_service_chat {
          border-radius: 0 (20/1920) * 100vw (20/1080) * 100vh (20/1920) * 100vw;
        }
      }
      // 2.4 暂无记录
      .noMessageRecode {
        text-align: center;
        span {
          color: rgba(255, 255, 255, 0.4);
          width: (290/1920) * 100vw;
        }
      }
      // 横线
      .el-divider--horizontal {
        width: (1000/1920) * 100vw;
        margin: 0;
        border-color: #075b8c;
      }

      //2.3 中间 底部发送消息区域
      .centerBottom {
        height: (54/1080) * 100vh;

        // 常用语/输入框/发送按钮
        .inputMsgInfo {
          margin-left: (40/1920) * 100vw;
          margin-right: (40/1920) * 100vw;
          padding-top: (14/1080) * 100vh;
          display: flex;
          justify-content: space-between;

          .chatimg {
            width: (30/1920) * 100vw;
            height: (30/1080) * 100vh;
            margin-right: (9/1920) * 100vw;
            color: white;
            transform: rotateY(180deg);
          }
          .el-button {
            width: (128/1920) * 100vw;
            height: (40/1080) * 100vh;
            background-color: #16d0ff;
            span {
              font-size: (18/1920) * 100vw;
              color: rgba(255, 255, 255, 1);
            }
          }
          & > .el-button:nth-child(3) {
            width: (120/1920) * 100vw;
            height: (40/1080) * 100vh;
            // line-height: 26px;
            border-radius: (8/1920) * 100vw;
            background-color: transparent;
            color: rgba(22, 208, 255, 1);
            font-size: (18/1920) * 100vw;
            text-align: center;
            font-family: Roboto;
            border: 1px solid rgba(22, 208, 255, 1);
          }
        }
      }
      .active1 {
        // transform: translateX(-20px);
        width: (1000/1920) * 100vw;
        height: (268/1080) * 100vh;
        background-color: rgba(24, 144, 255, 0.2);
      }
      // 底部常用语
      ul {
        height: (268/1080) * 100vh;
        margin-left: (40/1920) * 100vw;
        margin-right: (40/1920) * 100vw;
        li {
          list-style: none;
          width: (920/1920) * 100vw;
          height: (64/1080) * 100vh;
          line-height: (64/1080) * 100vh;
          border-bottom: 1px solid rgba(22, 208, 255, 0.4);
          color: rgba(255, 255, 255, 1);
          font-size: (18/1920) * 100vw;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }
    }
    // 3.右侧边栏
    .el-aside:nth-child(3){
      // width: (12/1920) * 100vw;
    .sensingInfo {
      display: flex;
      justify-content: flex-start;
      height: (36/1080) * 100vh;
      line-height: (36/1080) * 100vh;
      margin-bottom: (6/1080) * 100vh;
      background-color: rgba(24, 144, 255, 0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > span {
        display: inline-block;
        color: rgba(255, 255, 255, 1);
        font-size: (12/1920) * 100vw;
        text-align: left;
        font-family: Roboto;
        margin-right: (0/1920) * 100vw;
        overflow: hidden;
        white-space: nowrap;
        // text-overflow: ellipsis;
      }
      .el-switch--small {
        // width: (27/1920)*100vw;
        font-size: (12/1920) * 100vw;
        line-height: (16/1080) * 100vh;
        height: (16/1080) * 100vh;
        zoom: 0.8;
      }
    }
    }
  }
}
.call_service_scrollbar {
  float: right;
  color: #ffffff;
}

.call_service_style {
    width: 100vw;
    height: 100vh;
    padding: 1.40625vw 1.14583333vw 1.35416667vw 1.14583333vw;
    overflow: hidden;
    box-sizing: border-box;
    background-image: url(/src/assets/tablet_borrowed/1.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    
}
.call_service {
    width: 100%;
    height: 100%;
    background-image: url(/src/assets/tablet_borrowed/2.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
}


.content {
  // padding: 0px (22/1920) * 100vw (26/1080) * 100vh (22/1920) * 100vw;
}

.call_service_title {
  font-size: (36/1920) * 100vw;
  text-shadow: (2/1920) * 100vw (2/1920) * 100vw (4/1920) * 100vw #00cbff;
  color: #ffffff;
}

.call_service_img {
  background-repeat: no-repeat;
  width: (18/1920) * 100vw;
  height: (18/1920) * 100vw;
  display: inline-block;
  top: (3/1080) * 100vh;
  position: relative;
}

.call_service_online_img_meeting {
  background-image: url('@/assets/img/call_online_meeting.svg');
  background-size: (18/1920) * 100vw (18/1920) * 100vw;
}

.call_service_online_img_rank {
  background-image: url('@/assets/img/call_ranking_list.svg');
  background-size: (18/1920) * 100vw (18/1920) * 100vw;
}

.call_service_online_img_time {
  background-image: url('@/assets/img/call_time_line.svg');
  background-size: (18/1920) * 100vw (18/1920) * 100vw;
}

.call_service_span_img {
  margin-right: (40/1920) * 100vw;
  color: #ffffff;
  font-size: (14/1920) * 100vw;
  display: inline-block;
  opacity: 0.8;
}

.call_service_msg_area {
  height: (650/1080) * 100vh;
  margin-right: (20/1920) * 100vw;
}

.call_service_floor_span {
  margin: 0 (10/1920) * 100vw;
  color: #ffffff;
}

:deep(.call_service .el-collapse-item__header) {
  background-color: #022151;
  color: #ffffff;
  border-color: #022151;
  font-size: (20/1920) * 100vw;
}

:deep(.call_service .el-collapse-item__content) {
  background-color: #022151;
  border-color: #022151;
  padding-bottom: 0px;
}

:deep(.call_service .el-collapse) {
  border-color: #022151;
  color: rgba(255, 255, 255, 1);
  font-size: (20/1920) * 100vw;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

:deep(.call_service .el-collapse-item__wrap) {
  border-color: #022151;
  background-color: transparent;
}

.call_service_chat {
  max-width: (400/1920) * 100vw;
  background-color: rgba(255, 255, 255, 0.06);
  padding: (18/1920) * 100vw 18px;
}
// 聊天区
:deep(.custom-el-scrollbar.el-scrollbar) {
  // height: (670/1080)*100vh;
  // height: (654/1080)*100vh;
  height: 100%;

  margin-left: (40/1920) * 100vw;
  margin-right: (20/1920) * 100vw;

  &.active {
    height: calc((654 / 1080) * 100vh - (172 / 1080) * 100vh);
  }
}

:deep(.call_service_input_msg) {
  display: inline-flex;
  margin-left: (20/1920) * 100vw;
  width: (640/1920) * 100vw;
  height: (40/1080) * 100vh;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

:deep(.call_service_input_msg .el-input__wrapper) {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: none;
}

:deep(.call_service_input_msg .el-input__inner) {
  color: white;
  caret-color: rgba(255, 255, 255, 1);
}
</style>
