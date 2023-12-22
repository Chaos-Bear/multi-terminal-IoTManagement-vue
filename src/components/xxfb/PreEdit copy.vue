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
            <!-- °C -->
            <div id="temp">
              <span>{{ props.form.roomTemp ? props.form.roomTemp : '21.6' }}</span>
              <span style="font-size:20px"> °C </span>
            </div>
            <span>温度</span>
          </div>
          <div>
            <div id="shidu">
              <span>{{ props.form.roomHum ? props.form.roomHum : '30.7' }}</span>
              <span style="font-size:20px"> %RH </span>
            </div>
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
              display: props.form.mtAreaList[0].isShow == '1' ? 'block' : 'none'
            }"
          >

          <!-- 会议时间或者主办方有一个显示，则按3行来自适应 -->
          <template  v-if="props.form.mtAreaList[1].isShow=='1' || props.form.mtAreaList[2].isShow=='1'">
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>33 && props.form.mtAreaList[0].textConent.length<46">
            <div class="zdy" :style="{
              'font-size': '46px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=46 && props.form.mtAreaList[0].textConent.length<=59">
            <div class="zdy" :style="{
              'font-size':'38px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=60" >
            <div class="zdy" :style="{
              'font-size': '34px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length<=33" >
            <div class="zdy" :style="{
              'font-size': props.form.mtAreaList[0].fontSize + 'px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize!=54 ">
              <div class="zdy" :style="{
                'font-size': props.form.mtAreaList[0].fontSize + 'px',
                color: props.form.mtAreaList[0].textColor,
                'text-align': props.form.mtAreaList[0].showLocat,
              }">
                {{ props.form.mtAreaList[0].textConent }}
              </div>
            </template>
          </template>
          <!-- 否则 按4行来自适应 -->
          <template v-else>
             <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>44 && props.form.mtAreaList[0].textConent.length<60">
            <div class="zdy" :style="{
              'font-size': '46px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=60 && props.form.mtAreaList[0].textConent.length<=80">
            <div class="zdy" :style="{
              'font-size':'38px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=81" >
            <div class="zdy" :style="{
              'font-size': '34px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length<=33" >
            <div class="zdy" :style="{
              'font-size': props.form.mtAreaList[0].fontSize + 'px',
              color: props.form.mtAreaList[0].textColor,
              'text-align': props.form.mtAreaList[0].showLocat,
            }">
               {{ props.form.mtAreaList[0].textConent }}
            </div>
            </template>
            <template v-if="props.form.mtAreaList[0].fontSize!=54 ">
              <div class="zdy" :style="{
                'font-size': props.form.mtAreaList[0].fontSize + 'px',
                color: props.form.mtAreaList[0].textColor,
                'text-align': props.form.mtAreaList[0].showLocat,
              }">
                {{ props.form.mtAreaList[0].textConent }}
              </div>
            </template>
          </template>
          
        </div>

          <!-- 不同步0 -->
          <div
            v-if="props.form.mtAreaList[0].syncStatus == 0"
            class="main_title_of_meeting"
            :style="{
              display: props.form.mtAreaList[0].isShow == '1' ? 'block' : 'none'
            }"
          >
            <!-- <div
              class="zdy"
              v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
              :key="i"
              :style="{
                'font-size': props.form.mtAreaList[0].fontSize + 'px',
                color: props.form.mtAreaList[0].textColor,
                'text-align': props.form.mtAreaList[0].showLocats
              }"
            >
              {{ item }}
            </div> -->
            <!-- 会议时间或者主办方有一个显示，则按3行来自适应 -->
            <template  v-if="props.form.mtAreaList[1].isShow=='1' || props.form.mtAreaList[2].isShow=='1'">
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>33 && props.form.mtAreaList[0].textConent.length<46">
              <div
                class="zdy"
                v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
                :key="i"
                :style="{
                  'font-size': '46px',
                  color: props.form.mtAreaList[0].textColor,
                  'text-align': props.form.mtAreaList[0].showLocat   
                }"
              >
                {{ item }}
              </div>
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=46 && props.form.mtAreaList[0].textConent.length<=59">
                  <div
                    class="zdy"
                    v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
                    :key="i"
                    :style="{
                      'font-size': '38px',
                      color: props.form.mtAreaList[0].textColor,
                      'text-align': props.form.mtAreaList[0].showLocat
                    }"
                  >
                    {{ item }}
                  </div>
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=60" >
                  <div
                    class="zdy"
                    v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
                    :key="i"
                    :style="{
                      'font-size': '34px',
                      color: props.form.mtAreaList[0].textColor,
                      'text-align': props.form.mtAreaList[0].showLocat
                    }"
                  >
                    {{ item }}
                  </div>
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length<=33">
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
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize!=54 ">
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
                </template>
            </template>

            <!-- 否则 按4行来自适应 -->
            <template v-else>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>44 && props.form.mtAreaList[0].textConent.length<60">
              <div
                class="zdy"
                v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
                :key="i"
                :style="{
                  'font-size': '46px',
                  color: props.form.mtAreaList[0].textColor,
                  'text-align': props.form.mtAreaList[0].showLocat   
                }"
              >
                {{ item }}
              </div>
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=60 && props.form.mtAreaList[0].textConent.length<=80">
                  <div
                    class="zdy"
                    v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
                    :key="i"
                    :style="{
                      'font-size': '38px',
                      color: props.form.mtAreaList[0].textColor,
                      'text-align': props.form.mtAreaList[0].showLocat
                    }"
                  >
                    {{ item }}
                  </div>
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length>=81" >
                  <div
                    class="zdy"
                    v-for="(item, i) in props.form.mtAreaList[0].textConent.split('；')"
                    :key="i"
                    :style="{
                      'font-size': '34px',
                      color: props.form.mtAreaList[0].textColor,
                      'text-align': props.form.mtAreaList[0].showLocat
                    }"
                  >
                    {{ item }}
                  </div>
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize==54 && props.form.mtAreaList[0].textConent.length<=44">
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
                </template>
                <template v-if="props.form.mtAreaList[0].fontSize!=54 ">
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
                </template>
            </template>
          </div>
        </div>
        <!-- 第二行同步与否 会议开始时间，结束时间  visibility: props.form.mtAreaList[1].isShow == '1' ? 'visible' : 'hidden'-->
        <div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[1].syncStatus == 1"
            class="startTime_endTime"
            id="startTime_endTime1"
            :style="{
              'font-size': props.form.mtAreaList[1].fontSize + 'px',
              color: props.form.mtAreaList[1].textColor,
              'text-align': props.form.mtAreaList[1].showLocat,
              display: props.form.mtAreaList[1].isShow == '1' ? 'block' : 'none'
            }"
          >
            {{
              props.form.mtAreaList[1].textConent
                ? '会议时间：' + props.form.mtAreaList[1].textConent
                : ''
            }}
          </div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[1].syncStatus == 0"
            class="startTime_endTime"
            id="startTime_endTime1"
            :style="{
              'font-size': props.form.mtAreaList[1].fontSize + 'px',
              color: props.form.mtAreaList[1].textColor,
              'text-align': props.form.mtAreaList[1].showLocat,
              display: props.form.mtAreaList[1].isShow == '1' ? 'block' : 'none'
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
              display: props.form.mtAreaList[2].isShow == '1' ? 'block' : 'none'
            }"
          >
            {{
              props.form.mtAreaList[2].textConent
                ? '主办方：' + props.form.mtAreaList[2].textConent
                : ''
            }}
          </div>
          <div
            v-if="props.form && props.form.mtAreaList && props.form.mtAreaList[2].syncStatus == 0"
            class="hostUnit"
            :style="{
              'font-size': props.form.mtAreaList[2].fontSize + 'px',
              color: props.form.mtAreaList[2].textColor,
              'text-align': props.form.mtAreaList[2].showLocat,
              display: props.form.mtAreaList[2].isShow == '1' ? 'block' : 'none'
            }"
          >
            {{ props.form.mtAreaList[2].textConent }}
          </div>
        </div>
      </div>
      <!-- 2.暂无会议 -->
      <div
        v-if="
          (props.form.mtAreaList && props.form.mtAreaList.length == 0) ||
          (props.form.mtAreaList &&
            props.form.mtAreaList.length > 0 &&
            props.form.mtAreaList[0].textConent == '' &&
            props.form.mtAreaList.length > 1 &&
            !props.form.mtAreaList[1].textConent &&
            props.form.mtAreaList.length > 2 &&
            props.form.mtAreaList[2].textConent == '')
        "
        class="noMeeting"
      >
        <!-- 当前暂无<br />会议信息 -->
        当前暂无会议
      </div>
    </div>
    <!-- 三层 -->
    <div class="third">
      <!-- 导览图 *****************-->
      <div v-if="props.form && props.form.imgShow && props.form.imgShow == '1'">
        <!-- 二楼  -->
        <SecondFloorHengf
          v-if="isSecondFloorHengf"
          :roomName="props.form.roomName"
          :form="form"
        ></SecondFloorHengf>
        
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
import { ref, computed, onBeforeUnmount } from 'vue'
// import {} from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()

