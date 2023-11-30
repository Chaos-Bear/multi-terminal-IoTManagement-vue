import http from './http.js'

// console.log(import.meta.env)
// 1.开发环境呼叫服务
const request = http({
  baseURL: import.meta.env.VITE_BASE_URL
})

// 2.平板借还
const tabletRequest = http({
  baseURL: import.meta.env.VITE_BASE_URL3
})

// 3.设备管理
const deviceRequest = http({
  baseURL: import.meta.env.VITE_BASE_URL5
})

// 4.信息发布
const releaseRequest = http({
  baseURL: import.meta.env.VITE_BASE_URL6
})
const pubRequest = http({
  baseURL: import.meta.env.VITE_BASE_URL7
})

export { request, tabletRequest, deviceRequest, releaseRequest, pubRequest }
