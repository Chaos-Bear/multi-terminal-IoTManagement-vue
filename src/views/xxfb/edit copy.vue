<template>
  <div class="edit" v-loading="loading">
    <!-- 1. 顶部 -->
    <div class="top">
      <div class="pubTime">
        <img src="@/assets/xxfb/1.png" />
        <span>定时发布 ：{{ form.publishTime ? form.publishTime.split('~')[0] : '' }}</span>
      </div>
      <div class="selectInfo">
        <el-select v-model="meetingOptionvalue" placeholder="请选择会议" style="width: auto">
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
        <div @click="router.push('/meetingUserList?roomName=' + roomName + '&roomID=' + roomIdzdy)">
          <img src="@/assets/xxfb/4.png" />
          <div>返回</div>
        </div>
      </div>
    </div>
    <!-- 2. 预览及编辑区 v-if="meetingList.length > 0"-->
    <div class="content">
      <!-- 2.1 预览 -->
      <el-scrollbar height="100%" width="443px" class="preScrollBar">
        <div class="pre">
          <div class="preTop">预览效果：</div>
          <div class="preInfo">
            <PreEdit :form="form"></PreEdit>
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
              <!-- 1.文本 -->
              <div v-for="(item, i) in form.mtAreaList" :key="i">
                <!--文本按钮 -->
                <div>
                  <img
                    v-if="item.isShow == '1'"
                    src="@/assets/xxfb/5.png"
                    @click="isshowline(item, '0')"
                  />
                  <img v-else src="@/assets/xxfb/10.png" @click="isshowline(item, '1')" />
                  <span>{{ item.textLocat }}</span>
                  <el-switch
                    class="ml-2"
                    size="small"
                    v-model="item.syncStatus"
                    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ddddde"
                    active-text=""
                    inactive-text=""
                    :active-value="1"
                    :inactive-value="0"
                    @change="
                      (v) => {
                        issyncLine(v, item)
                      }
                    "
                    :disabled="item.isShow == '0'"
                  />
                  <span>同步会议{{ item.textLocat }}</span>
                </div>
                <!--文本 信息修改  -->
                <div>
                  <el-form>
                    <el-form-item label="" prop="">
                      <el-input
                        v-if="form.mtAreaList.length >= 1"
                        style="width: 340px"
                        v-model="item.textConent"
                        :disabled="item.syncStatus == 1"
                      />
                      <el-input v-else style="width: 340px" :disabled="true" />
                    </el-form-item>

                    <el-form-item label="">
                      <el-select
                        v-model="item.fontSize"
                        placeholder="请选择字号"
                        style="width: auto"
                      >
                        <el-option v-for="item in 100" :key="item" :label="item" :value="item" />
                      </el-select>
                    </el-form-item>
                    <!-- show-alpha -->
                    <el-form-item label="">
                      <span class="demonColor">{{ form.mtAreaList[0].textColor }}</span>
                      <el-color-picker v-model="item.textColor" show-alpha />
                    </el-form-item>
                    <el-form-item label="" prop="" class="textAlign">
                      <img
                        src="@/assets/xxfb/left.png"
                        data-textAlign="left"
                        @click="line1textAlign(item, 'left')"
                        :style="
                          item.showLocat == 'left' ? 'background-color: rgba(3, 154, 252, 1);' : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/center.png"
                        data-textAlign="center"
                        @click="line1textAlign(item, 'center')"
                        :style="
                          item.showLocat == 'center'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/right.png"
                        data-textAlign="right"
                        @click="line1textAlign(item, 'right')"
                        :style="
                          item.showLocat == 'right' ? 'background-color: rgba(3, 154, 252, 1);' : ''
                        "
                      />
                      <img
                        src="@/assets/xxfb/6.png"
                        data-textAlign="justify"
                        @click="line1textAlign(item, 'justify')"
                        :style="
                          item.showLocat == 'justify'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
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
                  :active-value="'2'"
                  :inactive-value="'1'"
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
                  filterable
                  allow-create
                  default-first-option
                >
                  <el-option
                    v-for="item in [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]"
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
                  form.mediaAreaList   accept="image/png"-->
                <el-upload
                  v-model:file-list="imageList"
                  list-type="picture-card"
                  :http-request="() => {}"
                  :auto-upload="false"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"
                  :on-change="beforeAvatarUpload"
                  accept=".jpg,.jpeg,.png,.gif,webp,.mp4"
                  :disabled="form.meetStatus == 1"
                >
                  <el-icon><Plus /></el-icon>
                  <template #file="{ file }">
                    <div>
                      <!-- 图片 -->
                      <img
                        v-if="file.obsFileType == '1'"
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <!-- 视频 -->
                      <!-- <video v-else  width="100px" height="100px" src="http://39.105.179.38:9797/noderad/cat.mp4" controls></video> -->
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <el-icon><zoom-in /></el-icon>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <el-icon><Download /></el-icon>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <el-icon><Delete /></el-icon>
                        </span>
                      </span>
                    </div>
                  </template>
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
    <!-- <video id="videoPlayer" width="684" height="385" controls></video> -->
    <!-- <div v-else class="noMeeting">暂无会议</div> -->
    <!--1.有会议发布弹框  -->
    <div class="pubFormDialog">
      <el-dialog v-model="pubFormVisible" title="发布确认">
        <!-- 有会议发布弹框 -->
        <div>
          <div class="startTime">
            <span>发布时间：</span>
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择发布时间"
              :default-time="defaultTime"
              :disabled="form.publishTimeNum != -3"
              :disabled-date="disabledDate"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div class="pubStartTime">
            <span>会前：</span>
            <el-radio-group v-model="form.publishTimeNum" class="ml-4" @change="radioOptionChange">
              <el-radio :label="-0.5" size="large">0.5h</el-radio>
              <el-radio :label="-1" size="large">1h</el-radio>
              <el-radio :label="-1.5" size="large">1.5h</el-radio>
              <el-radio :label="-2" size="large">2h</el-radio>
              <el-radio :label="-3" size="large">自定义</el-radio>
            </el-radio-group>
          </div>
          <div class="pubendTime">
            <span>结束时间：</span>
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择发布时间"
              :default-time="defaultTime"
              :disabled="form.publishTimeNum != -3"
              :disabled-date="disabledDate"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelPub()">取消</el-button>
            <el-button type="primary" @click="confirmPub()">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!--2.无会议发布弹框  -->
    <div class="pubFormDialog">
      <el-dialog v-model="nomeetingPubFormVisible" title="发布确认">
        <!-- 无会议发布弹框 -->
        <!-- :disabled-date="disabledDate"  时间选择禁用 :default-value="new Date(2010, 9, 1)"-->
        <div>
          <div class="startTime">
            <span>发布时间：</span>
            <el-date-picker
              v-model="noMeetingTime.startTime"
              type="datetime"
              placeholder="选择发布时间"
              :default-time="defaultTime"
              :disabled-date="disabledDate"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          <div class="pubendTime">
            <span>结束时间：</span>
            <el-date-picker
              v-model="noMeetingTime.endTime"
              type="datetime"
              placeholder="选择发布时间"
              :default-time="defaultTime"
              :disabled-date="disabledDate"
              value-format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="nomeetingCancelPub()">取消</el-button>
            <el-button type="primary" @click="noMeetingConfirmPub()" :disabled="isDisabled"
              >确认</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
    <!--2.发布成功弹框  -->
    <div class="pubSuccessDialog">
      <el-dialog v-model="pubSuccessVisible" title="">
        <div class="pubSuccessTips" v-if="pubSuccessVisible">
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
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const route = useRoute()
import { releaseRequest } from '@/utils/server.js'
// import localforage from "localForage"
// import { keys } from 'localforage'

