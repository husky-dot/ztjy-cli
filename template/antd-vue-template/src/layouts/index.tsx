import { defineComponent, VNode } from 'vue'
import { RouterView } from 'vue-router'
import { AdminLayout } from '@ztjy/antd-vue'
import { Settings } from '@ztjy/antd-vue/es/components/AdminLayout'

import { routes } from '@/router/home'

const settings: Settings = {
  ...AdminLayout.defaultSettings,
  title: '商化前端 Web 模板',
  layout: 'top',
  fixedHeader: true,
  headerTheme: 'dark',
  navTheme: 'dark',
  contentWidth: 'Fixed',
}

export default defineComponent({
  setup() {
    return () => {
      return (
        <AdminLayout
          settings={settings}
          routes={routes}
          footerRender={() => {
            return <div> aaaaaaaaaaa</div>
          }}
        >
          <RouterView />
        </AdminLayout>
      )
    }
  },
})
