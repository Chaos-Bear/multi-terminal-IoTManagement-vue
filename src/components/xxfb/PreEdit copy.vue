<template>
  <div class="roomInfo">
    <!-- 顶部 -->
    <div class="A2_top">
      <div id="liangdu"></div>
    </div>
    <!--一层  -->
    <div class="first" id="imageback">
      <div class="first1">
        <span id="newdate" class="newdate">2022年8月17日 上午8:00</span
        ><span id="seconds" class="newdseconds"></span>
        <div class="title" id="room">A2-225会议室</div>
        <div class="ch">MEETING ROOM</div>
      </div>
      <div class="first2">
        <div class="first2-1">
          <div>
            <div id="temp">-°C</div>
            <span>温度</span>
          </div>
          <div>
            <div id="shidu">-%RH</div>
            <span>湿度</span>
          </div>
        </div>
        <div class="first2-2"></div>
        <div class="first2-3">
          <div id="status">空闲中</div>
          <span>状态</span>
        </div>
      </div>
    </div>
    <!-- 二层 -->
    <div class="second" id="second">
      <div
        class="main_title_of_meeting"
        id="title"
        :style="{
          'font-size': props.data.line1FontSize + 'px',
          color: props.data.line1TextColor,
          'text-align': props.data.line1textAlign
        }"
      >
        {{ props.data.line1Text }}
      </div>
      <div class="sub1_title_of_meeting" id="subtitle1"></div>
      <div class="sub1_title_of_meeting" id="subtitle2"></div>
      <div class="sub1_title_of_meeting" id="subtitle3"></div>

      <!-- 会议开始时间，结束时间  -->
      <!-- <div class="startTime_endTime" id="startTime_endTime">
                    会议时间：<span id="startTime_endTime1"></span></div> -->

      <div
        class="startTime_endTime"
        id="startTime_endTime1"
        :style="{
          'font-size': props.data.line2FontSize + 'px',
          color: props.data.line2TextColor,
          'text-align': props.data.line2textAlign
        }"
      >
        {{ props.data.line2Text }}
      </div>
      <!-- 会议主办方 -->
      <!-- <div class="hostUnit" id="hostUnit">主办方：<span id="hostUnit1"></span></div> -->
      <div
        class="hostUnit"
        id="hostUnit1"
        :style="{
          'font-size': props.data.line3FontSize + 'px',
          color: props.data.line3TextColor,
          'text-align': props.data.line3textAlign
        }"
      >
        {{ props.data.line3Text }}
      </div>
    </div>
    <!-- 三层 -->
    <div class="third">
      <div class="div" id="path">
        <div class="div3">
          <img src="@/assets/xxfb/path/202.png" />
          <!-- 提示语 -->
          <div>
            <div>
              <img src="@/assets/xxfb/path/200.png" />
              <span>温馨提示：</span>
            </div>
            <div>&nbsp;&nbsp;请说导航到xxx会议室<br />&nbsp;&nbsp;或说xxx会议室怎么走</div>
          </div>
        </div>
        <div class="div2cont" id="div2cont">
          <div class="div2" id="div2">
            <!-- 过道 -->
            <div class="div2-1"><br />过<br />道 <br /><br /><br />过<br />道</div>
            <!-- 中间中部 -->
            <div class="div2-2" id="div2-2">
              <div class="left">
                <div class="left1">过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
                <!-- 会议室1区 -->
                <div class="left2">
                  <div class="left2-1">
                    <div>
                      <div id="A2211" data-roomName="A2211" class="roomName">A2-211</div>
                      <!-- 竖双门 -->
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png "
                      />
                      <!-- 竖双门 -->
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png "
                      />
                    </div>
                    <div>
                      <div id="A2206" data-roomName="A2206" class="roomName">
                        A2-206<br />
                        音控室
                      </div>
                      <!-- 单门 左 -->
                      <img
                        class="door"
                        src="@/assets/xxfb/path/3.png "
                      />
                    </div>
                  </div>

                  <div class="left2-2">
                    <div></div>
                    <div>
                      <div>
                        <div id="A2207" data-roomName="A2207" class="roomName">A2-207</div>
                        <!-- 单扇门 右  左 -->
                        <img
                          class="door"
                          src="@/assets/xxfb/path/4.png"
                        />
                        <img
                          class="door"
                          src="@/assets/xxfb/path/3.png "
                        />
                      </div>
                      <div>
                        <div id="A2208" data-roomName="A2208" class="roomName">A2-208</div>
                        <!-- 单扇门 下  上 -->
                        <img
                          class="door"
                          src="@/assets/xxfb/path/2.png"
                        />
                        <img
                          class="door"
                          src="@/assets/xxfb/path/5.png"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="left2-3">
                    <div></div>
                    <!-- 排风扇竖 -->
                    <img
                      src="@/assets/xxfb/path/8.png"
                    />
                    <div>
                      <img src="@/assets/xxfb/path/huoti.png" />
                    </div>
                  </div>
                </div>
                <div class="left3">过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
                <!-- 会议室2区 -->
                <div class="left4">
                  <div class="left4-1">
                    <div>
                      <div id="A2212" data-roomName="A2212">A2-212</div>
                      <!-- 竖 双排门 -->
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png"
                      />
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png"
                      />
                    </div>
                    <div></div>
                  </div>
                  <div class="left4-2">
                    <div>
                      <div id="A2205" data-roomName="A2205">A2-205</div>
                      <!-- 横 双门 -->
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                    <div>
                      <div id="A2201" data-roomName="A2201">A2-201</div>
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                  </div>
                  <div class="left4-3">
                    <div>
                      <div id="A2204" data-roomName="A2204">A2-204</div>
                      <!-- 横 双排门 -->
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                    <div>
                      <div id="A2202" data-roomName="A2202">
                        <br />A2-202<br />
                        服务室
                      </div>
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                  </div>
                  <div class="left4-4">
                    <div></div>
                    <img
                      src="@/assets/xxfb/path/8.png"
                    />
                  </div>
                </div>
                <div class="left5">
                  <div>
                    <div>
                      <div>
                        <!-- 需改图片 -->
                        <img src="@/assets/xxfb/path/iconPark-girl.png" />
                      </div>
                      <div>
                        <!-- 需改图片 -->
                        <img src="@/assets/xxfb/path/iconPark-boy.png" />
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div>过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
                </div>
              </div>
              <div class="middle">
                <div>
                  <div>
                    <img src="@/assets/xxfb/path/dianti.png" />
                    <img src="@/assets/xxfb/path/dianti.png" />
                    <img src="@/assets/xxfb/path/huoti.png" />
                  </div>
                  <!-- 排风扇 竖 -->
                  <img
                    src="@/assets/xxfb/path/8.png"
                  />
                  <img
                    src="@/assets/xxfb/path/8.png"
                  />
                </div>
                <div>
                  <div>
                    <div>
                      <img src="@/assets/xxfb/path/shoufuti2.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="right1">
                  <div>
                    <div></div>
                    <div>
                      <div>
                        <!-- 需改图片 -->
                        <img src="@/assets/xxfb/path/peidianjian.png" />
                      </div>
                      <div>
                        <!-- 需改图片 -->
                        <img src="@/assets/xxfb/path/peidianjian.png" />
                      </div>
                    </div>
                  </div>
                  <div>过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
                </div>
                <div class="right2">
                  <div class="right2-1">
                    <div>
                      <div id="A2229" data-roomName="A2229">A2-229</div>
                      <!-- 竖 双排门 -->
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png"
                      />
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png"
                      />
                    </div>
                    <div>
                      <div id="A2221" data-roomName="A2221">A2-221</div>
                      <!-- 横 双门 -->
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                  </div>
                  <div class="right2-2">
                    <div>
                      <div id="A2215" data-roomName="A2215">A2-215</div>
                      <!-- 横 双门 -->
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                    <div>
                      <div id="A2220" data-roomName="A2220">A2-220</div>
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                  </div>
                  <div class="right2-3">
                    <div>
                      <div id="A2216" data-roomName="A2216"><br />A2-216<br />工作室</div>
                      <!-- 单扇门 右  左 -->
                      <img
                        class="door"
                        src="@/assets/xxfb/path/4.png"
                      />
                      <img
                        class="door"
                        src="@/assets/xxfb/path/3.png "
                      />
                    </div>
                    <div>
                      <div id="A2219" data-roomName="A2219">A2-219</div>
                      <img
                        class="doubledoor"
                        src="@/assets/xxfb/path/6.png"
                      />
                    </div>
                  </div>
                  <div class="right2-4">
                    <img
                      src="@/assets/xxfb/path/8.png"
                    />
                    <div></div>
                  </div>
                </div>
                <div class="right3">过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
                <div class="right4">
                  <div class="right4-1">
                    <div>
                      <div id="A2228" data-roomName="A2228">A2-228</div>
                      <!-- 竖 双排门 -->
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png"
                      />
                      <img
                        class="hdoubledoor"
                        src="@/assets/xxfb/path/7.png"
                      />
                    </div>
                    <div>
                      <div>
                        <img
                          src="@/assets/xxfb/path/11.png"
                        />
                        <img
                          src="@/assets/xxfb/path/11.png"
                        />
                        <img
                          src="@/assets/xxfb/path/11.png"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="right4-2">
                    <div>
                      <div>
                        <div id="A2222" data-roomName="A2222">A2-222</div>
                        <!-- 横 双排门 -->
                        <img
                          class="doubledoor"
                          src="@/assets/xxfb/path/6.png"
                        />
                      </div>
                      <div>
                        <div id="A2223" data-roomName="A2223">A2-223</div>
                        <!-- 横 双排门 -->
                        <img
                          class="doubledoor"
                          src="@/assets/xxfb/path/6.png"
                        />
                      </div>
                    </div>
                    <div>
                      <div>
                        <div id="A2227" data-roomName="A2227">A2-227</div>
                        <!-- 横 双排门 -->
                        <img
                          class="doubledoor"
                          src="@/assets/xxfb/path/6.png"
                        />
                      </div>
                      <div>
                        <div id="A2226" data-roomName="A2226">A2-226</div>
                        <!-- 横 双排门 -->
                        <img
                          class="doubledoor"
                          src="@/assets/xxfb/path/6.png"
                        />
                      </div>
                      <div>
                        <div id="A2225" class="active-start">A2-225</div>
                        <!-- 横 双排门 -->
                        <img
                          class="doubledoor"
                          src="@/assets/xxfb/path/6.png"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="right4-3">
                    <div></div>
                    <img
                      src="@/assets/xxfb/path/8.png"
                    />
                  </div>
                </div>
                <div class="right5">
                  <div>过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
                </div>
              </div>
            </div>
            <!-- 过道 -->
            <div class="div2-3" id="div2-3"><br />过<br />道 <br /><br /><br />过<br />道</div>
            <div class="arrowPoint" id="zuobiao">
              <span>左</span>
              <img src="@/assets/xxfb/path/left.png" />

              <img id="zuobiaodian" src="@/assets/xxfb/path/zhishi.png" />
              <img src="@/assets/xxfb/path/right.png" />
              <span>右</span>
            </div>
          </div>
        </div>
        <div class="div1">
          <ul>
            <li><img src="@/assets/xxfb/path/dianti.png" /><span>电梯</span></li>
            <li><img src="@/assets/xxfb/path/louti.png" /><span>楼梯</span></li>
            <li>
              <img src="@/assets/xxfb/path/shoufudt.png" /><span>手扶电梯</span>
            </li>
            <li><img src="@/assets/xxfb/path/huoti.png" /><span>货梯</span></li>
            <li><img src="@/assets/xxfb/path/wc.png" /><span>卫生间</span></li>
            <li>
              <img src="@/assets/xxfb/path/peidianjian.png" /><span>配电间</span>
            </li>
            <li>
              <!-- <img
                              src="@/assets/xxfb/path/dangqian.png"/> -->
              <span class="zhongdian"></span><span>当前所在位置</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 轮播图 -->
      <div class="swiper-container" id="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><img src="http://39.105.179.38:9797/noderad/3.jpg" /></div>
          <div class="swiper-slide"><img src="http://39.105.179.38:9797/noderad/3.jpg" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import {} from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter

