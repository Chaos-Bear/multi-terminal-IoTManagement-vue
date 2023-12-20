<template>
  <div class="edit" >
    <!-- 1. 顶部 -->
    <div class="top">
      <div class="pubTime">
        <img src="@/assets/xxfb/1.png" />
        <!-- <span>定时发布 ：{{ form.publishTime ? form.publishTime.split('~')[0] : '' }}</span> -->
        <!-- 禁用时间 picker-options -->
        <span
          >定时发布 ：
          <el-date-picker
            v-model="form.editePublishTime"
            type="datetime"
            placeholder="发布时间"
            :default-time="defaultTime"
            format="YYYY/MM/DD HH:mm"
            :disabled-date="disabledDate"
            :picker-options="pickerOptions"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
          ~
          <el-date-picker
            v-model="form.editePublishEndTime"
            type="datetime"
            placeholder="结束时间"
            :default-time="defaultTime"
            format="YYYY/MM/DD HH:mm"
            :disabled-date="disabledDate"
            :picker-options="pickerOptions"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </span>
      </div>
      <!-- $data[testCondition ? 'name' : 'place'] -->
      <!--发布状态 publishStatus  待发布1 3 4    已发布 2  撤销 5-->
      <div class="selectInfo">
        <el-select v-model="form.meetID" placeholder="请选择会议" style="width: auto" popper-class="zdy_selectedit">
          <el-option
            v-for="item in meetingList"
            :key="item.meetID"
            :label="item.meetName"
            :value="item.meetID"
          > 
            <!-- 方法一 -->
            <template v-if="item.meetID">
              <template v-if="item.publishStatus == '2'">
                <span style="float: left; margin-right: 10px">已发布</span>
              </template>
              <template v-if="item.publishStatus == '5'">
                <span style="float: left; margin-right: 10px">已撤销</span>
              </template>
              <template
                v-if="
                  item.publishStatus == '1' ||
                  item.publishStatus == '3' ||
                  item.publishStatus == '4'
                "
              >
                <span style="float: left; margin-right: 10px">待发布</span>
              </template>
            </template>
            <template v-else>
              <span style="float: center;color:lightgray">点击此处创建自定义会议</span>
            </template>
            <!-- 方法二 -->
            <!-- <span style="float: left;margin-right:10px;">
              <template v-for="item1 in statusList" :key="item1.status">
                <template v-if="item1.status==item.publishStatus">
                  {{item.meetID==""? '':item1.title }}
                </template>
              </template>
            </span> -->
            <span style=" ">{{ item.meetName }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="btn">
        <div @click="onReset()">
          <img src="@/assets/xxfb/edit/reset.png" />
          <div>撤销</div>
        </div>
        <div @click="onPub()">
          <img src="@/assets/xxfb/3.png" />
          <div>发布</div>
        </div>
        <!-- <div @click="router.push('/meetingUserList?roomName=' + roomName + '&roomID=' + roomIdzdy)">
          <img src="@/assets/xxfb/4.png" />
          <div>返回</div>
        </div> -->
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
      <el-scrollbar height="100%" width="100%" class="editScrollBar" >
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
                    :disabled="item.isShow == '0' || form.dataSource == 'CUS'"
                  />
                  <span>同步会议{{ item.textLocat }}</span>
                </div>
                <!--文本 信息修改  -->
                <div>
                  <el-form>
                    <el-form-item label="" prop="">
                      <el-input
                        style="width: 460px"
                        v-model="item.textConent"
                        :disabled="item.syncStatus == 1"
                        maxlength="128"
                      />
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
                      <span class="demonColor">{{ item.textColor }}</span>
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
                      <!-- <img
                        src="@/assets/xxfb/6.png"
                        data-textAlign="justify"
                        @click="line1textAlign(item, 'justify')"
                        :style="
                          item.showLocat == 'justify'
                            ? 'background-color: rgba(3, 154, 252, 1);'
                            : ''
                        "
                      /> -->
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <!-- 2.2.2媒体信息 -->
          <div class="mediaArea" v-loading="loading" v-if="form.meetID">
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
                  :disabled="form.meetID && form.meetID == ''"
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
              <div class="mediaInfo2" >
                <ul>
                  <li v-for="(item, i) in form.mediaAreaList" :key="i" >
                    <!-- 图片 -->
                    <el-image v-if="item.obsFileType == '1'&&item.url" :src="item.url" lazy />
                    <div class="btn">
                      <!-- <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <el-icon><zoom-in /></el-icon>
                        </span> -->
                      <!-- <span
                            v-if="!disabled"
                            class="el-upload-list__item-delete"
                            @click="handleDownload(file)"
                          >
                          <el-icon><Download /></el-icon>
                      </span> -->
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(item, i)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </div>
                  </li>
                  <el-upload
                    class="avatar-uploader"
                    :http-request="() => {}"
                    :show-file-list="false"
                    :auto-upload="false"
                    :on-change="beforeAvatarUpload"
                    accept=".jpg,.jpeg,.png,.gif,webp,.mp4"
                    :disabled="form.meetID && form.meetID == ''"
                  >
                    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                  </el-upload>
                </ul>
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
    <!--1.发布弹框  -->
    <div class="pubFormDialog">
      <el-dialog v-model="pubFormVisible" title="发布确认">
        <div>
          <div class="startTime">
            <span>发布时间：</span>
            <span class="time">{{
              form.editePublishTime ? form.editePublishTime.slice(0, -3) : ''
            }}</span>
          </div>
          <div class="pubendTime">
            <span>结束时间：</span>
            <span class="time">{{ form.editePublishEndTime ? form.editePublishEndTime.slice(0, -3) : '' }}</span>
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
    <!--2.有冲突发布弹框  -->
    <div class="pubFormDialog">
      <el-dialog v-model="pubConflictVisible" title="冲突提示">
        <template #header>
          <div class="conflitTips1">
            <span>冲突提示</span>
            <img src="@/assets/xxfb/edit/conflict.png" />
          </div>
        </template>
        <div class="conflict">
          <div>
            <div>当前发布任务与下列已存在的发布任务冲突：</div>
          </div>
          <el-scrollbar max-height="209px">
            <span>待处理冲突 {{ needChangeList.length }}个：</span>
            <ul>
              <li v-for="(item, i) in needChangeList" :key="i">
                <div>{{ i + 1 + '. ' }} {{ item.meetName ? item.meetName : '无标题' }}</div>
                <!-- <div>发布时间：2023年12月7日 9:00 ~ 12:00</div> -->
                <div>
                  发布时间：{{
                    item.startTime.slice(0, -3) + '~' + item.endTime.split(' ')[1].slice(0, -3)
                  }}
                </div>
              </li>
            </ul>
            <br />
            <span>无需处理冲突 {{ noChangeList.length }}个：</span>
            <ul>
              <li v-for="(item, i) in noChangeList" :key="i">
                <div>{{ i + 1 + '. ' }} {{ item.meetName ? item.meetName : '无标题' }}</div>
                <!-- <div>发布时间：2023年12月7日 9:00 ~ 12:00</div> -->
                <div>
                  发布时间：{{
                    item.startTime.slice(0, -3) + '~' + item.endTime.split(' ')[1].slice(0, -3)
                  }}
                </div>
              </li>
            </ul>
          </el-scrollbar>
          <!-- <div class="conflictTips2">注：确认后与当前发布任务冲突的所有发布任务将取消发布。</div> -->
          <div class="conflictTips2">注：请修改发布时间,无待处理冲突后,再次发布！</div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelConflictPub()">取消</el-button>
            <el-button type="primary" @click="confirmConflictPub()">确认</el-button>
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
        <!-- <div class="pubSuccessTips" v-else>
          <img src="@/assets/xxfb/9.png" />
          <div>发布失败</div>
          <span>{{ roomName }}门口信息发布屏配置发布失败！请重新尝试！</span>
        </div> -->
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="pubSuccessVisible = false">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!--2.发布失败弹框  -->
    <div class="pubSuccessDialog">
      <el-dialog v-model="pubErrorVisible" title="">
        <div class="pubSuccessTips">
          <img src="@/assets/xxfb/9.png" />
          <div>发布失败</div>
          <span>{{ roomName }}门口信息发布屏配置发布失败！请重新尝试！</span>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="pubErrorVisible = false">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import PreEdit from '@/components/xxfb/PreEdit.vue'
import { ref, onMounted, watch} from 'vue'
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


// 是否展示图片列表
const isshowimg = ref(false)

// 1.----根据会议名称 获取会议场次接口------
const getMeetingList = () => {
  loading.value=true
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

        // 1.选择会议列表 res.data.result为所有会议
        meetingList.value = res.data.result || []
        //默认选中最近的一场会议
        if (meetingList.value.length > 0) {
          if (form.value.meetID) {
            for (var i = 0; i < res.data.result.length; i++) {
              if (form.value.meetID == res.data.result[i].meetID) {
                form.value = Object.assign({}, form.value, res.data.result[i])
                break
              }
            }
          } else {
            form.value.meetID = res.data.result[0].meetID

            roomId.value = res.data.result[0].roomID
            // 2.会议信息区域,默认为最近的一场
            form.value = Object.assign({}, form.value, res.data.result[0])
            // for (var i = 0; i < form.value.mediaAreaList.length; i++) {
            //   downLoad(form.value.mediaAreaList[i])
            // }
          }
          if (form.value.mediaAreaList.length > 0) {
            downloadReleaseMedia(form.value.mediaAreaList)
          }
        }
      } else {
        ElMessage({
          message: res.data.repMsg,
          type: 'error'
        })
      }
    })
    .catch((error) => {
      // debugger
      console.log('按会议场次查询失败:', error)
    })
    .finally(()=>{
        loading.value=false
    })
}
// ---5.下载图片/视频接口-------
// loading加载图
const loading = ref(true)
const downloadReleaseMedia = (mediaAreaList) => {
  loading.value=true
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
        }
        form.value.mediaAreaList = res.data.result
        if (form.value.mediaAreaList.length == 0) {
          isshowimg.value = true
        } else {
          const promiseArr = []
          form.value.mediaAreaList.forEach((item) => {
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
    .finally(()=>{
      loading.value=false
    })
}
// 通过getImage实现图片加载完毕展示
const getImage = (src) => {
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

// 2.----查询会议预约接口获取同步信息------
const getSyncInfo = (item) => {
  releaseRequest
    .post('/IotPageEditCrtl/queryReleasePageInfoByMeet', {
      startTime: form.value.startTime ? form.value.startTime : '',
      roomID: roomId.value,
      meetID: form.value.meetID,
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

//3.-------定时发布修改接口-----
const updatePrePub = () => {
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
    .post('/IotPageEditCrtl/editPublishReleasePageInfo', {
      roomID: roomId.value,
      meetID: form.value.meetID,
      roomName: roomName,
      imgShow: form.value.imgShow,
      dataSource: form.value.dataSource,
      playGap: form.value.playGap ? form.value.playGap : 5000,
      mtAreaList: form.value.mtAreaList,
      mediaAreaList: updatamediaAreaList,
      publishStatus: form.value.publishStatus,
      startTime: form.value.startTime,
      endTime: form.value.endTime,
      editePublishTime: form.value.editePublishTime,
      editePublishEndTime: form.value.editePublishEndTime,
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('定时发布成功:', res.data.result)
        form.value.meetID = res.data.result.meetID

        form.value.meetName = res.data.result.meetName

        // meetingList.value.unshift(res.data.result)
        // 成功则展示发布成功弹框
        pubSuccessVisible.value = true
        //  debugger
        //调用刷新列表接口
        getMeetingList()
      } else {
        ElMessage.error(res.data.repMsg)
      }
    })
    .catch((error) => {
      // debugger
      console.log('定时发布修改失败:', error)
      pubErrorVisible.value.vlaue=true
      ElMessage.error('定时发布失败！')
    })
}

// 4.上传图片/视频接口

const uploadReleaseMedia = (rawFile) => {
  
  //数据流
  const formData = new FormData()
  const data = {
    roomID: roomId.value,
    meetID: form.value.meetID
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
      
      form.value.mediaAreaList.push(res.data.result)
      downloadReleaseMedia(form.value.mediaAreaList)
    })

    .catch((error) => {
      console.log('上传图片/视频失败:', error)
    })
}
// 6.删除上传的图片接口
const delUploadReleaseMedia = (uploadFile, i) => {
  releaseRequest
    .post('/IotPageEditCrtl/deleteReleaseMedia', {
      roomID: uploadFile.roomID,
      meetID: uploadFile.meetID,
      obsFileID: uploadFile.obsFileID,
      obsFileType: uploadFile.obsFileType
    })
    .then((res) => {
      console.log('删除图片成功', res.data)

      form.value.mediaAreaList.splice(i, 1)
    })
    .catch((error) => {
      // debugger
      console.log('删除图片失败:', error)
    })
}

// 7.----查询会议冲突------
// 需要修改的冲突列表
const needChangeList = ref([])
// 无需修改的冲突列表
const noChangeList = ref([])
const pubConflictVisible = ref(false)
const getConflictInfo = () => {
  // debugger
  releaseRequest
    .post('/IotPageEditCrtl/checkReleasePageTime', {
      startTime: form.value.editePublishTime,
      endTime: form.value.editePublishEndTime,
      roomID: roomId.value,
      meetID: form.value.meetID,
      dataSource: form.value.dataSource
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('查询会议冲突成功:', res.data.result)
        // debugger
        needChangeList.value = res.data.result.needChangeList
        noChangeList.value = res.data.result.noChangeList

        if (needChangeList.value.length <= 0 && noChangeList.value.length <= 0) {
          // 调用定时发布修改接口
          updatePrePub()
        } else {
          // 展示冲突弹框
          pubConflictVisible.value = true
        }
      } else {
        ElMessage({
          message: res.data.repMsg,
          type: 'error'
        })
      }
    })
    .catch((error) => {
      // debugger
      console.log('查询会议冲突失败:', error)
      // ElMessage({
      //     message: error,
      //     type: 'error'
      // })
    })
}

//8.-----撤销接口-----
const resetPubInfo = () => {
  // debugger
  releaseRequest
    .post('/IotPageEditCrtl/revokePublishRelease', {
      startTime: form.value.editePublishTime,
      endTime: form.value.endTime,
      roomID: roomId.value,
      meetID: form.value.meetID,
      dataSource: form.value.dataSource
    })
    .then((res) => {
      // debugger
      if (res.data.repCode == 200) {
        console.log('撤销成功:', res.data.repMsg)
        ElMessage({
          message: '撤销成功',
          type: 'success'
        })
        for (var i = 0; i <= meetingList.value.length; i++) {
          // debugger
          if (meetingList.value[i].meetID == form.value.meetID) {
            // 撤销后，将该会议发布状态更新为已撤销'5'
            meetingList.value[i].publishStatus = '5'
          }
        }
      } else {
        ElMessage({
          message: res.data.repMsg,
          type: 'error'
        })
      }
    })
    .catch((error) => {
      // debugger
      console.log('撤销失败:', error)
      // ElMessage({
      //     message: error,
      //     type: 'error'
      // })
    })
}
// 撤销按钮
const onReset = () => {
  ElMessageBox.confirm('确定撤销该场次会议吗？', '撤销', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      //调用撤销接口
      resetPubInfo()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '撤销取消'
      })
    })
}

