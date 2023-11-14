<template>
  <div class="edit">
    <!-- 1. 顶部 -->
    <div class="top">
      <div class="pubTime">
        <img src="@/assets/xxfb/1.png" />
        <span>定时发布 ：{{ form.publishTime ? form.publishTime : '' }}</span>
      </div>
      <div class="selectInfo">
        <el-select
          v-model="meetingOptionvalue"
          placeholder="请选择会议"
          @change="onChange"
          style="width: auto"
        >
          <el-option
            v-for="item in meetingList"
            :key="item.meetID"
            :label="item.meetName"
            :value="item.meetID"
          />
        </el-select>
      </div>
      <div class="btn">
        <div @click="onSave()">
          <img src="@/assets/xxfb/2.png" />
          <div>保存</div>
        </div>
        <div @click="onPub()">
          <img src="@/assets/xxfb/3.png" />
          <div>发布</div>
        </div>
        <div @click="router.push('/meetingUserList?roomName=' + roomName + '&roomID=' + roomId)">
          <img src="@/assets/xxfb/4.png" />
          <div>返回</div>
        </div>
      </div>
    </div>
    <!-- 2. 预览及编辑区 -->
    <div class="content" v-if="meetingList.length > 0">
      <!-- 2.1 预览 -->
      <el-scrollbar height="100%" width="443px" class="preScrollBar">
        <div class="pre">
          <div class="preTop">预览效果：</div>
          <div class="preInfo">
            <PreEdit :form="form" :isshowlineValue="isshowlineValue"></PreEdit>
          </div>
        </div>
      </el-scrollbar>
      <!-- 2.2 编辑信息 -->
      <el-scrollbar height="100%" width="100%" class="editScrollBar">
        <div class="editInfo">
          <!-- 2.2.1会议信息 -->
          <div class="meetingArea">
            <div class="top1">会议信息区域</div>
            <div class="meetingInfo">
              <!-- 1.第一行文本 -->
              <div>
                <!--同步 第一行文本按钮 -->
                <div>
                  <img
                    v-if="isshowlineValue.isshowline1Value"
                    src="@/assets/xxfb/5.png"
                    @click="isshowline1"
                  />
                  <img v-else src="@/assets/xxfb/10.png" @click="isshowline1" />
                  <span>标题</span>
                  <el-switch
                    class="ml-2"
                    size="small"
                    v-model="form.mtAreaList[0].syncStatus"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                    active-text=""
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="0"
                    @change="
                      (v) => {
                        issyncLine1(v, item1)
                      }
                    "
                    :disabled="!isshowlineValue.isshowline1Value"
                  />
                  <span>同步会议标题</span>
                </div>
                <!--同步 第一行文本 信息修改  -->
                <div>
                  <el-form>
                    <el-form-item label="" prop="">
                      <el-input
                        v-if="form.mtAreaList.length >= 1"
                        style="width: 340px"
                        v-model="form.mtAreaList[0].textConent"
                        :disabled="form.mtAreaList[0].syncStatus == 1"
                      />
                      <el-input v-else style="width: 340px" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="">
                      <el-select
                        v-model="form.mtAreaList[0].fontSize"
                        placeholder="请选择字号"
                        @change="line1FontSizeonChange"
                        style="width: auto"
                      >
                        <el-option v-for="item in 70" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                    <!-- show-alpha -->
                    <el-form-item label="">
                      <span class="demonColor">{{ form.mtAreaList[0].textColor }}</span>
                      <el-color-picker
                        v-model="form.mtAreaList[0].textColor"
                        @change="line1TextColorChange"
                        show-alpha
                      />
                    </el-form-item>
                    <el-form-item label="" prop="" class="textAlign">
                      <img
                        src="@/assets/xxfb/left.png"
                        data-textAlign="left"
                        @click="line1textAlign($event)"
                        :style="
                          form.mtAreaList[0].showLocat == 'left'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/center.png"
                        data-textAlign="center"
                        @click="line1textAlign($event)"
                        :style="
                          form.mtAreaList[0].showLocat == 'center'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/right.png"
                        data-textAlign="right"
                        @click="line1textAlign($event)"
                        :style="
                          form.mtAreaList[0].showLocat == 'right'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/6.png"
                        data-textAlign="justify"
                        @click="line1textAlign($event)"
                        :style="
                          form.mtAreaList[0].showLocat == 'justify'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <!-- 2.第二行文本 -->
              <div>
                <!--同步 第二行文本按钮 -->
                <div>
                  <img
                    v-if="isshowlineValue.isshowline2Value"
                    src="@/assets/xxfb/5.png"
                    @click="isshowline2"
                  />
                  <img v-else src="@/assets/xxfb/10.png" @click="isshowline2" />
                  <span>时间</span>
                  <el-switch
                    v-if="form.mtAreaList.length >= 2"
                    class="ml-2"
                    size="small"
                    v-model="form.mtAreaList[1].syncStatus"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                    active-text=""
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="0"
                    @change="
                      (v) => {
                        issyncLine2(v, item1)
                      }
                    "
                  />
                  <el-switch
                    v-else
                    :disabled="true"
                    class="ml-2"
                    size="small"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                    active-text=""
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="0"
                  />
                  <span>同步会议时间</span>
                </div>
                <!--同步 第二行文本 信息修改  -->
                <div>
                  <el-form>
                    <el-form-item label="" prop="">
                      <el-input
                        style="width: 340px"
                        v-model="form.mtAreaList[1].textConent.split(' ')[1]"
                        :disabled="form.mtAreaList[1].syncStatus == 1"
                      />
                    </el-form-item>
                    <el-form-item label="">
                      <el-select
                        v-model="form.mtAreaList[1].fontSize"
                        placeholder="请选择字号"
                        @change="line2FontSizeonChange"
                        style="width: auto"
                      >
                        <el-option v-for="item in 70" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                    <!-- show-alpha -->
                    <el-form-item label="">
                      <span class="demonColor">{{ form.mtAreaList[1].textColor }}</span>
                      <el-color-picker v-model="form.mtAreaList[1].textColor" show-alpha />
                    </el-form-item>
                    <el-form-item label="" prop="" class="textAlign">
                      <img
                        src="@/assets/xxfb/left.png"
                        data-textAlign="left"
                        @click="line2textAlign($event)"
                        :style="
                          form.mtAreaList[1].showLocat == 'left'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/center.png"
                        data-textAlign="center"
                        @click="line2textAlign($event)"
                        :style="
                          form.mtAreaList[1].showLocat == 'center'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/right.png"
                        data-textAlign="right"
                        @click="line2textAlign($event)"
                        :style="
                          form.mtAreaList[1].showLocat == 'right'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/6.png"
                        data-textAlign="justify"
                        @click="line2textAlign($event)"
                        :style="
                          form.mtAreaList[1].showLocat == 'justify'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <!-- 3.第三行文本 -->
              <div>
                <!--同步 第三行文本按钮 -->
                <div>
                  <img
                    v-if="isshowlineValue.isshowline3Value"
                    src="@/assets/xxfb/5.png"
                    @click="isshowline3"
                  />
                  <img v-else src="@/assets/xxfb/10.png" @click="isshowline3" />
                  <span>主办方</span>
                  <el-switch
                    v-if="form.mtAreaList.length >= 3"
                    class="ml-2"
                    size="small"
                    v-model="form.mtAreaList[2].syncStatus"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                    active-text=""
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="0"
                    @change="
                      (v) => {
                        issyncLine3(v, item1)
                      }
                    "
                  />
                  <el-switch
                    v-else
                    :disabled="true"
                    class="ml-2"
                    size="small"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                    active-text=""
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="0"
                  />
                  <span>同步会议主办方</span>
                </div>
                <!--同步 第三行文本 信息修改  -->
                <div>
                  <el-form>
                    <el-form-item label="" prop="">
                      <el-input
                        style="width: 340px"
                        v-model="form.mtAreaList[2].textConent"
                        :disabled="form.mtAreaList[2].syncStatus == 1"
                      />
                    </el-form-item>
                    <el-form-item label="">
                      <el-select
                        v-model="form.mtAreaList[2].fontSize"
                        placeholder="请选择字号"
                        @change="line3FontSizeonChange"
                        style="width: auto"
                      >
                        <el-option v-for="item in 70" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                    <!-- show-alpha -->
                    <el-form-item label="">
                      <span class="demonColor">{{ form.mtAreaList[2].textColor }}</span>
                      <el-color-picker v-model="form.mtAreaList[2].textColor" show-alpha />
                    </el-form-item>
                    <el-form-item label="" prop="" class="textAlign">
                      <img
                        src="@/assets/xxfb/left.png"
                        data-textAlign="left"
                        @click="line3textAlign($event)"
                        :style="
                          form.mtAreaList[2].showLocat == 'left'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/center.png"
                        data-textAlign="center"
                        @click="line3textAlign($event)"
                        :style="
                          form.mtAreaList[2].showLocat == 'center'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/right.png"
                        data-textAlign="right"
                        @click="line3textAlign($event)"
                        :style="
                          form.mtAreaList[2].showLocat == 'right'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/6.png"
                        data-textAlign="justify"
                        @click="line3textAlign($event)"
                        :style="
                          form.mtAreaList[2].showLocat == 'justify'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <!-- </template> -->
            </div>
          </div>
          <!-- 2.2.2媒体信息 -->
          <div class="mediaArea">
            <div class="top1">多媒体信息区域（默认展示会议室导览图）</div>
            <div class="mediaInfo">
              <div class="mediaInfo1">
                <span>会议轮播图</span>
                <el-switch
                  class="ml-2"
                  size="small"
                  v-model="form.imgShow"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                  active-text=""
                  inactive-text=""
                  :active-value="2"
                  :inactive-value="1"
                  @change="
                    (v) => {
                      issyncSwiperChange(v, item1)
                    }
                  "
                />
                <span>轮播间隔</span>
                <el-select
                  v-model="form.playGap"
                  placeholder="请选择轮播间隔时间"
                  @change="onTimeChange"
                  style="width: auto"
                >
                  <el-option
                    v-for="item in [1000, 2000, 3000, 4000, 5000]"
                    :key="item"
                    :label="item + 'ms'"
                    :value="item"
                  />
                </el-select>
              </div>
              <div class="mediaInfo2">
                <!-- list-type：'text' | 'picture' | 'picture-card' 文件列表的类型
                    on-preview：点击文件列表中已上传的文件时的钩子
                    on-remove：移除
                  -->
                <el-upload
                  v-model:file-list="fileList"
                  list-type="picture-card"
                  :http-request="() => {}"
                  :auto-upload="false"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="beforeAvatarUpload"
                >
                  <el-icon><Plus /></el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div v-else class="noMeeting">暂无会议</div>
    <!--1.发布弹框  -->
    <div class="pubFormDialog">
      <el-dialog v-model="pubFormVisible" title="发布确认">
        <div>发布时间：</div>
        <el-radio-group v-model="form.prePubTime" class="ml-4" @change="radioOptionChange">
          <el-radio label="0.5" size="large">会前0.5小时</el-radio>
          <el-radio label="1" size="large">会前1小时</el-radio>
          <el-radio label="1.5" size="large">会前1.5小时</el-radio>
          <el-radio label="2" size="large">会前2小时</el-radio>
          <el-radio label="3" size="large">
            <template #default>
              <span>自定义时间：</span>
              <el-input-number
                v-model="num"
                :min="0"
                :max="10"
                :step="0.5"
                @change="handleNumChange"
              />
            </template>
          </el-radio>
        </el-radio-group>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelPub()">取消</el-button>
            <el-button type="primary" @click="confirmPub()">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!--2.发布成功弹框  -->
    <div class="pubSuccessDialog">
      <el-dialog v-model="pubSuccessVisible" title="">
        <div class="pubSuccessTips" v-if="false">
          <img src="@/assets/xxfb/8.png" />
          <div>发布成功</div>
          <span>{{ roomName }}门口信息发布屏配置发布成功～</span>
        </div>
        <div class="pubSuccessTips" v-else>
          <img src="@/assets/xxfb/9.png" />
          <div>发布失败</div>
          <span>{{ roomName }}门口信息发布屏配置发布失败！请重新尝试！</span>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="pubSuccessVisible = false">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import PreEdit from '@/components/xxfb/PreEdit.vue'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { releaseRequest } from '@/utils/server.js'
