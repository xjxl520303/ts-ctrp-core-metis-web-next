import type { RouteRecordRaw } from 'vue-router'
import { workbenchRoute } from './workbench'
import {
  EXCEPTION_COMPONENT,
  LAYOUT,
  PAGE_NOT_FOUND_NAME,
  REDIRECT_NAME,
} from '@/constants'

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/login',
}

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
}

export const AboutRoute: RouteRecordRaw = {
  path: '/about',
  name: 'About',
  component: () => import('@/views/about/index.vue'),
}

// 404
export const NotFoundRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true,
      },
    },
  ],
}

// 重定向
export const RedirectRoute: RouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/views/sys/redirect/index.vue'),
      meta: {
        title: REDIRECT_NAME,
      },
    },
  ],
}

export const appRoutes = [
  LoginRoute,
  RootRoute,
  AboutRoute,
  workbenchRoute,
  NotFoundRoute,
  RedirectRoute,
]
