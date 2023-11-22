<template>
  <div class="roomInfo">
    <!-- 顶部 -->
    <div class="A2_top">
      <div
        id="liangdu"
        :style="
          props.form.brightNess >= 100
            ? 'background-color:rgba(255, 153, 89, 1);box-shadow: 0px 0px 10px 0px rgba(255, 153, 89, 1);'
            : ''
        "
      ></div>
    </div>
    <!--一层  -->
    <div class="first" id="imageback">
      <div class="first1">
        <span id="newdate" class="newdate">{{ time ? time : '2023年11月1日 上午8:00' }}</span>
        <div class="title" id="room">{{ props.form.roomName || roomName }}会议室</div>
        <div class="ch">MEETING ROOM</div>
      </div>
      <div class="first2">
        <div class="first2-1">
          <div>
            <div id="temp">{{ props.form.roomTemp ? props.form.roomTemp : '-°C' }}</div>
            <span>温度</span>
          </div>
          <div>
            <div id="shidu">{{ props.form.roomHum ? props.form.roomHum : '-%RH' }}</div>
            <span>湿度</span>
          </div>
        </div>
        <div class="first2-2"></div>
        <div class="first2-3">
          <!-- <div id="status">空闲中</div> -->
          <div id="status">{{ props.form.meetStatus == 1 ? '使用中' : '空闲中' }}</div>
          <span>状态</span>
        </div>
      </div>
    </div>
    <!-- 二层 -->
    <div class="second" id="second">
      <!-- 1.有会议 -->
      <div v-if="props.form.mtAreaList && props.form.mtAreaList.length > 0">
        <!-- 第一行同步与否 1同步 0不同步 -->
        <div>
          <!-- 同步1 getLine1FontSize 'font-size': props.form.mtAreaList[0].fontSize + 'px',-->
          <div
            v-if="props.form.mtAreaList[0].syncStatus == 1"
            class="main_title_of_meeting"
            :style="{
              'font-size': props.form.mtAreaList[0].fontSize + 'px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
              visibility: props.form.mtAreaList[0].isShow == '1' ? 'visible' : 'hidden'
            }"
          >
            {{ props.form.mtAreaList[0].textConent }}
          </div>
          <!-- 不同步0 -->
          <div
            v-if="props.form.mtAreaList[0].syncStatus == 0"
            class="main_title_of_meeting"
            :style="{
              visibility: props.form.mtAreaList[0].isShow == '1' ? 'visible' : 'hidden'
            }"
          >
            <div
              class="zdy"
              v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
              :key="i"
              :style="{
                'font-size': props.form.mtAreaList[0].fontSize + 'px',
                color: props.form.mtAreaList[0].textColor,
                'text-align': props.form.mtAreaList[0].showLocat
              }"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <!-- 第二行同步与否 会议开始时间，结束时间  -->
        <div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[1].syncStatus == 1"
            class="startTime_endTime"
            id="startTime_endTime1"
            :style="{
              'font-size': props.form.mtAreaList[1].fontSize + 'px',
              color: props.form.mtAreaList[1].textColor,
              'text-align': props.form.mtAreaList[1].showLocat,
              visibility: props.form.mtAreaList[1].isShow == '1' ? 'visible' : 'hidden'
            }"
          >
            {{ '会议时间：' + props.form.mtAreaList[1].textConent }}
          </div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[1].syncStatus == 0"
            class="startTime_endTime"
            id="startTime_endTime1"
            :style="{
              'font-size': props.form.mtAreaList[1].fontSize + 'px',
              color: props.form.mtAreaList[1].textColor,
              'text-align': props.form.mtAreaList[1].showLocat,
              visibility: props.form.mtAreaList[1].isShow == '1' ? 'visible' : 'hidden'
            }"
          >
            {{ props.form.mtAreaList[1].textConent }}
          </div>
        </div>
        <!-- 第三行同步与否会议主办方 -->
        <div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[2].syncStatus == 1"
            class="hostUnit"
            :style="{
              'font-size': props.form.mtAreaList[2].fontSize + 'px',
              color: props.form.mtAreaList[2].textColor,
              'text-align': props.form.mtAreaList[2].showLocat,
              visibility: props.form.mtAreaList[2].isShow == '1' ? 'visible' : 'hidden'
            }"
          >
            主办方：{{ props.form.mtAreaList[2].textConent }}
          </div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[2].syncStatus == 0"
            class="hostUnit"
            :style="{
              'font-size': props.form.mtAreaList[2].fontSize + 'px',
              color: props.form.mtAreaList[2].textColor,
              'text-align': props.form.mtAreaList[2].showLocat,
              visibility: props.form.mtAreaList[2].isShow == '1' ? 'visible' : 'hidden'
            }"
          >
            {{ props.form.mtAreaList[2].textConent }}
          </div>
        </div>
      </div>
      <!-- 2.暂无会议 -->
      <div v-else class="noMeeting">当前暂无<br />会议信息</div>
    </div>
    <!-- 三层 -->
    <div class="third">
      <!-- 导览图 *****************-->
      <div v-if="props.form.imgShow == '1'">
        <!-- 二楼  -->
        <SecondFloorShuz
          v-if="isSecondFloorShuz"
          :roomName="props.form.roomName"
          :form="form"
        ></SecondFloorShuz>

        <SecondFloorHengf
          v-if="isSecondFloorHengf"
          :roomName="props.form.roomName"
          :form="form"
        ></SecondFloorHengf>
        <!-- 一楼 横反 -->
        <FirstFloorHengf
          v-if="isFirstFloorHengf"
          :roomName="props.form.roomName"
          :form="form"
        ></FirstFloorHengf>

        <!-- 待修改布局 -->
        <SecondFloorShuf
          v-if="isSecondFloorShuf"
          :roomName="props.form.roomName"
          :form="form"
        ></SecondFloorShuf>
        <FirstFloorShuz
          v-if="isFirstFloorShuz"
          :roomName="props.form.roomName"
          :form="form"
        ></FirstFloorShuz>
      </div>
      <!-- 轮播图 -->
      <div class="swiper-container" id="swiper" v-else>
        <el-carousel
          indicator-position="none"
          :interval="props.form.playGap"
          @change="isVideo"
          :autoplay="autoplay"
          ref="carouselRef"
        >
          <el-carousel-item v-for="(item, i) in props.form.mediaAreaList" :key="i">
            <img v-if="item.obsFileType == '1'" :src="item.url" />
            <!-- :src="item.url" -->
            <video
              v-else
              :src="item.url"
              width="684"
              height="385"
              controls
              preload="metadata"
              :id="item.domId"
            ></video>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