// 日期禁用
const defaultTime = new Date()
// 日期禁用
const disabledDate = (time) => {
  // debugger
  // 今天之前日期禁用
  // time.getTime() < Date.now() - 8.64e7;
  // 今日之后的日期禁用（今天可选）
  // console.log(time.getTime() > Date.now());
  return time.getTime() < Date.now() - 8.64e7
}
// 时间禁用
const pickerOptions = ref({
  disabledHours: () => {
    // 在这里编写禁用小时的逻辑
    // 返回一个数组，包含要禁用的小时
    // 例如，禁用 0 到 8 点的时间：
    return Array.from({ length: 16 }, (_, index) => index)
  },
  disabledMinutes: () => {
    // 在这里编写禁用分钟的逻辑
    // 返回一个数组，包含要禁用的分钟
    // 例如，禁用 0 到 30 分钟的时间：
    return Array.from({ length: 31 }, (_, index) => index)
  }
})

// 1.选择会议 会议状态：meetStatus 1使用中  2空闲中;  imgShow 1导览图  2轮播图
const meetingList = ref([
  
])
// 发布状态: publishStatus  待发布1 3 4    已发布 2  撤销 5
// const statusList = ref([
//   { status: 2, title: '已发布' },
//   { status: 5, title: '已撤销' },
//   { status: 1, title: '待发布' },
//   { status: 3, title: '待发布' },
//   { status: 4, title: '待发布' }
// ])

