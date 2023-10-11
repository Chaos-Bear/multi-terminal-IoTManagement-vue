<template>
  <div class="validatePassword">
    <!-- 1.左-->
    <div></div>
    <!-- 2.中间 -->
    <div class="validateCon">
      <!-- 2.1验证区 -->
      <div class="validate">
        <div :style="getArr.length>=1?isActive:''" ></div>
        <div :style="getArr.length>=2?isActive:''"></div>
        <div :style="getArr.length>=3?isActive:''"></div>
        <div :style="getArr.length>=4?isActive:''"></div>
      </div>
      <!--2.2密码输入区  -->
      <div class="inputPassword">
        <div ref="inputnum" v-for="(item, i) in arr" :key="i" @click.stop="clicktEvent(item)">{{ item }}</div>

        <div v-if="getArr.length>=1"  @click="del()">
          删除
          <!-- <img src="@/assets/tablet_borrowed/10.png"  @click="del()"/> -->
        </div>
        <div v-else  @click="router.push('/tablet')">
          取消
        </div>
      </div>
    </div>
    <!-- 3.右 -->
    <div></div>
  </div>
</template>
<script setup >
import { ref, onMounted, onBeforeUnmount, computed ,watch} from 'vue';
import axios from "axios";
import { ElMessage,ElMessageBox } from 'element-plus';
import {useRouter,useRoute} from "vue-router";
const router=useRouter();
import {request,noderedrequest,tabletRequest}  from "@/utils/server.js" 

// 还平板前通过借还验证码查询预约信息接口
const getList=()=>{
  var verifyCode=getArr.value.join("")
  // debugger
  tabletRequest.post("IotDeviRevertCrtl/checkReturnInfo",
   {
      "verifyCode":verifyCode,
   })
   .then(res => {
    var res=res.data;
    
    if(res.repCode==200){
      console.log("校验码输入正确:",res);
      //验证码校验成功，跳转到扫描页,并使用query传参
      router.push("/returnAuto-scanning?verifyCode="+verifyCode+"&repMsg="+res.repMsg)
    }else{
      console.log("校验码输入不正确或已失效:");
      ElMessage({
          type: 'error',
          message: '校验码输入不正确或已失效',
        })
      // getArr.value=[];
      isActive.value="background-color: red";
      
    }
  })
  .catch(error => {
    console.log("校验码查询失败:",error);
     ElMessage({
      type: 'error',
      message: '校验码输入不正确',
    })
    // getArr.value=[];
    isActive.value="background-color: red";
  });
}
//2.1验证区
const isActive=ref("background-color: rgba(24, 144, 255, 1)")

//2.2密码输入区
const arr=["1","2","3","4","5","6","7","8","9","0"];
const getArr=ref([]);
const inputnum=ref(null);
const clicktEvent=(e)=>{
    console.log(e);
    watch(()=>getArr.value.length,()=>{
    // watch(getArr,()=>{
      if(getArr.value.length<=3){
        isActive.value="background-color: rgba(24, 144, 255, 1)";
      }
    })
    if(getArr.value.length<4){
      getArr.value.push(e);
      if(getArr.value.length==4){
        console.log(getArr.value);
       
        //发请求
        getList()
      }
    }
};

const del=()=>{
  // 索引 删除几个
  getArr.value.splice(getArr.value.length-1,1);
  console.log(getArr.value)
};


</script>

<style lang="less" scoped>
.validatePassword {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(@/assets/tablet_borrowed/1.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // position: relative;
  // 1.左
  & > div:nth-child(1) {
    width: (583/1920) * 100vw;
    height: 100vh;
    background-image: url(@/assets/tablet_borrowed/7.png);
    background-size: (400/1920)*100vw   (400/1920)*100vw;
    background-repeat: no-repeat;
    background-position-x: (100/1920)*100vw;
    background-position-y: (600/1080)*100vh;
    
  }

  // 2.中间区域
  .validateCon {
    //1. 校验
    .validate {
      display: flex;
      justify-content: space-evenly;
      margin-bottom: (100/1080) * 100vh;

      & > div {
        width: (40/1920) * 100vw;
        height: (40/1920) * 100vw;
        border-radius: 50%;
        background-color: rgba(0, 142, 255, 0.1);
        text-align: center;
        border: 1px solid rgba(0, 142, 255, 1);
      }
    }
    //2. 输入校验码
    .inputPassword {
      width: (770/1920) * 100vw;
      height: (630/1080) * 100vh;
      display: flex;
      flex-wrap: wrap;

      & > div {
        width: (250/1920) * 100vw;
        height: (150/1080) * 100vh;
        line-height: (150/1080) * 100vh;
        border-radius: 4px;
        background-color: rgba(0, 142, 255, 0.1);
        color: rgba(255, 255, 255, 1);
        font-size: (64/1920) * 100vw;
        text-align: center;
        font-family: Roboto;
        border: 1px solid rgba(0, 142, 255, 0.8);
      }
      & > div:nth-child(10){
        width: (500/1920) * 100vw;
      }
      img{
        width: (54/1920) * 100vw;
        height: (54/1080) * 100vh;
        margin-top:(48/1080) * 100vh;
      }
    }
  }
  // 3.右
  & > div:nth-child(3) {
    width: (567/1920) * 100vw;
    height: 100vh;
    background-image: url(@/assets/tablet_borrowed/7.png);
    background-size: (400/1920)*100vw   (400/1920)*100vw;
    background-repeat: no-repeat;
    background-position-x: (250/1920)*100vw;
    background-position-y: (-150/1080)*100vh;
  }
}
</style>
