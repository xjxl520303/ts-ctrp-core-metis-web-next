import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import type { App } from 'vue'
import { appRoutes } from './routes'

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  // routes,
  routes: appRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}
