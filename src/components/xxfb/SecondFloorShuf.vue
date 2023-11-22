<template>
  <!--这里编写网页代码 -->
    <!-- <div style="position: absolute; left: 50%; top: 0">
      <button class="btn1" @click="init()" style="background-color: transparent;border: none;">初始化链接</button>
      <span
        id="test"
        style="
          color:'#000000'
          width: 63px;
          text-align: center;
          display: inline-block;
          background-color: gba(255, 255, 255, 0.1);
        "
      ></span>
    </div> -->
  <div class="div" id="path">
    
    <div class="div3">
      <img src="@/assets/xxfb/path/202.png" />
      <!-- 提示语 -->
      <div>
        <!-- <div>
          <img src="@/assets/xxfb/path/200.png" />
          <span>温馨提示：</span>
        </div>
        <div>&nbsp;&nbsp;请说导航到xxx会议室<br />&nbsp;&nbsp;或说xxx会议室怎么走</div> -->
      </div>
    </div>
    <div class="div2cont" id="div2cont">
      <div class="div2" id="div2">
        <!-- 过道 -->
        <div class="div2-1"><br />过<br />道</div>
        <!-- 中间中部 -->
        <div class="div2-2" id="div2-2">
          <div class="left">
            <div class="left1">过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
            <div class="left2">
              <div class="left2-1">
                <img src="@/assets/xxfb/path/8.png" />
                <div></div>
              </div>
              <div class="left2-2">
                <div>
                  <div>
                    <div id="A2225" data-roomName="A2225" @click="dataRoomClick('A2225')">A2-225</div>
                    <!-- 横 双排门 -->
                    <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>

                  <div>
                    <div id="A2226" data-roomName="A2226" @click="dataRoomClick('A2226')">A2-226</div>
                    <!-- 横 双排门 -->
                    <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                  <div>
                    <div id="A2227" data-roomName="A2227" @click="dataRoomClick('A2227')">A2-227</div>
                    <!-- 横 双排门 -->
                    <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                </div>
                <div>
                  <div>
                    <div
                      id="A2222"
                      v-if="props.roomName == 'A2-222'"
                      :class="[props.roomName == 'A2-222' ? 'active-startA2222' : '']"
                    >
                      A2-222
                    </div>
                    <div id="A2222" v-else data-roomName="A2222" @click="dataRoomClick('A2222')">A2-222</div>
                    <!-- 横 双排门 -->
                    <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                  <div>
                    <div
                      id="A2223"
                      v-if="props.roomName == 'A2-223'"
                      :class="[props.roomName == 'A2-223' ? 'active-startA2223' : '']"
                    >
                      A2-223
                    </div>
                    <div id="A2223" v-else data-roomName="A2223" @click="dataRoomClick('A2223')">A2-223</div>
                    <!-- 横 双排门 -->
                    <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                </div>
              </div>
              <div class="left2-3">
                <div>
                  <div>
                    <img src="@/assets/xxfb/path/11.png" />
                    <img src="@/assets/xxfb/path/11.png" />
                    <img src="@/assets/xxfb/path/11.png" />
                  </div>
                </div>
                <div>
                  <div id="A2228" data-roomName="A2228" @click="dataRoomClick('A2228')">A2-228</div>
                  <!-- 竖 双排门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png" />
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
              </div>
            </div>
            <div class="left3">过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
            <div class="left4">
              <div class="right2-4">
                <div></div>
                <img src="@/assets/xxfb/path/8.png" />
              </div>
              <div class="right2-3">
                <div>
                  <div id="A2219" data-roomName="A2219" @click="dataRoomClick('A2219')">A2-219</div>
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div
                    id="A2216"
                    v-if="props.roomName == 'A2-216'"
                    :class="[props.roomName == 'A2-216' ? 'active-startA2216' : '']"
                  >
                    <br />A2-216<br />工作室
                  </div>
                  <div id="A2216" v-else data-roomName="A2216" @click="dataRoomClick('A2216')"><br />A2-216<br />工作室</div>
                  <!-- 横 双排门 -->
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
              </div>
              <div class="right2-2">
                <div>
                  <div id="A2220" data-roomName="A2220" @click="dataRoomClick('A2220')">A2-220</div>
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div
                    id="A2215"
                    v-if="props.roomName == 'A2-215'"
                    :class="[props.roomName == 'A2-215' ? 'active-startA2215' : '']"
                  >
                    A2-215
                  </div>
                  <div id="A2215" v-else data-roomName="A2215" @click="dataRoomClick('A2215')">A2-215</div>
                  <!-- 横 双门 -->
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
              </div>
              <div class="right2-1">
                <div>
                  <div id="A2221" data-roomName="A2221" @click="dataRoomClick('A2221')">A2-221</div>
                  <!-- 横 双门 -->
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div id="A2229" data-roomName="A2229" @click="dataRoomClick('A2229')">A2-229</div>
                  <!-- 竖 双排门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png" />
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
              </div>
            </div>
            <div class="left5">
              <div>过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
              <div>
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
                <div></div>
              </div>
            </div>
          </div>
          <div class="middle">
            <div>
              <div>
                <div>
                  <img src="@/assets/xxfb/path/shoufuti2.png" />
                </div>
              </div>
            </div>
            <div>
              <!-- 排风扇 竖 -->
              <img src="@/assets/xxfb/path/8.png" />
              <img src="@/assets/xxfb/path/8.png" />
              <div>
                <img src="@/assets/xxfb/path/dianti.png" />
                <img src="@/assets/xxfb/path/dianti.png" />
                <img src="@/assets/xxfb/path/huoti.png" />
              </div>
            </div>
          </div>
          <div class="right">
            <div class="right1">
              <div>过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
              <div>
                <div></div>
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
              </div>
            </div>
            <!-- 会议室3区 -->
            <div class="left4">
              <div class="left4-4">
                <img src="@/assets/xxfb/path/8.png" />
                <div></div>
              </div>
              <div class="left4-3">
                <div>
                  <div id="A2202" data-roomName="A2202" @click="dataRoomClick('A2202')">
                    <br />A2-202<br />
                    服务室
                  </div>
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div
                    id="A2204"
                    v-if="props.roomName == 'A2-204'"
                    :class="[props.roomName == 'A2-204' ? 'active-startA2204' : '']"
                  >
                    A2-204
                  </div>
                  <div id="A2204" v-else data-roomName="A2204" @click="dataRoomClick('A2204')">A2-204</div>
                  <!-- 横 双排门 -->
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
              </div>
              <div class="left4-2">
                <div>
                  <div id="A2201" data-roomName="A2201" @click="dataRoomClick('A2201')">A2-201</div>
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div
                    id="A2205"
                    v-if="props.roomName == 'A2-205'"
                    :class="[props.roomName == 'A2-205' ? 'active-startA2205' : '']"
                  >
                    A2-205
                  </div>
                  <div id="A2205" v-else data-roomName="A2205" @click="dataRoomClick('A2205')">A2-205</div>
                  <!-- 横 双门 -->
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                  <img class="doubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
              </div>
              <div class="left4-1">
                <div></div>
                <div>
                  <div id="A2212" data-roomName="A2212" @click="dataRoomClick('A2212')">A2-212</div>
                  <!-- 竖 双排门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png" />
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
              </div>
            </div>
            <div class="right3">过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
            <!-- 会议室4区 -->
            <div class="right4">
              <div class="right4-3">
                <div>
                  <img src="@/assets/xxfb/path/huoti.png" />
                </div>
                <!-- 排风扇竖 -->
                <img src="@/assets/xxfb/path/8.png" />
                <div></div>
              </div>
              <div class="right4-2">
                <div>
                  <div>
                    <div id="A2207" data-roomName="A2207" @click="dataRoomClick('A2207')">A2-207</div>
                    <!-- 单扇门 下  上 -->
                    <img class="door" src="@/assets/xxfb/path/4.png" />
                    <img class="door" src="@/assets/xxfb/path/3.png " />
                  </div>
                  <div>
                    <div id="A2208" data-roomName="A2208" @click="dataRoomClick('A2208')">A2-208</div>
                    <!-- 单扇门 下  上 -->
                    <img class="door" src="@/assets/xxfb/path/2.png" />
                    <img class="door" src="@/assets/xxfb/path/5.png" />
                  </div>
                </div>
                <div></div>
              </div>
              <div class="right4-1">
                <div>
                  <div id="A2206" data-roomName="A2206" @click="dataRoomClick('A2206')">
                    A2-206<br />
                    音控室
                  </div>
                  <!-- 单门 左 -->
                  <img class="door" src="@/assets/xxfb/path/3.png " />
                </div>
                <div>
                  <div id="A2211" data-roomName="A2211" @click="dataRoomClick('A2211')">A2-211</div>
                  <!-- 竖双门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png " />
                  <!-- 竖双门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/7.png " />
                </div>
              </div>
            </div>
            <div class="right5">
              <div>过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道</div>
            </div>
          </div>
        </div>
        <!-- 过道 -->
        <div class="div2-3" id="div2-3"><br />过<br />道</div>
        <div class="arrowPoint" id="zuobiao" :style="getzbdStyle">
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
        <li><img src="@/assets/xxfb/path/shoufudt.png" /><span>手扶电梯</span></li>
        <li><img src="@/assets/xxfb/path/huoti.png" /><span>货梯</span></li>
        <li><img src="@/assets/xxfb/path/wc.png" /><span>卫生间</span></li>
        <li><img src="@/assets/xxfb/path/peidianjian.png" /><span>配电间</span></li>
        <li>
          <!-- <img
                              src="@/assets/xxfb/path/dangqian.png"/> -->
          <span class="zhongdian"></span><span>当前所在位置</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// 二楼竖反：204、205、215、216、222、223   //待修改