const roomName = route.query.roomName
// 路由返回上一页时需要roomIdzdy---后端说物联网首页会议id是自己生成的
const roomIdzdy = route.query.roomID
// roomId会议预约返回的id
const roomId = ref('')

// loading加载图
const loading = ref(true)
// 是否展示图片列表
const isshowimg = ref(false)

// debugger
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
        //结束loading加载图
        // setTimeout(function(){
        loading.value = false
        // },3000)

        // 1.选择会议列表 res.data.result为所有会议
        meetingList.value = res.data.result || []
        //默认选中最近的一场会议
        if (meetingList.value.length > 0) {
          meetingOptionvalue.value = res.data.result[0].meetID

          roomId.value = res.data.result[0].roomID

          // 2.会议信息区域,默认为最近的一场
          // debugger
          form.value = res.data.result[0]

          console.log(form.value, form.value.mtAreaList[0].syncStatus)
          if (form.value.mediaAreaList.length > 0) {
            downloadReleaseMedia(form.value.mediaAreaList)
          }

          // for (var i = 0; i < form.value.mediaAreaList.length; i++) {
          //   downLoad(form.value.mediaAreaList[i])
          // }
        }
      }
    })
    .catch((error) => {
      // debugger
      console.log('按会议场次查询失败:', error)
    })
}
// ---6.下载图片/视频接口-------
// imageList为上传组件需要的图片列表字段
const imageList = ref([])
const downloadReleaseMedia = (mediaAreaList) => {
  releaseRequest
    .post('/IotPageEditCrtl/download', {
      mediaAreaList: mediaAreaList
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('下载图片/视频成功:', res.data.result)

        for (var i = 0; i < res.data.result.length; i++) {
          // obsFileType  为 1图片 时则修改字段为upload组件识别的name和url字段  2视频
          if (res.data.result[i].obsFileType == 1) {
            res.data.result[i].name = res.data.result[i].obsFileName
            res.data.result[i].url = 'data:image/jpg;base64,' + res.data.result[i].base64
          }
          // debugger
          imageList.value = res.data.result
          // 注意：form.value.mediaAreaList需要重新赋值，把name和url字段 及base64 传给子组件
          form.value.mediaAreaList = imageList.value
        }

        if (imageList.value.length == 0) {
          isshowimg.value = true
        } else {
          const promiseArr = []
          imageList.value.forEach((item) => {
            promiseArr.push(getImage(item.url))
          })
          Promise.all(promiseArr)
            .then(() => {
              isshowimg.value = true
            })
            .catch(() => {
              isshowimg.value = true
            })
        }
      }
    })
    .catch((error) => {
      // debugger
      console.log('下载图片/视频失败:', error)
    })
}
// 通过getImage实现图片加载完毕展示
const getImage = () => {
  return new Promise((resolve, reject) => {
    var image = new Image()

    image.onload = () => {
      resolve()
    }
    image.onerror = () => {
      reject()
    }
    image.src = src
    if (image.complete) {
      resolve()
    }
  })
}