const form = ref({ roomName: '', meetID: '' })
// 监听选择会议的变化
watch(
  () => form.value.meetID,
  () => {
    var res = { roomName: '' }
    for (var i = 0; i < meetingList.value.length; i++) {
      if (meetingList.value[i].meetID == form.value.meetID) {
        res = meetingList.value[i]
      }
    }

    form.value = Object.assign({}, form.value, res)

    if (form.value.mediaAreaList.length > 0) {
      // 重新调用下载图片/视频接口
      downloadReleaseMedia(form.value.mediaAreaList)
    }
  }
)

// 2.2.1会议信息区域
// 是否同步 1同步 0不同步----------
const issyncLine = (v, item) => {
  if (item.syncStatus == 1) {
    getSyncInfo(item)
  }
}
// 是否展示行
const isshowline = (item, show) => {
  item.isShow = show
}
// 文本居中方式
const line1textAlign = (item, v) => {
  item.showLocat = v
}

// 是否开启轮播图
const issyncSwiperChange = () => {}
// 轮播间隔时间
const onTimeChange = (v) => {
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

// 2.2图片/视频上传
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
// 2.2.1删除图片
const handleRemove = (item, i) => {
  // 7.调用删除图片接口
  delUploadReleaseMedia(item, i)
}
// 2.2.2预览图片
// const handlePictureCardPreview = (uploadFile) => {
//   dialogImageUrl.value = uploadFile.url
//   dialogVisible.value = true
// }

// 2.2.3图片上传
const beforeAvatarUpload = (rawFile) => {
  
  console.log('0000000', rawFile)

  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('Avatar picture must be JPG format!')
  //   return false
  // } else
  if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('上传文件不能超过 20MB!')
    return false
  }

  // for (var i = 0; i < form.value.mediaAreaList.length; i++) {
  //   if (rawFile.name == form.value.mediaAreaList[i].name) {
  //     ElMessage.error('上传文件名重复！')
  //     return
  //   }
  // }

  // debugger
  // 判断上传的类型
  // 如是图片：调用上传图片接口
  uploadReleaseMedia(rawFile)

  return true
}
// const handleDownload = (file) => {
//   console.log(file)
//   downLoad(file)
// }

