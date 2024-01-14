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
    <div class="div2" id="div2">
      <div class="div2-1">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道
      </div>
      <div class="div2-2" id="div2-2">
        <div class="left">
          <div class="left1">
            <br />过<br />
            道
          </div>
          <!-- 会议室1区 -->
          <div class="left2">
            <div class="left2-1">
              <div></div>
              <img src="@/assets/xxfb/path/9.png" />
              <div>
                <img src="@/assets/xxfb/path/huoti.png" />
              </div>
            </div>
            <div class="left2-2">
              <div></div>
              <div>
                <div>
                  <div
                    id="A2208"
                    v-if="props.roomName == 'A2-208'"
                    :class="[props.roomName == 'A2-208' ? 'active-startA2208' : '']"
                  >
                    A2-208
                  </div>
                  <div id="A2208" v-else data-roomName="A2208" @click="dataRoomClick('A2208')">
                    A2-208
                  </div>
                  <!-- 单扇门 下  上 -->
                  <img
                    v-if="props.roomName == 'A2-208'"
                    class="door"
                    src="@/assets/xxfb/path/active1.png"
                  />
                  <img v-else class="door" src="@/assets/xxfb/path/2.png" />
                  <img
                    v-if="props.roomName == 'A2-208'"
                    class="door"
                    src="@/assets/xxfb/path/active2.png"
                  />
                  <img class="door" src="@/assets/xxfb/path/5.png" />
                </div>
                <div>
                  <div
                    id="A2207"
                    v-if="props.roomName == 'A2-207'"
                    :class="[props.roomName == 'A2-207' ? 'active-startA2207' : '']"
                  >
                    A2-207
                  </div>
                  <div id="A2207" v-else data-roomName="A2207" @click="dataRoomClick('A2207')">
                    A2-207
                  </div>
                  <!-- 单扇门 下  上 -->
                  <img
                    v-if="props.roomName == 'A2-207'"
                    class="door"
                    src="@/assets/xxfb/path/active1.png"
                  />
                  <img v-else class="door" src="@/assets/xxfb/path/2.png" />
                  <img
                    v-if="props.roomName == 'A2-207'"
                    class="door"
                    src="@/assets/xxfb/path/active2.png"
                  />
                  <img class="door" src="@/assets/xxfb/path/5.png" />
                </div>
              </div>
            </div>
            <div class="left2-3">
              <div>
                <div
                  id="A2211"
                  v-if="props.roomName == 'A2-211'"
                  :class="[props.roomName == 'A2-211' ? 'active-startA2211' : '']"
                >
                  A2-211
                </div>
                <div id="A2211" v-else data-roomName="A2211" @click="dataRoomClick('A2211')">
                  A2-211
                </div>
                <img
                  v-if="props.roomName == 'A2-211'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                <img
                  v-if="props.roomName == 'A2-211'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
              </div>
              <div>
                <div
                  id="A2206"
                  v-if="props.roomName == 'A2-206'"
                  :class="[props.roomName == 'A2-206' ? 'active-startA2206' : '']"
                >
                  <br />A2-206<br />
                  音控室
                </div>
                <div id="A2206" v-else data-roomName="A2206" @click="dataRoomClick('A2206')">
                  <br />A2-206<br />
                  音控室
                </div>
                <!-- 单门 上 -->
                <img
                  v-if="props.roomName == 'A2-206'"
                  class="door"
                  src="@/assets/xxfb/path/active2.png"
                />

                <img v-else class="door" src="@/assets/xxfb/path/5.png" />
              </div>
            </div>
          </div>
          <div class="left3">
            <br />过<br />
            道
          </div>
          <!-- 会议室2区 -->
          <div class="left4">
            <div class="left4-1">
              <div></div>
              <img src="@/assets/xxfb/path/9.png" />
            </div>
            <div class="left4-2">
              <div>
                <div
                  id="A2204"
                  v-if="props.roomName == 'A2-204'"
                  :class="[props.roomName == 'A2-204' ? 'active-startA2204' : '']"
                >
                  A2-204
                </div>
                <div id="A2204" v-else data-roomName="A2204" @click="dataRoomClick('A2204')">
                  A2-204
                </div>
                <!-- 竖 双排门 -->
                <img
                  v-if="props.roomName == 'A2-204'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
              <div>
                <div
                  id="A2202"
                  v-if="props.roomName == 'A2-202'"
                  :class="[props.roomName == 'A2-202' ? 'active-startA2202' : '']"
                >
                  <br />A2-202<br />
                  服务室
                </div>
                <div id="A2202" v-else data-roomName="A2202" @click="dataRoomClick('A2202')">
                  <br />A2-202<br />
                  服务室
                </div>

                <img
                  v-if="props.roomName == 'A2-202'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
            </div>
            <div class="left4-3">
              <div>
                <div
                  id="A2205"
                  v-if="props.roomName == 'A2-205'"
                  :class="[props.roomName == 'A2-205' ? 'active-startA2205' : '']"
                >
                  A2-205
                </div>
                <div id="A2205" v-else data-roomName="A2205" @click="dataRoomClick('A2205')">
                  A2-205
                </div>
                <img
                  v-if="props.roomName == 'A2-205'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                <img
                  v-if="props.roomName == 'A2-205'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
              <div>
                <div
                  id="A2201"
                  v-if="props.roomName == 'A2-201'"
                  :class="[props.roomName == 'A2-201' ? 'active-startA2201' : '']"
                >
                  A2-201
                </div>
                <div id="A2201" v-else data-roomName="A2201" @click="dataRoomClick('A2201')">
                  A2-201
                </div>
                <img
                  v-if="props.roomName == 'A2-201'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                <img
                  v-if="props.roomName == 'A2-201'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
            </div>
            <div class="left4-4">
              <div>
                <div
                  id="A2212"
                  v-if="props.roomName == 'A2-212'"
                  :class="[props.roomName == 'A2-212' ? 'active-startA2212' : '']"
                >
                  A2-212
                </div>
                <div id="A2212" v-else data-roomName="A2212" @click="dataRoomClick('A2212')">
                  A2-212
                </div>
                <!-- 横 双排门 -->
                <img
                  v-if="props.roomName == 'A2-212'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                <img
                  v-if="props.roomName == 'A2-212'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
              </div>
              <div></div>
            </div>
          </div>
          <div class="left5">
            <div><br />过<br />道</div>
            <div>
              <div>
                <div class="tolit">
                  <!-- 需改图片 -->

                  <!-- <img src="@/assets/xxfb/path/iconPark-boy.png" /> -->
                  卫生间
                </div>
                <div class="tolit">
                  <!-- 需改图片 -->
                  <!-- <img src="@/assets/xxfb/path/iconPark-girl.png" /> -->
                  卫生间
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
              <span class="shoufudianti">手扶电梯</span>
            </div>
          </div>
          <div>
            <img src="@/assets/xxfb/path/dblouti.png" />

            <div class="louti">
              <!-- <img src="@/assets/xxfb/path/dianti.png" />
              <img src="@/assets/xxfb/path/dianti.png" />
              <img src="@/assets/xxfb/path/huoti.png" /> -->
              电 梯
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right1">
            <div><br />过<br />道</div>
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
          </div>
          <div class="right2">
            <div class="right2-1">
              <img src="@/assets/xxfb/path/9.png" />
              <div></div>
            </div>
            <div class="right2-2">
              <div>
                <div
                  id="A2216"
                  v-if="props.roomName == 'A2-216'"
                  :class="[props.roomName == 'A2-216' ? 'active-startA2216' : '']"
                >
                  <br />A2-216<br />
                  工作间
                </div>
                <div id="A2216" v-else data-roomName="A2216" @click="dataRoomClick('A2216')">
                  <br />A2-216<br />
                  工作间
                </div>
                <!-- 单扇门 下  上 -->
                <img
                  v-if="props.roomName == 'A2-216'"
                  class="door"
                  src="@/assets/xxfb/path/active1.png"
                />
                <img v-else class="door" src="@/assets/xxfb/path/2.png" />
                <img
                  v-if="props.roomName == 'A2-216'"
                  class="door"
                  src="@/assets/xxfb/path/active2.png"
                />
                <img class="door" src="@/assets/xxfb/path/5.png" />
              </div>
              <div>
                <div
                  id="A2219"
                  v-if="props.roomName == 'A2-219'"
                  :class="[props.roomName == 'A2-219' ? 'active-startA2219' : '']"
                >
                  A2-219
                </div>
                <div id="A2219" v-else data-roomName="A2219" @click="dataRoomClick('A2219')">
                  A2-219
                </div>
                <!-- 竖 双排门 -->
                <img
                  v-if="props.roomName == 'A2-219'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
            </div>
            <div class="right2-3">
              <div>
                <div
                  id="A2215"
                  v-if="props.roomName == 'A2-215'"
                  :class="[props.roomName == 'A2-215' ? 'active-startA2215' : '']"
                >
                  A2-215
                </div>
                <div id="A2215" v-else data-roomName="A2215" @click="dataRoomClick('A2215')">
                  A2-215
                </div>
                <img
                  v-if="props.roomName == 'A2-215'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                <img
                  v-if="props.roomName == 'A2-215'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
              <div>
                <div
                  id="A2220"
                  v-if="props.roomName == 'A2-220'"
                  :class="[props.roomName == 'A2-220' ? 'active-startA2220' : '']"
                >
                  A2-220
                </div>
                <div id="A2220" v-else data-roomName="A2220" @click="dataRoomClick('A2220')">
                  A2-220
                </div>
                <img
                  v-if="props.roomName == 'A2-220'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                <img
                  v-if="props.roomName == 'A2-220'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
            </div>
            <div class="right2-4">
              <div>
                <div
                  id="A2229"
                  v-if="props.roomName == 'A2-229'"
                  :class="[props.roomName == 'A2-229' ? 'active-startA2229' : '']"
                >
                  A2-229
                </div>
                <div id="A2229" v-else data-roomName="A2229" @click="dataRoomClick('A2229')">
                  A2-229
                </div>
                <!-- 横 双排门 -->
                <img
                  v-if="props.roomName == 'A2-229'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                <img
                  v-if="props.roomName == 'A2-229'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
              </div>
              <div>
                <div
                  id="A2221"
                  v-if="props.roomName == 'A2-221'"
                  :class="[props.roomName == 'A2-221' ? 'active-startA2221' : '']"
                >
                  A2-221
                </div>
                <div id="A2221" v-else data-roomName="A2221" @click="dataRoomClick('A2221')">
                  A2-221
                </div>
                <img
                  v-if="props.roomName == 'A2-221'"
                  class="doubledoor"
                  src="@/assets/xxfb/path/active3.png"
                />
                <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
              </div>
            </div>
          </div>
          <div class="right3">
            <br />过<br />
            道
          </div>
          <div class="right4">
            <div class="right4-1">
              <div></div>
              <img src="@/assets/xxfb/path/9.png" />
            </div>
            <div class="right4-2">
              <div>
                <div>
                  <div
                    id="A2223"
                    v-if="props.roomName == 'A2-223'"
                    :class="[props.roomName == 'A2-223' ? 'active-startA2223' : '']"
                  >
                    A2-223
                  </div>
                  <div id="A2223" v-else data-roomName="A2223" @click="dataRoomClick('A2223')">
                    A2-223
                  </div>
                  <!-- 竖 双排门 -->
                  <img
                    v-if="props.roomName == 'A2-223'"
                    class="doubledoor"
                    src="@/assets/xxfb/path/active3.png"
                  />
                  <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
                <div>
                  <div
                    id="A22222"
                    v-if="props.roomName == 'A2-222'"
                    :class="[props.roomName == 'A2-222' ? 'active-startA2222' : '']"
                  >
                    A2-222
                  </div>
                  <div id="A2222" v-else data-roomName="A2222" @click="dataRoomClick('A2222')">
                    A2-222
                  </div>
                  <!-- 竖 双排门 -->
                  <img
                    v-if="props.roomName == 'A2-222'"
                    class="doubledoor"
                    src="@/assets/xxfb/path/active3.png"
                  />
                  <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
              </div>
              <div>
                <div>
                  <div
                    id="A2225"
                    v-if="props.roomName == 'A2-225'"
                    :class="[props.roomName == 'A2-225' ? 'active-startA2225' : '']"
                  >
                    A2-225
                  </div>
                  <div id="A2225" v-else data-roomName="A2225" @click="dataRoomClick('A2225')">
                    A2-225
                  </div>
                  <!-- 竖 双排门 -->
                  <img
                    v-if="props.roomName == 'A2-225'"
                    class="doubledoor"
                    src="@/assets/xxfb/path/active3.png"
                  />
                  <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
                <div>
                  <div
                    id="A2226"
                    v-if="props.roomName == 'A2-226'"
                    :class="[props.roomName == 'A2-226' ? 'active-startA2226' : '']"
                  >
                    A2-226
                  </div>
                  <div id="A2226" v-else data-roomName="A2226" @click="dataRoomClick('A2226')">
                    A2-226
                  </div>
                  <!-- 竖 双排门 -->
                  <img
                    v-if="props.roomName == 'A2-226'"
                    class="doubledoor"
                    src="@/assets/xxfb/path/active3.png"
                  />
                  <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
                <div>
                  <div
                    id="A2227"
                    v-if="props.roomName == 'A2-227'"
                    :class="[props.roomName == 'A2-227' ? 'active-startA2227' : '']"
                  >
                    A2-227
                  </div>
                  <div id="A2227" v-else data-roomName="A2227" @click="dataRoomClick('A2227')">
                    A2-227
                  </div>
                  <!-- 竖 双排门 -->
                  <img
                    v-if="props.roomName == 'A2-227'"
                    class="doubledoor"
                    src="@/assets/xxfb/path/active3.png"
                  />
                  <img v-else class="doubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
                <div></div>
              </div>
            </div>
            <div class="right4-3">
              <div>
                <div
                  id="A2228"
                  v-if="props.roomName == 'A2-228'"
                  :class="[props.roomName == 'A2-228' ? 'active-startA2228' : '']"
                >
                  A2-228
                </div>
                <div id="A2228" v-else data-roomName="A2228" @click="dataRoomClick('A2228')">
                  A2-228
                </div>
                <!-- 横 双排门 -->
                <img
                  v-if="props.roomName == 'A2-228'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                <img
                  v-if="props.roomName == 'A2-228'"
                  class="hdoubledoor"
                  src="@/assets/xxfb/path/active4.png"
                />
                <img v-else class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
              </div>
              <div>
                <div>
                  <img src="@/assets/xxfb/path/11.png" />
                  <img src="@/assets/xxfb/path/11.png" />
                  <img src="@/assets/xxfb/path/11.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="right5">
            <br />过<br />
            道
          </div>
        </div>
      </div>
      <div class="div2-3">
        <div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道
        </div>
      </div>
      <!-- 横向标识 -->
      <div v-if="getzbdStyle" class="arrowPoint" id="zuobiao" :style="getzbdStyle">
        <span style="opacity: 0">左</span>
        <img src="@/assets/xxfb/path/left.png" />
        <div>
          <img id="zuobiaodian" src="@/assets/xxfb/path/zhishi.png" />
        </div>
        <img src="@/assets/xxfb/path/right.png" />
        <span style="opacity: 0">右</span>
      </div>
      <!-- 竖向标识 朝右-->
      <div
        v-if="getzbdStyleshuright"
        class="arrowPointshu"
        id="zuobiao"
        :style="getzbdStyleshuright"
      >
        <img src="@/assets/xxfb/path/up.png" />
        <div>
          <img id="zuobiaodian" src="@/assets/xxfb/path/right1.png" />
        </div>
        <img src="@/assets/xxfb/path/down.png" />
      </div>

      <!-- 竖向标识 朝左-->
      <div v-if="getzbdStyleshuleft" class="arrowPointshu" id="zuobiao" :style="getzbdStyleshuleft">
        <img src="@/assets/xxfb/path/up.png" />
        <div>
          <img id="zuobiaodian" src="@/assets/xxfb/path/left1.png" />
        </div>
        <img src="@/assets/xxfb/path/down.png" />
      </div>
    </div>
    <div class="div3">
      <div class="div3-1">
        <div>
          <div>
            <img data-v-7c86bae5="" class="hdoubledoor" src="/src/assets/xxfb/path/6.png" />
            <span>茶水间</span>
          </div>
          <div class="jianju1"></div>
          <div>
            <span>卫生间</span>
            <img data-v-7c86bae5="" class="doubledoor" src="/src/assets/xxfb/path/7.png" />
          </div>
          <div class="jianju2"></div>
          <div>
            <img data-v-7c86bae5="" class="hdoubledoor" src="/src/assets/xxfb/path/6.png" />
            <span></span>
          </div>
        </div>
      </div>
      <ul>
        <li style="display: none"><img src="@/assets/xxfb/path/dianti.png" /><span>电梯</span></li>
        <li><img src="@/assets/xxfb/path/louti.png" /><span>楼梯</span></li>
        <li style="display: none">
          <img src="@/assets/xxfb/path/shoufudt.png" /><span>手扶电梯</span>
        </li>
        <li><img src="@/assets/xxfb/path/huoti.png" /><span>货梯</span></li>
        <li style="display: none"><img src="@/assets/xxfb/path/wc.png" /><span>卫生间</span></li>
        <li><img src="@/assets/xxfb/path/peidianjian.png" /><span>配电间</span></li>
        <li>
          <!-- <img
                              src="@/assets/xxfb/path/dangqian.png"/> -->
          <span></span>
          <span>当前所在位置</span>
        </li>
      </ul>
    </div>
    <div class="div1">
      <div>
        <!-- <img src="@/assets/xxfb/path/200.png" />
        <span>温馨提示：请说导航到xxx会议室或说xxx会议室怎么走。</span> -->
      </div>
      <img src="@/assets/xxfb/path/21.png" />
    </div>
  </div>
