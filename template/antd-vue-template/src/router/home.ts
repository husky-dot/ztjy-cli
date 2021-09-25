import { RouteRecordMenu } from '@ztjy/antd-vue/es/components/AdminLayout'
import { RouteRecordRaw } from 'vue-router'
import { AdminLayout } from '@ztjy/antd-vue'
import Home from '../views/Home'

export const routes: RouteRecordMenu[] = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hideInBreadcrumb: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About'),
    meta: {
      title: '关于',
      hideInBreadcrumb: true,
    },
  },
]
export default {
  path: '/',
  name: 'dashboard',
  component: import(/* webpackChunkName: "about" */ '../layouts/index'),
  redirect: '/home',
  meta: {
    title: '首页',
  },
  children: routes,
} as RouteRecordRaw