// 2.3视频/图片下载到本底  仅支持视频下载和图片下载
// const downLoad = (item) => {
//   // debugger
//   let url = item.url
//   // let fileName = url.slice(url.lastIndexOf("/") + 1); //下载的文件名换成自己的
//   let fileName = item.name //dayjs
//   var xhr = new XMLHttpRequest()
//   xhr.open('GET', url, true)
//   // xhr.open("POST", url, true);
//   xhr.responseType = 'blob' // 返回类型blob
//   xhr.onload = () => {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       let blob = xhr.response
//       let downLoadUrl = window.URL.createObjectURL(
//         new Blob([blob], {
//           type: item.type === 'video' ? 'video/mp4' : 'image/jpeg'
//         })
//       )
//       let a = document.createElement('a')
//       a.download = fileName
//       a.href = downLoadUrl
//       a.style.display = 'none'
//       document.body.appendChild(a)
//       a.click()

//       // 在浏览器端，通过使用XMLHttpRequest对象和Blob对象，可以实现下载文件并获取文件的绝对路径：
//       // window.URL.revokeObjectURL(url);

//       // resolve(a.href); // 返回文件路径
//       // window.URL.revokeObjectURL(downLoadUrl) // 释放url
//       a.remove()
//       // debugger
//     }
//   }
//   // debugger
//   xhr.send()
// }

