import '@unocss/reset/normalize.css'
import 'uno.css'
import './style.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { router, setupRouter } from '@/router'
import { setupRouterGuard } from '@/router/guard'
import { setupI18n } from './modules/i18n'
import { setupElementPlus } from '@/modules/element-plus'
import { createVfm } from 'vue-final-modal'
import { mocker } from '@/mocks/browser'
import { isDev } from './utils/env'

import App from './App.vue'

if (isDev()) {
  mocker.start({
    onUnhandledRequest: 'bypass',
  })
}

const app = createApp(App)
app.use(createHead())
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
