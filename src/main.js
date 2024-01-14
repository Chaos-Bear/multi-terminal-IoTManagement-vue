import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入table列表下拉加载插件
import ElTableInfiniteScroll from 'el-table-infinite-scroll'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(ElTableInfiniteScroll)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
//配置axios为全局
app.config.globalProperties.$axios = axios
// 全局配置axios请求根路径(axios.默认配置.请求根路径)
// axios.defaults.baseURL = 'http://172.28.5.134:8084'

app.mount('#app')
