import '@unocss/reset/normalize.css'
import 'uno.css'
import './style.css'
import './assets/iconfont/iconfont.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createVfm } from 'vue-final-modal'
import PortalVue from 'portal-vue'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import { setupI18n } from './modules/i18n'
import { isDev } from './utils/env'
import App from './App.vue'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupElementPlus } from '@/modules/element-plus'
import './assets/iconfont/iconfont'
import { mocker } from '@/mocks/browser'

if (isDev()) {
  mocker.start({
    onUnhandledRequest: 'bypass',
  })
}

const app = createApp(App)
app.use(createHead())
app.use(PortalVue)
app.use(PerfectScrollbar, {
  options: {
    useBothWheelAxes: true,
  },
})
app.use(createVfm())

// 配置 i18n
setupI18n(app)

// 配置路由
setupRouter(app)

// 路由守卫
setupRouterGuard(router)

// 配置 Element Plus
setupElementPlus(app)

app.mount('#app')
