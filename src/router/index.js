import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router';
import home from '../views/home.vue';

import callService from '../views/call_service/call_service.vue'

import Tablet from '../views/tablet_borrowed/Tablet.vue';
import TabletBorrowed from '../views/tablet_borrowed/TabletBorrowed.vue';
import NotFound from '../views/NotFound.vue';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: '',
        component: home,
    },
    
    {
      path: '/meetingUserList',
      name: 'meetingUserList',
      component: () => import('../views/meeting_room/user_list.vue'),
    },
    // 1. 呼叫服务模块
    {
        path: '/callService',
        component: callService,
    },
    // {
    //     path: '/mobileCallService',
    //     component: mobileCallService,
    // },
    // {
    //     path: '/mobileCallService2',
    //     component: mobileCallService2,
    // },

    // 3.平板借还模块
    {
      path: '/tablet',
      name: 'tablet',
      component: Tablet,
      redirect:"/tablet/tablet-borrowed",
      children:[
        {
          path: 'tablet-borrowed',
          name: 'TabletBorrowed',
          component: TabletBorrowed,
          
        },
        {
          path: 'device-management',
          name: 'DeviceManagement',
          component: () => import('../views/tablet_borrowed/DeviceManagement.vue'),
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('../views/tablet_borrowed/History.vue'),
        }
      ]
    },
    {
      path: '/validate-password',
      name: 'ValidatePassword',
      component: () => import('../views/tablet_borrowed/ValidatePassword.vue'),
    },
    {
      path: '/auto-scanning',
      name: 'AutoScanning',
      component: () => import('../views/tablet_borrowed/autosScanning.vue'),
    },
    {
      path: '/returnValidate-password',
      name: 'ReturnValidatePassword',
      component: () => import('../views/tablet_borrowed/ReturnValidatePassword.vue'),
    },
    {
      path: '/returnAuto-scanning',
      name: 'ReturnAutoScanning',
      component: () => import('../views/tablet_borrowed/ReturnAutoScanning.vue'),
    },

    // 2.设备管理模块
    {
      path: '/deviceList',
      name: 'DeviceList',
      component: () => import('../views/device_management/deviceList.vue'),
    },

    // hash设置默认路由
    {
      path: "/:pathMatch(.*)",
      name: "notFound",
      component: NotFound,
    },
  ]
})

//路由前置守卫
// router.beforeEach((to,from,next)=>{
   //判断是否进入某个路径
  //  if(to.path=="/"){
  //     //可以进行路径重定向等
  //     next({path:'tablet-borrowed'})
  //  }else{
  //     next()
  //  }
// })

export default router