import { ref, reactive, watch, computed, onMounted, nextTick } from 'vue'
import $ from 'jquery'
const props = defineProps({
  roomName: {
    type: String,
    default() {
      return ''
    }
  },
  form: {
    type: Object,
    default() {
      return ''
    }
  }
})

const getzbdStyle = computed(() => {
  if (props.roomName == 'A2-204') {
    return {
      left: '94px',
      top: '792px'
    }
  }
  if (props.roomName == 'A2-205') {
    return {
      left: '228px',
      top: '792px'
    }
  }
  if (props.roomName == 'A2-215') {
    return {
      left: '171px',
      top: '448px'
    }
  }
  if (props.roomName == 'A2-216') {
    return {
      left: '94px',
      top: '448px'
    }
  }
  if (props.roomName == 'A2-222') {
    return {
      left: '94px',
      top: '225px'
    }
  }
  if (props.roomName == 'A2-223') {
    return {
      left: '198px',
      top: '225px'
    }
  }
})
// 声明会议室坐标点
var CoordPoint = {
      // A2-205会议室
      // 一区
      A2205_A2208: [
        [282, 802],
        [238, 802]
      ],
      A2205_A2207: [
        [282, 802],
        [184, 802]
      ],
      A2205_A2211: [
        [282, 802],
        [442, 802],
        [442, 802],
        [442, 910]
      ],
      A2205_A2206: [
        [282, 802],
        [345, 802]
      ],
      //二区
      A2205_A2204: [
        [282, 802],
        [147, 802]
      ],
      A2205_A2205: [],
      A2205_A2202: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 574],
        [40, 574],
        [154, 574]
      ],
      A2205_A2201: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 574],
        [40, 574],
        [228, 574]
      ],
      A2205_A2212: [
        [282, 802],
        [447, 802],
        [442, 802],
        [442, 744]
      ],
      // //3区
      A2205_A2216: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 458],
        [40, 458],
        [152, 458]
      ],
      A2205_A2215: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 458],
        [40, 458],
        [230, 458]
      ],
      A2205_A2229: [
        [282, 802],
        [447, 802],
        [442, 802],
        [442, 404]
      ],
      A2205_A2219: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [154, 235]
      ],
      A2205_A2220: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [230, 235]
      ],
      A2205_A2221: [
        [282, 802],
        [447, 802],
        [442, 802],
        [442, 234],
        [442, 234],
        [380, 234]
      ],

      //4区
      A2205_A2223: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [257, 235]
      ],
      A2205_A2222: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [154, 235]
      ],
      A2205_A2228: [
        [282, 802],
        [447, 802],
        [442, 802],
        [442, 176]
      ],
      A2205_A2225: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 14],
        [40, 14],
        [144, 14]
      ],
      A2205_A2226: [
        [282, 802],
        [40, 802],
        [40, 802],
        [40, 14],
        [40, 14],
        [214, 14]
      ],
      A2205_A2227: [
        [282, 802],
        [447, 802],
        [442, 802],
        [442, 14],
        [442, 14],
        [292, 14]
      ],

      // A2-204---------------
      // 一区
      A2204_A2208: [
        [150, 802],
        [238, 802]
      ],
      A2204_A2207: [
        [150, 802],
        [184, 802]
      ],
      A2204_A2211: [
        [150, 802],
        [442, 802],
        [442, 802],
        [442, 910]
      ],
      A2204_A2206: [
        [150, 802],
        [345, 802]
      ],
      //二区
      A2204_A2204: [],
      A2204_A2205: [
        [150, 802],
        [282, 802]
      ],
      A2204_A2202: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 574],
        [40, 574],
        [154, 574]
      ],
      A2204_A2201: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 574],
        [40, 574],
        [228, 574]
      ],
      A2204_A2212: [
        [150, 802],
        [447, 802],
        [442, 802],
        [442, 744]
      ],
      // //3区
      A2204_A2216: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 458],
        [40, 458],
        [152, 458]
      ],
      A2204_A2215: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 458],
        [40, 458],
        [230, 458]
      ],
      A2204_A2229: [
        [150, 802],
        [447, 802],
        [442, 802],
        [442, 404]
      ],
      A2204_A2219: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [154, 235]
      ],
      A2204_A2220: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [230, 235]
      ],
      A2204_A2221: [
        [150, 802],
        [447, 802],
        [442, 802],
        [442, 234],
        [442, 234],
        [380, 234]
      ],

      //4区
      A2204_A2223: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [257, 235]
      ],
      A2204_A2222: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 235],
        [40, 235],
        [154, 235]
      ],
      A2204_A2228: [
        [150, 802],
        [447, 802],
        [442, 802],
        [442, 176]
      ],
      A2204_A2225: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 14],
        [40, 14],
        [144, 14]
      ],
      A2204_A2226: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 14],
        [40, 14],
        [214, 14]
      ],
      A2204_A2227: [
        [150, 802],
        [40, 802],
        [40, 802],
        [40, 14],
        [40, 14],
        [292, 14]
      ],

      // A2-215-----
      // 一区
      A2215_A2208: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [242, 802]
      ],
      A2215_A2207: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [138, 802]
      ],
      A2215_A2211: [
        [225, 458],
        [225, 484],
        [225, 484],
        [447, 484],
        [442, 484],
        [442, 916]
      ],
      A2215_A2206: [
        [225, 458],
        [225, 484],
        [225, 484],
        [447, 484],
        [442, 484],
        [442, 802],
        [447, 802],
        [345, 802]
      ],
      //二区
      A2215_A2204: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [152, 802]
      ],
      A2215_A2205: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [227, 802]
      ],
      A2215_A2202: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 578],
        [40, 578],
        [152, 578]
      ],
      A2215_A2201: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 578],
        [40, 578],
        [228, 578]
      ],
      A2215_A2212: [
        [225, 458],
        [225, 484],
        [225, 484],
        [447, 484],
        [442, 484],
        [442, 690]
      ],
      // //3区
      A2215_A2216: [
        [225, 458],
        [148, 458]
      ],
      A2215_A2215: [],
      A2215_A2229: [
        [225, 458],
        [225, 484],
        [225, 484],
        [447, 484],
        [442, 484],
        [442, 404]
      ],
      A2215_A2219: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [154, 235]
      ],
      A2215_A2220: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [230, 235]
      ],
      A2215_A2221: [
        [225, 458],
        [225, 484],
        [225, 484],
        [447, 484],
        [442, 484],
        [442, 234],
        [442, 234],
        [374, 234]
      ],

      //4区
      A2215_A2223: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [257, 235]
      ],
      A2215_A2222: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [152, 235]
      ],
      A2215_A2228: [
        [225, 458],
        [225, 484],
        [225, 484],
        [447, 484],
        [442, 484],
        [442, 176]
      ],
      A2215_A2225: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 14],
        [40, 14],
        [144, 14]
      ],
      A2215_A2226: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 14],
        [40, 14],
        [214, 14]
      ],
      A2215_A2227: [
        [225, 458],
        [40, 458],
        [40, 458],
        [40, 14],
        [40, 14],
        [292, 14]
      ],

      // A2-216---------------
      // 一区
      A2216_A2208: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [242, 802]
      ],
      A2216_A2207: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [138, 802]
      ],
      A2216_A2211: [
        [148, 458],
        [148, 481],
        [148, 481],
        [447, 481],
        [442, 481],
        [442, 912]
      ],
      A2216_A2206: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [349, 802]
      ],
      //二区
      A2216_A2204: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [152, 802]
      ],
      A2216_A2205: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 802],
        [40, 802],
        [227, 802]
      ],
      A2216_A2202: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 578],
        [40, 578],
        [152, 578]
      ],
      A2216_A2201: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 578],
        [40, 578],
        [228, 578]
      ],
      A2216_A2212: [
        [148, 458],
        [148, 481],
        [148, 481],
        [447, 481],
        [442, 481],
        [442, 684]
      ],
      // //3区
      A2216_A2216: [],
      A2216_A2215: [
        [148, 458],
        [225, 458]
      ],
      A2216_A2229: [
        [148, 458],
        [148, 481],
        [148, 481],
        [447, 481],
        [442, 481],
        [442, 404]
      ],
      A2216_A2219: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [154, 235]
      ],
      A2216_A2220: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [230, 235]
      ],
      A2216_A2221: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [379, 235]
      ],

      //4区
      A2216_A2223: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [257, 235]
      ],
      A2216_A2222: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 235],
        [40, 235],
        [152, 235]
      ],
      A2216_A2228: [
        [148, 458],
        [148, 481],
        [148, 481],
        [447, 481],
        [442, 481],
        [442, 176]
      ],
      A2216_A2225: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 14],
        [40, 14],
        [144, 14]
      ],
      A2216_A2226: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 14],
        [40, 14],
        [214, 14]
      ],
      A2216_A2227: [
        [148, 458],
        [40, 458],
        [40, 458],
        [40, 14],
        [40, 14],
        [292, 14]
      ],

      // A2-222
      // 一区
      A2222_A2208: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [242, 800]
      ],
      A2222_A2207: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [140, 800]
      ],
      A2222_A2211: [
        [150, 234],
        [455, 234],
        [450, 234],
        [450, 913]
      ],
      A2222_A2206: [
        [150, 234],
        [455, 234],
        [450, 234],
        [450, 800],
        [455, 800],
        [350, 800]
      ],
      //二区
      A2222_A2204: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [152, 800]
      ],
      A2222_A2205: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [230, 800]
      ],
      A2222_A2202: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 576],
        [34, 576],
        [154, 576]
      ],
      A2222_A2201: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 576],
        [34, 576],
        [226, 576]
      ],
      A2222_A2212: [
        [150, 234],
        [455, 234],
        [450, 234],
        [450, 684]
      ],
      // //3区
      A2222_A2216: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 464],
        [34, 464],
        [154, 464]
      ],
      A2222_A2215: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 464],
        [34, 464],
        [230, 464]
      ],
      A2222_A2229: [
        [150, 234],
        [455, 234],
        [450, 234],
        [450, 356]
      ],
      A2222_A2219: [
        [150, 234],
        [152, 234]
      ],
      A2222_A2220: [
        [150, 234],
        [232, 234]
      ],
      A2222_A2221: [
        [150, 234],
        [378, 234]
      ],

      //4区
      A2222_A2223: [
        [150, 234],
        [252, 234]
      ],
      A2222_A2222: [],
      A2222_A2228: [
        [150, 234],
        [455, 234],
        [450, 234],
        [450, 176]
      ],
      A2222_A2225: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 16],
        [34, 16],
        [146, 16]
      ],
      A2222_A2226: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 16],
        [34, 16],
        [210, 16]
      ],
      A2222_A2227: [
        [150, 234],
        [34, 234],
        [34, 234],
        [34, 16],
        [34, 16],
        [292, 16]
      ],

      // A2-223
      // 一区
      A2223_A2208: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [240, 800]
      ],
      A2223_A2207: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [140, 800]
      ],
      A2223_A2211: [
        [252, 234],
        [455, 234],
        [450, 234],
        [450, 913]
      ],
      A2223_A2206: [
        [252, 234],
        [455, 234],
        [450, 234],
        [450, 800],
        [455, 800],
        [350, 800]
      ],
      //二区
      A2223_A2204: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [150, 800]
      ],
      A2223_A2205: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 800],
        [34, 800],
        [230, 800]
      ],
      A2223_A2202: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 576],
        [34, 576],
        [154, 576]
      ],
      A2223_A2201: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 576],
        [34, 576],
        [226, 576]
      ],
      A2223_A2212: [
        [252, 234],
        [455, 234],
        [450, 234],
        [450, 684]
      ],
      // //3区
      A2223_A2216: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 464],
        [34, 464],
        [154, 464]
      ],
      A2223_A2215: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 464],
        [34, 464],
        [226, 464]
      ],
      A2223_A2229: [
        [252, 234],
        [455, 234],
        [450, 234],
        [450, 356]
      ],
      A2223_A2219: [
        [252, 234],
        [152, 234]
      ],
      A2223_A2220: [
        [252, 234],
        [232, 234]
      ],
      A2223_A2221: [
        [252, 234],
        [378, 234]
      ],

      //4区
      A2223_A2223: [
        [252, 234],
        [34, 458],
        [34, 458],
        [34, 234],
        [34, 234],
        [252, 234]
      ],
      A2223_A2222: [
        [252, 234],
        [150, 234]
      ],
      A2223_A2228: [
        [252, 234],
        [455, 234],
        [450, 234],
        [450, 176]
      ],
      A2223_A2225: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 16],
        [34, 16],
        [146, 16]
      ],
      A2223_A2226: [
        [252, 234],
        [34, 234],
        [34, 234],
        [34, 16],
        [34, 16],
        [210, 16]
      ],
      A2223_A2227: [
        [252, 234],
        [455, 234],
        [450, 234],
        [450, 16],
        [450, 16],
        [288, 16]
      ]
}