const props = defineProps({
  data: {
    type: Object,
    default() {
      return {
        // 第一行标题是否同步
        issyncLine1Value: 'false',
        line1Text: '',
        line1FontSize: 40,
        line1TextColor: '#13CE66',
        line1textAlign: 'center',
        // 第二行标题是否同步
        issyncLine2Value: 'false',
        line2Text: '',
        line2FontSize: 24,
        line2TextColor: '#13CE66',
        line2textAlign: 'center',
        // 第三行标题是否同步
        issyncLine3Value: 'false',
        line3Text: '',
        line3FontSize: 24,
        line3TextColor: '#13CE66',
        line3textAlign: 'center',

        // 提前发布时间
        prePubTime: 1,

        // 是否开启轮播图
        issyncSwiper: false,
        swiperTime: '5000'
      }
    }
  }
})
// watch(()=>{
// //    props.data.line1Text
// })
//1.获取最新时间，右上角展示
// var nd = document.getElementById("newdate");
// var ns = document.getElementById("seconds");
// //console.log(nd)
// var timer = window.setInterval(function () {
//     var mynewdate = new Date();
//     // console.log("mynewdate",mynewdate)
//     var y = mynewdate.getFullYear();
//     //  console.log(y)
//     var M = mynewdate.getMonth() + 1;
//     var d = mynewdate.getDate();
//     var h = mynewdate.getHours();
//     var m = mynewdate.getMinutes();
//     m = m < 10 ? ("0" + m) : m;
//     var s = mynewdate.getSeconds();
//     s = s < 10 ? ("0" + s) : s;
//     nd.innerHTML = y + "年" + M + "月" + d + "日" + "  " + "  " + h + ":" + m;
//     ns.innerHTML = ":" + s
// }, 1000)

// // 2.swiper展示
// var mySwiper;

// // 3.Listen for incoming messages from Node-RED
// uibuilder.onChange('msg', function (msg) {
//     if (msg) {
//         if (msg.temp || msg.shidu || msg.liangdu || msg.random) {
//             // document.getElementById("temp").innerHTML = msg.temp ? msg.temp : "-°C";
//             // document.getElementById("shidu").innerHTML = msg.shidu ? msg.shidu : "-%RH";
//             document.getElementById("temp").innerHTML = msg.temp ? msg.temp : "19°C";
//             document.getElementById("shidu").innerHTML = msg.shidu ? msg.shidu : "60.3";
//             // document.getElementById("liangdu").innerHTML = msg.liangdu>=100 ? "&#128161;" : "";
//             document.getElementById("liangdu").style.backgroundColor = msg.liangdu >= 100 ? "rgba(255, 145, 0, 1)" : "rgba(255, 255, 255, 0.1)";
//             document.getElementById("liangdu").style.boxShadow = msg.liangdu >= 100 ? "0px 0px 10px 0px rgba(255, 153, 89, 100)" : "";

