/**
 * websocket启动
 */
// { onopen, onmessage, onerror, onclose, onbeforeunload,onreconnect }
function createWebSocket(url, events) {
  let urlPath = url
  let websocket

  try {
    if ('WebSocket' in window) {
      websocket = new window.WebSocket(url)
    } else if ('MozWebSocket' in window) {
      websocket = new window.MozWebSocket(url)
    } else {
      websocket = new window.SockJS(url)
    }
    init(websocket, urlPath, events)
  } catch (e) {
    console.log('catch' + e)
    reconnect(urlPath, events)
  } 
    if (websocket) {
      return websocket
    }
    return null
  
}

function init(websocket, urlPath, events) {
  //连接成功建立的回调方法
  websocket.onopen = function (event) {
    // console.log('WebSocket:已连接')
    typeof events.onopen == 'function' && events.onopen(event)
    //心跳检测重置
    heartCheck.reset().start(websocket)
  }

  //接收到消息的回调方法
  websocket.onmessage = function (event) {
    // showNotify(event.data);
    // console.log('WebSocket:收到一条消息', event.data)
    typeof events.onmessage == 'function' && events.onmessage(event)

    heartCheck.reset().start(websocket)
  }

  //连接发生错误的回调方法
  websocket.onerror = function (event) {
    console.log('WebSocket:发生错误')
    typeof events.onerror == 'function' && events.onerror(event)

    reconnect(urlPath, events)
  }

  //连接关闭的回调方法
  websocket.onclose = function (event) {
    // debugger
    console.log('WebSocket:已关闭', event.code, event.reason, event.wasClean)
    typeof events.onclose == 'function' && events.onclose(event)

    // 判断如果状态码1000，即正常关闭，则不再心跳检测 及 重连
    // if (event.code == 1000) {
    //   return
    // } else {
      heartCheck.reset() //心跳检测
      reconnect(urlPath, events)
    // }
  }

  //监听窗口关闭事件，当窗口关闭时，主动去closeWebSocket关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function (event) {
    typeof events.onbeforeunload == 'function' && events.onbeforeunload(event)

    websocket.close()
  }
}
// //关闭连接
// function closeWebSocket() {
//   websocket.close();
//   }

//   //发送消息
//   function send(message) {
//       websocket.send(message);
//   }
//避免重复连接
var lockReconnect = false,
  tt

/**
 * websocket重连
 */
function reconnect(urlPath, events) {
  // debugger
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    console.log('重连中...')
    lockReconnect = false
    let websocket = createWebSocket(urlPath, events)

    typeof events.onreconnect == 'function' && events.onreconnect(websocket)
  }, 4000)
}

/**
 * websocket心跳检测
 */
var heartCheck = {
  timeout: 5000,
  timeoutObj: null,
  serverTimeoutObj: null,
  reset: function () {
    clearTimeout(this.timeoutObj)
    clearTimeout(this.serverTimeoutObj)
    return this
  },
  start: function (websocket) {
    var self = this
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      websocket.send('HeartBeat')
      console.log('发送心跳给服务端','HeartBeat')
      self.serverTimeoutObj = setTimeout(function () {
        // 如果超过一定时间还没重置，说明后端主动断开了
        console.log('关闭服务')
        websocket.close() //如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
      }, self.timeout)
    }, this.timeout)
  }
}
export { createWebSocket }
