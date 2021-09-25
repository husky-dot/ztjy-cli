import { createApp } from 'vue'
import { App } from '@ztjy/antd-vue-admin'
import router from './router'
import store, { key } from './store'

createApp(App).use(store, key).use(router).mount('#app')