//         }

//         //1. 会议状态
//         document.getElementById("status").innerHTML = msg.statusTime
//             ? "使用中"
//             : "空闲中";

//         if (msg.issync == 0) {

//             document.getElementById("title").innerHTML =
//                 msg.mtName == "" || msg.mtName == undefined
//                     ? "当前暂无<br>会议信息"
//                     : msg.mtName;

//             if (msg.mtName == "" || msg.mtName == undefined) {
//                 document.getElementById("title").style.color = "rgba(255, 255, 255, 0.1)";
//                 document.getElementById("title").classList.add("nomeeting");
//                 document.getElementById("title").style.fontSize = "68px";
//                 document.getElementById("title").style.textAlign = "center";
//                 document.getElementById("title").style.marginTop = "80px";
//                 document.getElementById("startTime_endTime1").innerHTML = "";
//                 document.getElementById("hostUnit1").innerHTML = "";
//             } else {
//                 document.getElementById("title").style.color = "rgba(255, 255, 255, 1)";
//                 document.getElementById("title").style.fontSize = "58px";
//                 // 会议预约字符总长度：125    11个字/58px
//                 // 当会议主题长度大于23时，字号修改为36px  17个字/36px
//                 if (msg.mtName && msg.mtName.length >= 23 && msg.mtName.length <= 52) {
//                     document.getElementById("title").style.fontSize = "36px";
//                 } else if (msg.mtName && msg.mtName.length >= 53 && msg.mtName.length <= 84) {
//                     // 21个字/30px
//                     document.getElementById("title").style.fontSize = "30px";
//                 } else if (msg.mtName && msg.mtName.length >= 85) {
//                     document.getElementById("title").style.fontSize = "24px";
//                 }

//                 document.getElementById("title").style.textAlign = "center";
//                 document.getElementById("title").style.lineHeight = "1.5";
//                 document.getElementById("title").classList.remove("nomeeting");
//             }

//             if (msg.statusTime || msg.mtName || msg.startTime || msg.endTime || msg.hostUnit) {
//                 //2. 会议标题 颜色

//                 //3. 会议开始时间结束时间 颜色
//                 document.getElementById("startTime_endTime1").innerHTML =
//                     "会议时间:" + msg.startTime + "~" + msg.endTime;
//                 document.getElementById("startTime_endTime1").style.color = "rgba(255, 255, 255, 0.8)";
//                 document.getElementById("startTime_endTime1").style.textAlign = "center";
//                 document.getElementById("startTime_endTime1").style.fontSize = "34px";
//                 document.getElementById("startTime_endTime1").style.lineHeight = "80px";

//                 //4. 会议主办方 颜色
//                 document.getElementById("hostUnit1").innerHTML =
//                     msg.hostUnit === undefined ? "" : "主办方:" + msg.hostUnit;
//                 document.getElementById("hostUnit1").style.color = "rgba(255, 255, 255, 0.8)";
//                 document.getElementById("hostUnit1").style.textAlign = "center";
//                 document.getElementById("hostUnit1").style.fontSize = "34px";
//                 document.getElementById("hostUnit1").style.lineHeight = "1.5";
//                 //19个字/34px ，当会议主题长度大于19时，字号修改为28px
//                 if (msg.hostUnit && msg.hostUnit.length >= 19 && msg.hostUnit.length <= 40) {
//                     document.getElementById("hostUnit1").style.fontSize = "28px";
//                 } else if (msg.hostUnit && msg.hostUnit.length >= 41) {
//                     document.getElementById("hostUnit1").style.fontSize = "24px";
//                 }

//                 if (msg.isshowline1 != "showline1") {
//                     document.getElementById("title").style.opacity = "0";
//                 } else {
//                     document.getElementById("title").style.opacity = "1";
//                 }
//                 if (msg.isshowline2 != "showline2") {
//                     document.getElementById("startTime_endTime1").style.opacity = "0";
//                 } else {
//                     document.getElementById("startTime_endTime1").style.opacity = "1";
//                 }
//                 if (msg.isshowline3 != "showline3") {
//                     document.getElementById("hostUnit1").style.opacity = "0";
//                 } else {
//                     document.getElementById("hostUnit1").style.opacity = "1";
//                 }

//             }
//         }

//         // 自定义会议信息
//         if (msg.issync != 0 && (msg.line1context || msg.line1fontSize || msg.line1align || msg.line1color || msg.line2context || msg.line2fontSize || msg.line2align || msg.line2color || msg.line3context || msg.line3fontSize || msg.line3align || msg.line3color)) {
//             document.getElementById("title").style.lineHeight = "1.4";
//             document.getElementById("title").style.marginTop = "60px";
//             document.getElementById("title").innerHTML = msg.line1context == "" || msg.line1context == undefined
//                 ? ""
//                 : msg.line1context;

//             document.getElementById("title").style.fontSize = msg.line1fontSize
//                 ? msg.line1fontSize + "px"
//                 : "54px";

//             document.getElementById("title").style.textAlign = msg.line1align
//                 ? msg.line1align
//                 : "center";
//             document.getElementById("title").style.color = msg.line1color == "" || msg.line1color == undefined
//                 ? "rgba(255, 255, 255, 1)"
//                 : msg.line1color;
//             document.getElementById("title").style.opacity = "1";

//             document.getElementById("startTime_endTime1").innerHTML =
//                 msg.line2context == "" || msg.line2context == undefined
//                     ? ""
//                     : msg.line2context;
//             document.getElementById("startTime_endTime1").style.fontSize =
//                 msg.line2fontSize ? msg.line2fontSize + "px" : "34px";
//             document.getElementById("startTime_endTime1").style.textAlign =
//                 msg.line2align ? msg.line2align : "center";
//             document.getElementById("startTime_endTime1").style.color = msg.line2color
//                 ? msg.line2color
//                 : "rgba(255, 255, 255, 0.8)";
//             document.getElementById("startTime_endTime1").style.opacity = "1";
//             document.getElementById("startTime_endTime1").style.lineHeight = "1.4";

//             document.getElementById("hostUnit1").innerHTML =
//                 msg.line3context == "" || msg.line3context == undefined
//                     ? ""
//                     : msg.line3context;
//             document.getElementById("hostUnit1").style.fontSize = msg.line3fontSize
//                 ? msg.line3fontSize + "px"
//                 : "34px";
//             document.getElementById("hostUnit1").style.textAlign = msg.line3align
//                 ? msg.line3align
//                 : "center";
//             document.getElementById("hostUnit1").style.color = msg.line3color
//                 ? msg.line3color
//                 : "rgba(255, 255, 255, 0.8)";
//             document.getElementById("hostUnit1").style.lineHeight = "1.4";
//             document.getElementById("hostUnit1").style.opacity = "1";

//         } else {
//             //msg.line1context="";
//             // msg.line1fontSize="";
//             // msg.line1align="";
//             // msg.line2context="";
//             //msg.line2fontSize="";
//             // msg.line2align="";
//             //  msg.line3context="";
//             // msg.line3fontSize="";
//             //  msg.line3align="";
//             // msg.line1color="";
//             // msg.line2color="";
//             // msg.line3color="";
//         };