// 4.发布弹框------------
const pubFormVisible = ref(false)
const onPub = () => {
  pubFormVisible.value = true
}

// 发布弹框中取消按钮
const cancelPub = () => {
  pubFormVisible.value = false
}
// 提前时间计算
// const getOptiontime=()=>{
  
// }

// 获取当前时间
// const currentTime = new Date();
// // 将当前时间加上5分钟
// const newTime = new Date(currentTime.getTime() + 5 * 60000);
// // 输出新的时间
// console.log(newTime);
// console.log(new Date().getTime()+5*60000 > new Date(form.value.editePublishTime).getTime())

//发布弹框中确认按钮
const confirmPub = () => {
  // debugger
  // 如果 发布弹框中 选的是自定义
  if (
    form.value.editePublishTime === null ||
    form.value.editePublishTime == '' ||
    form.value.editePublishEndTime === null ||
    form.value.editePublishEndTime == ''
  ) {
    ElMessage.error('开始时间和结束时间不能为空！')
  // }else if (form.value.editePublishTime != '' && ( new Date().getTime()> new Date(form.value.editePublishTime).getTime())) {
  //   ElMessage.error('开始时间不能为过去时间！')
  } else if (
    form.value.editePublishTime != '' &&
    form.value.editePublishEndTime != '' &&
    new Date(form.value.editePublishTime).getTime() >= new Date(form.value.editePublishEndTime).getTime()
  ) {
    ElMessage.error('结束时间需大于开始时间！')
  } else {
    // 调用冲突接口
    getConflictInfo()
  }

  pubFormVisible.value = false

  pubSuccessVisible.value = false
}
// 发布成功提示
const pubSuccessVisible = ref(false)
// 发布失败提示
const pubErrorVisible = ref(false)
// 5.冲突弹框
// 冲突弹框中的确认按钮
const confirmConflictPub = () => {
  // debugger
  if (needChangeList.value.length <= 0) {
    // 隐藏冲突弹框
    pubConflictVisible.value = false
    // 调用定时发布修改接口
    updatePrePub()
  } else {
    pubErrorVisible.value = true
  }
}
// 冲突弹框中的取消按钮
const cancelConflictPub = () => {
  pubConflictVisible.value = false
}

