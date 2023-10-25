<template>
  <div class="tablet">
    <div class="tablet-inner">
      <div class="tablet-select">
        <el-select v-model="index" placeholder="Select" @change="onChange" style="width:auto" popper-class="zdy_select_top">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
// import TheWelcome from '../components/TheWelcome.vue';
import { reactive, ref } from 'vue';
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route=useRoute();
import axios from 'axios';
const index = ref(1);
const options =[
  {
    value: 1,
    label: '无纸化平板借还首页',
  },
  {
    value: 2,
    label: '无纸化平板设备管理',
    disabled: false,
  },
  {
    value: 3,
    label: '无纸化平板借还历史',
  }
]
//设置index
if(route.path=="/tablet/tablet-borrowed"){
  index.value=1
}else if(route.path=="/tablet/device-management"){
  index.value=2
}else{
  index.value=3
}
 
const onChange=()=>{
  if(index.value==1){
     router.push({
      path:"/tablet/tablet-borrowed"
     })
  }else if(index.value==2){
     router.push({
      path:"/tablet/device-management"
     })
  }else{
    router.push({
      path:"/tablet/history"
     })
  }
  
}


</script>
<style lang="less">
  // 通过自定义，修改select下拉框
   .el-popper.zdy_select_top{
       width: (400/1920)*100vw!important;
       background: #05456e!important;
       border: 0px!important;
       margin-top: (-40/1080)*100vh;
       margin-left: (18/1920)*100vw;
       border-radius:0!important;
       
       .el-select-dropdown{
          border-radius:0!important;
       }

       .el-select-dropdown__wrap{
          max-height: none;
       }
       .el-select-dropdown__list{
          margin: (6/1080)*100vh 0!important;
       }
      .el-select-dropdown__item{
         width: (400/1920)*100vw!important;
         
         color: rgba(255, 255, 255, 1)!important;
          font-size: (18/1920)*100vw!important;
          text-align: center!important;
          font-family: Microsoft Yahei!important;
        &.hover, &:hover{
           background-color: rgba(255, 255, 255, 0.1)!important;
        }
      }
      .el-popper__arrow{
         display: none!important;
      }
      
    }

</style>
<style lang="less" scoped>
  .tablet{
    width: 100vw;
    height: 100vh;
    padding: (27/1920)*100vw (22/1920)*100vw (26/1920)*100vw (22/1920)*100vw;
    overflow: hidden;
    box-sizing: border-box;
    background-image:url(@/assets/tablet_borrowed/1.png) ;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    
    .tablet-inner{
      width: 100%;
      height: 100%;
      background-image:url(@/assets/tablet_borrowed/2.png) ;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      .tablet-select{
        width: (434/1920)*100vw;
        height: (95/1920)*100vw;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        
        :deep(.el-select){
          // width: 27.5%;
          // line-height: (95/1920)*100vw;
          // margin-top: -19px;
          
          
          .el-input{
            background-color: transparent;
              .el-input__wrapper{
                background-color: transparent;
                box-shadow:none!important;
              }
              .el-input__inner{
                height: (95/1920)*100vw;
                color: rgba(255, 255, 255, 1)!important;
                // font-size: 2.03vw;
                font-size: (39/1920)*100vw;
                text-align: center;
                // font-family: SourceHanSansSC-regular;
              }
              .el-icon{
                font-size:(30/1920)*100vw;
                svg{
                  color: rgba(255, 255, 255, 1);
                }
              } 
          }
          
        }
       
      }
      
    }
  }
</style>