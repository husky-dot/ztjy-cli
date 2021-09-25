import {
  RouteRecordRaw,
  RouterView,
  createRouter,
  createWebHistory,
} from 'vue-router'
import { RouteRecordMenu } from '@ztjy/antd-vue/es/components/AdminLayout'
import { AdminLayout, Login, routeGuard } from '@ztjy/antd-vue-admin'

export const routes: RouteRecordMenu[] = [
  {
    path: '/menu',
    name: 'Menu',
    component: RouterView,
    redirect: '/menu/list',
    meta: {
      icon: 'fas fa-ad',
      title: '菜单一',
    },
    children: [
      {
        path: '/menu/list',
        component: () => import('@/pages/Menu1'),
        meta: {
          title: '列表',
        },
      },
    ],
  },
  {
    path: '/menu2',
    name: 'Menu2',
    component: RouterView,
    redirect: '/menu2/list',
    meta: {
      icon: 'fas fa-ad',
      title: '菜单二',
    },
    children: [
      {
        path: '/menu2/list',
        component: () => import('@/pages/Menu2'),
        meta: {
          title: '列表',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/login',
      component: Login,
      props: {
        title: '商化前端后台登录',
      },
    },
    {
      path: '/',
      redirect: '/menu',
      component: AdminLayout,
      props: {
        title: '商化前端 后台 模板',
        routes,
      },
      meta: {
        title: '首页',
      },
      children: routes as RouteRecordRaw[],
    },
  ],
})

export default router