// import {} from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
import SecondFloorShuz from '@/components/xxfb/SecondFloorShuz.vue'
import SecondFloorShuf from '@/components/xxfb/SecondFloorShuf.vue' //待修改
import SecondFloorHengf from '@/components/xxfb/SecondFloorHengf.vue'

import FirstFloorHengf from '@/components/xxfb/FirstFloorHengf.vue'
import FirstFloorShuz from '@/components/xxfb/FirstFloorShuz.vue' //待修改
import { rowProps } from 'element-plus'

const roomName = route.query.roomName
const roomIdzdy = route.query.roomID

// var url= window.URL.createObjectURL('C:/Users/55462/Downloads/cat.mp4')

const props = defineProps({
  form: {
    type: Object,
    default() {
      return {}
    }
  }
})
// debugger
// 二楼竖正：A2-206、207、208、201、202、221、220、219、227、226、225    A2-206/202未写，其余ok
// 二楼竖反：204、205、215、216、222、223     全部待修改布局
// 二楼横反：A2-211 A2-228 A2-229 A2-212     A2-228ok  A2-211/A2-229待修改布局  A2-212未写
// 一楼横反：A2-113    ok
// 一楼竖正：A2-117    A2-117待修改布局
// 三楼竖正：307
// 三楼竖反：310、309、307
// 三楼横正：312、310
// 三楼横反：312、309
const isSecondFloorShuz = computed(() => {
  // debugger
  const roomList = [
    'A2-206',
    'A2-207',
    'A2-208',
    'A2-201',
    'A2-202',
    'A2-221',
    'A2-220',
    'A2-219',
    'A2-227',
    'A2-226',
    'A2-225'
  ]
  // return roomList.indexOf(props.form.roomName.trim()) > -1
})
const isSecondFloorShuf = computed(() => {
  const roomList = ['A2-204', 'A2-205', 'A2-215', 'A2-216', 'A2-222', 'A2-223']
  
  // return roomList.indexOf(props.form.roomName.trim()) > -1
})
const isSecondFloorHengf = computed(() => {
  const roomList = ['A2-211', 'A2-228', 'A2-229', 'A2-212']
  if(props.form && props.form.roomName){
     return roomList.indexOf(props.form.roomName.trim()) > -1
  }
  
})
const isFirstFloorHengf = computed(() => {
  const roomList = ['A2-113']
  // return roomList.indexOf(props.form.roomName.trim()) > -1
})

