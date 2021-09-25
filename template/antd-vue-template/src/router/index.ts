import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import homeRoutes from './home'

const routes: RouteRecordRaw[] = [homeRoutes]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