// 2.----修改编辑页信息接口------
const updateEditList = () => {
  var updatamediaAreaList = []

  for (var i = 0; i < form.value.mediaAreaList.length; i++) {
    var item = {}
    item.roomID = form.value.mediaAreaList[i].roomID
    item.meetID = form.value.mediaAreaList[i].meetID
    item.obsFileID = form.value.mediaAreaList[i].obsFileID
    item.obsFileName = form.value.mediaAreaList[i].obsFileName
    item.obsFileType = form.value.mediaAreaList[i].obsFileType
    updatamediaAreaList.push(item)
  }

  releaseRequest
    .post('/IotPageEditCrtl/editReleasePageInfo', {
      roomID: roomId.value,
      meetID: meetingOptionvalue.value,
      roomName: roomName,
      imgShow: form.value.imgShow,
      dataSource: form.value.dataSource,
      playGap: form.value.playGap ? form.value.playGap : 5000,
      mtAreaList: form.value.mtAreaList,
      mediaAreaList: updatamediaAreaList,
      publishStatus: form.value.publishStatus
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('修改发布页信息成功:', res.data.result)
        form.value.meetID = res.data.result.meetID
        // 调用列表接口
        // getMeetingList()
        ElMessage.success('保存成功！')

        // meetingOptionvalue.value=
      }
    })
    .catch((error) => {
      // debugger
      console.log('修改发布页信息失败:', error)
      ElMessage.error('保存失败！')
    })
}
// 3.----查询会议预约接口获取同步信息------
const getSyncInfo = (item) => {
  releaseRequest
    .post('/IotPageEditCrtl/queryReleasePageInfoByMeet', {
      startTime: form.value.startTime ? form.value.startTime : '',
      roomID: roomId.value,
      meetID: meetingOptionvalue.value,
      textLocat: item.textLocat
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('获取同步信息成功:', res.data.result)

        item.textConent = res.data.result.textConent
      }
    })
    .catch((error) => {
      // debugger
      console.log('获取同步信息信息失败:', error)
    })
}

//4.-------定时发布修改接口-----
const updatePrePub = () => {
  releaseRequest
    .post('/IotPageEditCrtl/setPublishTime', {
      roomID: roomId.value,
      meetID: meetingOptionvalue.value,
      startTime: form.value.startTime,
      publishTimeNum: form.value.publishTimeNum
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('定时发布成功:', res.data.result)
        // 成功则展示发布成功弹框
        pubSuccessVisible.value = true

        //调用刷新列表接口
        getMeetingList()
      }
    })
    .catch((error) => {
      // debugger
      console.log('定时发布修改失败:', error)
      ElMessage.error('定时发布失败！')
    })
}

