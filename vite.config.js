import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // "@asset": path.resolve(__dirname, "./src/assets"),
      //       "@svg": path.resolve(__dirname, "./src/assets/svg"),
      //       "@plugin": path.resolve(__dirname, "./src/plugins"),
            // "@view": path.resolve(__dirname, "./src/views"),
            // "@component": path.resolve(__dirname, "./src/components"),
            // "@store": path.resolve(__dirname, "./src/stores"),
            // "@publishEditor": path.resolve(__dirname, "./src/components/low_code/page_editor"),
            // "@publishPage": path.resolve(__dirname, "./src/components/low_code/page_publish"),
    }
  },
  lintOnSave: false,
  // server:{
  //   hmr:{overlay: false}
  // },
  // vue.config.js
  
  server: {
    port: 5173,
    strictPort: false,
    // host: "10.31.0.247",
    proxy: {
      // '/sweet-api': {
      //   target: 'http://39.105.179.38:8080', // 指定代理服务器
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/sweet-api/, '')
      // },
      '/dfs-ui': {
        target: 'http://d-nari-test.sgepri.sgcc.com.cn:90', // 指定代理服务器
        // target: 'https://d-nari-test.sgepri.sgcc.com.cn', // 指定代理服务器
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/dfs-ui/, '')
      },
      '/common-openapi-oauth':{
        target: 'http://d-nari.sgepri.sgcc.com.cn:90', // 指定代理服务器
        changeOrigin: true,
      }
      
    },
    watch: {},
  }

})