var scrolltimer
var type = 1
function scrollSwiper(ele) {
  clearInterval(scrolltimer)
  // debugger
  scrolltimer = setInterval(function () {
    if (type == 3) {
      type = 1
    } else {
      type++
    }
    if (type == 1) {
      $('#div2').css('zoom', 1.972)
      ele.scrollTop = 984
    } else if (type == 2) {
      $('#div2').css('zoom', 1.972)
      ele.scrollTop = 0
    } else {
      $('#div2').css('zoom', 1)
    }
  }, 5000)
}

function start_end(xy, end) {
  if (props.form.imgShow == 2) {
    return
  }
  $('#div2').css('zoom', 1)

  // 清除放大缩小滚动条定时器
  clearInterval(scrolltimer)
 
  // 当有点击时清除body中 路径展示定时器 标识属性
  // clearTimeout($("body").attr("timeout-scale"));

  if ($('body').attr('locked') == 1) {
    return
  }

  $('body').attr('locked', 1)

  $('[data-roomname]').css('background-color', 'rgba(52, 127, 122, 1)')

  $('.line').remove()
  $('.endimg').remove()
  $('.startimg').remove()
  document.getElementById('zuobiaodian').style.opacity = '1'

  clearTimeout($('body').attr('timeout'))
  for (var i = 0; i < CoordPoint[xy].length; i = i + 2) {
    // console.log(CoordPoint[xy][i]);

    if (i + 2 <= CoordPoint[xy].length) {
      drawLine(CoordPoint[xy][i], CoordPoint[xy][i + 1], i)
    } else {
      //   end(CoordPoint[xy][i][0], CoordPoint[xy][i][1]);
    }
  }

  // var length = $(".line").length;
  if ($('.line').length == 1) {
    document.getElementById('zuobiaodian').style.opacity = '0'
    $('#div2').append(
      "<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是1条线
    re($('.line').eq(0), function () {
      $('#div2').append(
        "<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" +
          (CoordPoint[xy][i - 1][0] - 15) +
          'px;top:' +
          (CoordPoint[xy][i - 1][1] - 15) +
          "px';>"
      )
      $('#' + end).css('background-color', 'rgba(255, 145, 0, 1)')

      $('body').removeAttr('locked')
      var timeout = setTimeout(function () {
        $('#' + end).css('background-color', 'rgba(52, 127, 122, 1)')
        $('.line').remove()
        $('.endimg').remove()
        $('.startimg').remove()
        document.getElementById('zuobiaodian').style.opacity = '1'

        //动态路径展示完毕，调用放大缩小全屏展示函数
        scrollSwiper(ele)
      }, 15000)
      // 给body添加路径展示定时器 标识
      $('body').attr('timeout', timeout)

      // var scaletimeout = setTimeout(function () {
      //     $("#div2").css("zoom", 1.972);
      //     let ele = document.getElementById('div2cont');
      //     ele.scrollTop = 1080;
      // }, 10000);
      // $("body").attr("timeout-scale", scaletimeout);
    })
  } else if ($('.line').length == 2) {
    document.getElementById('zuobiaodian').style.opacity = '0'
    $('#div2').append(
      "<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是2条线
    re($('.line').eq(0), function () {
      re($('.line').eq(1), function () {
        $('#div2').append(
          "<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" +
            (CoordPoint[xy][i - 1][0] - 15) +
            'px;top:' +
            (CoordPoint[xy][i - 1][1] - 15) +
            "px';>"
        )
        $('#' + end).css('background-color', 'rgba(255, 145, 0, 1)')

        $('body').removeAttr('locked')
        var timeout = setTimeout(function () {
          $('#' + end).css('background-color', 'rgba(52, 127, 122, 1)')
          $('.line').remove()
          $('.endimg').remove()
          $('.startimg').remove()
          document.getElementById('zuobiaodian').style.opacity = '1'

          //动态路径展示完毕，调用放大缩小全屏展示函数
          scrollSwiper(ele)
        }, 15000)
        // 给body添加路径展示定时器 标识
        $('body').attr('timeout', timeout)

        // var scaletimeout = setTimeout(function () {
        //     $("#div2").css("zoom", 1.972);
        //     let ele = document.getElementById('div2cont');
        //     ele.scrollTop = 1080;
        // }, 10000);
        // $("body").attr("timeout-scale", scaletimeout);
      })
    })
  } else if ($('.line').length == 3) {
    document.getElementById('zuobiaodian').style.opacity = '0'
    $('#div2').append(
      "<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是3条线
    re($('.line').eq(0), function () {
      re($('.line').eq(1), function () {
        re($('.line').eq(2), function () {
          $('#div2').append(
            "<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" +
              (CoordPoint[xy][i - 1][0] - 18) +
              'px;top:' +
              (CoordPoint[xy][i - 1][1] - 15) +
              "px';>"
          )
          $('#' + end).css('background-color', 'rgba(255, 145, 0, 1)')

          $('body').removeAttr('locked')
          var timeout = setTimeout(function () {
            $('#' + end).css('background-color', 'rgba(52, 127, 122, 1)')
            $('.line').remove()
            $('.endimg').remove()
            $('.startimg').remove()
            document.getElementById('zuobiaodian').style.opacity = '1'

            //动态路径展示完毕，调用放大缩小全屏展示函数
            scrollSwiper(ele)
          }, 15000)
          // 给body添加路径展示定时器 标识
          $('body').attr('timeout', timeout)

          // var scaletimeout = setTimeout(function () {
          //     $("#div2").css("zoom", 1.972);
          //     let ele = document.getElementById('div2cont');
          //     ele.scrollTop = 1080;
          // }, 10000);
          // $("body").attr("timeout-scale", scaletimeout);
        })
      })
    })
  } else if ($('.line').length == 4) {
    document.getElementById('zuobiaodian').style.opacity = '0'
    $('#div2').append(
      "<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是4条线
    re($('.line').eq(0), function () {
      re($('.line').eq(1), function () {
        re($('.line').eq(2), function () {
          re($('.line').eq(3), function () {
            //  debugger
            $('#div2').append(
              "<img class='endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" +
                (CoordPoint[xy][i - 1][0] - 15) +
                'px;top:' +
                (CoordPoint[xy][i - 1][1] - 15) +
                "px';>"
            )
            $('#' + end).css('background-color', 'rgba(255, 145, 0, 1)')

            $('body').removeAttr('locked')
            var timeout = setTimeout(function () {
              $('#' + end).css('background-color', 'rgba(52, 127, 122, 1)')
              $('.line').remove()
              $('.endimg').remove()
              $('.startimg').remove()
              document.getElementById('zuobiaodian').style.opacity = '1'

              //动态路径展示完毕，调用放大缩小全屏展示函数
              scrollSwiper(ele)
            }, 15000)
            // 给body添加路径展示定时器 标识
            $('body').attr('timeout', timeout)

            // var scaletimeout = setTimeout(function () {
            //     $("#div2").css("zoom", 1.972);
            //     let ele = document.getElementById('div2cont');
            //     ele.scrollTop = 1080;
            // }, 10000);
            // $("body").attr("timeout-scale", scaletimeout);
          })
        })
      })
    })
  } else if ($('.line').length == 5) {
    document.getElementById('zuobiaodian').style.opacity = '0'
    $('#div2').append(
      "<img class='startimg' src='src/assets/xxfb/path/start.png' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是5条线
    re($('.line').eq(0), function () {
      re($('.line').eq(1), function () {
        re($('.line').eq(2), function () {
          re($('.line').eq(3), function () {
            re($('.line').eq(4), function () {
              $('#div2').append(
                "<img class'endimg' src='src/assets/xxfb/path/end.png' style='position:absolute;width:38px;height:38px;left:" +
                  (CoordPoint[xy][i - 1][0] - 15) +
                  'px;top:' +
                  (CoordPoint[xy][i - 1][1] - 15) +
                  "px';>"
              )
              $('#' + end).css('background-color', 'rgba(255, 145, 0, 1)')

              $('body').removeAttr('locked')
              var timeout = setTimeout(function () {
                $('#' + end).css('background-color', 'rgba(52, 127, 122, 1)')
                $('.line').remove()
                $('.endimg').remove()
                $('.startimg').remove()
                document.getElementById('zuobiaodian').style.opacity = '1'

                //动态路径展示完毕，调用放大缩小全屏展示函数
                scrollSwiper(ele)
              }, 15000)
              // 给body添加路径展示定时器 标识
              $('body').attr('timeout', timeout)

              // var scaletimeout = setTimeout(function () {
              //     $("#div2").css("zoom", 1.972);
              //     let ele = document.getElementById('div2cont');
              //     ele.scrollTop = 1080;
              // }, 10000);
              // $("body").attr("timeout-scale", scaletimeout);
            })
          })
        })
      })
    })
  }

  function re($line, callback) {
    if ($line.attr('data-type') == 'x') {
      $line
        .find('div')
        .stop()
        .animate({ width: $line.width() }, 'fast', 'linear', function () {
          callback()
        })
    } else if ($line.attr('data-type') == 'y') {
      $line
        .find('div')
        .stop()
        .animate({ height: $line.height() }, 'fast', 'linear', function () {
          callback()
        })
    } else {
    }
  }
}

function drawLine(start, end) {
  var div = document.createElement('div')
  div.style.position = 'absolute'
  div.className = 'line'

  // div.style.backgroundColor = "red";
  //添加子div
  var children = document.createElement('div')
  children.style.backgroundColor = 'orange'

  div.appendChild(children)

  var div2 = document.getElementById('div2')
  div2.appendChild(div)

  // 如果线与Y轴平行
  if (start[0] == end[0]) {
    div.setAttribute('data-type', 'y')
    if (start[1] > end[1]) {
      // 反方向
      div.setAttribute('data-forword', 'minus')
      div.style.transform = 'rotate(180deg)'
    } else {
      // 同方向
      div.setAttribute('data-forword', 'add')
    }

    div.style.width = 5 + 'px'
    div.style.height = Math.abs(start[1] - end[1]) + 'px'
    children.style.height = 0
    children.style.width = 5 + 'px'

    // 判断起点 终点距离 分别与原点比较
    var abs1 = Math.sqrt(start[0] * start[0] + start[1] * start[1])
    var abs2 = Math.sqrt(end[0] * end[0] + end[1] * end[1])
    if (abs1 > abs2) {
      // debugger
      div.style.top = end[1] + 'px'
      div.style.left = end[0] + 'px'
    } else {
      div.style.top = start[1] + 'px'
      div.style.left = start[0] + 'px'
    }
  } else if (start[1] == end[1]) {
    div.setAttribute('data-type', 'x')
    if (start[0] > end[0]) {
      // 反方向
      div.setAttribute('data-forword', 'minus')
      div.style.transform = 'rotate(180deg)'
    } else {
      // 同方向
      div.setAttribute('data-forword', 'add')
    }
    //如果与 x轴平行
    div.style.width = Math.abs(start[0] - end[0]) + 'px'
    div.style.height = 5 + 'px'

    children.style.height = 5 + 'px'
    children.style.width = 0
    // 判断起点 终点距离 分别与原点比较
    var abs1 = Math.sqrt(start[0] * start[0] + start[1] * start[1])
    var abs2 = Math.sqrt(end[0] * end[0] + end[1] * end[1])
    if (abs1 > abs2) {
      div.style.top = end[1] + 'px'
      div.style.left = end[0] + 'px'
    } else {
      div.style.top = start[1] + 'px'
      div.style.left = start[0] + 'px'
    }
  } else {
  }
}

// 1.以下为串口语音处理 方法
var obj = new FOFWebSerialPort()
function getresInfo() {
  //获取串口返回的信息
  obj.GetSerialPortStrData(5000, function (val) {
    console.log(val)
    // debugger
    document.getElementById('test').innerHTML = val
    // 数字转为字符串
    var yuyin = val + ''

    var reg = /\d{3}/g
    //字符串使用match匹配一个或多个正则值，返回一个数组
    var res = yuyin.match(reg)
    console.log(val)
    // debugger
    // start_end('A2225_' + end, end)  A2208_A2227
    var meetingList = [
      '225',
      '226',
      '227',
      '223',
      '222',
      '228',
      '219',
      '220',
      '221',
      '216',
      '215',
      '229',
      '201',
      '202',
      '204',
      '205',
      '212',
      '206',
      '207',
      '208',
      '211',
      '101',
      '103',
      '104',
      '105',
      '107',
      '108',
      '109',
      '110',
      '117',
      '113',
      '114',
      '115',
      '118'
    ]

    if (Array.isArray(res) && res.length > 0 && meetingList.indexOf(res[0]) > -1) {
      start_end(props.roomName.replace('-', '') + '_A2' + res, res)
    }
  })
}
// 注解：在下方的代码中，我们创建了一个异步函数，在这个函数中进行串口设备的选择并打开选择的串口，其中选择串口设备命令的最后一个参数传递的是一个数组[{ usbVendorId: 0x1a86, usbProductId:0x7523  }]，这个数组中的成员对象usbVendorId代表串口的产品ID，usbProductId代表串口的厂商ID。在设备管理器-匹配设备Id下查看
function ChoiceSerialPort(success, connect, disconnect, filters) {
  obj.ChoiceSerialPort(
    function (ev) {
      console.log(ev)
      console.log(1111)
      // getresInfo()
      typeof success == 'function' && success()
    },
    (ev) => {
      console.log('连接成功')
      console.log(2222)

      typeof connect == 'function' && connect()
    },
    function (ev) {
      console.log('连接失败')
      typeof disconnect == 'function' && disconnect()

      // },[{ usbVendorId: 0x1a86, usbProductId:0x7523  }])
    },
    filters
  )
}
function recu(filters) {
  ChoiceSerialPort(
    function () {
      obj.OpenSerialPort(9600, 8, 1, 'none', 'none').then(function () {
        getresInfo()
      })
    },
    function () {
      //   debugger
      obj.OpenSerialPort(9600, 8, 1, 'none', 'none').then(function () {
        getresInfo()
      })
    },
    function () {
      // debugger
      // setTimeout(function(){
      //     recu(filters)
      // },5000)
    },
    filters
  )
}
function init() {
  // debugger
  var filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }]
  recu(filters)
}
// init()

// 2.手动点击
const dataRoomClick = (end) => {
  console.log(end)
  start_end(props.roomName.replace('-', '') + '_' + end, end)
 
}
let ele
onMounted(() => {
  nextTick(() => {
    ele = document.getElementById('div2cont')
    ele.scrollTop = 984
    scrollSwiper(ele)
  })
})

</script>

<style lang="less" scoped>
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
  margin-left: -10px;
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
/* 中间区域 */
.div2 {
  background-color: rgba(255, 255, 255, 0.04);
  position: relative;
  display: flex;
  justify-content: space-between;
  zoom: 1.972;
}

.hdoubledoor {
  width: 6px;
  height: 42px;
}

.doubledoor {
  width: 42px;
  height: 6px;
}

.door {
  width: 20px;
  height: 5px;
  opacity: 0.7;
}

/* 中间中部 修改uibuilder默认样式 */
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
  line-height: 264px;
  color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  text-align: center;
  font-family: Roboto;
}

/* 中间中部 */
.div2 .div2-2 {
  width: 366px;
  height: 1042px;
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
  line-height: 40px;
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
}

.div2 .div2-2 .left .left5,
.div2 .div2-2 .right .right1 {
  width: 366px;
  height: 52px;
  line-height: 52px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.div2 .div2-2 .left .left2 {
  /*height: 176px;*/
  display: flex;
  justify-content: space-between;
  /* border: 1px solid red; */
  padding: 6px 6px 6px 6px;
}

.div2 .div2-2 .left .left2 .left2-1 {
  width: 42px;
  margin-right: 4px;
}

.div2 .div2-2 .left .left2 .left2-1 > img {
  width: 42px;
  height: 86px;
  margin-bottom: 4px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-1 > div {
  width: 42px;
  height: 86px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

/*会议室1区 */
.div2 .div2-2 .left .left2 .left2-2 {
  width: 208px;
  height: 176px;
  /* margin-right:4px; */
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) {
  margin-bottom: 4px;
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) > div {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) > div > div {
  width: 66px;
  height: 86px;
  line-height: 86px;
  margin-right: 4px;
  /* margin-bottom: 4px; */
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 17px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) > div:nth-child(3) > div {
  width: 64px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) > div:nth-child(1) img,
.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) > div:nth-child(2) img {
  position: absolute;
  top: 0px;
  left: 8px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) > div:nth-child(3) img {
  position: absolute;
  top: 0px;
  right: 8px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) {
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div,
.div2 .div2-2 .left .left2 .left2-3 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div:nth-child(1) {
  margin-right: 4px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div > div {
  width: 100px;
  height: 86px;
  line-height: 86px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) img {
  position: absolute;
  bottom: 0;
  left: 18px;
}

.div2 .div2-2 .left .left2 .left2-3 {
  width: 100px;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) {
  width: 106px;
  height: 58px;
  margin-top: -6px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.04);
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) > div {
  width: 57px;
  height: 28px;
  line-height: 28px;
  position: absolute;
  background: #2c6965;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) > div img {
  width: 18px;
  height: 18px;
}

.div2 .div2-2 .left .left2 .left2-3 div:nth-child(2) > div {
  width: 100px;
  height: 120px;
  line-height: 120px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-3 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  right: 0;
  top: 16px;
}

.div2 .div2-2 .left .left2 .left2-3 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  right: 0;
  bottom: 16px;
}

.hdoubledoor {
  width: 6px;
  height: 42px;
}

.doubledoor {
  width: 42px;
  height: 6px;
}

/*会议室2区 */
.div2 .div2-2 .left .left4 {
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 1);
  font-size: 20px;
  padding: 6px;
}

.div2 .div2-2 .right2-1 > div,
.div2 .div2-2 .right2-2 > div,
.div2 .div2-2 .right2-3 > div {
  position: relative;
}

.div2 .div2-2 .right2-1 {
  width: 100px;
}

.div2 .div2-2 .right2-1 > div:nth-child(1) {
  width: 100px;
  height: 70px;
  line-height: 70px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right2-1 > div:nth-child(1) img {
  position: absolute;
  left: 37px;
  top: 0;
}

.div2 .div2-2 .right2-1 > div:nth-child(2) {
  width: 100px;
  height: 102px;
  line-height: 102px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right2-1 > div:nth-child(2) img:nth-child(2) {
  position: absolute;
  top: 6px;
  right: 0px;
}

.div2 .div2-2 .right2-1 > div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 6px;
  right: 0;
}

.div2 .div2-2 .right2-2 {
  width: 120px;
  margin-right: 4px;
}

.div2 .div2-2 .right2-2 > div > div {
  width: 120px;
  height: 86px;
  // margin-bottom: 4px;
  line-height: 86px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right2-2 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 11px;
}

.div2 .div2-2 .right2-2 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 11px;
}

.div2 .div2-2 .right2-2 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 11px;
}

.div2 .div2-2 .right2-2 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 11px;
}

.div2 .div2-2 .right2-3 {
  width: 80px;
  margin-right: 4px;
}

.div2 .div2-2 .right2-3 > div > div {
  width: 80px;
  height: 86px;
  margin-bottom: 4px;
  line-height: 86px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right2-3 > div:nth-child(1) > div {
  font-size: 20px;
}

.div2 .div2-2 .right2-3 > div:nth-child(2) > div {
  height: 86px;
  line-height: 21px;
}

.div2 .div2-2 .right2-3 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 18px;
}

.div2 .div2-2 .right2-3 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 18px;
}