const roomName = route.query.roomName
const roomId = route.query.roomID

// debugger
var title = ''
var time = ''
var uinhost = ''
// 1.----根据会议名称 获取会议场次接口------
const getMeetingList = () => {
  releaseRequest
    .post('/IotPageEditCrtl/queryReleasePageInfo', {
      roomName: roomName,
      roomID: '',
      meetID: ''
    })
    .then((res) => {
      // debugger
      // console.log('按会议场次查询成功:', res.data.result)
      if (res.data.repCode == 200) {
        // 1.选择会议列表
        meetingList.value = res.data.result
        //默认选中最近的一场会议
        meetingOptionvalue.value = res.data.result[0].meetID

        // 2.会议信息区域
        // debugger
        form.value = res.data.result[0]
        console.log(form.value, form.value.mtAreaList[0].syncStatus)

        // 此处 将会议初始标题，时间，主办方记录下来,再次点击同步时，需要展示初始信息
        title = form.value.mtAreaList[0].textConent
        time = form.value.mtAreaList[1].textConent
        uinhost = form.value.mtAreaList[2].textConent
      }
    })
    .catch((error) => {
      // debugger
      console.log('按会议场次查询失败:', error)
    })
}

// 1.选择会议
const meetingList = ref([])
const meetingOptionvalue = ref('')
//
const onChange = (v) => {
  // debugger
  console.log(meetingOptionvalue.value)
  for (var i = 0; i < meetingList.value.length; i++) {
    if (meetingList.value[i].meetID == v) {
      form.value = meetingList.value[i]
    }
  }
}

