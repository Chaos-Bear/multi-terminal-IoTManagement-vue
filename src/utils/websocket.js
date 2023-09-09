// var path = basePath;
// var jspCode = $("#userId").val();
var websocket

var urlPath
var events = {
  onopen: () => {},
  onmessage: () => {},
  onerror: () => {},
  onclose: () => {},
  onbeforeunload: () => {}
}
/**
 * websocket启动
 */
function createWebSocket(url, { onopen, onmessage, onerror, onclose, onbeforeunload }) {
  urlPath = url
  events = { onopen, onmessage, onerror, onclose, onbeforeunload }
  try {
    if ('WebSocket' in window) {
      websocket = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      websocket = new MozWebSocket(url)
    } else {
      websocket = new SockJS(url)
    }
    init(onopen, onmessage, onerror, onclose, onbeforeunload)
  } catch (e) {
    console.log('catch' + e)
    reconnect()
  } finally {
    if (websocket) {
      return websocket
    }
    return null
  }
}

function init(onopen, onmessage, onerror, onclose, onbeforeunload) {
  //连接成功建立的回调方法
  websocket.onopen = function (event) {
    console.log('WebSocket:已连接')
    typeof onopen == 'function' && onopen(event)
    //心跳检测重置
    heartCheck.reset().start()
  }

  //接收到消息的回调方法
  websocket.onmessage = function (event) {
    // showNotify(event.data);
    // console.log('WebSocket:收到一条消息', event.data)
    typeof onmessage == 'function' && onmessage(event)

    heartCheck.reset().start()
  }

  //连接发生错误的回调方法
  websocket.onerror = function (event) {
    console.log('WebSocket:发生错误')
    typeof onerror == 'function' && onerror(event)

    reconnect()
  }

  //连接关闭的回调方法
  websocket.onclose = function (event) {
    console.log('WebSocket:已关闭')
    typeof onclose == 'function' && onclose(event)

    heartCheck.reset() //心跳检测
    reconnect()
  }

  //监听窗口关闭事件，当窗口关闭时，主动去closeWebSocket关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function (event) {
    typeof onbeforeunload == 'function' && onbeforeunload(event)

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
function reconnect() {
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    console.log('重连中...')
    lockReconnect = false
    createWebSocket(urlPath, events)
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
  start: function () {
    var self = this
    this.timeoutObj && clearTimeout(this.timeoutObj)
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj)
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      websocket.send('HeartBeat')
      // console.log('ping')
      self.serverTimeoutObj = setTimeout(function () {
        // 如果超过一定时间还没重置，说明后端主动断开了
        console.log('关闭服务')
        websocket.close() //如果onclose会执行reconnect，我们执行 websocket.close()就行了.如果直接执行 reconnect 会触发onclose导致重连两次
      }, self.timeout)
    }, this.timeout)
  }
}
export { createWebSocket }