</template>

<script setup>
// 二楼横反：A2-211   A2-228    A2-229 A2-212
// 二楼竖反：204、205、215、216、222、223
// 二楼竖正：A2-206、207、208、201、202、221、220、219、227、226、225    ok
import { computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import $ from 'jquery'

import startImg from '@/assets/xxfb/path/start.png'
import endImg from '@/assets/xxfb/path/end.png'

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
  // 横返
  if (props.roomName == 'A2-228') {
    return {
      left: '1490px',
      top: '694px'
    }
  }
  if (props.roomName == 'A2-229') {
    return {
      left: '1206px',
      top: '694px'
    }
  }
  if (props.roomName == 'A2-211') {
    return {
      left: '144px',
      top: '694px'
    }
  }
  if (props.roomName == 'A2-212') {
    return {
      left: '548px',
      top: '694px'
    }
  }
})

// 竖-右
const getzbdStyleshuright = computed(() => {
  // 竖反：204、205、215、216、222、223
  if (props.roomName == 'A2-204') {
    return {
      left: '404px',
      top: '169px'
    }
  }
  if (props.roomName == 'A2-205') {
    return {
      left: '404px',
      top: '400px'
    }
  }

  if (props.roomName == 'A2-215') {
    return {
      left: '1095px',
      top: '274px'
    }
  }
  if (props.roomName == 'A2-216') {
    return {
      left: '1095px',
      top: '214px'
    }
  }
  if (props.roomName == 'A2-223') {
    return {
      left: '1478px',
      top: '147px'
    }
  }
  if (props.roomName == 'A2-222') {
    return {
      left: '1478px',
      top: '312px'
    }
  }
})