// 5.上传图片/视频接口
const uploadReleaseMedia = (rawFile) => {
  //数据流
  const formData = new FormData()
  const data = {
    roomID: roomId.value,
    meetID: meetingOptionvalue.value
  }
  formData.append('data', JSON.stringify(data))
  // 二进制文件上传
  formData.append('file', rawFile.raw)
  // debugger
  releaseRequest
    .post('/IotPageEditCrtl/uploadReleaseMedia', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log('上传图片/视频成功:', res.data)
      //结束loading加载图
      loading.value = false

      // debugger
      // if(res.data.result.obsFileType=='1'){
      //     imageList.value[imageList.value.length-1].base64='data:image/jpg;base64,' + res.data.result.base64

      //   }
      // debugger
      // form.value.mediaAreaList=imageList.value
      form.value.mediaAreaList.push(res.data.result)
      downloadReleaseMedia(form.value.mediaAreaList)
    })

    .catch((error) => {
      // console.log('上传图片/视频失败:', error)
    })
}
// 7.删除上传的图片接口
const delUploadReleaseMedia = (uploadFile) => {
  releaseRequest
    .post('/IotPageEditCrtl/deleteReleaseMedia', {
      roomID: uploadFile.roomID,
      meetID: uploadFile.meetID,
      obsFileID: uploadFile.obsFileID,
      obsFileType: uploadFile.obsFileType
    })
    .then((res) => {
      console.log('删除图片成功', res.data)
      // getMeetingList()
      // imageList.value=form.value.mediaAreaList
    })
    .catch((error) => {
      // debugger
      console.log('删除图片失败:', error)
    })
}

// 1.选择会议
const meetingList = ref([
  // {
  //   publishTime: '10:00~23:00',
  //   publishStatus: '1',
  //   roomID: '8186847552438272',
  //   roomName: 'A2-228',
  //   meetID: '670413063993503744',
  //   meetName: '11.13日测试会议',
  //   roomTemp: null,
  //   roomHum: null,
  //   meetStatus: '1',
  //   showStartTime: '2023-11-13T02:00:00.000+0000',
  //   showEndTime: '2023-11-13T14:00:00.000+0000',
  //   startTime: '2023-11-13 10:00:00',
  //   endTime: '2023-11-13 22:00:00',
  //   imgShow: '1',
  //   brightNess: 0,
  //   playGap: 5000,
  //   mtAreaList: [
  //     {
  //       roomID: '8186847552438272',
  //       meetID: '670413063993503744',
  //       textLocat: '标题',
  //       textConent: '11.13日测试会议',
  //       fontSize: 48,
  //       textColor: 'rgba(208, 178, 178, 0.8)',
  //       textVgt: '100%',
  //       showLocat: 'center',
  //       showOrder: 1,
  //       syncStatus: 1,
  //       isShow: '1',
  //       startTime: null,
  //       endTime: null
  //     },
  //     {
  //       roomID: '8186847552438272',
  //       meetID: '670413063993503744',
  //       textLocat: '时间',
  //       textConent: '10:00~23:00',
  //       fontSize: 34,
  //       textColor: 'rgba(219, 79, 79, 0.8)',
  //       textVgt: '100%',
  //       showLocat: 'right',
  //       showOrder: 2,
  //       syncStatus: 1,
  //       isShow: '1',
  //       startTime: null,
  //       endTime: null
  //     },
  //     {
  //       roomID: '8186847552438272',
  //       meetID: '670413063993503744',
  //       textLocat: '主办方',
  //       textConent: '信息系统信息通讯分公司',
  //       fontSize: 34,
  //       textColor: 'rgba(255, 255, 255, 0.8)',
  //       textVgt: '100%',
  //       showLocat: 'center',
  //       showOrder: 3,
  //       syncStatus: 1,
  //       isShow: '1',
  //       startTime: null,
  //       endTime: null
  //     }
  //   ],
  //   mediaAreaList: [
  //     {
  //       name: 'food.jpeg',
  //       url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  //       obsFileType: '1'
  //     },
  //     {
  //       name: 'cat.mp4',
  //       // url: '@/assets/xxfb/cat.mp4',
  //       // url: 'http://39.105.179.38:9797/noderad/cat.mp4',
  //       url:'file:///C:/Users/55462/Downloads/cat%20(7).mp4',
  //       obsFileType: '2',
  //       domId:"xy"
  //     }
  //   ]
  // }
])
const meetingOptionvalue = ref('')