//         // 同步 及 自定义 切换显示导览图，还是轮播图
//         if (msg.isswiperorpath == "swiper") {
//             document.getElementById("path").style.display = "none";
//             document.getElementById("swiper").style.display = "block";
//             var activeIndex = 0;
//             if (mySwiper) {
//                 activeIndex = mySwiper.activeLoopIndex;
//                 // mySwiper.destroy(true);
//                 // mySwiper = null;
//                 mySwiper.params.autoplay = (msg.autoplaytime == "" || msg.autoplaytime == undefined ? 5000 : msg.autoplaytime);
//             } else {
//                 mySwiper = new Swiper('.swiper-container', {
//                     loop: true,
//                     initialSlide: activeIndex,
//                     autoplay: (msg.autoplaytime == "" || msg.autoplaytime == undefined ? 5000 : msg.autoplaytime),
//                 });
//             }

//             //同步 及 自定义 状态均可切换轮播图图片
//             if (msg.img && msg.img.length > 0) {
//                 mySwiper.removeAllSlides();
//                 for (var i = 0; i < msg.img.length; i++) {
//                     var newSlide = mySwiper.createSlide('<img style="width:100%;height:100%;object-fit:contain" src="data:image/gif;base64,' + (msg.img[i]) + '">', 'swiper-slide ', 'div');
//                     mySwiper.prependSlide(newSlide); //加到Swiper的前

//                 }
//             }
//         } else {
//             if (mySwiper) {
//                 mySwiper.destroy(true);
//                 mySwiper = null;
//             }
//             document.getElementById("path").style.display = "flex";

//             // 解决图片请求完毕，再展示问题
//             // if (!$('#scaleimg').attr("loaded")) {
//             //     imgLoad("http://39.105.179.38:9797/noderad/A2-225.jpg",
//             //         function () {
//             //             let ele = document.getElementById('scaleimg')
//             //             $('#scaleimg').attr("loaded", "loaded")
//             //             ele.scrollTop = 920;
//             //         }
//             //     )
//             // }

//             document.getElementById("swiper").style.display = "none";
//         };

//         //语音触发
//         if (msg.yuyin) {
//             $("#div2").css("zoom", 1);

//             // 清除放大缩小滚动条定时器
//             clearTimeout(scrolltimer);

//             // 当有点击时清除body中 路径展示定时器 标识属性
//             // clearTimeout($("body").attr("timeout-scale"));

//             if ($("body").attr("locked") == 1) {
//                 return
//             };

//             $("body").attr("locked", 1);

//             $('[data-roomname]').css("background-color", "rgba(52, 127, 122, 1)");

//             $(".line").remove()
//             $(".endimg").remove()
//             $(".startimg").remove()
//             document.getElementById("zuobiaodian").style.opacity = "1";

//             clearTimeout($("body").attr("timeout"));

//             // var end = $(this).attr("data-roomname");
//             // var end = $(this).attr("data-roomname");
//             var end = 'A2' + msg.yuyin;

//             console.log(end);
//             start_end("A2225_" + end, end);
//         }
//     }
// })

// // 缩略图滚动条
// // function imgLoad(src, success, error) {
// //     var img = new Image()
// //     if (img.complete) {
// //         typeof success == "function" && success()
// //     };
// //     img.onload = function () {
// //         typeof success == "function" && success()
// //     };
// //     img.onerror = function () {
// //         typeof error == "function" && error()
// //     };
// //     img.src = src;
// // }
// // 滚动条
// let ele = document.getElementById('div2cont');
// ele.scrollTop = 984;

// var scrolltimer
// var type = 1;
// function scrollSwiper() {
//     // debugger
//     scrolltimer = setInterval(function () {
//         if (type == 3) {
//             type = 1;
//         } else {
//             type++;
//         }
//         if (type == 1) {
//             $("#div2").css("zoom", 1.972);
//             ele.scrollTop = 984;
//         } else if (type == 2) {
//             $("#div2").css("zoom", 1.972);
//             ele.scrollTop = 0;
//         } else {
//             $("#div2").css("zoom", 1);
//         }
//     }, 5000)
// };
// scrollSwiper();
// // 声明会议室坐标点
// var CoordPoint = {
//     // 一区
//     A2225_A2208: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 234],
//         [442, 234],
//         [354, 234],
//     ],
//     A2225_A2207: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 234],
//         [447, 234],
//         [248, 234],
//     ],
//     A2225_A2211: [
//         [344, 1020],
//         [38, 1020],
//         [38, 1020],
//         [38, 130],
//     ],
//     A2225_A2206: [
//         [344, 1020],
//         [38, 1020],
//         [38, 1020],
//         [38, 234],
//         [38, 234],
//         [140, 234],
//     ],
//     //二区
//     A2225_A2204: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 234],
//         [442, 234],
//         [340, 234],
//     ],
//     A2225_A2205: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 234],
//         [442, 234],
//         [262, 234],
//     ],
//     A2225_A2202: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 454],
//         [442, 454],
//         [336, 454],
//     ],
//     A2225_A2201: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 454],
//         [442, 454],
//         [264, 454],
//     ],
//     A2225_A2212: [
//         [344, 1020],
//         [38, 1020],
//         [38, 1020],
//         [38, 348],
//     ],
//     // //3区
//     A2225_A2216: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 582],
//         [447, 582],
//         [356, 582],
//     ],
//     A2225_A2215: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 582],
//         [447, 582],
//         [260, 582],
//     ],
//     A2225_A2229: [
//         [344, 1020],
//         [38, 1020],
//         [38, 1020],
//         [38, 690],
//     ],
//     A2225_A2219: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 814],
//         [447, 814],
//         [334, 814],
//     ],
//     A2225_A2220: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 814],
//         [447, 814],
//         [260, 814],
//     ],
//     A2225_A2221: [
//         [344, 1020],
//         [38, 1020],
//         [38, 1020],
//         [38, 814],
//         [38, 814],
//         [108, 814],
//     ],

//     // //4区
//     A2225_A2223: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 814],
//         [447, 814],
//         [350, 814],
//     ],
//     A2225_A2222: [
//         [344, 1020],
//         [447, 1020],
//         [442, 1020],
//         [442, 814],
//         [447, 814],
//         [246, 814],
//     ],
//     A2225_A2228: [
//         [344, 1020],
//         [38, 1020],
//         [38, 1020],
//         [38, 930],
//     ],
//     A2225_A2225: [
//         // [344, 1020],
//         // [344, 1020],
//     ],
//     A2225_A2226: [
//         [344, 1020],
//         [276, 1020],
//     ],
//     A2225_A2227: [
//         [344, 1020],
//         [196, 1020],
//     ],

// };
// var toA2208 = document.getElementById("A2208");
// var toA2207 = document.getElementById("A2207");
// var toA2211 = document.getElementById("A2211");
// var toA2206 = document.getElementById("A2206");
// var toA2204 = document.getElementById("A2204");
// var toA2202 = document.getElementById("A2202");
// var toA2205 = document.getElementById("A2205");
// var toA2201 = document.getElementById("A2201");
// var toA2212 = document.getElementById("A2212");

// var toA2216 = document.getElementById("A2216"); //ok

// var toA2219 = document.getElementById("A2219");

// var toA2215 = document.getElementById("A2215"); //ok
// var toA2220 = document.getElementById("A2220");
// var toA2229 = document.getElementById("A2229"); //ok
// var toA2221 = document.getElementById("A2221");
// var toA2223 = document.getElementById("A2223");
// var toA2225 = document.getElementById("A2225");
// var toA2222 = document.getElementById("A2222");
// var toA2221 = document.getElementById("A2221");
// var toA2226 = document.getElementById("A2226");
// var toA2227 = document.getElementById("A2227");
// var toA2228 = document.getElementById("A2228");

