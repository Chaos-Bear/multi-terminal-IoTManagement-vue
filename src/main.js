import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)
//配置axios为全局
app.config.globalProperties.$axios = axios
// 全局配置axios请求根路径(axios.默认配置.请求根路径)
axios.defaults.baseURL = 'http://172.28.5.134:8084'

app.mount('#app')