const isFirstFloorShuz = computed(() => {
  const roomList = ['A2-117']
  // return roomList.indexOf(props.form.roomName.trim()) > -1
})

// debugger
// watch(()=>{
// //    props.form.line1Text
// })
//1.获取最新时间，右上角展示
var time = ref('')
//console.log(nd)
var timer = window.setInterval(function () {
  var mynewdate = new Date()
  // console.log("mynewdate",mynewdate)
  var y = mynewdate.getFullYear()
  //  console.log(y)
  var M = mynewdate.getMonth() + 1
  var d = mynewdate.getDate()
  var h = mynewdate.getHours()
  var m = mynewdate.getMinutes()
  m = m < 10 ? '0' + m : m
  var s = mynewdate.getSeconds()
  s = s < 10 ? '0' + s : s
  time.value = y + '年' + M + '月' + d + '日' + '  ' + '  ' + h + ':' + m + ':' + s
}, 1000)

//会议预约字符总长度：125    11个字/58px
//当会议主题长度大于23时，字号修改为36px  17个字/36px
// const getLine1FontSize = computed(() => {
//   // debugger
//   if (props.form.mtAreaList[0].textConent && props.form.mtAreaList[0].textConent.length >= 23 && props.form.mtAreaList[0].textConent.length <= 52) {
//     props.form.mtAreaList[0].fontSize = '36px'
//   } else if (props.form.mtAreaList[0].textConent && props.form.mtAreaList[0].textConent.length >= 53 && props.form.mtAreaList[0].textConent.length <= 84) {
//     // 21个字/30px
//     props.form.mtAreaList[0].fontSize = '30px'
//   } else if (props.form.mtAreaList[0].textConent && props.form.mtAreaList[0].textConent.length >= 85) {
//     props.form.mtAreaList[0].fontSize= '24px'
//   }else{

//   }
// })

//19个字/34px ，当会议主题长度大于19时，字号修改为28px
// const getLine3FontSize = computed(() => {
//   if (props.form.mtAreaList[2].textConent && props.form.mtAreaList[2].textConent.length >= 19 && props.form.mtAreaList[2].textConent.length <= 40) {
//     props.form.mtAreaList[2].fontSize = "28px";
//   } else if (props.form.mtAreaList[2].textConent && props.form.mtAreaList[2].textConent.length >= 41) {
//     props.form.mtAreaList[2].fontSize = "24px";
//   }
// })

const autoplay = ref(true)
// debugger
const carouselRef = ref(null)
const isVideo = (v) => {
  
  if (props.form && props.form.mediaAreaList>0 && props.form.mediaAreaList[v].obsFileType == '2') {
    autoplay.value = false
    var domVideo1 = document.getElementById(props.form.mediaAreaList[v].domId)
    console.log(domVideo1, props.form.mediaAreaList[v].playVideoID)
    // debugger

    domVideo1.play()
    domVideo1.addEventListener(
      'ended',
      function () {
        //结束
        console.log('播放结束')
        carouselRef.value.next()
        autoplay.value = true
      },
      false
    )
  } else {
    autoplay.value = true
    // document.getElementById(props.form.mediaAreaList[v].domId).pause()
  }
}

// const getUrl=(url)=>{
//   return URL.createObjectURL(url)

// }
</script>

<style lang="less" scoped>
body {
  margin: 0 auto;
  background-color: rgba(44, 105, 101, 1);
}