// 竖-左
const getzbdStyleshuleft = computed(() => {
  // 二楼竖正：A2-206、207、208、201、202、221、220、219、227、226、225
  // 竖正
  if (props.roomName == 'A2-227') {
    return {
      left: '1834px',
      top: '404px'
    }
  }
  if (props.roomName == 'A2-226') {
    return {
      left: '1834px',
      top: '254px'
    }
  }
  if (props.roomName == 'A2-225') {
    return {
      left: '1834px',
      top: '140px'
    }
  }
  if (props.roomName == 'A2-219') {
    return {
      left: '1478px',
      top: '147px'
    }
  }
  if (props.roomName == 'A2-220') {
    return {
      left: '1478px',
      top: '398px'
    }
  }
  if (props.roomName == 'A2-221') {
    return {
      left: '1478px',
      top: '566px'
    }
  }
  if (props.roomName == 'A2-202') {
    return {
      left: '795px',
      top: '166px'
    }
  }
  if (props.roomName == 'A2-201') {
    return {
      left: '795px',
      top: '274px'
    }
  }
  if (props.roomName == 'A2-208') {
    return {
      left: '404px',
      top: '238px'
    }
  }
  if (props.roomName == 'A2-207') {
    return {
      left: '404px',
      top: '406px'
    }
  }
  if (props.roomName == 'A2-206') {
    return {
      left: '404px',
      top: '477px'
    }
  }
})