// $('[data-roomname]').on("click", function (e) {
//     $("#div2").css("zoom", 1);

//     // 清除放大缩小滚动条定时器
//     clearTimeout(scrolltimer);

//     // 当有点击时清除body中 路径展示定时器 标识属性
//     // clearTimeout($("body").attr("timeout-scale"));

//     if ($("body").attr("locked") == 1) {
//         return
//     };

//     $("body").attr("locked", 1);

//     $('[data-roomname]').css("background-color", "rgba(52, 127, 122, 1)");

//     $(".line").remove()
//     $(".endimg").remove()
//     $(".startimg").remove()
//     document.getElementById("zuobiaodian").style.opacity = "1";

//     clearTimeout($("body").attr("timeout"));

//     var end = $(this).attr("data-roomname");
//     console.log(end)
//     start_end("A2225_" + end, end)
// })
// function start_end(xy, end) {
//     for (i = 0; i < CoordPoint[xy].length; i = i + 2) {
//         // console.log(CoordPoint[xy][i]);

//         if ((i + 2) <= CoordPoint[xy].length) {
//             drawLine(CoordPoint[xy][i], CoordPoint[xy][i + 1], i);
//         } else {
//             //   end(CoordPoint[xy][i][0], CoordPoint[xy][i][1]);
//         }
//     }

//     // var length = $(".line").length;
//     if ($(".line").length == 1) {
//         document.getElementById("zuobiaodian").style.opacity = "0";
//         $('#div2').append("<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][0][0] - 15) + "px;top:" + (CoordPoint[xy][0][1] - 15) + "px';>");
//         // 如果是1条线
//         re($(".line").eq(0), function () {
//             $('#div2').append("<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][i - 1][0] - 15) + "px;top:" + (CoordPoint[xy][i - 1][1] - 15) + "px';>")
//             $('#' + end).css("background-color", "rgba(255, 145, 0, 1)")

//             $("body").removeAttr("locked");
//             var timeout = (setTimeout(function () {
//                 $('#' + end).css("background-color", "rgba(52, 127, 122, 1)");
//                 $(".line").remove()
//                 $(".endimg").remove()
//                 $(".startimg").remove()
//                 document.getElementById("zuobiaodian").style.opacity = "1";

//                 //动态路径展示完毕，调用放大缩小全屏展示函数
//                 scrollSwiper();
//             }, 15000));
//             // 给body添加路径展示定时器 标识
//             $("body").attr("timeout", timeout);

//             // var scaletimeout = setTimeout(function () {
//             //     $("#div2").css("zoom", 1.972);
//             //     let ele = document.getElementById('div2cont');
//             //     ele.scrollTop = 1080;
//             // }, 10000);
//             // $("body").attr("timeout-scale", scaletimeout);
//         });
//     } else if ($(".line").length == 2) {
//         document.getElementById("zuobiaodian").style.opacity = "0";
//         $('#div2').append("<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][0][0] - 15) + "px;top:" + (CoordPoint[xy][0][1] - 15) + "px';>");
//         // 如果是2条线
//         re($(".line").eq(0), function () {
//             re($(".line").eq(1), function () {
//                 $('#div2').append("<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][i - 1][0] - 15) + "px;top:" + (CoordPoint[xy][i - 1][1] - 15) + "px';>")
//                 $('#' + end).css("background-color", "rgba(255, 145, 0, 1)")

//                 $("body").removeAttr("locked");
//                 var timeout = (setTimeout(function () {
//                     $('#' + end).css("background-color", "rgba(52, 127, 122, 1)");
//                     $(".line").remove()
//                     $(".endimg").remove()
//                     $(".startimg").remove()
//                     document.getElementById("zuobiaodian").style.opacity = "1";

//                     //动态路径展示完毕，调用放大缩小全屏展示函数
//                     scrollSwiper();
//                 }, 15000));
//                 // 给body添加路径展示定时器 标识
//                 $("body").attr("timeout", timeout);

//                 // var scaletimeout = setTimeout(function () {
//                 //     $("#div2").css("zoom", 1.972);
//                 //     let ele = document.getElementById('div2cont');
//                 //     ele.scrollTop = 1080;
//                 // }, 10000);
//                 // $("body").attr("timeout-scale", scaletimeout);
//             });
//         });
//     } else if ($(".line").length == 3) {
//         document.getElementById("zuobiaodian").style.opacity = "0";
//         $('#div2').append("<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][0][0] - 15) + "px;top:" + (CoordPoint[xy][0][1] - 15) + "px';>");
//         // 如果是3条线
//         re($(".line").eq(0), function () {
//             re($(".line").eq(1), function () {
//                 re($(".line").eq(2), function () {
//                     $('#div2').append("<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][i - 1][0] - 20) + "px;top:" + (CoordPoint[xy][i - 1][1] - 15) + "px';>")
//                     $('#' + end).css("background-color", "rgba(255, 145, 0, 1)")

//                     $("body").removeAttr("locked");
//                     var timeout = (setTimeout(function () {
//                         $('#' + end).css("background-color", "rgba(52, 127, 122, 1)");
//                         $(".line").remove()
//                         $(".endimg").remove()
//                         $(".startimg").remove()
//                         document.getElementById("zuobiaodian").style.opacity = "1";

//                         //动态路径展示完毕，调用放大缩小全屏展示函数
//                         scrollSwiper();
//                     }, 15000));
//                     // 给body添加路径展示定时器 标识
//                     $("body").attr("timeout", timeout);

//                     // var scaletimeout = setTimeout(function () {
//                     //     $("#div2").css("zoom", 1.972);
//                     //     let ele = document.getElementById('div2cont');
//                     //     ele.scrollTop = 1080;
//                     // }, 10000);
//                     // $("body").attr("timeout-scale", scaletimeout);
//                 })
//             });
//         });
//     } else if ($(".line").length == 4) {
//         document.getElementById("zuobiaodian").style.opacity = "0";
//         $('#div2').append("<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][0][0] - 15) + "px;top:" + (CoordPoint[xy][0][1] - 15) + "px';>");
//         // 如果是4条线
//         re($(".line").eq(0), function () {
//             re($(".line").eq(1), function () {
//                 re($(".line").eq(2), function () {
//                     re($(".line").eq(3), function () {
//                         //  debugger
//                         $('#div2').append("<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][i - 1][0] - 15) + "px;top:" + (CoordPoint[xy][i - 1][1] - 15) + "px';>");
//                         $('#' + end).css("background-color", "rgba(255, 145, 0, 1)")

//                         $("body").removeAttr("locked");
//                         var timeout = (setTimeout(function () {
//                             $('#' + end).css("background-color", "rgba(52, 127, 122, 1)");
//                             $(".line").remove()
//                             $(".endimg").remove()
//                             $(".startimg").remove()
//                             document.getElementById("zuobiaodian").style.opacity = "1";

//                             //动态路径展示完毕，调用放大缩小全屏展示函数
//                             scrollSwiper();
//                         }, 15000));
//                         // 给body添加路径展示定时器 标识
//                         $("body").attr("timeout", timeout);

//                         // var scaletimeout = setTimeout(function () {
//                         //     $("#div2").css("zoom", 1.972);
//                         //     let ele = document.getElementById('div2cont');
//                         //     ele.scrollTop = 1080;
//                         // }, 10000);
//                         // $("body").attr("timeout-scale", scaletimeout);
//                     })
//                 })