const form = ref({ roomName: '' })
// 监听选择会议的变化
watch(
  () => meetingOptionvalue.value,
  () => {
    loading.value = true
    //结束loading加载图
    // setTimeout(function(){
    loading.value = false
    // },3000)
    var res = { roomName: '' }
    for (var i = 0; i < meetingList.value.length; i++) {
      if (meetingList.value[i].meetID == meetingOptionvalue.value) {
        res = meetingList.value[i]
      }
    }

    form.value = res

    imageList.value = form.value.mediaAreaList
    // debugger
    if (imageList.value.length > 0) {
      // 重新调用下载图片/视频接口
      downloadReleaseMedia(form.value.mediaAreaList)
    }
  }
)

// 2.2.1会议信息区域
// const form = ref({})
// debugger
// 是否同步 1同步 0不同步----------
const issyncLine = (v, item) => {
  // debugger
  if (item.syncStatus == 1) {
    getSyncInfo(item)
  }
}
// 是否展示行
const isshowline = (item, show) => {
  // debugger
  item.isShow = show
}
// 文本居中方式
const line1textAlign = (item, v) => {
  item.showLocat = v
}

// 是否开启轮播图
const issyncSwiperChange = () => {}
// 轮播间隔时间
const playGapValue = ref(5000)
const onTimeChange = (v) => {
  // debugger
  if (typeof v == 'number') {
    form.value.playGap = v
  } else {
    // 没有检索到返回-1
    if (v.indexOf('ms') == -1) {
      form.value.playGap = Number(v)
    } else {
      form.value.playGap = Number(v.replace('ms', ''))
    }
  }
}

watch(
  () => imageList.value,
  () => {
    debugger
  }
)

// 2.2图片/视频上传
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
// 2.2.1删除图片
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
  // debugger
  //   uploadFiles.forEach((item)=>{
  //     item
  //     uploadFile

  //   })
  // debugger
  // 7.调用删除图片接口
  delUploadReleaseMedia(uploadFile)
}
// 2.2.2预览图片
const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}

// 2.2.3图片上传
const beforeAvatarUpload = (rawFile) => {
  console.log('0000000', rawFile)

  // debugger
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('上传文件不能超过 2MB!')
    return false
  }

  // for (var i = 0; i < form.value.mediaAreaList.length; i++) {
  //   if (rawFile.name == form.value.mediaAreaList[i].name) {
  //     ElMessage.error('上传文件名重复！')
  //     return
  //   }
  // }
  // 开启loading加载图
  loading.value = true
  // debugger
  // 判断上传的类型
  // 如是图片：调用上传图片接口
  uploadReleaseMedia(rawFile)

  // debugger
  return true
}
const handleDownload = (file) => {
  console.log(file)
  downLoad(file)
}

// 2.3视频/图片下载到本底  仅支持视频下载和图片下载
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

      // 在浏览器端，通过使用XMLHttpRequest对象和Blob对象，可以实现下载文件并获取文件的绝对路径：
      // window.URL.revokeObjectURL(url);

      // resolve(a.href); // 返回文件路径
      // window.URL.revokeObjectURL(downLoadUrl) // 释放url
      a.remove()
      // debugger
    }
  }
  // debugger
  xhr.send()
}

// 3.保存----------------
const onSave = () => {
  // debugger
  console.log(form.value)
  if (form.value.meetStatus == 1) {
    ElMessage({
      message: '使用中的会议禁止修改！',
      type: 'warning'
    })
  } else {
    // 调用保存接口
    updateEditList()
  }
}
// 4.有会议发布弹框------------
const pubFormVisible = ref(false)
const onPub = () => {
  // debugger
  // 判断如是使用中的会议，禁止发布
  if (form.value.meetStatus == 1) {
    ElMessage({
      message: '使用中的会议禁止发布！',
      type: 'warning'
    })
  } else {
    // 判断有无会议，确定弹出有会议弹框 或 无会议弹框???？待修改
    if (form.value.dataSource != 'CUS') {
      pubFormVisible.value = true
    } else {
      noMeetingTime.value.startTime = form.value.startTime ? form.value.startTime : ''
      noMeetingTime.value.endTime = form.value.endTime ? form.value.endTime : ''
      nomeetingPubFormVisible.value = true
    }
  }
}

