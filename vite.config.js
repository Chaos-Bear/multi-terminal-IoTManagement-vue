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
            // "@store": path.resolve(__dirname, "./src/pinia_stores"),
            // "@publishEditor": path.resolve(__dirname, "./src/components/low_code/page_editor"),
            // "@publishPage": path.resolve(__dirname, "./src/components/low_code/page_publish"),
    }
  },
  lintOnSave: false,

  // vue.config.js

  devServer: {
    // proxy: {
    //   '/v2': {
    //     target: 'http://10.31.0.239:8080', // 指定代理服务器
    //     changeOrigin: true,
    //     // pathRewrite: {
    //     //   '^/api-docs': '' // 将/api替换为空
    //     // }
    //   }
    // }
  }

})