// 2.2.1会议信息区域
const form = ref({})
// debugger
// 第一行标题是否同步 1同步 0不同步----------
const issyncLine1 = (v) => {
  // debugger
  console.log('第一行标题是否同步', v)
  // form.value.mtAreaList[0].syncStatus = v
  // if(form.value.mtAreaList[0].syncStatus==1){
  //   form.value.mtAreaList[0].textConent=title
  // }else{

  // }
}
const isshowlineValue = ref({
  isshowline1Value: true,
  isshowline2Value: true,
  isshowline3Value: true
})

const isshowline1 = () => {
  // debugger
  isshowlineValue.value.isshowline1Value = !isshowlineValue.value.isshowline1Value
}
// 第一行字体大小
const line1FontSizeonChange = (v) => {
  // debugger
  form.value.mtAreaList[0].fontSize = v
}
// 第一行颜色
const line1TextColorChange = (v) => {
  // debugger
  // if(v==null){
  //   .value.mtAreaList[0].textColor="#13CE66"
  // }else{
  //   .value.mtAreaList[0].textColor=v
  // }
}
// 第一行居中方式
const line1textAlign = (e) => {
  form.value.mtAreaList[0].showLocat = e.target.dataset.textalign
}

// 第二行标题是否同步--------
const issyncLine2 = (v) => {
  //  debugger
  console.log('第二行标题是否同步', v)
  form.value.mtAreaList[1].syncStatus = v
  if (form.value.mtAreaList[1].syncStatus == 1) {
    form.value.mtAreaList[1].textConent = time
  } else {
  }
}
const isshowline2 = () => {
  isshowlineValue.value.isshowline2Value = !isshowlineValue.value.isshowline2Value
}
// 第二行字体大小
const line2FontSizeonChange = (v) => {
  // debugger
  form.value.mtAreaList[1].fontSize = v
}
// 第二行颜色
// 第二行居中方式
const line2textAlign = (e) => {
  form.value.mtAreaList[1].showLocat = e.target.dataset.textalign
}