//             });
//         });
//     } else if ($(".line").length == 5) {
//         document.getElementById("zuobiaodian").style.opacity = "0";
//         $('#div2').append("<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][0][0] - 15) + "px;top:" + (CoordPoint[xy][0][1] - 15) + "px';>");
//         // 如果是5条线
//         re($(".line").eq(0), function () {
//             re($(".line").eq(1), function () {
//                 re($(".line").eq(2), function () {
//                     re($(".line").eq(3), function () {
//                         re($(".line").eq(4), function () {
//                             $('#div2').append("<img class'endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" + (CoordPoint[xy][i - 1][0] - 15) + "px;top:" + (CoordPoint[xy][i - 1][1] - 15) + "px';>")
//                             $('#' + end).css("background-color", "rgba(255, 145, 0, 1)")

//                             $("body").removeAttr("locked");
//                             var timeout = (setTimeout(function () {
//                                 $('#' + end).css("background-color", "rgba(52, 127, 122, 1)");
//                                 $(".line").remove()
//                                 $(".endimg").remove()
//                                 $(".startimg").remove()
//                                 document.getElementById("zuobiaodian").style.opacity = "1";

//                                 //动态路径展示完毕，调用放大缩小全屏展示函数
//                                 scrollSwiper();
//                             }, 15000));
//                             // 给body添加路径展示定时器 标识
//                             $("body").attr("timeout", timeout);

//                             // var scaletimeout = setTimeout(function () {
//                             //     $("#div2").css("zoom", 1.972);
//                             //     let ele = document.getElementById('div2cont');
//                             //     ele.scrollTop = 1080;
//                             // }, 10000);
//                             // $("body").attr("timeout-scale", scaletimeout);
//                         })
//                     })
//                 })
//             });
//         });
//     }

//     function re($line, callback) {
//         if ($line.attr("data-type") == "x") {
//             $line
//                 .find("div").stop()
//                 .animate({ width: $line.width() }, "fast", "linear", function () {
//                     callback();
//                 });
//         } else if ($line.attr("data-type") == "y") {
//             $line
//                 .find("div").stop()
//                 .animate(
//                     { height: $line.height() },
//                     "fast",
//                     "linear",
//                     function () {
//                         callback();
//                     }
//                 );
//         } else {
//         }
//     }
// };
// function drawLine(start, end) {
//     var div = document.createElement("div");
//     div.style.position = "absolute";
//     div.className = "line";

//     // div.style.backgroundColor = "red";
//     //添加子div
//     var children = document.createElement("div");
//     children.style.backgroundColor = "orange";

//     div.appendChild(children);

//     var div2 = document.getElementById("div2");
//     div2.appendChild(div);

//     // 如果线与Y轴平行
//     if (start[0] == end[0]) {
//         div.setAttribute("data-type", "y");
//         if (start[1] > end[1]) {
//             // 反方向
//             div.setAttribute("data-forword", "minus");
//             div.style.transform = "rotate(180deg)";
//         } else {
//             // 同方向
//             div.setAttribute("data-forword", "add");
//         }

//         div.style.width = 5 + "px";
//         div.style.height = Math.abs(start[1] - end[1]) + "px";
//         children.style.height = 0;
//         children.style.width = 5 + "px";

//         // 判断起点 终点距离 分别与原点比较
//         var abs1 = Math.sqrt(start[0] * start[0] + start[1] * start[1]);
//         var abs2 = Math.sqrt(end[0] * end[0] + end[1] * end[1]);
//         if (abs1 > abs2) {
//             // debugger
//             div.style.top = end[1] + "px";
//             div.style.left = end[0] + "px";
//         } else {
//             div.style.top = start[1] + "px";
//             div.style.left = start[0] + "px";
//         }
//     } else if (start[1] == end[1]) {
//         div.setAttribute("data-type", "x");
//         if (start[0] > end[0]) {
//             // 反方向
//             div.setAttribute("data-forword", "minus");
//             div.style.transform = "rotate(180deg)";
//         } else {
//             // 同方向
//             div.setAttribute("data-forword", "add");
//         }
//         //如果与 x轴平行
//         div.style.width = Math.abs(start[0] - end[0]) + "px";
//         div.style.height = 5 + "px";

