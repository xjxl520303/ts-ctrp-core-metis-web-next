import type { RouteLocationNormalized, Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export function setupRouterGuard(router: Router) {
  createNProgressGuard(router)
  createScrollGuard(router)
}

function createNProgressGuard(router: Router) {
  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}

// 切换路由时回到顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return href.startsWith('#')
  }

  const body = document.body

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}
