import axios from 'axios'
// import { ElLoading } from 'element-plus'


// import {useShowLoadingStore} from '@/stores/user.js'

// const store = useShowLoadingStore()

function request(config) {
  const instance = axios.create({
    baseURL: config.baseURL,
    timeout: 60000,
    headers: config.headers,
    ...config
  })
  
  

  // var loadingInstance
  //请求拦截器
  instance.interceptors.request.use(
    function (config) {
      // 请求成功前添加loading加载图
      // loadingInstance = ElLoading.service('加载中')

      // const token=localStorage.getItem('token')
      // if(token){
      //    config.headers.Authorization=`Bearer ${token}`
      // }
      
      
      
      return config
    },
    function (error) {
      // Do something with request error


      
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger

      // loadingInstance.close()
      
     
      return response
    },
    function (error) {
      // Do something with response error

      // loadingInstance.close()

      return Promise.reject(error)
    }
  )

  return instance
}

export default request
