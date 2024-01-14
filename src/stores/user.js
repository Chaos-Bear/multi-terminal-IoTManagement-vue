import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const user = ref(0)
  // function update(value) {
  // if (value) {
  //   user.value = value || 0
  // } else {
  //   apis
  //     .getCartCount()
  //     .then((res) => {
  //       user.value = res.activeCount || 0
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }
  // }

  return { user }
})
// export const useShowLoadingStore = defineStore('showLoading', () => {
//   const isShowLoading= ref(false)

//   const setShowLoading=(data)=> {
//     isShowLoading.value = data;
//   }

//   return {isShowLoading,setShowLoading}
// })