// 声明会议室坐标点
var CoordPoint = {
  // A2-228会议室
  // 一区
  A2228_A2208: [
    [1592, 711],
    [430, 711],
    [430, 711],
    [430, 300],
    [435, 300],
    [412, 300]
  ],
  A2228_A2207: [
    [1592, 711],
    [430, 711],
    [430, 711],
    [430, 468],
    [435, 468],
    [412, 468]
  ],
  A2228_A2211: [
    [1592, 711],
    [244, 711]
  ],
  A2228_A2206: [
    [1592, 711],
    [430, 711],
    [430, 711],
    [430, 540],
    [435, 540],
    [412, 540]
  ],
  //二区
  A2228_A2204: [
    [1592, 711],
    [435, 711],
    [435, 711],
    [435, 226],
    [435, 226],
    [459, 226]
  ],
  A2228_A2205: [
    [1592, 711],
    [435, 711],
    [435, 711],
    [435, 462],
    [435, 462],
    [459, 462]
  ],
  A2228_A2202: [
    [1592, 711],
    [875, 711],
    [875, 711],
    [875, 230],
    [880, 230],
    [810, 230]
  ],
  A2228_A2201: [
    [1592, 711],
    [875, 711],
    [875, 711],
    [875, 460],
    [880, 460],
    [810, 460]
  ],
  A2228_A2212: [
    [1592, 711],
    [648, 711]
  ],
  //3区
  A2228_A2216: [
    [1592, 711],
    [1083, 711],
    [1083, 711],
    [1083, 276],
    [1083, 276],
    [1152, 276]
  ],
  A2228_A2215: [
    [1592, 711],
    [1083, 711],
    [1083, 711],
    [1083, 460],
    [1083, 460],
    [1152, 460]
  ],
  A2228_A2229: [
    [1592, 711],
    [1306, 711]
  ],
  A2228_A2219: [
    [1592, 711],
    [1506, 711],
    [1506, 711],
    [1506, 210],
    [1511, 210],
    [1486, 210]
  ],
  A2228_A2220: [
    [1592, 711],
    [1506, 711],
    [1506, 711],
    [1506, 462],
    [1511, 462],
    [1486, 462]
  ],
  A2228_A2221: [
    [1592, 711],
    [1506, 711],
    [1506, 711],
    [1506, 630],
    [1511, 630],
    [1486, 630]
  ],

  //4区
  A2228_A2223: [
    [1592, 711],
    [1506, 711],
    [1506, 711],
    [1506, 210],
    [1506, 210],
    [1534, 210]
  ],
  A2228_A2222: [
    [1592, 711],
    [1506, 711],
    [1506, 711],
    [1506, 378],
    [1506, 378],
    [1534, 378]
  ],
  A2228_A2228: [],
  A2228_A2225: [
    [1592, 711],
    [1866, 711],
    [1861, 711],
    [1861, 202],
    [1866, 202],
    [1846, 202]
  ],
  A2228_A2226: [
    [1592, 711],
    [1866, 711],
    [1861, 711],
    [1861, 312],
    [1866, 312],
    [1846, 312]
  ],
  A2228_A2227: [
    [1592, 711],
    [1866, 711],
    [1861, 711],
    [1861, 464],
    [1866, 464],
    [1846, 464]
  ],

  //A2-229-------待定位坐标
  // 一区
  A2229_A2208: [
    [1306, 711],
    [430, 711],
    [430, 711],
    [430, 300],
    [435, 300],
    [412, 300]
  ],
  A2229_A2207: [
    [1306, 711],
    [430, 711],
    [430, 711],
    [430, 468],
    [435, 468],
    [412, 468]
  ],
  A2229_A2211: [
    [1306, 711],
    [244, 711]
  ],
  A2229_A2206: [
    [1306, 711],
    [430, 711],
    [430, 711],
    [430, 540],
    [435, 540],
    [412, 540]
  ],
  //二区
  A2229_A2204: [
    [1306, 711],
    [435, 711],
    [435, 711],
    [435, 226],
    [435, 226],
    [459, 226]
  ],
  A2229_A2205: [
    [1306, 711],
    [435, 711],
    [435, 711],
    [435, 462],
    [435, 462],
    [459, 462]
  ],
  A2229_A2202: [
    [1306, 711],
    [875, 711],
    [875, 711],
    [875, 230],
    [880, 230],
    [810, 230]
  ],
  A2229_A2201: [
    [1306, 711],
    [875, 711],
    [875, 711],
    [875, 460],
    [880, 460],
    [810, 460]
  ],
  A2229_A2212: [
    [1306, 711],
    [648, 711]
  ],
  //3区
  A2229_A2216: [
    [1306, 711],
    [1083, 711],
    [1083, 711],
    [1083, 276],
    [1083, 276],
    [1152, 276]
  ],
  A2229_A2215: [
    [1306, 711],
    [1083, 711],
    [1083, 711],
    [1083, 460],
    [1083, 460],
    [1152, 460]
  ],
  A2229_A2229: [],
  A2229_A2219: [
    [1306, 711],
    [1511, 711],
    [1506, 711],
    [1506, 210],
    [1511, 210],
    [1486, 210]
  ],
  A2229_A2220: [
    [1306, 711],
    [1511, 711],
    [1506, 711],
    [1506, 462],
    [1511, 462],
    [1486, 462]
  ],
  A2229_A2221: [
    [1306, 711],
    [1511, 711],
    [1506, 711],
    [1506, 630],
    [1511, 630],
    [1486, 630]
  ],

  //4区
  A2229_A2223: [
    [1306, 711],
    [1511, 711],
    [1506, 711],
    [1506, 210],
    [1506, 210],
    [1534, 210]
  ],
  A2229_A2222: [
    [1306, 711],
    [1511, 711],
    [1506, 711],
    [1506, 378],
    [1506, 378],
    [1534, 378]
  ],
  A2229_A2228: [
    [1306, 711],
    [1592, 711]
  ],
  A2229_A2225: [
    [1306, 711],
    [1866, 711],
    [1861, 711],
    [1861, 202],
    [1866, 202],
    [1846, 202]
  ],
  A2229_A2226: [
    [1306, 711],
    [1866, 711],
    [1861, 711],
    [1861, 312],
    [1866, 312],
    [1846, 312]
  ],
  A2229_A2227: [
    [1306, 711],
    [1866, 711],
    [1861, 711],
    [1861, 464],
    [1866, 464],
    [1846, 464]
  ],

  // A2-211-----待定位坐标
  // 一区
  A2211_A2208: [
    [244, 711],
    [435, 711],
    [430, 711],
    [430, 300],
    [435, 300],
    [412, 300]
  ],
  A2211_A2207: [
    [244, 711],
    [435, 711],
    [430, 711],
    [430, 468],
    [435, 468],
    [412, 468]
  ],
  A2211_A2211: [],
  A2211_A2206: [
    [244, 711],
    [435, 711],
    [430, 711],
    [430, 540],
    [435, 540],
    [412, 540]
  ],
  //二区
  A2211_A2204: [
    [244, 711],
    [435, 711],
    [430, 711],
    [430, 226],
    [430, 226],
    [459, 226]
  ],
  A2211_A2205: [
    [244, 711],
    [435, 711],
    [430, 711],
    [430, 462],
    [430, 462],
    [459, 462]
  ],
  A2211_A2202: [
    [244, 711],
    [880, 711],
    [875, 711],
    [875, 230],
    [880, 230],
    [810, 230]
  ],
  A2211_A2201: [
    [244, 711],
    [880, 711],
    [875, 711],
    [875, 460],
    [880, 460],
    [810, 460]
  ],
  A2211_A2212: [
    [244, 711],
    [508, 711]
  ],
  //3区
  A2211_A2216: [
    [244, 711],
    [1083, 711],
    [1078, 711],
    [1078, 276],
    [1078, 276],
    [1152, 276]
  ],
  A2211_A2215: [
    [244, 711],
    [1083, 711],
    [1078, 711],
    [1078, 460],
    [1078, 460],
    [1152, 460]
  ],
  A2211_A2229: [
    [244, 711],
    [1206, 711]
  ],
  A2211_A2219: [
    [244, 711],
    [1506, 711],
    [1501, 711],
    [1501, 210],
    [1506, 210],
    [1486, 210]
  ],
  A2211_A2220: [
    [244, 711],
    [1506, 711],
    [1501, 711],
    [1501, 462],
    [1506, 462],
    [1486, 462]
  ],
  A2211_A2221: [
    [244, 711],
    [1506, 711],
    [1501, 711],
    [1501, 630],
    [1506, 630],
    [1486, 630]
  ],

  //4区
  A2211_A2223: [
    [244, 711],
    [1511, 711],
    [1506, 711],
    [1506, 210],
    [1506, 210],
    [1534, 210]
  ],
  A2211_A2222: [
    [244, 711],
    [1511, 711],
    [1506, 711],
    [1506, 378],
    [1506, 378],
    [1534, 378]
  ],
  A2211_A2228: [
    [244, 711],
    [1592, 711]
  ],
  A2211_A2225: [
    [244, 711],
    [1866, 711],
    [1861, 711],
    [1861, 202],
    [1866, 202],
    [1846, 202]
  ],
  A2211_A2226: [
    [244, 711],
    [1866, 711],
    [1861, 711],
    [1861, 312],
    [1866, 312],
    [1846, 312]
  ],
  A2211_A2227: [
    [244, 711],
    [1866, 711],
    [1861, 711],
    [1861, 464],
    [1866, 464],
    [1846, 464]
  ],

  // A2212会议室------------
  A2212_A2208: [
    [648, 711],
    [430, 711],
    [430, 711],
    [430, 300],
    [435, 300],
    [412, 300]
  ],
  A2212_A2207: [
    [648, 711],
    [430, 711],
    [430, 711],
    [430, 468],
    [430, 468],
    [412, 468]
  ],
  A2212_A2211: [
    [648, 711],
    [244, 711]
  ],
  A2212_A2206: [
    [648, 711],
    [430, 711],
    [430, 711],
    [430, 540],
    [430, 540],
    [412, 540]
  ],
  //二区
  A2212_A2204: [
    [648, 711],
    [430, 711],
    [430, 711],
    [430, 226],
    [430, 226],
    [459, 226]
  ],
  A2212_A2205: [
    [648, 711],
    [430, 711],
    [430, 711],
    [430, 462],
    [430, 462],
    [459, 462]
  ],
  A2212_A2202: [
    [648, 711],
    [880, 711],
    [875, 711],
    [875, 230],
    [880, 230],
    [810, 230]
  ],
  A2212_A2201: [
    [648, 711],
    [880, 711],
    [875, 711],
    [875, 460],
    [880, 460],
    [810, 460]
  ],
  A2212_A2212: [],
  //3区
  A2212_A2216: [
    [648, 711],
    [1083, 711],
    [1078, 711],
    [1078, 276],
    [1078, 276],
    [1152, 276]
  ],
  A2212_A2215: [
    [648, 711],
    [1083, 711],
    [1078, 711],
    [1078, 460],
    [1078, 460],
    [1152, 460]
  ],
  A2212_A2229: [
    [648, 711],
    [1206, 711]
  ],
  A2212_A2219: [
    [648, 711],
    [1506, 711],
    [1501, 711],
    [1501, 210],
    [1506, 210],
    [1486, 210]
  ],
  A2212_A2220: [
    [648, 711],
    [1506, 711],
    [1501, 711],
    [1501, 462],
    [1506, 462],
    [1486, 462]
  ],
  A2212_A2221: [
    [648, 711],
    [1506, 711],
    [1501, 711],
    [1501, 630],
    [1506, 630],
    [1486, 630]
  ],

  //4区
  A2212_A2223: [
    [648, 711],
    [1511, 711],
    [1506, 711],
    [1506, 210],
    [1506, 210],
    [1534, 210]
  ],
  A2212_A2222: [
    [648, 711],
    [1511, 711],
    [1506, 711],
    [1506, 378],
    [1506, 378],
    [1534, 378]
  ],
  A2212_A2228: [
    [648, 711],
    [1592, 711]
  ],
  A2212_A2225: [
    [648, 711],
    [1866, 711],
    [1861, 711],
    [1861, 202],
    [1866, 202],
    [1846, 202]
  ],
  A2212_A2226: [
    [648, 711],
    [1866, 711],
    [1861, 711],
    [1861, 312],
    [1866, 312],
    [1846, 312]
  ],
  A2212_A2227: [
    [648, 711],
    [1866, 711],
    [1861, 711],
    [1861, 464],
    [1866, 464],
    [1846, 464]
  ],

  // A2-207-----待定位坐标;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
  // 一区
  A2207_A2208: [
    [430, 468],
    [430, 300],
    [410, 300],
    [410, 300]
  ],
  A2207_A2207: [],
  A2207_A2211: [
    [430, 468],
    [430, 711],
    [435, 711],
    [244, 711]
  ],
  A2207_A2206: [
    [430, 468],
    [430, 540],
    [410, 540],
    [410, 540]
  ],
  //二区
  A2207_A2204: [
    [430, 468],
    [430, 224],
    [430, 224],
    [450, 224]
  ],
  A2207_A2205: [
    [430, 468],
    [430, 460],
    [430, 460],
    [450, 460]
  ],
  A2207_A2202: [
    [430, 468],
    [430, 711],
    [430, 711],
    [885, 711],
    [880, 711],
    [880, 230],
    [880, 230],
    [810, 230]
  ],
  A2207_A2201: [
    [430, 468],
    [430, 711],
    [430, 711],
    [885, 711],
    [880, 711],
    [880, 460],
    [880, 460],
    [810, 460]
  ],
  A2207_A2212: [
    [430, 468],
    [430, 711],
    [430, 711],
    [508, 711]
  ],
  //3区
  A2207_A2216: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1082, 711],
    [1078, 711],
    [1078, 276],
    [1078, 276],
    [1152, 276]
  ],
  A2207_A2215: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1082, 711],
    [1078, 711],
    [1078, 460],
    [1078, 460],
    [1152, 460]
  ],
  A2207_A2229: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1206, 711]
  ],
  A2207_A2219: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1506, 711],
    [1501, 711],
    [1501, 210],
    [1506, 210],
    [1486, 210]
  ],
  A2207_A2220: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1506, 711],
    [1501, 711],
    [1501, 462],
    [1506, 462],
    [1486, 462]
  ],
  A2207_A2221: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1506, 711],
    [1501, 711],
    [1501, 630],
    [1506, 630],
    [1486, 630]
  ],

  //4区
  A2207_A2223: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1511, 711],
    [1506, 711],
    [1506, 210],
    [1506, 210],
    [1526, 210]
  ],
  A2207_A2222: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1511, 711],
    [1506, 711],
    [1506, 378],
    [1506, 378],
    [1526, 378]
  ],
  A2207_A2228: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1592, 711]
  ],
  A2207_A2225: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1866, 711],
    [1861, 711],
    [1861, 202],
    [1866, 202],
    [1846, 202]
  ],
  A2207_A2226: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1866, 711],
    [1861, 711],
    [1861, 312],
    [1866, 312],
    [1846, 312]
  ],
  A2207_A2227: [
    [430, 468],
    [430, 711],
    [430, 711],
    [1866, 711],
    [1861, 711],
    [1861, 464],
    [1866, 464],
    [1846, 464]
  ]
}
function start_end(xy, end) {
  if ($('body').attr('locked') == 1) {
    return
  }

  $('body').attr('locked', 1)

  $('[data-roomname]').css('background-color', 'rgba(52, 127, 122, 1)')

  $('.line').remove()
  $('.endimg').remove()
  $('.startimg').remove()

  var zuobiaodian = document.getElementById('zuobiaodian')
  zuobiaodian && (zuobiaodian.style.opacity = '1')
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
    zuobiaodian && (zuobiaodian.style.opacity = '0')
    $('#div2').append(
      "<img class='startimg' src='" +
        startImg +
        "' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是1条线
    re($('.line').eq(0), function () {
      $('#div2').append(
        "<img class='endimg' src='" +
          endImg +
          "' style='position:absolute;width:38px;height:38px;left:" +
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

        var zuobiaodian = document.getElementById('zuobiaodian')
        zuobiaodian && (zuobiaodian.style.opacity = '1')
        //动态路径展示完毕，调用放大缩小全屏展示函数
        // scrollSwiper()
      }, 15000000)
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
    zuobiaodian && (zuobiaodian.style.opacity = '0')
    $('#div2').append(
      "<img class='startimg' src='" +
        startImg +
        "' style='position:absolute;width:38px;height:38px;left:" +
        (CoordPoint[xy][0][0] - 15) +
        'px;top:' +
        (CoordPoint[xy][0][1] - 15) +
        "px';>"
    )
    // 如果是2条线
    re($('.line').eq(0), function () {
      re($('.line').eq(1), function () {
        $('#div2').append(
          "<img class='endimg' src='" +
            endImg +
            "' style='position:absolute;width:38px;height:38px;left:" +
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

          var zuobiaodian = document.getElementById('zuobiaodian')
          zuobiaodian && (zuobiaodian.style.opacity = '1')
          //动态路径展示完毕，调用放大缩小全屏展示函数
          // scrollSwiper()
        }, 15000000)
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
    zuobiaodian && (zuobiaodian.style.opacity = '0')
    $('#div2').append(
      "<img class='startimg' src='" +
        startImg +
        "' style='position:absolute;width:38px;height:38px;left:" +
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
            "<img class='endimg' src='" +
              endImg +
              "' style='position:absolute;width:38px;height:38px;left:" +
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

            var zuobiaodian = document.getElementById('zuobiaodian')
            zuobiaodian && (zuobiaodian.style.opacity = '1')
            //动态路径展示完毕，调用放大缩小全屏展示函数
            // scrollSwiper()
          }, 15000000)
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
    zuobiaodian && (zuobiaodian.style.opacity = '0')
    $('#div2').append(
      "<img class='startimg' src='" +
        startImg +
        "' style='position:absolute;width:38px;height:38px;left:" +
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
              "<img class='endimg' src='" +
                endImg +
                "' style='position:absolute;width:38px;height:38px;left:" +
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

              var zuobiaodian = document.getElementById('zuobiaodian')
              zuobiaodian && (zuobiaodian.style.opacity = '1')
              //动态路径展示完毕，调用放大缩小全屏展示函数
              // scrollSwiper()
            }, 15000000)
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
    zuobiaodian && (zuobiaodian.style.opacity = '0')
    $('#div2').append(
      "<img class='startimg' src='" +
        startImg +
        "' style='position:absolute;width:38px;height:38px;left:" +
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
                "<img class='endimg' src='" +
                  endImg +
                  "' style='position:absolute;width:38px;height:38px;left:" +
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

                var zuobiaodian = document.getElementById('zuobiaodian')
                zuobiaodian && (zuobiaodian.style.opacity = '1')
                //动态路径展示完毕，调用放大缩小全屏展示函数
                // scrollSwiper()
              }, 15000000)
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
    abs1 = Math.sqrt(start[0] * start[0] + start[1] * start[1])
    abs2 = Math.sqrt(end[0] * end[0] + end[1] * end[1])
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

// 以下为串口语音处理 方法
// var obj = new FOFWebSerialPort()
// function getresInfo() {
//   //获取串口返回的信息
//   obj.GetSerialPortStrData(5000, function (val) {
//     console.log(val)
//     // debugger
//     document.getElementById('test').innerHTML = val
//     // 数字转为字符串
//     var yuyin = val + ''

//     var reg = /\d{3}/g
//     //字符串使用match匹配一个或多个正则值，返回一个数组
//     var res = yuyin.match(reg)
//     console.log(val)
//     // debugger
//     // start_end('A2225_' + end, end)  A2208_A2227
//     var meetingList = [
//       '225',
//       '226',
//       '227',
//       '223',
//       '222',
//       '228',
//       '219',
//       '220',
//       '221',
//       '216',
//       '215',
//       '229',
//       '201',
//       '202',
//       '204',
//       '205',
//       '212',
//       '206',
//       '207',
//       '208',
//       '211',
//       '101',
//       '103',
//       '104',
//       '105',
//       '107',
//       '108',
//       '109',
//       '110',
//       '117',
//       '113',
//       '114',
//       '115',
//       '118'
//     ]

//     if (Array.isArray(res) && res.length > 0 && meetingList.indexOf(res[0]) > -1) {
//       start_end(props.roomName.replace('-', '') + '_A2' + res, res)
//     }
//   })
// }
// // /*注解：在下方的代码中，我们创建了一个异步函数，在这个函数中进行串口设备的选择并打开选择的串口，其中选择串口设备命令的最后一个参数传递的是一个数组[{ usbVendorId: 0x1a86, usbProductId:0x7523  }]，这个数组中的成员对象usbVendorId代表串口的产品ID，usbProductId代表串口的厂商ID。在设备管理器-匹配设备Id下查看*/
// function ChoiceSerialPort(success, connect, disconnect, filters) {
//   obj.ChoiceSerialPort(
//     function (ev) {
//       console.log(ev)
//       console.log(1111)
//       // getresInfo()
//       typeof success == 'function' && success()
//     },
//     (ev) => {
//       console.log('连接成功')
//       console.log(2222)

//       typeof connect == 'function' && connect()
//     },
//     function (ev) {
//       console.log('连接失败')
//       typeof disconnect == 'function' && disconnect()

//       // },[{ usbVendorId: 0x1a86, usbProductId:0x7523  }])
//     },
//     filters
//   )
// }
// function recu(filters) {
//   ChoiceSerialPort(
//     function () {
//       obj.OpenSerialPort(9600, 8, 1, 'none', 'none').then(function () {
//         getresInfo()
//       })
//     },
//     function () {
//       //   debugger
//       obj.OpenSerialPort(9600, 8, 1, 'none', 'none').then(function () {
//         getresInfo()
//       })
//     },
//     function () {
//       // debugger
//       // setTimeout(function(){
//       //     recu(filters)
//       // },5000)
//     },
//     filters
//   )
// }
// function init() {
//   // debugger
//   var filters = [{ usbVendorId: 0x1a86, usbProductId: 0x7523 }]
//   recu(filters)
// }
// init()

const dataRoomClick = (end) => {
  // console.log(end)
  // start_end(props.roomName.replace('-', '') + '_' + end, end)
}

onMounted(() => {
  nextTick(() => {})
})
onBeforeUnmount(() => {
  clearTimeout($('body').attr('timeout'))
})
</script>

<style lang="less" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
div {
  user-select: none;
}
.div {
  width: 1920px;
  height: 1080px;
  background-color: #2c6965;
  /* border: 1px solid red; */
  /*zoom: 0.345545454;*/
  display: block;
  // zoom: 0.362054;
  position: relative;
  // margin-left: -10px;

  transform: scale(0.3621);
  transform-origin: left top;
}

.div1 {
  width: 100%;
  height: 50px;
  margin-left: 94px;
  display: flex;
  justify-content: space-between;
}
.div1 > div {
  display: flex;
  align-items: center;
}
.div1 > div > img {
  width: 44px;
  height: 44px;
  margin: 0;
  margin-right: 10px;
  background-color: transparent;
}

.div1 > img {
  height: 180px;
  width: 180px;
  position: absolute;
  right: 44px;
  // bottom: 13px;

  bottom: 40px;
  background-color: transparent;
}

.div1 > div > span {
  width: 1054px;
  height: 50px;
  color: rgba(255, 255, 255, 1);
  font-size: 34px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

/* 第2层 */
.div2 {
  width: 1900px;
  height: 780px;
  // margin-left: 10px;
  // margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.04);
  position: relative;
}

/* 中间中部 */
.div2 img {
  margin: 0;
  vertical-align: top;
  background-color: transparent;
}

/* 2层上边 */
.div2 .div2-1,
.div2 .div2-3 {
  width: 100%;
  height: 98px;
  line-height: 98px;
  color: rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.04);
  font-size: 28px;
  text-align: center;
  font-family: Roboto;
  position: relative;
}

/* 2层中间 */
.div2 .div2-2 {
  width: 100%;
  height: calc(100% - 197px);
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}

/* 中间左区 */
.div2 .div2-2 .left {
  /* width: 896.5px; */
  height: 100%;
  /* border:1px solid red; */
  display: flex;
  justify-content: flex-start;
  /* 所有会议室公用 */
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  text-align: center;
  font-family: Roboto;
}

.div2 .div2-2 .left .left1,
.div2 .div2-2 .right .right5 {
  width: 68px;
  line-height: 115px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  text-align: center;
  font-family: Roboto;
}

.div2 .div2-2 .left .left3,
.div2 .div2-2 .right .right3 {
  width: 76px;
  line-height: 115px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  text-align: center;
  font-family: Roboto;
}

.div2 .div2-2 .left .left5,
.div2 .div2-2 .right .right1 {
  width: 128px;
  height: 405px;
  line-height: 100px;
  background-color: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.2);
  font-size: 24px;
  text-align: center;
  font-family: Roboto;
}

/* 会议室1区 */
.div2 .div2-2 .left .left2 {
  /* width: 316px; */
  background-color: #2c6965;
  padding: 6px;
}

.div2 .div2-2 .left .left2 .left2-1 {
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(1) {
  width: 126px;
  height: 100%;
  margin-right: 2px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-1 > img {
  width: 133px;
  height: 100%;
  margin-right: 2px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(3) {
  width: 54px;
  height: 100%;
  line-height: 54px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left2 .left2-1 div:nth-child(3) img {
  width: 34px;
  height: 34px;
  margin-top: 12px;
}

.div2 .div2-2 .left .left2 .left2-2 {
  width: 100%;
  height: 334px;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(1) {
  width: 65px;
  height: 100%;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  margin-right: 2px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div {
  width: 250px;
  height: 166px;
  line-height: 166px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  margin-bottom: 2px;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div img:nth-child(2) {
  position: absolute;
  top: 25px;
  right: 0;
}

.div2 .div2-2 .left .left2 .left2-2 > div:nth-child(2) > div img:nth-child(3) {
  position: absolute;
  bottom: 25px;
  right: 0;
}

.div2 .div2-2 .left .left2 .left2-3 {
  width: 100%;
  height: 165px;
  /* border: 1px soild red; */
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) div {
  width: 214px;
  height: 100%;
  line-height: 165px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  margin-right: 2px;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 22px;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 22px;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(2) div {
  width: 100px;
  height: 100%;
  font-size: 26px;
  line-height: 41px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.door {
  width: 6px;
  height: 20px;
  border-radius: 1px;
  opacity: 0.6;
}

.div2 .div2-2 .left .left2 .left2-3 > div:nth-child(2) img {
  position: absolute;
  top: 25px;
  right: 0;
}

/* 会议室2区 */
.div2 .div2-2 .left .left4 {
  /*width: 310px;*/
  background-color: #2c6965;
  padding: 6px;
}

.div2 .div2-2 .left .left4 .left4-1,
.div2 .div2-2 .left .left4 .left4-2,
.div2 .div2-2 .left .left4 .left4-3,
.div2 .div2-2 .left .left4 .left4-4 {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2px;
}

.div2 .div2-2 .left .left4 .left4-1 div:nth-child(1) {
  width: 170px;
  height: 66px;
  margin-right: 2px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left4 .left4-1 > img {
  width: 138px;
  height: 66px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .left .left4 .left4-2 > div:nth-child(1) {
  position: relative;
}

.div2 .div2-2 .left .left4 .left4-2 > div:nth-child(1) > div {
  width: 154px;
  height: 129px;
  line-height: 129px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

.div2 .div2-2 .left .left4 .left4-2 > div:nth-child(1) img {
  position: absolute;
  left: 0;
  top: 40px;
  width: 6px;
  height: 42px;
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(2) div {
  width: 154px;
  height: 129px;
  font-size: 26px;
  line-height: 33px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
}

.div2 .div2-2 .left .left4 .left4-2 div:nth-child(2) img {
  position: absolute;
  right: 0;
  top: 40px;
  width: 6px;
  height: 42px;
}

/* 双排门 */
.doubledoor {
  width: 6px;
  height: 42px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(1),
.div2 .div2-2 .left .left4 .left4-3 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(1) div {
  width: 154px;
  height: 201px;
  line-height: 201px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 17px;
  left: 0px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  bottom: 19px;
  left: 0;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(2) div {
  width: 154px;
  height: 201px;
  line-height: 201px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  top: 17px;
  right: 0px;
}

.div2 .div2-2 .left .left4 .left4-3 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 19px;
  right: 0;
}

.div2 .div2-2 .left .left4 .left4-4 {
  margin-bottom: 0px;
}

.div2 .div2-2 .left .left4 .left4-4 div:nth-child(1) {
  position: relative;
}

.div2 .div2-2 .left .left4 .left4-4 div:nth-child(1) div {
  width: 208px;
  height: 165px;
  line-height: 165px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

/* 横双排门 通用 */
.hdoubledoor {
  width: 42px;
  height: 6px;
}

.div2 .div2-2 .left .left4 .left4-4 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 16px;
}

.div2 .div2-2 .left .left4 .left4-4 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 16px;
}

.div2 .div2-2 .left .left4 .left4-4 div:nth-child(2) {
  width: 100px;
  height: 165px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(65, 116, 116, 1);
}

/* 卫生间 配电间 */
.div2 .div2-2 .left .left5 > div:nth-child(1),
.div2 .div2-2 .right .right1 > div:nth-child(1) {
  height: 405px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) {
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(1),
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) {
  width: 60px;
  height: 179px;
  background-color: #2c6965;
}

.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) {
  margin-left: 6px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(1) div,
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) div {
  width: 50px;
  height: 80px;
  margin-top: 6px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) div {
  margin-right: 0px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(1) div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) div:nth-child(2) {
  margin-top: 2px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(1) div img,
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(2) div img {
  width: 22px;
  height: 22px;
  margin: 28px 14px;
}

.div2 .div2-2 .left .left5 > div:nth-child(2) > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) > div:nth-child(1) {
  width: 85px;
  height: 179px;
  background-color: rgba(255, 255, 255, 0.04);
}

.tolit {
  color: rgba(255, 255, 255, 0.2);
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 中间楼梯 */
.div2 .div2-2 .middle {
  width: 060272%;
  width: 115px;
  height: 70%;
  background-color: rgba(255, 255, 255, 0.04);
}

.div2 .div2-2 .middle > div:nth-child(1) {
  width: 117px;
  height: 304px;
  background-color: #2c6965;
}

.div2 .div2-2 .middle > div:nth-child(1) > div {
  width: 104px;
  height: 100%;
  margin: 0 6px;
  background-color: rgba(255, 255, 255, 0.08);
}

.div2 .div2-2 .middle > div:nth-child(1) div div {
  /* width: 104px;
            height: 104px;
            border-radius: 50%;
            opacity: 0.4;
            background-color: rgba(28, 75, 72, 1);
            box-shadow: 1px 1px 4px 2px rgba(0, 0, 0, 0.4); */
}

.div2 .div2-2 .middle > div:nth-child(1) div div img {
  width: 115px;
  height: 115px;
  margin-left: -2px;
  margin-top: 55px;
}
.div2 .div2-2 .middle > div:nth-child(1) div .shoufudianti {
  color: rgba(255, 255, 255, 0.2);
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -12px;
}

.div2 .div2-2 .middle > div:nth-child(2) {
  width: 127px;
  height: 177px;
  margin-top: 103px;
  background-color: #2c6965;
  position: relative;
  overflow-x: hidden;
}

.div2 .div2-2 .middle > div:nth-child(2) > img:nth-child(1) {
  width: 115px;
  // height: 80px;
  margin: 10px 6px 0px 6px;
  margin-bottom: 10px;
}

.div2 .div2-2 .middle > div:nth-child(2) > div {
  width: 115px;
  height: 80px;
  border-radius: 4px;
  margin-left: 6px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

// .div2 .div2-2 .middle > div:nth-child(2) > div img {
//   width: 35px;
//   height: 35px;
//   margin-top: 22px;
// }
.div2 .div2-2 .middle > div:nth-child(2) .louti {
  color: rgba(255, 255, 255, 0.2);
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 中间右区 */
.div2 .div2-2 .right {
  /* width:0.46986373%; */
  width: 896.5px;
  height: 100%;
  /* border:1px solid red; */
  display: flex;
  justify-content: flex-start;
}

/* 右区 1部会议室 */
.div2 .div2-2 .right .right2 {
  /*width: 292px;*/
  background-color: #2c6965;
  padding: 6px;
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  text-align: center;
}

.div2 .div2-2 .right .right2 .right2-1,
.div2 .div2-2 .right .right2 .right2-2,
.div2 .div2-2 .right .right2 .right2-3,
.div2 .div2-2 .right .right2 .right2-4 {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2px;
}

.div2 .div2-2 .right .right2 .right2-1 > img {
  width: 145px;
  height: 66px;
  margin-right: 2px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right2 .right2-1 div {
  width: 145px;
  height: 66px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(65, 116, 116, 1);
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(1) {
  position: relative;
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(1) div {
  width: 145px;
  height: 129px;
  font-size: 26px;
  line-height: 33px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  left: 0;
  top: 13px;
  width: 6px;
  height: 20px;
  border-radius: 1px;
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 13px;
  width: 6px;
  height: 20px;
  border-radius: 1px;
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(2) div {
  width: 145px;
  height: 129px;
  line-height: 129px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
}

.div2 .div2-2 .right .right2 .right2-2 > div:nth-child(2) img {
  position: absolute;
  right: 0;
  top: 18px;
  width: 6px;
  height: 42px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(1),
.div2 .div2-2 .right .right2 .right2-3 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(1) div {
  width: 145px;
  height: 201px;
  line-height: 201px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(1) img:nth-child(2) {
  position: absolute;
  top: 17px;
  left: 0px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(1) img:nth-child(3) {
  position: absolute;
  bottom: 19px;
  left: 0;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(2) div {
  width: 145px;
  height: 201px;
  line-height: 201px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(2) img:nth-child(2) {
  position: absolute;
  top: 17px;
  right: 0px;
}

.div2 .div2-2 .right .right2 .right2-3 div:nth-child(2) img:nth-child(3) {
  position: absolute;
  bottom: 19px;
  right: 0;
}

.div2 .div2-2 .right .right2 .right2-4 {
  margin-bottom: 0px;
}

.div2 .div2-2 .right .right2 .right2-4 > div:nth-child(1) {
  position: relative;
  height: 165px;
}

.div2 .div2-2 .right .right2 .right2-4 > div:nth-child(1) > div {
  width: 173px;
  height: 165px;
  line-height: 165px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

.div2 .div2-2 .right .right2 .right2-4 > div:nth-child(1) > img:nth-child(2) {
  position: absolute;
  bottom: 0px;
  left: 16px;
}

.div2 .div2-2 .right .right2 .right2-4 > div:nth-child(1) > img:nth-child(3) {
  position: absolute;
  bottom: 0px;
  right: 16px;
}

.div2 .div2-2 .right .right2 .right2-4 div:nth-child(2) {
  position: relative;
}

.div2 .div2-2 .right .right2 .right2-4 div:nth-child(2) > div {
  width: 117px;
  height: 165px;
  line-height: 165px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(52, 127, 122, 1);
  margin-right: 2px;
}

.div2 .div2-2 .right .right2 .right2-4 div:nth-child(2) img {
  position: absolute;
  bottom: 19px;
  right: 0px;
}

/* 右部 2区会议室 */
.div2 .div2-2 .right .right4 {
  width: 282px;
  background-color: #2c6965;
  /* padding: 6px; */
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  text-align: center;
  font-family: Roboto;
}

.div2 .div2-2 .right .right4 .right4-1,
.div2 .div2-2 .right .right4 .right4-2,
.div2 .div2-2 .right .right2 .right4-3 {
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .right .right4 .right4-1 {
  margin: 6px;
  margin-bottom: 2px;
}

.div2 .div2-2 .right .right4 .right4-2 {
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 2px;
}

.div2 .div2-2 .right .right4 .right4-1 > img {
  width: 145px;
  height: 66px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-1 > div {
  width: 145px;
  height: 66px;
  margin-right: 2px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(65, 116, 116, 1);
}

.div2 .div2-2 .right .right4 .right4-2 {
  /* width: 268px; */
  height: 334px;
}

.div2 .div2-2 .right .right4 .right4-2 > div {
  width: 134px;
  height: 100%;
  margin-right: 2px;
}

.div2 .div2-2 .right .right4 .right4-2 > div > div {
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) div div {
  width: 134px;
  height: 166px;
  margin-bottom: 2px;
  line-height: 166px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(1) div img {
  position: absolute;
  left: 0;
  top: 18px;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) div div {
  width: 134px;
  height: 110px;
  margin-right: 2px;
  margin-bottom: 2px;
  line-height: 110px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div:nth-child(1) img,
.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div:nth-child(2) img {
  position: absolute;
  right: 0;
  top: 13px;
}

.div2 .div2-2 .right .right4 .right4-2 > div:nth-child(2) > div:nth-child(3) img {
  position: absolute;
  right: 0;
  bottom: 13px;
}

.div2 .div2-2 .right .right4 .right4-3 {
  display: flex;
  justify-content: flex-start;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(1) {
  width: 202px;
  height: 165px;
  margin-left: 6px;
  line-height: 165px;
  background-color: rgba(52, 127, 122, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  position: relative;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  bottom: 0;
  left: 19px;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  bottom: 0;
  right: 19px;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(2) {
  width: 74px;
  height: 172px;
  background-color: rgba(255, 255, 255, 0.08);
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(2) div {
  width: 36px;
  height: 130px;
  background-color: #2c6965;
}

.div2 .div2-2 .right .right4 .right4-3 > div:nth-child(2) div img {
  width: 28px;
  height: 28px;
}

.div2 .div2-2 .right .right5 {
  width: 71px;
}

/* 第3层 */
.div3 {
  width: 100%;
  height: 84px;
  margin-top: 40px;
  margin-bottom: 40px;

  transform: translateY(-41px);
}
.div3 .div3-1 {
  margin-left: 626px;
  margin-bottom: 12px;

  // background-color: rgba(245,245,245,0.1);
  background-color: rgba(255, 255, 255, 0.07);
  width: 716px;
  height: 130px;

  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    // 会议室
    div {
      display: flex;
      position: relative;
      background-color: #2c6965;
      padding: 6px;
      span {
        width: 200px;
        height: 100px;
        line-height: 100px;
        color: #ffffff;
        // color: rgba(255, 255, 255, 0.2);
        font-size: 22px;
        text-align: center;

        box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
        background-color: #347f7a;
      }
      img {
        position: absolute;
        top: 5px;
        left: 130px;
      }
    }
    div:nth-child(3) {
      img {
        position: absolute;
        top: 42px;
        left: 116px;
      }
      span {
        width: 115px;
        // color: rgba(255, 255, 255, 0.2);
      }
    }
    div:nth-child(5) {
      span {
        margin-right: 0px;
        color: #ffffff;
        font-size: 22px;
      }
      img {
        position: absolute;
        top: 5px;
        left: 40px;
      }
    }

    .jianju1 {
      width: 72px;
      height: 84px;
      background-color: rgba(255, 255, 255, 0);
    }
    .jianju2 {
      width: 66px;
      height: 84px;
      background-color: rgba(255, 255, 255, 0);
    }
  }
}
.div3 ul {
  height: 84px;
  line-height: 84px;
  margin-left: 94px;
  display: flex;

  margin-top: 30px;
}

.div3 ul li {
  margin-right: 68px;
  display: flex;
  align-items: center;
}

.div3 ul li img {
  width: 44px;
  height: 44px;
  /* vertical-align: middle;*/
  margin: 0;
  margin-right: 10px;
  /* margin-top: 2px;*/
  background-color: transparent;
}

.div3 ul li:nth-child(1) img {
  width: 56px;
  height: 56px;
}

.div3 ul li:nth-child(4) img {
  background-color: rgba(52, 127, 122, 1);
}

.div3 ul li span {
  display: inline-block;
  /* width: 120px; */
  height: 44px;
  line-height: 44px;
  margin-right: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.div3 ul li:last-child span:nth-child(1) {
  width: 44px;
  height: 44px;
  background-color: rgba(255, 145, 0, 1);
  /*margin-top:24px;*/
}

.div3 ul li:last-child span:nth-child(2) {
  /*transform: translateY(-12px);*/
}

// 横向
/* 2层下边 */
.div2 .arrowPoint {
  display: flex;
  justify-content: space-between;
  width: 190px;
}

.div2 .arrowPoint span {
  height: 41px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.div2 .arrowPoint > img {
  width: 44px;
  height: 44px;
  vertical-align: middle;
}

.div2 .arrowPoint > div img {
  width: 33px;
  height: 80px;
  margin-top: -16px;
}

#zuobiao {
  position: absolute;
  left: 1490px;
  top: 694px;
  margin-left: 10px;
  margin-right: 10px;
}

// 竖向
.div2 .arrowPointshu {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.div2 .arrowPointshu span {
  height: 41px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 28px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
}

.div2 .arrowPointshu > img {
  width: 44px;
  height: 44px;
  vertical-align: middle;
}

.div2 .arrowPointshu > div {
  img {
    width: 44px;
    height: 44px;
    // margin-top: -16px;
  }
}

/* 横向起点的激活样式 */
.active-startA2228 {
  width: 202px !important;
  height: 165px !important;
  /*line-height: 225px !important;*/
  line-height: 165px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
  /*background-image: url(@/assets/xxfb/path/dangqian.png);
            background-repeat: no-repeat;
            background-position: center 14%;*/
}
.active-startA2229 {
  width: 173px !important;
  height: 165px !important;
  line-height: 165px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2211 {
  width: 214px !important;
  height: 165px !important;
  line-height: 165px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2212 {
  width: 208px !important;
  height: 165px !important;
  line-height: 165px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}

// 竖反起点的激活样式204无 216无
.active-startA2204 {
  width: 154px !important;
  height: 129px !important;
  line-height: 129px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2205 {
  width: 154px !important;
  height: 201px !important;
  line-height: 201px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2215 {
  width: 145px;
  height: 201px;
  line-height: 201px;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2216 {
  width: 145px;
  height: 129px;
  font-size: 26px;
  line-height: 33px;
  background-color: rgba(255, 145, 0, 1) !important;
}

.active-startA2222 {
  width: 134px;
  height: 166px;
  line-height: 166px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2223 {
  width: 134px;
  height: 166px;
  line-height: 166px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}

// 竖正 起点的激活样式 202无 206无
.active-startA2225 {
  width: 134px;
  height: 110px;
  /*line-height: 106px !important;*/
  line-height: 110px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2226 {
  width: 134px;
  height: 110px;
  line-height: 110px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2227 {
  width: 134px;
  height: 110px;
  /*line-height: 106px !important;*/
  line-height: 110px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2219 {
  width: 145px !important;
  height: 129px !important;
  line-height: 129px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2220 {
  width: 145px !important;
  height: 201px !important;
  line-height: 201x !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2221 {
  width: 117px !important;
  height: 165px !important;
  line-height: 165px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2202 {
  width: 154px;
  height: 129px;
  font-size: 26px;
  line-height: 33px;
  background-color: rgba(255, 145, 0, 1) !important;
}
.active-startA2201 {
  width: 154px !important;
  height: 201px !important;
  line-height: 201px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2208 {
  width: 250px !important;
  height: 166px !important;
  line-height: 166px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2207 {
  width: 250px !important;
  height: 166px !important;
  line-height: 166px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 30px;
}
.active-startA2206 {
  width: 100px !important;
  height: 165px !important;
  line-height: 41px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 26px;
}
</style>