// 第三行标题是否同步--------
const issyncLine3 = (v) => {
  //  debugger
  console.log('第三行标题是否同步', v)
  form.value.mtAreaList[2].syncStatus = v
  if (form.value.mtAreaList[2].syncStatus == 1) {
    form.value.mtAreaList[2].textConent = title
  } else {
  }
}
const isshowline3 = () => {
  isshowlineValue.value.isshowline3Value = !isshowlineValue.value.isshowline3Value
}
// 第一行字体大小
const line3FontSizeonChange = (v) => {
  // debugger
  form.value.mtAreaList[2].fontSize = v
}
// 第三行颜色
// 第三行居中方式
const line3textAlign = (e) => {
  form.value.mtAreaList[2].showLocat = e.target.dataset.textalign
}

// 是否开启轮播图
const issyncSwiperChange = () => {}
// 轮播间隔时间
const onTimeChange = (v) => {
  form.value.playGap = v
}

// 1.保存
const onSave = () => {
  // debugger
  console.log(form.value)
  // 调用保存接口
  // saveRequest()
}
// 2.发布弹框
const pubFormVisible = ref(false)
const onPub = () => {
  pubFormVisible.value = true
  // debugger
  form.value.prePubTime = '1'
  num.value = '0'
}

// 提前发布时间选择
// const prePubTime=ref(1)
// num 为自定义时间
const num = ref('')
const handleNumChange = (v) => {
  //  debugger
  num.value = v
}
const radioOptionChange = (v) => {
  // debugger
  // if(v!='3'&&v!=""){
  //   form.value.prePubTime=v
  // }else{
  //   form.value.prePubTime=num.value
  // }
}
// 弹框中取消按钮
const cancelPub = () => {
  pubFormVisible.value = false
  form.value.prePubTime = '1'
  num.value = '0'
}
//弹框中确认按钮
const confirmPub = () => {
  pubFormVisible.value = false
  // 调用发布接口

  pubSuccessVisible.value = true
}

