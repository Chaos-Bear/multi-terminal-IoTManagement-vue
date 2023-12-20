import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/HomePage.vue'

import Tablet from '../views/tablet_borrowed/TabletPage.vue'
import TabletBorrowed from '../views/tablet_borrowed/TabletBorrowed.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: home
    },

    {
      path: '/meetingUserList',
      name: 'meetingUserList',
      component: () => import('../views/meeting_room/user_list.vue')
    },
    // 1. 呼叫服务模块
    {
      path: '/callService',
      name: 'CallService',
      component: () => import('../views/call_service/call_service.vue')
    },

    // 3.平板借还模块
    {
      path: '/tablet',
      name: 'tablet',
      component: Tablet,
      redirect: '/tablet/tablet-borrowed',
      children: [
        {
          path: 'tablet-borrowed',
          name: 'TabletBorrowed',
          component: TabletBorrowed
        },
        {
          path: 'device-management',
          name: 'DeviceManagement',
          component: () => import('../views/tablet_borrowed/DeviceManagement.vue')
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('../views/tablet_borrowed/HistoryPage.vue')
        }
      ]
    },
    {
      path: '/validate-password',
      name: 'ValidatePassword',
      component: () => import('../views/tablet_borrowed/ValidatePassword.vue')
    },
    {
      path: '/auto-scanning',
      name: 'AutoScanning',
      component: () => import('../views/tablet_borrowed/autosScanning.vue')
    },
    {
      path: '/returnValidate-password',
      name: 'ReturnValidatePassword',
      component: () => import('../views/tablet_borrowed/ReturnValidatePassword.vue')
    },
    {
      path: '/returnAuto-scanning',
      name: 'ReturnAutoScanning',
      component: () => import('../views/tablet_borrowed/ReturnAutoScanning.vue')
    },

    // 2.设备管理模块
    {
      path: '/deviceList',
      name: 'DeviceList',
      component: () => import('../views/device_management/deviceList.vue')
    },

    // 4. 信息发布模块
    {
      path: '/xxfb',
      name: 'Xxfb',
      component: () => import('../views/xxfb/EditPage.vue')
    },
    {
      path: '/monitor-control',
      name: 'MonitorControl',
      component: () => import('../views/xxfb/MonitorControl.vue')
    },
    {
      path: '/pub',
      component: () => import('../views/xxfb/PubPage.vue')
    },
    {
      path: '/xxfb-monitorlist',
      name: 'XxfbMonitorlist',
      component: () => import('../views/xxfb/MonitorList.vue')
    },
    {
      path: '/guide-page',
      name: 'Guide',
      component: () => import('../views/xxfb/GuidePage.vue')
    },
    // {
    //   path: '/video',
    //   name: 'Video',
    //   component: () => import('../views/xxfb/video.vue')
    // },

    // hash设置默认路由
    {
      path: '/:pathMatch(.*)',
      name: 'notFound',
      component: NotFound
    }
  ]
})

//路由前置守卫
// router.beforeEach((to,from,next)=>{
//   //判断是否进入某个路径
//   if(from.path=='/guide-page' && to.path=="/pub"){
//       next()
//       //可以进行路径重定向等
//       next({path:'tablet-borrowed'})
//   }else if(from.path!='/guide-page' && to.path=="/pub"){
//       next({path:'/guide-page'})
//   }else{
//     next()
//   }
// })

export default router