import SecondFloorHengf from '@/components/xxfb/SecondFloorHengf.vue'

import {} from 'element-plus'

const roomName = route.query.roomName
// const roomIdzdy = route.query.roomID

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

const isSecondFloorHengf = computed(() => {
  const roomList = ['A2-211', 'A2-228', 'A2-229', 'A2-212'   ,'A2-204', 'A2-205', 'A2-215', 'A2-216', 'A2-222', 'A2-223'   ,'A2-206','A2-207','A2-208','A2-201','A2-202', 'A2-221','A2-220','A2-219','A2-227','A2-226','A2-225']
  if (props.form && props.form.roomName) {
    return roomList.indexOf(props.form.roomName.trim()) > -1
  }else{

  }
})


// debugger
// watch(()=>{
// //    props.form.line1Text
// })
//1.获取最新时间，右上角展示
const time = ref('')
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

const autoplay = ref(true)
// debugger
const carouselRef = ref(null)
const isVideo = (v) => {
  if (
    props.form &&
    props.form.mediaAreaList > 0 &&
    props.form.mediaAreaList[v].obsFileType == '2'
  ) {
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

onBeforeUnmount(() => {
  clearInterval(timer)
})
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
  // margin-left: 10px;
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
  // margin-left: -10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.roomInfo .first {
  width: 688px;
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
// .roomInfo .first .first2 > .first2-1 > div > div {
//   line-height: 70px;
//   margin-top: 34px;
//   margin-bottom: 14px;
//   color: rgba(255, 255, 255, 1);
//   font-size: 48px;
//   font-weight: 800;
//   text-align: center;
//   font-family: SourceHanSansSC-black;
// }
.roomInfo .first .first2 > .first2-1 > div > div {
  line-height: 70px;
  margin-top: 34px;
  span:nth-child(1){
    color: rgba(255, 255, 255, 1);
    font-size: 48px;
    font-weight: 800;
    text-align: center;
    font-family: SourceHanSansSC-black;
  }
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
  width: 688px;
  height: 392px;
  margin: 0px 10px 10px 10px;
  overflow-y: hidden;
  border: 1px solid transparent;
  background-color: rgba(255, 255, 255, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  // margin-top: 60px;
  /*margin-bottom: 30px;*/
  word-wrap: break-word;
  line-height: 1.5;
}
.zdy {
  font-weight: 800;
  word-wrap: break-word;
}

.roomInfo .second .startTime_endTime {
  line-height: 80px;
  //line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
  font-size: 34px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  word-wrap: break-word;
}

.roomInfo .second .hostUnit {
  color: rgba(255, 255, 255, 0.8);
  font-size: 34px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
  word-wrap: break-word;
}

// .roomInfo .second .noMeeting {
//   width: 636px;
//   line-height: 100px;
//   // margin-top: 80px;
//   /*color: rgba(255, 255, 255, 0.1)!important;*/
//   color: rgba(255, 255, 255, 0.1);
//   font-size: 68px;
//   text-align: center;
//   font-family: SourceHanSansSC-black;
// }
.roomInfo .second .noMeeting {
  width: 636px;
  line-height: 100px;
  // margin-top: 80px;
  /*color: rgba(255, 255, 255, 0.1)!important;*/
  color: rgba(255, 255, 255, 0.1);
  font-size: 68px;
  text-align: center;
  font-family: SourceHanSansSC-black;
}

.roomInfo .third {
  width: 688px;
  height: 385px;
  overflow: hidden;
  position: relative;
  // margin: 0px 10px 10px 10px;
  // margin: 0px 10px 10px 0px;
  // display: flex;
  // align-items: center;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*轮播图*/
.swiper-container {
  width: 688px;
  height: 385px;
  // border: 1px solid red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  :deep(.el-carousel) {
    height: 385px;
    .el-carousel__container {
      height: 100%;
      img {
        width: 688px;
        height: 100%;
        margin: 0 !important;
        vertical-align: top;
      }
    }
  }
}
</style>
