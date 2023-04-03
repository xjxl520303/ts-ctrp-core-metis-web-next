import type { RouteRecordRaw } from 'vue-router'
import { workbenchRoute } from './workbench'

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

export const appRoutes = [
  LoginRoute,
  RootRoute,
  AboutRoute,
  workbenchRoute,
]
