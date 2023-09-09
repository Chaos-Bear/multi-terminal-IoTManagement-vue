import {defineStore} from 'pinia'
import {ElMessage} from "element-plus";
import $axios from 'axios'

export const useApiAddressStore = defineStore({
    id: 'apiAddressStore',
    state: () => ({}),
    /** computed 修饰一些值 */
    getters: {
        // meeting: (state) => {
        //     // return {
        //     //     list: 'api/meetingRoom/list',
        //     //     get: 'api/meetingRoom/list',
        //     //     delete: 'api/meetingRoom/delete',
        //     //     modify: 'api/meetingRoom/modify',
        //     //     add: 'api/meetingRoom/add'
        //     // }
        // },
        // meetingPage: (state) => {
        //     return 'api/meeting-page'
        // },
        // meetingCategory: (state) => {
        //     return {
        //         base: 'api/meeting-category',
        //         delete: 'api/meeting-category/delete',
        //         modify: 'api/meeting-category/update',
        //         updateCategory: 'api/meeting-category/updateCategory',
        //     }
        // }
    },
    // actions: {
    //     async request(type, url, callback, data) {
    //         switch (type) {
    //             case 'get':
    //                 await this.get(url, callback)
    //                 break
    //             case 'post':
    //                 await this.post(url, data, callback)
    //                 break
    //             default:
    //                 break
    //         }
    //     },
    //     async get(url, callback) {
    //         $axios.get(url).then((res) => {
    //             if (typeof callback === 'function') {
    //                 callback(res)
    //             }
    //         }).catch((err) => {
    //             ElMessage({
    //                 message: '网络异常,稍后再试',
    //                 type: 'warning',
    //             })
    //         })
    //     },
    //     async post(url, data, callback, attr) {
    //         const option = attr || {
    //             needTip: true
    //         };
    //         $axios.post(url, data).then((res) => {
    //             if (typeof callback === 'function') {
    //                 callback()
    //             }
    //             if (option.needTip) {
    //                 if (res.data?.success) {
    //                     ElMessage({
    //                         message: res.data?.msg,
    //                         type: 'success',
    //                     })
    //                 } else {
    //                     ElMessage({
    //                         message: res.data?.msg,
    //                         type: 'warning',
    //                     })
    //                 }
    //             }
    //         }).catch((err) => {
    //             ElMessage({
    //                 message: '网络异常,稍后再试',
    //                 type: 'warning',
    //             })
    //         })
    //     },
    //     async delete(url, callback) {
    //         $axios.delete(url).then((res) => {
    //             if (typeof callback === 'function') {
    //                 callback(res)
    //             }
    //             if (res.data?.success) {
    //                 ElMessage({
    //                     message: res.data?.msg,
    //                     type: 'success',
    //                 })
    //             } else {
    //                 ElMessage({
    //                     message: res.data?.msg,
    //                     type: 'warning',
    //                 })
    //             }
    //         }).catch((err) => {
    //             ElMessage({
    //                 message: '网络异常,稍后再试',
    //                 type: 'warning',
    //             })
    //         })
    //     }

    // }
})