//         children.style.height = 5 + "px";
//         children.style.width = 0;
//         // 判断起点 终点距离 分别与原点比较
//         var abs1 = Math.sqrt(start[0] * start[0] + start[1] * start[1]);
//         var abs2 = Math.sqrt(end[0] * end[0] + end[1] * end[1]);
//         if (abs1 > abs2) {
//             div.style.top = end[1] + "px";
//             div.style.left = end[0] + "px";
//         } else {
//             div.style.top = start[1] + "px";
//             div.style.left = start[0] + "px";
//         }
//     } else {
//     }
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
  width: 704px;
  /*height: 1272px;*/
  height: 1285px;
  margin: 0 auto;
  background-color: rgba(44, 105, 101, 1);
  zoom: 0.53;
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
  background-image: url(https://s2.loli.net/2023/03/21/3ZkLSzKDCOhitgy.png);
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
  margin-left: 406px;
  opacity: 0.8;
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.roomInfo .first .first1 .newdseconds {
  opacity: 0.8;
  font-size: 24px;
  color: rgba(255, 255, 255, 1);
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

.roomInfo .second .sub1_title_of_meeting {
  /* width: 684px; */
  /*height: 50px;*/
  color: rgba(255, 255, 255, 1);
  font-size: 44px;
  font-weight: 800;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.roomInfo .second .sub2_title_of_meeting {
  /* width: 684px; */
  /*height: 50px;*/
  color: rgba(255, 255, 255, 0.8);
  font-size: 42px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.roomInfo .second .sub3_title_of_meeting {
  /* width: 684px; */
  /*height: 50px;*/
  color: rgba(255, 255, 255, 0.8);
  font-size: 42px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
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

.roomInfo .second .nomeeting {
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
  margin: 0px 10px 10px 10px;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.div {
  width: 1920px;
  height: 1080px;
  background-color: #2c6965;
  /* border: 1px solid red; */
  /*zoom: 0.345545454;*/
  zoom: 0.354245454;
  display: flex;
  justify-content: space-between;
}

/* 右侧区域 */
.div1 {
  width: 21.09%;
  height: 100%;
  /*margin-left: 90px;*/
  margin-top: 16px;
}

.div1 ul {
  margin-left: 28px;
  margin-top: 262px;
}

.div1 ul li {
  margin-bottom: 40px;
  height: 44px;
  display: flex;
  align-items: center;
}

.div1 ul li img {
  width: 44px;
  height: 44px;
  vertical-align: top;
  margin: 0;
  margin-left: 17px;
  margin-right: 28px;
}

.div1 ul li:nth-child(1) img {
  width: 56px;
  height: 56px;
  margin-left: 10px;
  background-color: transparent;
}

.div1 ul li:nth-child(4) img {
  background-color: rgba(52, 127, 122, 1);
}

.div1 ul li span {
  display: inline-block;
  height: 44px;
  line-height: 44px;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  text-align: center;
  font-family: SourceHanSansSC-regular;
}

.div1 ul li:last-child span:nth-child(1) {
  width: 44px;
  height: 44px;
  background-color: rgba(255, 145, 0, 1);
  margin: 0 24px 0 16px;
}

.div1 ul li:last-child span:nth-child(2) {
  /*transform: translateY(-12px);*/
}

/* 添加滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  height: 50px;
  /* background-color: #999; */
  background-color: #2c6965;
  -webkit-border-radius: 4px;
  /* outline: 2px solid #ededed; */
  outline: 2px solid #2c6965;
  outline-offset: -2px;
}

/* 中间区域 */
.div2cont {
  height: 1080px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.div2 {
  height: 1042px;
  /* margin-top: 16px;
            margin-bottom: 22px; */
  background-color: rgba(255, 255, 255, 0.04);
  position: relative;
  display: flex;
  justify-content: space-between;
  zoom: 1.972;
}

/* 中间中部 */
.div2 img {
  margin: 0;
  vertical-align: top;
  background-color: transparent;
}

/* 中间左侧 */
.div2 .div2-1,
.div2 .div2-3 {
  width: 60px;
  height: 1042px;
  line-height: 136px;
  color: rgba(255, 255, 255, 0.2);
  font-size: 22px;
  text-align: center;
  font-family: Roboto;
}

/* 中间中部 */
.div2 .div2-2 {
  width: 366px;
  height: 1080px;
  /* border: 1px solid red; */
  /* 所有会议室公用 */
  color: rgba(255, 255, 255, 1);
  font-size: 22px;
  text-align: center;
  font-family: Roboto;
  background-color: #2c6965;
}

.div2 .div2-2 .left .left1,
.div2 .div2-2 .right .right5 {
  width: 366px;
  height: 34px;
  line-height: 34px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  text-align: center;
  font-family: Roboto;
}

.div2 .div2-2 .left .left3,
.div2 .div2-2 .right .right3 {
  width: 100%;
  height: 31px;
  line-height: 31px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  text-align: center;
  font-family: Roboto;
  margin-top: 6px;
  margin-bottom: 6px;
}

.div2 .div2-2 .left .left5,
.div2 .div2-2 .right .right1 {
  width: 366px;
  height: 58px;
  line-height: 58px;
  display: flex;
  justify-content: space-between;
}

.div2 .div2-2 .left .left2 {
  /*height: 176px;*/
  height: 182px;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
  padding: 6px 6px 0px 6px;
}

.div2 .div2-2 .left .left2 .left2-1 {
  width: 100px;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(1),
.div2 .div2-2 .left .left2 .left2-1 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(1) > div {
  width: 100px;
  height: 120px;
  line-height: 120px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-bottom: 6px;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(1) img:nth-child(2) {
  width: 6px;
  height: 42px;
  border-radius: 1px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 8px;
  left: 0;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(1) img:nth-child(3) {
  width: 6px;
  height: 42px;
  border-radius: 1px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 8px;
  left: 0;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(2) > div {
  width: 100px;
  height: 50px;
  font-size: 18px;
  line-height: 21px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-bottom: 4px;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(2) img {
  width: 20px;
  height: 6px;
  border-radius: 1px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 0px;
  right: 18px;
}

.div2 .div2-2 .left .left2 .left2-2 {
  width: 204px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) {
  width: 100%;
  height: 40px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-2 div:nth-child(2) {
  width: 100%;
  height: 132px;
  display: flex;
  justify-content: space-between;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div > div {
  width: 100px;
  height: 130px;
  line-height: 130px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  margin-bottom: 4px;
  margin-right: 4px;
}

.door {
  width: 20px;
  height: 5px;
  opacity: 0.7;
}

.div2 .div2-2 .left .left2 .left2-2 div:nth-child(2) > div img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 18px;
}

.div2 .div2-2 .left .left2 .left2-2 div:nth-child(2) > div img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 18px;
}

.div2 .div2-2 .left .left2 .left2-3 {
  width: 40px;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) {
  width: 40px;
  height: 52px;
  border-radius: 4px;
  margin-bottom: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-3 > img {
  width: 40px;
  height: 78px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(3) {
  /* width: 34px;
    height: 34px; */
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(3) img {
  width: 34px;
  height: 34px;
  margin: 4px;
}

/*会议室2区 */
.div2 .div2-2 .left .left4 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.div2 .div2-2 .left .left4 .left4-1 > div,
.div2 .div2-2 .left .left4 .left4-2 > div,
.div2 .div2-2 .left .left4 .left4-3 > div {
  position: relative;
}

.div2 .div2-2 .left .left4 .left4-1 {
  width: 100px;
  height: 177px;
  margin-left: 6px;
}

.div2 .div2-2 .left .left4 .left4-1 > div:nth-child(1) {
  width: 100%;
  height: 120px;
  line-height: 120px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.hdoubledoor {
  width: 6px;
  height: 42px;
}

.doubledoor {
  width: 42px;
  height: 6px;
}

.div2 .div2-2 .left .left4 .left4-1 > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  left: 0;
  top: 7px;
}

.div2 .div2-2 .left .left4 .left4-1 > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 7px;
}

.div2 .div2-2 .left .left4 .left4-1 > div:nth-child(2) {
  width: 100px;
  height: 53px;
  line-height: 51px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left4 .left4-2 {
  width: 120px;
  height: 177px;
}

.div2 .div2-2 .left .left4 .left4-2 > div > div {
  width: 120px;
  height: 85px;
  margin-bottom: 4px;
  line-height: 77px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 10px;
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 10px;
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 10px;
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 10px;
}

.div2 .div2-2 .left .left4 .left4-3 {
  width: 80px;
  height: 177px;
}

.div2 .div2-2 .left .left4 .left4-3 > div > div {
  width: 80px;
  height: 85px;
  margin-bottom: 4px;
  line-height: 85px;
  font-size: 20px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left4 .left4-3 > div:nth-child(2) > div {
  height: 85px;
  line-height: 21px;
  font-size: 20px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 18px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 18px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 18px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 18px;
}

.div2 .div2-2 .left .left4 .left4-4 {
  width: 40px;
  height: 177px;
  margin-right: 6px;
}

.div2 .div2-2 .left .left4 .left4-4 div:nth-child(1) {
  width: 40px;
  height: 85px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left4 .left4-4 img {
  width: 40px;
  height: 85px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(1),
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(2) {
  width: 100px;
  height: 20px;
  margin-left: 6px;
  background-color: #2c6965;
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(1) {
  margin-top: 30px;
}

.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(1) > div,
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(2) > div {
  width: 48px;
  height: 20px;
  margin-top: 4px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(1) > div img,
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(2) > div img {
  width: 18px;
  height: 18px;
  margin: 1px 15px;
}

.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(1) {
  width: 112px;
  height: 31px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(1) {
  margin-top: 0px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) {
  width: 254px;
  height: 58px;
  line-height: 58px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  text-align: center;
  font-family: Roboto;
}

/*中间楼梯 */
.div2 .div2-2 .middle {
  width: 100%;
  height: 48px;
  /* border:1px solid red; */
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .middle > div:nth-child(1) {
  display: flex;
  justify-content: flex-start;
  /* width: 100px;
    height: 35px; */
  background-color: #2c6965;
}

.div2 .div2-2 .middle > div:nth-child(1) > div {
  width: 48px;
  height: 35px;
  text-align: center;
  border-radius: 4px;
  margin: 6px;
  margin-right: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-evenly;
}

.div2 .div2-2 .middle > div:nth-child(1) > div img {
  width: 15px;
  height: 15px;
  margin-top: 10px;
}

.div2 .div2-2 .middle > div:nth-child(1) > img:nth-child(2) {
  width: 24px;
  height: 35px;
  margin-top: 6px;
  margin-right: 0px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .middle > div:nth-child(1) > img:nth-child(3) {
  width: 24px;
  height: 35px;
  margin-top: 6px;
  margin-right: 6px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .middle > div:nth-child(2) {
  width: 150px;
  height: 48px;
  background-color: #2c6965;
}

.div2 .div2-2 .middle > div:nth-child(2) div {
  width: 150px;
  margin: 5px 0;
}

.div2 .div2-2 .middle > div:nth-child(2) > div div {
  height: 38px;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .middle > div:nth-child(2) > div div img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

/* 中间右侧 */
/*会议室3区 */
.div2 .div2-2 .right .right2 {
  display: flex;
  justify-content: space-between;
  height: 186px;
  margin-bottom: 4px;
  margin-top: 6px;
  color: rgba(255, 255, 255, 1);
  font-size: 22px;
}

.div2 .div2-2 .right .right2 .right2-1 > div,
.div2 .div2-2 .right .right2 .right2-2 > div,
.div2 .div2-2 .right .right2 .right2-3 > div {
  position: relative;
}

.div2 .div2-2 .right .right2 .right2-1 {
  width: 100px;
  height: 100%;
  margin-left: 6px;
}

.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(1) {
  width: 100px;
  height: 110px;
  line-height: 110px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  left: 0;
  top: 10px;
}

.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 10px;
}

.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) {
  width: 100px;
  height: 70px;
  line-height: 70px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) img {
  position: absolute;
  bottom: 0;
  left: 18px;
}

.div2 .div2-2 .right .right2 .right2-2 {
  width: 120px;
  height: 100%;
}

.div2 .div2-2 .right .right2 .right2-2 > div > div {
  width: 120px;
  height: 90px;
  margin-bottom: 4px;
  line-height: 90px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right2 .right2-2 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 10px;
}

.div2 .div2-2 .right .right2 .right2-2 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 10px;
}

.div2 .div2-2 .right .right2 .right2-2 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 10px;
}

.div2 .div2-2 .right .right2 .right2-2 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 10px;
}

.div2 .div2-2 .right .right2 .right2-3 {
  width: 80px;
  height: 100%;
}

.div2 .div2-2 .right .right2 .right2-3 > div > div {
  width: 80px;
  height: 90px;
  margin-bottom: 4px;
  line-height: 90px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div {
  height: 90px;
  line-height: 21px;
  font-size: 20px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 10px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 10px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 18px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 18px;
}

.div2 .div2-2 .right .right2 .right2-4 {
  width: 42px;
  height: 100%;
  margin-right: 6px;
}

.div2 .div2-2 .right .right2 .right2-4 div:nth-child(2) {
  width: 42px;
  height: 90px;
  margin-top: 4px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right2 .right2-4 img {
  width: 42px;
  height: 90px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

/*会议室4区 */
.div2 .div2-2 .right .right4 {
  height: 166px;
  margin-bottom: 4px;
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-1 > div,
.div2 .div2-2 .right .right4 .right4-2 > div,
.div2 .div2-2 .right .right4 .right4-3 > div {
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-1 {
  width: 100px;
  /* height: 172px; */
  margin-right: 4px;
  margin-left: 6px;
}

.div2 .div2-2 .right .right4 .right4-1 > div:nth-child(1) > div {
  width: 100px;
  height: 120px;
  line-height: 120px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-1 > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  left: 0;
  top: 10px;
}

.div2 .div2-2 .right .right4 .right4-1 > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 7px;
}

.div2 .div2-2 .right .right4 .right4-1 > div:nth-child(2) {
  width: 108px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.04);
  position: absolute;
  left: 0;
  bottom: -4px;
}

.div2 .div2-2 .right .right4 .right4-1 > div:nth-child(2) div {
  width: 59px;
  height: 29px;
  margin-left: 49px;
  background-color: #2c6965;
}

.div2 .div2-2 .right .right4 .right4-1 > div:nth-child(2) div img {
  width: 14px;
  height: 14px;
  margin-top: 6px;
}

.div2 .div2-2 .right .right4 .right4-2 {
  width: 204px;
  height: 100%;
  margin-right: 4px;
  margin-bottom: 6px;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) {
  width: 100%;
  height: 80px;
  margin-bottom: 4px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) > div > div {
  width: 100px;
  height: 80px;
  line-height: 80px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) img {
  position: absolute;
  top: 0;
  /* right:18px; */
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) {
  width: 100%;
  height: 80px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div {
  width: 66px;
  height: 80px;
  line-height: 80px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 17px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  font-family: Roboto;
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div:nth-child(3) {
  font-size: 17px;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div:nth-child(3) {
  width: 64px;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div:nth-child(1) img {
  position: absolute;
  bottom: 0px;
  left: 6px;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div img {
  position: absolute;
  bottom: 0px;
  right: 2px;
}

.div2 .div2-2 .right .right4 .right4-3 {
  width: 42px;
  height: 100%;
  margin-right: 6px;
}

.div2 .div2-2 .right .right4 .right4-3 div:nth-child(1) {
  width: 42px;
  height: 80px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-3 img {
  width: 42px;
  height: 80px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right5 {
  display: flex;
  justify-content: space-evenly;
  /* height: 38px; */
}

/* 左右指示 */
.div2 .arrowPoint {
  display: flex;
  justify-content: space-between;
}

.div2 .arrowPoint span {
  height: 41px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.div2 .arrowPoint > img {
  width: 25px;
  height: 25px;
  /* margin-top: 8px; */
  margin-right: 10px;
  margin-left: 2px;
}

.div2 .arrowPoint > img:nth-child(4) {
  margin-right: 2px;
  margin-left: 10px;
}

.div2 .arrowPoint > img:nth-child(3) {
  width: 11px;
  height: 32px;
  margin: 0;
  margin-top: -4px;
}

/* 右侧区域 */
.div3 {
  width: 21.09%;
  height: 100%;
}

.div3 > img {
  width: 185px;
  /* height: 172px; */
  margin-top: 73px;
  margin-left: 105px;
  margin-bottom: 427px;
  background-color: transparent;
}

/* 提示语 */
.div3 > div:nth-child(2) img {
  width: 44px;
  height: 44px;
  vertical-align: middle;
  background-color: transparent;
}

.div3 > div:nth-child(2) span {
  height: 50px;
  color: rgba(255, 255, 255, 1);
  font-size: 34px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.div3 > div:nth-child(2) > div {
  /* width: 448px; */
  /* height: 50px; */
  line-height: 50px;
  color: rgba(255, 255, 255, 1);
  font-size: 34px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  margin-left: 40px;
}

/*左右指示*/
#zuobiao {
  height: 34px;
  position: absolute;
  left: 289px;
  top: 1014px;
}

/* 起点的激活样式 */
.active-start {
  width: 64px !important;
  height: 80px !important;
  /*line-height: 106px !important;*/
  line-height: 80px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 17px;
  /*background-image: url(@/assets/xxfb/path/dangqian.png);
            background-repeat: no-repeat;
            background-position: center 14%;
            background-size: 38px 38px;*/
}

/*轮播图*/
.swiper-container {
  width: 684px;
  height: 385px;
  display: none;
}

.swiper-slide {
  color: #fff;
  font-size: 36px;
  text-align: center;
}

.swiper-slide img {
  width: 684px;
  height: 385px;
  margin: 0 !important;
}
</style>
