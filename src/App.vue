<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { Plus ,Delete} from '@element-plus/icons-vue';

// 使用el-config-provider 可以用于全局配置国际化
import { ElConfigProvider } from 'element-plus';
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale=zhCn;
zhCn.el.pagination = {
      goto: "跳转至",
      pageClassifier: "",
      pagesize: "条/每页",
      // total: "共 {total} 条",
    };

</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style >
    html,body,#app{
       height: 100%;
    }
</style>
