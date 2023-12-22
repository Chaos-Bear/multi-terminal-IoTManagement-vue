<template>
  <div class="xxfb-monitorlist">
    <!-- 1. 顶部 -->
    <div class="top">
      <b>
        <span
          style="font-size: 24px; font-family: SourceHanSansSC-medium; color: rgba(51, 51, 51, 1)"
        >
          发布屏监控
        </span>
      </b>
      <el-button style="float: right; margin-left: 10px" @click="router.push('/')">返回</el-button>

      <div>
        <el-form ref="queryFormRef" :model="searchform" label-position="left">
          <el-row>
            <el-col :span="6">
              <el-form-item label="会议室名称" prop="name">
                <el-input style="width: 80%" v-model="searchform.name" maxlength="50" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="楼层" prop="floor">
                <el-select v-model="searchform.floor" style="width: 80%" placeholder="选择楼层">
                  <el-option
                    v-for="item in floorOptions"
                    :key="item.order"
                    :label="item.floor"
                    :value="item.floor"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="地点" prop="address">
                <el-select v-model="searchform.address" style="width: 80%" placeholder="选择地点">
                  <el-option
                    v-for="item in addressOptions"
                    :key="item.order"
                    :label="item.address"
                    :value="item.address"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="&nbsp;" style="float: right">
                <!-- <el-button type="primary" @click="addMeetingItem">新增</el-button> -->
                <el-button type="primary" @click="searchInfo">查询</el-button>
                <el-button @click="resetQuery()">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- 2.发布屏监控列表 :src="'data:image/jpg;base64,'+"-->
    <div class="tableBox">
      <!-- <el-scrollbar height="100%" v-loading="isLoading"> -->
      <el-scrollbar height="100%" v-loading="isLoading">
        <div class="meetingList" v-if="meetingList.length > 0">
          <div v-for="(item, index) in meetingList" :key="index" class="meetingroom">
            <!-- <img :src="item.roomImg?('data:image/jpg;base64,'+item.roomImg):'/src/assets/xxfb/screenshots/13.png'" @click="getmonitorList(item)" /> -->
            <!-- :zoom-rate="1.2"
             :max-scale="7"
             :min-scale="0.2" 
             :preview-src-list="imgList"
             :initial-index="4" -->
            <el-image 
             :src="item.roomImg?('data:image/jpg;base64,'+item.roomImg):'/src/assets/xxfb/screenshots/13.png'" 
             @click="getmonitorList(item)"
             lazy 
             />
            <div class="roomName">{{ item.roomName }}信息发布屏</div>
          </div>
        </div>
        <!-- 暂无监控列表 -->
        <div v-else class="noMeetingList">暂无监控列表</div>
      </el-scrollbar>
    </div>

    <!-- 3. 分页 -->
    <div class="pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[24, 48, 96]"
        layout=" prev, pager, next, sizes,jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-button type="primary">确定</el-button>
      <img src="@/assets/index/deviceList/refresh.png" @click="refresh()" />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import {    } from 'element-plus'
const router = useRouter()
// import axios from 'axios'

import { releaseRequest } from '@/utils/server.js'
// import defaultImg  from "@/assets/xxfb/screenshots/13.png"
// 会议室配置信息
var floorOptions = ref([])
var addressOptions = ref([])

const getFloorandAddList = () => {
  releaseRequest
    .post('/IOTRoomCrtl/queryIotFloorAddr')
    .then((res) => {
      // console.log("楼层及地点列表获取成功",res.data);
      // 楼层中添加全部
      res.data.iotFloorList.unshift({ floor: '全部', order: 0 })
      floorOptions.value = res.data.iotFloorList

      // 地点中添加全部
      res.data.iotAddresseList.unshift({ address: '全部', order: 0 })
      addressOptions.value = res.data.iotAddresseList
    })
    .catch((error) => {
      console.log('楼层及地点列表获取失败', error)
    })
}
// 会议室列表接口
const isLoading=ref(false)
const getList = () => {
  isLoading.value=true
  releaseRequest
    .post('/IOTRoomCrtl/queryIotRoomScreenList', {
      floor: searchform.floor,
      roomAddr: searchform.address,
      roomName: searchform.name,
      source: '',
      pageNum: currentPage.value,
      pageSize: pageSize.value
    })
    .then((res) => {
      console.log('会议室列表查询成功:', res.data)
      // debugger
      // 总条数
      total.value = res.data.totalRecord
      
      //使用push方法:结构后再赋值
      meetingList.value=res.data.data

      // for( var i=0;i<=meetingList.value.length;i++){
      //   // debugger
      //   var imgSrc
      //   if(meetingList.value[i].roomImg==''){
      //     imgSrc=defaultImg
         
      //   }else{
      //      imgSrc='data:image/jpg;base64,'+meetingList.value[i].roomImg
      //   }
      //   imgList.value.push(imgSrc)
      // }
      // console.log(imgList.value)
    })
    .catch((error) => {
      console.log('会议室列表查询失败:', error)
    })
    .finally(()=>{
      isLoading.value=false
    })
}
onMounted(() => {
  getList()
  getFloorandAddList()
})

