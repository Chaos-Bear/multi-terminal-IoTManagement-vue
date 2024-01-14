import axios from 'axios'
// 文件md5加密
import BMF from 'browser-md5-file'
import Cookies from 'js-cookie'
// Cookies.set(
//   'Authorization',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGktbGlzdC11cmwiOlsiXi9kZnMtdWkvLioiLCJeL2hyLW9yZy1zZXJ2aWNlL29yZ1ByZXZpZXcvcXVlcnlTeXNPcmdMaXN0LioiLCJeL2hyLW9yZy1zZXJ2aWNlL3N5c1VzZXIvZ2V0UGFnZUxpc3QuKiIsIl4vaHItb3JnLXNlcnZpY2Uvc3lzVXNlci9xdWVyeUVtcC4qIiwiXi9haS1nYXRlLXBvcnRhbC1zZXJ2aWNlL2dhdGUtcG9ydGFsL2ZlYXR1cmVDb21wYXJlLioiLCJeL2FpLWdhdGUtcG9ydGFsLXNlcnZpY2UvZ2F0ZS1wb3J0YWwvYWRkRmVhdHVyZS4qIiwiXi9oci1hdHRlbmRhbmNlLXNlcnZpY2UvYXR0ZW5kQ29udHJvbGxlci9zaWduaW4uKiIsIl4vYWktZ2F0ZS1wb3J0YWwtc2VydmljZS9tZXJnZWQtZ2F0ZS1wb3J0YWwvLioiLCJeL3lkeXktcXJjb2RlLXNlcnZpY2UvcXJjb2RlL2NyZWF0ZVFyY29kZS4qIl0sImV4cCI6MTcwMzcyNDQ2MSwidXNlcl9uYW1lIjoidXNlcl9tdWx0aXBvcnRfcGxhdDIiLCJqdGkiOiIzZWIwOTA3OS05MTIzLTQxOWMtYjhlZS01Y2FlNjA1MDhlYWYiLCJjbGllbnRfaWQiOiJjbGllbnRfbXVsdGlwb3J0X3BsYXQiLCJzY29wZSI6WyJzZWxlY3QiXX0.ktdaG4rtsMuh0TX1gWSwVFLBi0HDEvajxiO-dcaA_sU'
// )
const cookie = Cookies.get('Authorization')
// console.log(cookie)

// 多端信息互动平台-物联：文件服务AppId
// const appId = 'DDXXHDPT-RLSBQDDP';
const appFlag = import.meta.env.VUE_APP_FLAG
let appId_All = 'DDXXHDPT-RLSBQDDP'
if (appFlag && appFlag === 'n-test') {
  appId_All = 'TEST'
}
// console.log("获取环境标识-appFlag",appFlag)
// console.log("appId--",appId_All);
/**
 * 文件上传路径 文件名 文件对象
 * */
const upload = (url, data, headers = {}) => {
  let formData = new FormData()
  data.forEach((value, key) => {
    if (key === 'appId') {
      formData.append(key, appId_All || 'DDXXHDPT-RLSBQDDP')
    } else {
      formData.append(key, value)
    }
  })
  return new Promise((resolve, reject) => {
    axios({
      url,
      method: 'post',
      data: formData,
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        return resolve(res.data)
      })
      .catch((err) => {
        return reject(err)
      })
  })
}

const uploadByPieces = async ({ fileName, appId, storeLocation, file }) => {
  try {
    // 获取文件的md5
    const bmf = new BMF()
    const getFileMd5 = (file) => {
      return new Promise((resolve, reject) => {
        bmf.md5(file, (err, md5) => {
          if (err) reject(err)
          if (md5) resolve(md5)
        })
      })
    }
    const fileMd5 = await getFileMd5(file)
    // 初始化上传数据，获取fileId, symbolicLinkId
    const startData = await axios({
      url: '/sweet-api/dfs-ui/dfs/v2/file/upload/chunk/start',
      method: 'post',
      data: {
        fileName,
        fileSize: file.size,
        md5: fileMd5,
        appId: appId_All || appId, // 避免报错
        storeLocation
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        access_token: cookie
      }
    })
    const { fileId, indexList } = startData.data.result.data
    // debugger
    // 分片上传续传
    // 上传过程中用到的变量
    const chunkSize = 5 * 1024 * 1024 // 5MB一片
    const chunkCount = Math.ceil(file.size / chunkSize) // 总片数
    // 获取当前chunk数据
    const getChunkInfo = (file, index) => {
      let start = index * chunkSize
      let end = Math.min(file.size, start + chunkSize)
      let chunk = file.slice(start, end)
      return { start, end, chunk }
    }

    // 分片上传续传接口
    const uploadChunk = (data) => {
      return new Promise((resolve, reject) => {
        axios({
          url: '/sweet-api/dfs-ui/dfs/v2/file/upload/chunk/upload',
          method: 'post',
          data,
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: cookie
          }
        })
          .then((res) => {
            return resolve(res.data)
          })
          .catch((err) => {
            return reject(err)
          })
      })
    }
    // 针对单个文件进行chunk上传
    const readChunk = async (index) => {
      const { chunk } = getChunkInfo(file, index)
      // 获取片段md5
      const chunkMd5 = await getFileMd5(chunk)
      let fetchForm = new FormData()
      fetchForm.append('chunk', chunk)
      fetchForm.append('fileId', fileId)
      fetchForm.append('index', index)
      fetchForm.append('md5', chunkMd5)
      fetchForm.append('chunkCount', chunkCount)
      return uploadChunk(fetchForm)
    }
    // 针对每个文件进行chunk处理
    const promiseList = []
    // 判断文件是否有历史数据，如果有，不用重复上传
    if (indexList.length !== chunkCount) {
      for (let index = 0; index < chunkCount; ++index) {
        // 只上传无历史文件的片段
        if (indexList.indexOf(index) === -1) {
          promiseList.push(readChunk(index))
        }
      }
      await Promise.all(promiseList)
      // 分片上传文件完成接口
      await axios({
        url: '/sweet-api/dfs-ui/dfs/v2/file/upload/chunk/finish',
        method: 'post',
        data: {
          fileName,
          fileId,
          appId: appId_All || 'DDXXHDPT-RLSBQDDP',
          chunkCount
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          access_token: cookie
        }
      })
    }
    const { code, msg } = startData.data
    const result = {
      fileId: startData.data.result.data.fileId,
      symbolicLinkId: startData.data.result.data.symbolicLinkId
    }
    const resData = { code, msg, result } //组装与简单文件上传一直数据格式
    return resData
  } catch (e) {
    return e
  }
}

const compressImage = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/sweet-api/dfs-ui/dfs/v2/image/', data)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
export { upload, uploadByPieces, compressImage }