// 发布成功提示
const pubSuccessVisible = ref(false)

// 2.2图片/视频上传
const fileList = ref([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
    type: 'img'
  },
  {
    name: 'cat.mp4',
    // url: '@/assets/xxfb/cat.mp4',
    url: 'http://39.105.179.38:9797/noderad/cat.mp4',
    type: 'video'
  }
])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

// const fileList = ref([])
const beforeAvatarUpload = (rawFile) => {
  console.log('0000000', rawFile)

  // debugger
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('上传文件不能超过 20MB!')
    return false
  }

  for (var i = 0; i < fileList.value.length; i++) {
    if (rawFile.name == fileList.value[i].name) {
      ElMessage.error('上传文件名重复！')
      return
    }
  }
  fileList.value.push(rawFile)

  return true
}

// 视频/图片下载
// 仅支持视频下载和图片下载
const downLoad = (item) => {
  // debugger
  let url = item.url
  // let fileName = url.slice(url.lastIndexOf("/") + 1); //下载的文件名换成自己的
  let fileName = item.name //dayjs
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  // xhr.open("POST", url, true);
  xhr.responseType = 'blob' // 返回类型blob
  xhr.onload = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let blob = xhr.response
      let downLoadUrl = window.URL.createObjectURL(
        new Blob([blob], {
          type: item.type === 'video' ? 'video/mp4' : 'image/jpeg'
        })
      )
      let a = document.createElement('a')
      a.download = fileName
      a.href = downLoadUrl
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
    }
  }
  xhr.send()
}
onMounted(() => {
  // 1.调用根据会议名称 获取会议场次接口
  getMeetingList()
  for (var i = 0; i < fileList.value.length; i++) {
    //  downLoad(fileList.value[i])
  }
})
</script>

