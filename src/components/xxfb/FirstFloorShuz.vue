<template>
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
        <!-- 中间中部 -->
        <div class="div2-2" id="div2-2">
          <div class="left">
            <div class="left1">
              <div id="A2101" data-roomname="A2101" @click="dataRoomClick('A2101')">
                A2-101
                <div></div>
                <div>
                  <div class="left2-1">
                    <div>
                      <!-- 横 双排门 -->
                      <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                      <!--排风扇  -->
                      <img src="@/assets/xxfb/path/8.png" />
                      <!-- 横 双排门 -->
                      <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                    </div>
                  </div>
                  <div class="left2-2">
                    <div>
                      <div>
                        <img src="@/assets/xxfb/path/huoti.png" />
                      </div>
                    </div>
                  </div>
                  <div class="left2-3">
                    <div>
                      <!-- 横 双排门 -->
                      <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                      <!--排风扇  -->
                      <img src="@/assets/xxfb/path/8.png" />
                      <!-- 横 双排门 -->
                      <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- 竖 双排门 -->
              <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
              <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
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
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道
              </div>
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
              <img src="@/assets/xxfb/path/8.png" />
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
                  <div></div>
                </div>
              </div>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;过&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;道
              </div>
            </div>
            <div class="right2">
              <!-- 1 -->
              <div class="right2-1">
                <div>
                  <div id="A2104" data-roomname="A2104" @click="dataRoomClick('A2104')">A2-104</div>
                  <!-- 横 双排门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div>
                    <div
                      id="A2117"
                      v-if="props.roomName == 'A2-117'"
                      :class="[props.roomName == 'A2-117' ? 'active-startA2117' : '']"
                    >
                      A2-117
                    </div>
                    <div id="A2117" v-else data-roomName="A2117" @click="dataRoomClick('A2117')">
                      A2-117
                    </div>
                    <!-- 竖 双排门 -->
                    <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                    <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                  <div>
                    <div>
                      <div id="A2109" data-roomname="A2109" @click="dataRoomClick('A2109')">
                        A2-109
                      </div>
                      <!-- 单扇门 竖下 -->
                      <img class="door" src="@/assets/xxfb/path/2.png" />
                    </div>
                    <div>
                      <div id="A2107" data-roomname="A2107" @click="dataRoomClick('A2107')">
                        A2-107
                      </div>
                      <!-- 单扇门 竖下 -->
                      <img class="door" src="@/assets/xxfb/path/2.png" />
                    </div>
                  </div>
                </div>
              </div>
              <!-- 2 -->
              <div class="right2-2"></div>
              <!-- 3 -->
              <div class="right2-3">
                <!-- 1 -->
                <div>
                  <div>
                    <div id="A2105" data-roomname="A2105" @click="dataRoomClick('A2105')">
                      A2-105
                    </div>
                    <!-- 竖 双排门 -->
                    <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                  <div>
                    <div id="A2108" data-roomname="A2108" @click="dataRoomClick('A2108')">
                      A2-108
                    </div>
                    <!-- 单扇门 横 -->
                    <img class="door" src="@/assets/xxfb/path/5.png" />
                  </div>
                  <div>
                    <div id="A2110" data-roomname="A2110" @click="dataRoomClick('A2110')">
                      A2-110
                    </div>
                    <!-- 单扇门 横 -->
                    <img class="door" src="@/assets/xxfb/path/5.png" />
                  </div>
                </div>
                <!-- 2 -->
                <div>
                  <div>
                    <img
                      src="@/assets/xxfb/path/8.png
                                            "
                    />
                    <!-- 竖 双排门 -->
                    <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                    <!-- 竖 双排门 -->
                    <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div class="right3"></div>
            <div class="right4">
              <div>
                <div>
                  <div id="A2118" data-roomname="A2118" @click="dataRoomClick('A2118')">A2-118</div>
                  <!-- 横 双排门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
                <div>
                  <div>
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                    <div>
                      <div id="A2115" data-roomname="A2115" @click="dataRoomClick('A2115')">
                        A2-115
                      </div>
                      <!-- 单扇门 横 -->
                      <img class="door" src="@/assets/xxfb/path/2.png " />
                    </div>
                    <div>
                      <div id="A2114" data-roomname="A2114" @click="dataRoomClick('A2114')">
                        A2-114
                      </div>
                      <!-- 单扇门 横 -->
                      <img class="door" src="@/assets/xxfb/path/5.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div>过<br />道</div>
              <div>
                <div>
                  <div id="A2113" data-roomname="A2113" @click="dataRoomClick('A2113')">A2-113</div>
                  <!-- 横 双排门 -->
                  <img class="doubledoor" src="@/assets/xxfb/path/7.png" />
                  <img class="doubledoor" src="@/assets/xxfb/path/7.png" />
                </div>
                <div>
                  <div></div>
                  <img src="@/assets/xxfb/path/8.png" />
                  <div></div>
                </div>
                <div>
                  <div class="guodao">过<br />道</div>
                  <!-- 横 双排门 -->
                  <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                  <img class="hdoubledoor" src="@/assets/xxfb/path/6.png" />
                </div>
              </div>
            </div>
            <div class="arrowPoint" id="zuobiao" :style="getzbdStyle">
              <span>左</span>
              <img src="@/assets/xxfb/path/left.png" />

              <img id="zuobiaodian" src="@/assets/xxfb/path/zhishi.png" />
              <img src="@/assets/xxfb/path/right.png" />
              <span>右</span>
            </div>
          </div>
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
// 一楼竖正：A2-117------------待修改布局
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
  if (props.roomName == 'A2-117') {
    return {
      left: '64px',
      top: '797px'
    }
  }
})
// 声明会议室坐标点
var CoordPoint = {
  // A2-117会议室-------待修改布局
  // 一区
  A2117_A2118: [
    [126, 806],
    [92, 806]
  ],
  A2117_A2114: [
    [126, 806],
    [250, 806],
    [250, 806],
    [250, 1000],
    [255, 1000],
    [238, 1000]
  ],
  A2117_A2115: [
    [126, 806],
    [250, 806],
    [250, 806],
    [250, 944],
    [255, 944],
    [238, 944]
  ],
  A2117_A2113: [
    [126, 806],
    [250, 806],
    [250, 806],
    [250, 886],
    [250, 886],
    [270, 886]
  ],
  //二区
  A2117_A2117: [],
  A2117_A2109: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 704],
    [279, 704],
    [266, 704]
  ],
  A2117_A2107: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 754],
    [279, 754],
    [266, 754]
  ],
  A2117_A2104: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 562],
    [284, 562],
    [208, 562]
  ],
  A2117_A2110: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 754],
    [279, 754],
    [296, 754]
  ],
  A2117_A2108: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 704],
    [279, 704],
    [296, 704]
  ],
  A2117_A2105: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 562],
    [284, 562],
    [380, 562]
  ],
  //3区
  A2117_A2101: [
    [126, 806],
    [284, 806],
    [279, 811],
    [279, 562],
    [284, 562],
    [192, 562],
    [192, 562],
    [192, 428]
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
  // debugger
  // if (props.form.imgShow == 2) {
  //   return
  // }
  $('#div2').css('zoom', 1)
  type = 3

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
                "<img class'endimg' src='" +
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
// // 注解：在下方的代码中，我们创建了一个异步函数，在这个函数中进行串口设备的选择并打开选择的串口，其中选择串口设备命令的最后一个参数传递的是一个数组[{ usbVendorId: 0x1a86, usbProductId:0x7523  }]，这个数组中的成员对象usbVendorId代表串口的产品ID，usbProductId代表串口的厂商ID。在设备管理器-匹配设备Id下查看
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
onBeforeUnmount(() => {
  clearInterval(scrolltimer)

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
  width: 558px;
  height: 1042px;
  margin-top: 16px;
  margin-bottom: 22px;
  /* border: 1px solid red; */
  /* overflow: hidden;*/
  /* background-color: rgba(255, 255, 255, 0.04); */
  position: relative;
  display: flex;
  justify-content: space-between;
  // zoom: 1.972;
}
/* 中间中部 */
.div2 img {
  margin: 0;
  vertical-align: top;
  background-color: transparent;
}
.door {
  width: 4px;
  height: 20px;
  opacity: 0.7;
}
.hdoor {
  width: 20px;
  height: 5px;
  border-radius: 1px;
  opacity: 0.8;
}
/* 横双排门 通用 */
.hdoubledoor {
  width: 42px;
  height: 6px;
}
/* 双排门 */
.doubledoor {
  width: 6px;
  height: 42px;
}
.div2 .div2-2 {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.04);
}
/* 上部 */
.div2 .div2-2 .left .left1 {
  /* width: 526px; */
  /* height: 406px; */
  padding: 6px;
  /* padding-bottom: 0px; */
  background-color: #2c6965;
  /* border: 1px solid red; */
  position: relative;
}
.div2 .div2-2 .left .left1 > div {
  width: 526px;
  height: 394px;
  line-height: 394px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 30px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(26, 63, 61, 100);
  font-family: Roboto;
}
.div2 .div2-2 .left .left1 > img:nth-child(2) {
  position: absolute;
  bottom: 5px;
  left: 161px;
}
.div2 .div2-2 .left .left1 > img:nth-child(3) {
  position: absolute;
  bottom: 5px;
  right: 147px;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(1) {
  width: 116px;
  height: 66px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px -2px 1px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
  bottom: 6px;
  left: 6px;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) {
  width: 100px;
  height: 272px;
  padding-top: 4px;
  position: absolute;
  bottom: 4px;
  right: 6px;
  background-color: #2c6965;
  box-shadow: -3px -2px 0px 0px #1a3f3d;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-1,
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-3 {
  width: 100px;
  height: 100px;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) > .left2-1 > div,
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-3 > div {
  width: 100px;
  height: 97px;
  border-radius: 4px;
  background-color: rgba(54, 111, 107, 1);
  position: relative;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-1 > div > img:nth-child(1),
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-3 > div > img:nth-child(1) {
  position: absolute;
  right: 6px;
  top: 0;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-1 > div > img:nth-child(2) {
  width: 42px;
  height: 73px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-1 > div > img:nth-child(3),
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-3 > div > img:nth-child(3) {
  position: absolute;
  right: 6px;
  bottom: 0px;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) .left2-3 > div > img:nth-child(2) {
  width: 42px;
  height: 73px;
  position: absolute;
  left: 0;
  top: 0px;
}

.div2 .div2-2 .left .left1 > div > div:nth-child(2) > .left2-2 {
  width: 100px;
  height: 58px;
  margin-top: 6px;
  margin-bottom: 6px;
  background-color: rgba(255, 255, 255, 0.04);
  position: relative;
}
.div2 .div2-2 .left .left1 > div > div:nth-child(2) > .left2-2 > div {
  width: 48px;
  height: 42px;
  background-color: #2c6965;
}

.div2 .div2-2 .left .left1 > div > div:nth-child(2) > .left2-2 div img {
  width: 36px;
  height: 36px;
  margin-left: -4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

/* 上部过道 下部过道*/
.div2 .div2-2 .left .left5,
.div2 .div2-2 .right .right1 {
  /* width: 366px; */
  height: 58px;
  line-height: 58px;
  display: flex;
  justify-content: space-between;
}
.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(1),
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(2) {
  /* width: 112px; */
  height: 20px;
  /* margin-top: -4px; */
  margin-left: 6px;
  background-color: #2c6965;
  display: flex;
  justify-content: flex-start;
}
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(2) div {
  width: 100px;
  height: 18px;
  margin-top: 6px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  background-color: rgba(65, 116, 116, 1);
}

.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(1) {
  margin-top: 30px;
}
.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(1) > div {
  width: 48px;
  height: 20px;
  margin-top: 4px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(1) > div img {
  width: 18px;
  height: 18px;
  margin: 1px 15px;
}
.div2 .div2-2 .left .left5 > div:nth-child(1) > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(1) {
  width: 112px;
  height: 31px;
  margin-top: 10px;
  /* background-color: rgba(255, 255, 255, 0.04); */
}
.div2 .div2-2 .right .right1 > div:nth-child(1) > div:nth-child(1) {
  margin-top: 0px;
}
.div2 .div2-2 .left .left5 > div:nth-child(2),
.div2 .div2-2 .right .right1 > div:nth-child(2) {
  width: 429px;
  height: 58px;
  line-height: 58px;
  /* background-color: rgba(255, 255, 255, 0.04); */
  color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  text-align: left;
  font-family: Roboto;
}

/*中间楼梯 */
.div2 .div2-2 .middle {
  width: 100%;
  height: 48px;
  /* border:1px solid red; */
  display: flex;
  justify-content: flex-start;
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
.div2 .div2-2 .middle > div:nth-child(1) > img {
  width: 48px;
  height: 35px;
  margin: 6px;
  margin-left: 0px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .middle > div:nth-child(2) {
  width: 223px;
  height: 48px;
  margin-left: 113px;
  background-color: #2c6965;
}
.div2 .div2-2 .middle > div:nth-child(2) div {
  width: 223px;
  margin: 5px 0;
  // background-color: rgba(255, 255, 255, 0.04);
}
.div2 .div2-2 .middle > div:nth-child(2) > div div {
  width: 100%;
  height: 38px;
  background-color: rgba(255, 255, 255, 0.04);
  display: flex;
  justify-content: space-evenly;
}
.div2 .div2-2 .middle > div:nth-child(2) > div div img {
  width: 44px;
  height: 44px;
  margin-top: -3px;
  border-radius: 50%;
}

/* 下部*/
/*会议室2区*/
.div2 .div2-2 .right .right2 {
  width: 100%;
  height: 206px;
  display: flex;
  justify-content: flex-start;
}
.div2 .div2-2 .right .right2 .right2-1 {
  padding: 6px;
  background-color: #2c6965;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  font-family: Roboto;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(1) {
  width: 229px;
  height: 90px;
  line-height: 90px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  font-family: Roboto;
  position: relative;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(1) img {
  position: absolute;
  top: 0;
  right: 21px;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) {
  display: flex;
  justify-content: flex-start;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(1) {
  width: 150px;
  margin-right: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  font-size: 24px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  position: relative;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  bottom: 0;
  left: 16px;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  bottom: 0;
  right: 16px;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(2) > div {
  position: relative;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) {
  margin-bottom: 4px;
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(2) > div > div {
  width: 75px;
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  font-size: 18px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .right .right2 .right2-1 > div:nth-child(2) > div:nth-child(2) > div img {
  position: absolute;
  right: 0px;
  top: 14px;
}

.div2 .div2-2 .right .right2 .right2-2 {
  width: 62px;
  height: 176px;
}

.div2 .div2-2 .right .right2 .right2-3 {
  /* width: 235px; */
  padding: 6px;
  background-color: #2c6965;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  font-family: Roboto;
  display: flex;
  justify-content: flex-start;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) {
  margin-right: 4px;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div {
  position: relative;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(1) div {
  width: 117px;
  height: 90px;
  line-height: 90px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  font-size: 18px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(1) img {
  position: absolute;
  left: 38px;
  top: 0px;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(2) img,
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(3) img {
  position: absolute;
  left: 0px;
  top: 14px;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(2) {
  margin-bottom: 4px;
}

.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(2) div,
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(1) > div:nth-child(3) div {
  width: 117px;
  height: 48px;
  line-height: 48px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  font-size: 18px;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(2) {
  width: 102px;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(2) > div:nth-child(1) {
  width: 102px;
  height: 90px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(54, 111, 107, 1);
  position: relative;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(2) div img:nth-child(1) {
  width: 42px;
  height: 67px;
  position: absolute;
  left: 0;
  bottom: 0;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(2) div img:nth-child(2) {
  position: absolute;
  top: 0;
  right: 8px;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(2) div img:nth-child(3) {
  position: absolute;
  bottom: 0;
  right: 8px;
}
.div2 .div2-2 .right .right2 .right2-3 > div:nth-child(2) > div:nth-child(2) {
  width: 42px;
  height: 100px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right3 {
  width: 478px;
  height: 46px;
}
/*会议室3区*/
.div2 .div2-2 .right .right4 {
  width: 100%;
  height: 202px;
  /* border:1px solid red; */
  display: flex;
  justify-content: flex-start;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) {
  /* width: 213px; */
  /* height: 177px; */
  padding: 6px;
  display: flex;
  justify-content: flex-start;
  position: relative;
  background-color: #2c6965;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div {
  position: relative;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(1) {
  margin-right: 4px;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(1) > div {
  width: 122px;
  height: 190px;
  line-height: 190px;
  border-radius: 4px;
  border-bottom-right-radius: 0px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(26, 63, 61, 100);
  font-family: Roboto;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(1) img {
  position: absolute;
  right: 24px;
  top: 0;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(2) > div {
  position: relative;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(2) > div > div {
  width: 75px;
  height: 52px;
  line-height: 52px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 18px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  font-family: Roboto;
  position: relative;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(2) {
  margin-bottom: 4px;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(2) > div img {
  position: absolute;
  right: 0px;
  top: 19px;
}
.div2 .div2-2 .right .right4 > div:nth-child(1) > div:nth-child(2) > div > div:nth-child(1) {
  width: 75px;
  height: 76px;
  margin-bottom: 4px;
  display: flex;
  justify-content: flex-start;
  border-radius: 0;
  /* border: 1px solid red; */
}
.div2
  .div2-2
  .right
  .right4
  > div:nth-child(1)
  > div:nth-child(2)
  > div
  > div:nth-child(1)
  div:nth-child(1) {
  width: 40px;
  height: 76px;
  line-height: 29px;
  border-radius: 4px;

  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2
  .div2-2
  .right
  .right4
  > div:nth-child(1)
  > div:nth-child(2)
  > div
  > div:nth-child(1)
  div:nth-child(2) {
  width: 40px;
  height: 76px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}

.div2 .div2-2 .right .right4 > div:nth-child(2) {
  width: 62px;
  height: 177px;
  line-height: 64px;
  color: rgba(255, 255, 255, 0.2);
  font-size: 18px;
  text-align: center;
  font-family: Roboto;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) {
  // height: 190px;
  padding: 6px;
  background-color: #2c6965;
  display: flex;
  justify-content: flex-start;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(1) {
  width: 145px;
  height: 190px;
  position: relative;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(1) div {
  width: 145px;
  height: 190px;
  line-height: 190px;
  border-radius: 4px;
  background-color: rgba(52, 127, 122, 1);
  color: rgba(255, 255, 255, 1);
  font-size: 24px;
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
  font-family: Roboto;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(1) img:nth-child(2) {
  position: absolute;
  left: 0;
  top: 32px;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(1) img:nth-child(3) {
  position: absolute;
  left: 0;
  bottom: 32px;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(2) {
  margin-left: 4px;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(2) > div:nth-child(1) {
  width: 42px;
  height: 61px;
  margin-bottom: 4px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(2) > img {
  width: 44px;
  height: 87px;
  margin-bottom: 3px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(2) > div:nth-child(3) {
  width: 42px;
  height: 33px;
  border-radius: 4px;
  background-color: rgba(65, 116, 116, 1);
  text-align: center;
  box-shadow: 3px 2px 1px 0px rgba(0, 0, 0, 0.4);
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(3) {
  width: 54px;
  height: 126px;
  margin-left: 4px;
  margin-top: 65px;
  border-radius: 4px;
  background-color: rgba(54, 111, 107, 1);
  position: relative;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(3) img:nth-child(2) {
  position: absolute;
  top: 0px;
  left: 7px;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(3) img:nth-child(3) {
  position: absolute;
  bottom: 0;
  left: 7px;
}
.div2 .div2-2 .right .right4 > div:nth-child(3) > div:nth-child(3) .guodao {
  width: 61px;
  height: 219px;
  line-height: 100px;
  background-color: rgba(54, 111, 107, 1);
  color: rgba(255, 255, 255, 0.2);
  font-size: 28px;
  text-align: center;
  font-family: Roboto;
  position: absolute;
  margin-top: -223px;
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
  // width: 11px;
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
  left: 70px;
  top: 786px;
}

// 起点的激活样式
.active-startA2117 {
  width: 150px !important;
  height: 100px !important;
  line-height: 100px !important;
  background-color: rgba(255, 145, 0, 1) !important;
  font-size: 24px;
}
</style>