onMounted(() => {
  // 1.调用根据会议名称 获取会议场次接口
  getMeetingList()

  // readVideo1()
})
</script>
<style lang='less'>
  .zdy_selectedit{
    width: 276px;
    ul li{
      padding-left: 10px;
      padding-right: 10px;
      &>span:nth-child(2){
        // width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
<style lang="less" scoped>
.edit {
  margin-left: 24px;
  margin-right: 24px;
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
      :deep(.el-date-editor.el-input) {
        width: 196px;
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
      // width: 176px;
      // width: 134px;
      width: 104px;
      height: 60px;
      display: flex;
      justify-content: space-between;
      // justify-content: flex-end;
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
    height: calc(100% - 60px);
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
      width: calc(100% - 443px);
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
        margin-bottom: 34px;
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
                width: 172px;
                padding-left: 4px;
                padding-right: 4px;
                height: 32px;
                background-color: rgba(255, 255, 255, 1);
                color: rgba(64, 64, 64, 1);
                font-size: 14px;
                text-align: left;
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
      .mediaArea {
        padding-bottom: 30px;
        .top1{
          height: 52px;
          line-height: 52px;
        }
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
          .mediaInfo2 {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            // 图片列表
            ul {
              display: flex;
              flex-wrap: wrap;
              margin-right: 10px;
              padding: 0;
              li {
                width: 167px;
                height: 110px;
                list-style: none;
                position: relative;
                margin-right: 10px;
                display: flex;
                align-items: center;
                border: 1px solid rgba(217, 217, 217, 1);
                :deep(.el-image) {
                  img {
                    width: 167px;
                    height: 110px;
                    object-fit: contain;
                  }
                  .el-image__inner.is-loading {
                    opacity: 1;
                  }
                  .el-image__placeholder {
                    background-color: transparent;
                  }
                }
                &:hover {
                  .el-upload-list__item-delete {
                    display: block;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-9%, -32%);
                    .el-icon {
                      font-size: 20px;
                    }
                  }
                }
              }
            }
            // 上传图标
            :deep(.avatar-uploader) {
              .el-upload {
                width: 167px;
                height: 110px;
                cursor: pointer;
                position: relative;

                background-color: rgba(247, 247, 247, 1);
                border: 1px solid rgba(217, 217, 217, 1);

                &:hover {
                  border-color: var(--el-color-primary);
                }
              }
            }

            .el-icon.avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 167px;
              height: 110px;
              text-align: center;
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
      .conflitTips1 {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          height: 26px;
          color: rgba(0, 0, 0, 1);
          font-size: 18px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        img {
          width: 18px;
          height: 18px;
        }
      }
    }
    .el-dialog__body {
      border-top: 1px solid rgba(239, 239, 239, 1);
      padding: 24px;
      padding-bottom: 20px;
      // 1.无冲突
      // 发布时间
      .startTime,
      .pubendTime {
        margin-bottom: 8px;
        & > span:nth-child(1) {
          width: 80px;
          height: 24px;
          display: inline-block;
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        & > span:nth-child(2) {
          width: 115px;
          height: 16px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          text-align: left;
          font-family: Helvetica-regular;
        }
      }

      // 冲突提示
      .conflict {
        & > div:nth-child(1) {
          margin-bottom: 14px;
          color: rgba(51, 51, 51, 1);
          font-size: 16px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
        }
        ul {
          padding: 0;
          // height: 89px;
          li {
            list-style: none;
            div {
              color: rgba(90, 90, 90, 1);
              font-size: 14px;
              text-align: left;
              font-family: SourceHanSansSC-regular;
            }
            div:nth-child(2) {
              margin-top: 4px;
              margin-bottom: 4px;
            }
          }
        }
        .conflictTips2 {
          margin-top: 10px;
          color: rgba(245, 34, 45, 1);
          // font-size: 12px;
          font-size: 14px;
          text-align: left;
          font-family: SourceHanSansSC-regular;
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