section {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.roomInfo {
  /* width: 98vw;
  height:100vh ; */
  // width: 704px;
  /*height: 1272px;*/
  // height: 1285px;
  width: 100%;
  height: 1280px;
  margin: 0 auto;
  background-color: rgba(44, 105, 101, 1);
  zoom: 0.53;
  // zoom: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.roomInfo .A2_top {
  height: 40px;
  line-height: 49px;
  margin-left: 10px;
  /* padding-top: 4px;*/
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
  font-weight: 800;
  text-align: left;
  font-family: SourceHanSansSC-black;
}

.roomInfo .A2_top div {
  width: 704px;
  height: 20px;
  margin-left: -10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.roomInfo .first {
  width: 684px;
  height: 425px;
  margin: 0px 10px 10px 10px;
  background-size: 100% 100%;
  background-image: url(@/assets/xxfb/bk.png);
  background-repeat: no-repeat;
}

.roomInfo .first .first1 {
  width: 100%;
  height: 236px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}

.roomInfo .first .first1 .newdate {
  height: 36px;
  padding-top: 6px;
  margin-left: 396px;
  opacity: 0.8;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.roomInfo .first .first1 .title {
  /*width: 333px;*/
  height: 70px;
  margin-top: 12px;
  margin-left: 34px;
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-weight: 800;
  text-align: left;
  font-family: SourceHanSansSC-black;
}

.roomInfo .first .first1 .ch {
  width: 368px;
  height: 56px;
  margin-top: 14px;
  margin-left: 30px;
  color: rgba(255, 255, 255, 0.1);
  font-size: 43px;
  font-weight: 800;
  text-align: left;
  font-family: SourceHanSansSC-black;
}

.roomInfo .first .first2 {
  width: 100%;
  height: 188px;
  display: flex;
  justify-content: center;
}

.roomInfo .first .first2 > div {
  width: 50%;
  height: 158px;
  text-align: center;
}

.roomInfo .first .first2 > .first2-1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.roomInfo .first .first2 > .first2-1 > div {
  text-align: center;
  width: 160px;
}

.roomInfo .first .first2 > .first2-1 > div > div {
  line-height: 70px;
  margin-top: 34px;
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-weight: 800;
  text-align: center;
  font-family: SourceHanSansSC-black;
}

.roomInfo .first .first2 .first2-2 {
  width: 1px;
  height: 100px;
  margin-top: 50px;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}

.roomInfo .first .first2 > .first2-3 > div {
  line-height: 70px;
  margin-top: 34px;
  margin-bottom: 14px;
  color: rgba(255, 255, 255, 1);
  font-size: 48px;
  font-weight: 800;
  text-align: center;
  font-family: SourceHanSansSC-black;
}

.roomInfo .first .first2 span {
  width: 56px;
  height: 41px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28px;
  text-align: center;
  font-family: SourceHanSansSC-medium;
}

.roomInfo .second {
  width: 682px;
  height: 392px;
  margin: 0px 10px 10px 10px;
  overflow-y: hidden;
  border: 1px solid transparent;
  background-color: rgba(255, 255, 255, 0.08);
}

.roomInfo .second .main_title_of_meeting {
  width: 636px;
  color: rgba(255, 255, 255, 1);
  font-size: 54px;
  /*font-size: 58px;*/
  font-weight: 800;
  text-align: center;
  font-family: SourceHanSansSC-black;
  margin: 0 auto;
  margin-top: 60px;
  /*margin-bottom: 30px;*/
}
.zdy {
  font-weight: 800;
}

.roomInfo .second .startTime_endTime {
  line-height: 80px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 34px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.roomInfo .second .hostUnit {
  color: rgba(255, 255, 255, 0.8);
  font-size: 34px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.roomInfo .second .noMeeting {
  width: 636px;
  line-height: 100px;
  margin-top: 80px;
  /*color: rgba(255, 255, 255, 0.1)!important;*/
  color: rgba(255, 255, 255, 0.1);
  font-size: 68px;
  text-align: center;
  font-family: SourceHanSansSC-black;
}

.roomInfo .third {
  width: 684px;
  height: 385px;
  // margin: 0px 10px 10px 10px;
  // margin: 0px 10px 10px 0px;
  display: flex;
  align-items: center;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*轮播图*/
.swiper-container {
  width: 684px;
  height: 385px;
  // border: 1px solid red;
 
  :deep(.el-carousel) {
    height: 395px;
    .el-carousel__container {
      height: 100%;
      img {
        width: 684px;
        height: 100%;
        margin: 0 !important;
      }
    }
  }
}
</style>