.div2 .div2-2 .right2-3 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 18px;
}

.div2 .div2-2 .right2-3 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 18px;
}

.div2 .div2-2 .right2-4 {
  width: 42px;
  height: 176px;
  margin-right: 4px;
}

.div2 .div2-2 .right2-4 div:nth-child(1) {
  width: 42px;
  height: 86px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right2-4 img {
  width: 42px;
  height: 86px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

/* 左区 右区 卫生间 */
.div2 .div2-2 .left .left5 > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) {
  width: 112px;
  height: 48px;
  background-color: #2c6965;
}

/* .div2 .div2-2 .right .right1>div:nth-child(2){
        margin-top: 30px;
        } */
.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(1),
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) {
  display: flex;
  justify-content: flex-start;
  margin-left: 6px;
}

.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) {
  margin-top: 6px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(1) {
  margin-top: -4px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(2) {
  margin-top: 8px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(1) {
  width: 112px;
  height: 28px;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div div,
.div2 .div2-2 .right .right1 > div:nth-child(2) > div div {
  width: 48px;
  height: 20px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div img,
.div2 .div2-2 .right .right1 > div:nth-child(2) > div img {
  width: 18px;
  height: 18px;
  /* margin: 12px 17px; */
}

.div2 .div2-2 .left .left5 > div:nth-child(1),
.div2 .div2-2 .right .right1 > div:nth-child(1) {
  width: 254px;
  height: 52px;
  line-height: 52px;
  color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.04);
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

.div2 .div2-2 .middle > div:nth-child(2) {
  display: flex;
  justify-content: flex-start;
  width: 112px;
  background-color: #2c6965;
}

.div2 .div2-2 .middle > div:nth-child(2) > div {
  width: 48px;
  height: 36px;
  text-align: center;
  border-radius: 4px;
  margin-top: 6px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .middle > div:nth-child(2) > div img {
  width: 16px;
  height: 16px;
  margin-top: 10px;
}

.div2 .div2-2 .middle > div:nth-child(2) > img:nth-child(1) {
  width: 24px;
  height: 36px;
  margin-top: 6px;
  margin-left: 6px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .middle > div:nth-child(2) > img:nth-child(2) {
  width: 24px;
  height: 36px;
  margin-left: 0px;
  background-color: rgba(65, 116, 116, 1);
  margin-top: 6px;
  margin-right: 6px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .middle > div:nth-child(1) {
  width: 150px;
  height: 48px;
  background-color: #2c6965;
}

.div2 .div2-2 .middle > div:nth-child(1) div {
  width: 150px;
  height: 40px;
  margin: 5px 0;
}

.div2 .div2-2 .middle > div:nth-child(1) > div div {
  height: 38px;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .middle > div:nth-child(1) > div div img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

/* 中间右侧 */
/*会议室3区 */
.div2 .div2-2 .right .left4 {
  display: flex;
  justify-content: space-between;
  padding: 6px;
}

.div2 .div2-2 .left4 .left4-1 > div,
.div2 .div2-2 .left4 .left4-2 > div,
.div2 .div2-2 .left4-3 > div {
  position: relative;
}

.div2 .div2-2 .left4-1 {
  width: 100px;
}

.div2 .div2-2 .left4-1 > div:nth-child(2) {
  width: 100px;
  height: 120px;
  line-height: 113px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left4-1 > div:nth-child(2) img:nth-child(2) {
  position: absolute;
  right: 0;
  top: 10px;
}

.div2 .div2-2 .left4-1 > div:nth-child(2) img:nth-child(3) {
  position: absolute;
  right: 0;
  bottom: 10px;
}

.div2 .div2-2 .left4-1 > div:nth-child(1) {
  width: 100px;
  height: 52px;
  line-height: 40px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left4-2 {
  width: 120px;
  margin-right: 4px;
}

.div2 .div2-2 .left4-2 > div > div {
  width: 120px;
  height: 86px;
  line-height: 86px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left4-2 > div > div:nth-child(1) {
  margin-bottom: 4px;
}

.div2 .div2-2 .left4-2 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 9px;
}

.div2 .div2-2 .left4-2 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 9px;
}

.div2 .div2-2 .left4-2 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 9px;
}

.div2 .div2-2 .left4-2 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 9px;
}

.div2 .div2-2 .left4-3 {
  width: 80px;
  margin-right: 4px;
}

.div2 .div2-2 .left4-3 > div > div {
  width: 80px;
  height: 86px;
  font-size: 20px;
  line-height: 86px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left4-3 > div > div:nth-child(1) {
  margin-bottom: 4px;
}

.div2 .div2-2 .left4-3 > div:nth-child(1) > div {
  line-height: 22px;
}

.div2 .div2-2 .left4-3 div:nth-child(1) img {
  position: absolute;
  top: 0px;
  left: 18px;
}

.div2 .div2-2 .left4-3 div:nth-child(2) img {
  position: absolute;
  bottom: 0px;
  left: 18px;
}

.div2 .div2-2 .left4-4 {
  width: 42px;
  margin-right: 4px;
}

.div2 .div2-2 .left4-4 div:nth-child(2) {
  width: 42px;
  height: 86px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left4-4 img {
  width: 42px;
  height: 86px;
  margin-bottom: 4px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right3 {
}

/* 会议室4区 */
.div2 .div2-2 .right .right4 {
  display: flex;
  justify-content: space-between;
  padding: 6px;
  padding-bottom: 3px;
}

.div2 .div2-2 .right .right4 .right4-1 {
  width: 100px;
}

.div2 .div2-2 .right .right4 .right4-1 div:nth-child(1),
.div2 .div2-2 .right .right4 .right4-1 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-1 div:nth-child(2) > div {
  width: 100px;
  height: 120px;
  line-height: 87px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-bottom: 4px;
}

.div2 .div2-2 .right .right4 .right4-1 div:nth-child(2) img:nth-child(2) {
  width: 6px;
  height: 42px;
  border-radius: 1px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 12px;
  right: 0;
}

.div2 .div2-2 .right .right4 .right4-1 div:nth-child(2) img:nth-child(3) {
  width: 6px;
  height: 42px;
  border-radius: 1px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 12px;
  right: 0;
}

.div2 .div2-2 .right .right4 .right4-1 div:nth-child(1) > div {
  width: 100px;
  height: 52px;
  font-size: 18px;
  line-height: 27px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-bottom: 4px;
}

.div2 .div2-2 .right .right4 .right4-1 div:nth-child(1) img {
  width: 20px;
  height: 6px;
  border-radius: 1px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0px;
  left: 18px;
}

.div2 .div2-2 .right .right4 .right4-2 {
  width: 204px;
  margin-right: 4px;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) {
  width: 204px;
  height: 42px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) {
  width: 204px;
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) > div {
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) > div > div {
  width: 100px;
  height: 130px;
  line-height: 130px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.door {
  width: 20px;
  height: 6px;
  opacity: 0.7;
}

.div2 .div2-2 .right .right4 .right4-2 div:nth-child(1) > div img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 15px;
}

.div2 .div2-2 .right .right4 .right4-2 div:nth-child(1) > div img:nth-child(3) {
  position: absolute;
  top: 0px;
  right: 15px;
}

.div2 .div2-2 .right .right4 .right4-3 {
  width: 42px;
  margin-right: 4px;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(1) img {
  width: 34px;
  height: 34px;
  margin-bottom: 4px;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(3) {
  width: 42px;
  height: 46px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-3 > img {
  width: 42px;
  height: 89px;
  margin-bottom: 4px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right5 {
  display: flex;
  justify-content: space-evenly;
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
  left: 94px;
  top: 192px;
}

// 起点的激活样式
.active-startA2204 {
  width: 80px !important;
  height: 86px !important;
  /*line-height: 106px !important;*/
  line-height: 86px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 20px;
  /*background-image: url(@/assets/xxfb/path/dangqian.png);
            background-repeat: no-repeat;
            background-position: center 14%;
            background-size: 38px 38px;*/
}
.active-startA2205 {
  width: 120px !important;
  height: 86px !important;
  line-height: 86px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 22px;
}
.active-startA2215 {
  width: 120px !important;
  height: 90px !important;
  line-height: 90px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 17px;
}
.active-startA2216 {
  width: 80px !important;
  height: 86px !important;
  line-height: 21px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 17px;
}

.active-startA2222 {
  width: 100px !important;
  height: 85px !important;
  line-height: 85px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 18px;
}
.active-startA2223 {
  width: 100px !important;
  height: 86px !important;
  line-height: 86px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 20px;
}
</style>
