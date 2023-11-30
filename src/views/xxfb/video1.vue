<template>
  <div>
    <el-upload
      :limit="limit"
      :action="uploadImgUrl"
      :file-list="UrlList"
      list-type="picture-card"
      :on-change="handleImgChange"
      :on-success="handleUploadSuccess"
      :on-exceed="handleExceed"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img v-if="file.type == 1" class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <video v-if="file.type == 2" :src="file.url" style="width: 100%">
          您的浏览器不支持 video 标签。
        </video>
        <audio controls v-if="file.type == 3" :src="file.url" style="width: 100%">
          您的浏览器不支持该音频格式。
        </audio>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleImgRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <img
        v-if="dialogType == 1"
        class="el-upload-list__item-thumbnail"
        width="100%"
        :src="dialogImageUrl"
        alt=""
      />
      <video v-if="dialogType == 2" style="width: 100%" :src="dialogImageUrl" controls autoplay>
        您的浏览器不支持 video 标签。
      </video>
      <audio controls v-if="dialogType == 3">
        <source :src="dialogImageUrl" />
        您的浏览器不支持该音频格式。
      </audio>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from "vue"
 const limit=ref(3)    //限制上传数量
 const uploadImgUrl=process.env.VUE_APP_WEB_URL + ""      // 上传的图片服务器地址
 const  dialogImageUrl=ref(null)
 const  dialogVisible= ref(false)
 const  UrlList=ref([])
 const  disabled=ref(false)
 const dialogType=ref(null)
//上传
    handlePictureCardPreview(file) {
     dialogImageUrl.value = file.url;
      dialogType.value = file.type;
      dialogVisible.value = true;
    }
    // 图片改变
    handleImgChange(file, fileList) {
        bus.$emit("changeFileAfterList", fileList);
        UrlList.value = fileList;
    }
    // 图片移除
    handleImgRemove(file, fileList) {
      fileList = UrlList.value;
        let index = fileList.indexOf(file);
        fileList.splice(index, 1);
        bus.$emit("changeFileAfterList", fileList);
    }
    //图片上传成功
    handleUploadSuccess(response, file, fileList) {
      file.type = this.matchType(file.response.data.url);
    }
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    }

    // 根据文件名后缀区分 文件类型
    /*
     * @param: fileName - 文件名称
     * @param: 数据返回 1) 无后缀匹配 - false
     * @param: 数据返回 2) 匹配图片 - image
     * @param: 数据返回 8) 匹配 视频 - video
     * @param: 数据返回 9) 匹配 音频 - radio
     * @param: 数据返回 10) 其他匹配项 - other
     */
    matchType(fileName) {
      // 后缀获取
      var suffix = "";
      // 获取类型结果
      var result = "";
      try {
        var flieArr = fileName.split(".");
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = "";
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      }
      // 图片格式
      var imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "1";
        return result;
      }
      // 匹配 视频
      var videolist = ["mp4", "m2v", "mkv"];
      result = videolist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "2";
        return result;
      }
      // 匹配 音频
      var radiolist = ["mp3", "wav", "wmv", "flac"];
      result = radiolist.some(function (item) {
        return item == suffix;
      });
      if (result) {
        result = "3";
        return result;
      }
      // 其他 文件类型
      result = "other";
      return result;
    }





// console.log("C:/Users/win10/Downloads/cat(3).mp4")
// JavaScript代码：
// Blob 数据类型可以通过 Blob 构造函数来创建，也可以通过其他数据类型（如字符串或 ArrayBuffer）转换得到
// 构造函数返回一个新的 Blob 对象，array 是一个由ArrayBuffer, ArrayBufferView, Blob, DOMString 等对象构成的 Array ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings 会被编码为 UTF-8。options 是一个可选的BlobPropertyBag字典，它可能会指定如下两个属性：
// function readVideo(file) {
//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function(e) {
//           // debugger
//           // localStorage.setItem("path",e.target.result)
//           // 通过 localForage 完成同样功能
//           var imageList=[{url:""},{url:""}]
//           imageList.forEach((item)=>{
//             localforage.setItem(item.url, e.target.result).then(()=>{
//             console.log("存储成功")
//            })
//           });

//             // const blob = new Blob([e.target.result], { type: file.type });
//             // const url = URL.createObjectURL(blob);    //字符串
//             // const videoPlayer = document.getElementById('videoPlayer');
//             // videoPlayer.src = url;
//         };

//         reader.readAsArrayBuffer(file);
//         // reader.readAsDataURL(file);
//         // reader.readAsText(file)
//     }
// }

// const readVideo1=()=>{
//   //  var str=  localStorage.getItem("path")
//   localforage.getItem('key').then(function(value) {
//     // debugger
//     // 当离线仓库中的值被载入时，此处代码运行
//     console.log(value);
//     const blob = new Blob([value], {type:  'video/mp4'});

//     const url = URL.createObjectURL(blob);    //字符串

//     const videoPlayer = document.getElementById('videoPlayer');
//     videoPlayer.src = url;
//   }).catch(function(err) {
//       // 当出错时，此处代码运行
//       console.log(err);
//   });

// }

// function urlToBase64(url) {
//     return new Promise((resolve) => {
//       fetch(url).then(data => {
//         const blob = data.blob()
//         return blob;
//       }).then(blob => {
//         let reader = new FileReader()
//         reader.onloadend = function () {
//           const dataURL = reader.result
//           // console.log('base64地址：', dataURL)
//           resolve(dataURL)
//         }
//         reader.readAsArrayBuffer(blob)
//       })

//     })
//   }
// urlToBase64("http://39.105.179.38:9797/noderad/cat.mp4").then((res)=>{
//   res
//   // debugger
// })
</script>

<style lang="scss" scoped></style>