// 1.查询/重置
const queryFormRef = ref()
// 查询form表单
const searchform = reactive({
  name: '',
  floor: '2F',
  address: '会议中心'
})
// 查询按钮
const searchInfo = () => {
  //发get请求,渲染会议列表
  getList()
}

// 重置
const resetQuery = () => {
  searchform.name = ''
  searchform.floor = '2F'
  searchform.address = '会议中心'
  // 发get请求，重新渲染会议列表
  getList()
}

// 2.会议室个数
const meetingList = ref([
  //   {roomID:"1",roomName:"A201",floor:"2F",roomAddr:"会议中心",roomImg
  // :""},
])
// const imgList=ref([])
// 点击监控图片，跳转到 监控设备控制列表
const getmonitorList = (item) => {
  // debugger
  // localStorage.setItem('name', item.roomName)
  // localStorage.setItem('roomId', item.roomID)
  router.push('/monitor-control?roomName=' + item.roomName + '&roomID=' + item.roomID)
}

// 3.分页
const currentPage = ref(1)
const pageSize = ref(24)
const total = ref(0)
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  //重新发请求，渲染设备列表
  getList()
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  //重新发请求，渲染设备列表
  getList()
}
// 刷新按钮
const refresh = () => {
  //重新发请求，渲染设备列表
  getList()
}
</script>
<style lang="less" scoped>
.xxfb-monitorlist {
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  // 1. 顶部
  .top {
    padding: 16px 0px 20px 20px;
    height: 113px;
    border-bottom: 1px solid rgba(239, 239, 239, 1);
    flex: none;
    & > div {
      margin-top: 11px;
    }
    :deep(.el-form) {
      .el-form-item__content {
        flex-wrap: nowrap;
      }
    }
  }

  // 2. 发布屏监控列表
  .tableBox {
    flex: 1;
    overflow: hidden;
    .meetingList {
      width: 100%;
      // height: 690px;
      // height: calc( 100% -  );
      padding-top: 16px;
      padding-left: 22px;
      display: flex;
      flex-wrap: wrap;
      // border: 1px solid red;
      .meetingroom {
        width: 180px;
        height: 180px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 1);
        text-align: center;
        border: 1px solid rgba(233, 233, 233, 1);
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .el-image{
          width: 65%;
          height: 100%;
        }
        .roomName {
          width: 100%;
          height: 32px;
          line-height: 32px;
          border-radius: 0px 0px 8px 8px;
          background-color: rgba(0, 0, 0, 0.8);
          color: rgba(255, 255, 255, 1);
          font-size: 14px;
          text-align: left;
          padding-left: 10px;
          font-family: SourceHanSansSC-regular;
          position: absolute;
          bottom: 0;
        }

        &:hover {
          box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.2);
          .custom_option_img1,
          .custom_option_img2 {
            display: inline-block;
          }
        }
      }
    }
    .noMeetingList {
      height: 35px;
      margin-top: 5%;
      color: rgba(191, 191, 191, 1);
      font-size: 24px;
      text-align: center;
      font-family: SourceHanSansSC-regular;
    }
  }

  // 3.分页
  .pagination-block {
    height: 52px;
    display: flex;
    justify-content: flex-end;
    flex: none;
    //上一页
    :deep(.el-pagination) {
      .btn-prev,
      .btn-next {
        border: 1px solid rgba(220, 220, 220, 1);
      }
      .el-pager li {
        width: 32px;
        height: 32px;
        margin-left: 8px;
        margin-right: 8px;
        border-radius: 3px;
      }
      .el-pager li.is-active {
        color: rgba(255, 255, 255, 1);
        background-color: rgba(79, 168, 249, 1) !important;
      }
    }

    .el-button {
      width: 48px;
      height: 32px;
      line-height: 32px;
      margin: 10px 10px 10px 8px;
      border-radius: 3px;
      background-color: rgba(79, 168, 249, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 14px;
      text-align: center;
      font-family: Roboto;
    }
    img {
      width: 24px;
      height: 24px;
      margin-top: 14px;
    }
  }
}
</style>