<style lang="less" scoped>
.edit {
  width: 100%;
  height: 100vh;
  // 1.顶部
  .top {
    height: 60px;
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    position: relative;
    display: flex;
    justify-content: space-between;
    justify-items: center;

    .pubTime {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      span {
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
    }
    .selectInfo {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-25%);
      :deep(.el-select) {
        width: 400px;
        // margin-top: 14px;

        .el-input__wrapper {
          box-shadow: none;
          .el-input__inner {
            color: rgba(65, 80, 88, 1);
            font-size: 20px;
            text-align: left;
            font-family: Microsoft Yahei;
          }
          .el-icon {
            font-size: 20px;
          }
        }
        .el-input .el-input__wrapper.is-focus {
          box-shadow: none !important;
        }
      }
    }
    .btn {
      width: 176px;
      height: 60px;
      display: flex;
      justify-content: space-between;
      justify-items: center;
      & > div {
        width: 32px;
        margin-top: 6px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        div {
          width: 32px;
          height: 24px;
          color: rgba(64, 64, 64, 1);
          font-size: 16px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
      }
    }
  }

  //2. 预览及编辑区
  .content {
    height: calc(100vh - 60px);
    display: flex;
    justify-content: flex-start;

    // 左侧预览
    .preScrollBar {
      width: 443px;
      flex: none;
    }
    .pre {
      height: 100%;
      padding-left: 12px;
      padding-top: 24px;
      padding-right: 34px;
      background-color: #f5f5f5;
      .preTop {
        width: 70px;
        height: 20px;
        margin-left: 8px;
        margin-bottom: 19px;
        color: rgba(16, 16, 16, 1);
        font-size: 14px;
        text-align: left;
        font-family: SourceHanSansSC-regular;
      }
      .preInfo {
        width: 375px;
        height: 675px;
        border: 1px solid blue;
      }
    }

    //2.右侧编辑
    .editScrollBar {
      width: calc(100vw - 443px);
      flex: none;
    }
    .editInfo {
      height: 100%;
      padding-left: 24px;
      // padding-right:24px ;
      display: flex;
      flex-direction: column;
      flex: 1;

      //公共部分
      .top1 {
        height: 62px;
        line-height: 62px;
        border-bottom: 1px solid rgba(51, 157, 243, 0.6);
        color: rgba(51, 157, 243, 1);
        font-size: 18px;
        white-space: nowrap;
        text-align: left;
        font-family: PingFangSC-regular;
      }
      // 2.2.1会议信息
      .meetingInfo {
        margin-bottom: 24px;
        & > div {
          height: 70px;
          margin-top: 26px;
          display: flex;
          flex-direction: column;
          //
          & > div:nth-child(1) {
            margin-bottom: 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 18px;
              height: 18px;
              margin-right: 6px;
            }
            span:nth-child(2) {
              width: 48px;
              height: 24px;
              color: rgba(51, 51, 51, 1);
              font-size: 16px;
              font-weight: 600;
              white-space: nowrap;
              text-align: left;
              font-family: PingFangSC-regular;
            }
            :deep(.el-switch) {
              margin-left: 66px;
              margin-right: 4px;
            }
            span:nth-child(4) {
              height: 20px;
              color: rgba(16, 16, 16, 1);
              font-size: 14px;
              text-align: left;
              white-space: nowrap;
              font-family: SourceHanSansSC-regular;
            }
          }
          & > div:nth-child(2) {
            :deep(.el-form) {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              .el-form-item {
                margin-left: 24px;
                .el-form-item__content {
                  flex-wrap: nowrap !important;
                }
              }
              .el-select {
                width: 83px !important;
              }
              .textAlign {
                display: flex;
                justify-content: flex-start;

                img {
                  width: 18px;
                  height: 18px;
                  margin-right: 14px;
                }
              }
              .demonColor {
                // min-width: 91px;
                width: 150px;
                padding-left: 4px;
                padding-right: 4px;
                height: 32px;
                background-color: rgba(255, 255, 255, 1);
                color: rgba(64, 64, 64, 1);
                font-size: 14px;
                text-align: center;
                white-space: nowrap;
                font-family: Roboto;
                border: 1px solid rgba(232, 232, 232, 1);
              }
              .el-color-picker__trigger {
                border: none;
                padding: 0px;
              }
              .el-form-item:nth-child(2) {
                .el-input__inner {
                  text-align: center;
                }
              }
            }
          }
        }
      }
      // 2.2.2媒体信息
      .mediaInfo {
        .mediaInfo1 {
          margin-top: 14px;
          margin-bottom: 14px;
          & > span:nth-child(1) {
            height: 24px;
            color: rgba(64, 64, 64, 1);
            font-size: 16px;
            font-weight: 600;
            text-align: left;
            font-family: PingFangSC-regular;
          }
          .el-switch {
            margin-left: 8px;
            margin-right: 10px;
          }
          & > span:nth-child(3) {
            color: rgba(51, 51, 51, 1);
            font-size: 14px;
            text-align: left;
            margin-right: 10px;
            font-family: PingFangSC-regular;
          }
          :deep(.el-select) {
            width: 98px !important;
            // max-width: 198px!important;
            height: 24px !important;
            margin-top: -10px;
            .el-input__wrapper {
              box-shadow: none;
            }
          }
        }
      }
    }
  }
  .noMeeting {
    width: 100%;
    font-size: 20px;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  // 3.发布弹出框
  :deep(.pubFormDialog .el-dialog) {
    --el-dialog-width: 40%;
    min-width: 368px;
    .el-dialog__header {
    }
    .el-dialog__body {
      border-top: 1px solid rgba(239, 239, 239, 1);
      padding: 24px;
      .el-radio-group {
        .el-radio.el-radio--large {
          width: 37%;
          .el-input-number__decrease,
          .el-input-number__increase {
            background-color: transparent;
            border: 1px solid rgba(239, 239, 239, 1);
          }
          .el-input__wrapper {
            box-shadow: none;
          }
        }
      }
      & > div:nth-child(1) {
        margin-bottom: 8px;
      }
      .el-input-number {
        width: 108px;
      }
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  // 3.发布成功弹出框
  .pubSuccessDialog {
    :deep(.el-dialog) {
      --el-dialog-width: 40%;
      min-width: 368px;
      .el-dialog__header {
      }
      .el-dialog__body {
        .pubSuccessTips {
          display: flex !important;
          flex-direction: column;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
          }
          div {
            height: 26px;
            color: rgba(0, 0, 0, 1);
            font-size: 18px;
            text-align: center;
            margin-top: 24px;
            margin-bottom: 14px;
            font-family: SourceHanSansSC-regular;
          }
          span {
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
            text-align: center;
            font-family: PingFangSC-regular;
          }
        }
      }
      .el-dialog__footer {
        text-align: center;
      }
    }
  }
}
</style>
=