// -------4.1以下为有会议
//发布开始时间 及 结束时间记录
const startAndEndTime = ref({
  startTime: '',
  endTime: ''
})
const defaultTime = new Date(2000, 1, 1, 8, 0)

// 会前----提前发布时间选择
const radioOptionChange = (v) => {
  // debugger
  form.value.publishTimeNum = v

  if (v != 3) {
    form.value.startTime
  }
}

// 弹框中取消按钮
const cancelPub = () => {
  pubFormVisible.value = false
  // form.value.publishTimeNum = -1
}
//弹框中确认按钮
const confirmPub = () => {
  pubFormVisible.value = false
  // 调用定时发布修改接口
  updatePrePub()

  pubSuccessVisible.value = false
}
// 发布成功提示
const pubSuccessVisible = ref(false)

// 5.无会议发布弹框------------
const nomeetingPubFormVisible = ref(false)

// 5.1以下为无会议---------
const noMeetingTime = ref({
  startTime: '',
  endTime: ''
})

// 弹框中取消按钮
const nomeetingCancelPub = () => {
  nomeetingPubFormVisible.value = false
  //清空开始/结束时间
  noMeetingTime.value.startTime = ''
  noMeetingTime.value.endTime = ''
}
//弹框中确认按钮
const isDisabled = ref(false)
const noMeetingConfirmPub = () => {
  if (noMeetingTime.value.startTime == '' || noMeetingTime.value.endTime == '') {
    ElMessage.error('开始时间和结束时间不能为空！')
    isDisabled.value = false
  } else if (
    noMeetingTime.value.startTime != '' &&
    noMeetingTime.value.endTime != '' &&
    new Date(noMeetingTime.value.startTime).getTime() >=
      new Date(noMeetingTime.value.endTime).getTime()
  ) {
    ElMessage.error('结束时间需大于开始时间！')
    isDisabled.value = false
  } else {
    nomeetingPubFormVisible.value = false
    // 调用定时发布修改接口？？？？待修改
    // updatePrePub()
    releaseRequest
      .post('/IotPageEditCrtl/setPublishTime', {
        roomID: roomId.value,
        meetID: meetingOptionvalue.value,
        startTime: noMeetingTime.value.startTime,
        endTime: noMeetingTime.value.endTime,
        publishTimeNum: 0,
        dataSource: 'CUS'
      })
      .then((res) => {
        // debugger
        if (res.data.repCode == 200) {
          console.log('自定义定时发布成功:', res.data.result)
          // 成功则展示发布成功弹框
          pubSuccessVisible.value = true

          //调用刷新列表接口
          getMeetingList()
        }
      })
      .catch((error) => {
        // debugger
        console.log('自定义定时发布失败:', error)
        ElMessage.error('自定义定时发布失败！')
      })
    pubSuccessVisible.value = false
  }
}
// 今天及今天之后的日期禁用
const disabledDate = (time) => {
  // debugger
  // 今天之前日期禁用
  // time.getTime() < Date.now() - 8.64e7;
  // 今日之后的日期禁用（今天可选）
  // console.log(time.getTime() > Date.now());
  return time.getTime() > Date.now() || time.getTime() < Date.now() - 8.64e7
}

onMounted(() => {
  // 1.调用根据会议名称 获取会议场次接口
  getMeetingList()

  // readVideo1()
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
                width: 162px;
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
        :deep(.el-dialog) {
          img {
            width: 100%;
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
    // --el-dialog-width: 40%;
    // min-width: 368px;
    width: 376px;
    .el-dialog__header {
    }
    .el-dialog__body {
      border-top: 1px solid rgba(239, 239, 239, 1);
      padding: 24px;
      // 发布时间
      .startTime {
        margin-bottom: 8px;
        & > span {
          width: 80px;
          height: 24px;
          display: inline-block;
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        .el-input {
          width: 248px !important;
        }
      }
      // 会前几小时发布选择
      .pubStartTime {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 24px;

        & > span {
          width: 42px;
          height: 20px;
          margin-right: 8px;
          display: inline-block;
          color: rgba(90, 90, 90, 1);
          font-size: 14px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        .el-input-number {
          width: 108px;
        }
      }
      // 结束时间
      .pubendTime {
        & > span {
          width: 80px;
          height: 24px;
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        .el-input {
          width: 248px !important;
        }
      }

      .el-radio-group {
        flex-wrap: nowrap;
        .el-radio {
          margin-right: 8px;
        }
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
