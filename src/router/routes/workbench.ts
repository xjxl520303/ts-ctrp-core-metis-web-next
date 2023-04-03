import type { RouteRecordRaw } from 'vue-router'
import { i18n } from '@/modules/i18n'
import { MenuItemTypeEnum } from '@/enums'

const { t } = i18n.global as any

export const workbenchRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  component: import('@/layouts/index.vue'),
  children: [
    {
      path: '/home/:id',
      name: MenuItemTypeEnum.FJT,
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: t('sys.routes.fjt'),
      },
    },
    /* ----------------------------------- 工单 ----------------------------------- */
    {
      path: '/wo/:id',
      name: MenuItemTypeEnum.WO,
      component: () => import('@/views/wo/index.vue'),
    },
    {
      path: '/wo/create/:id',
      name: MenuItemTypeEnum.WO_CREATE,
      component: () => import('@/views/wo-create/index.vue'),
    },
    {
      path: '/woImport/:id',
      name: MenuItemTypeEnum.WORK_ORDER_IMPORT,
      component: () => import('@/views/wo-import/index.vue'),
    },
    {
      path: '/processImport/:id',
      name: MenuItemTypeEnum.WORK_ORDER_PROCESS_IMPORT,
      component: () => import('@/views/wo-import/index.vue'),
    },
    /* ----------------------------------- 账单 ----------------------------------- */
    {
      path: '/bill/:id',
      name: MenuItemTypeEnum.BILL,
      component: () => import('@/views/bill/index.vue'),
    },
    {
      path: '/billApply/:id',
      name: MenuItemTypeEnum.BILL_APPLY,
      component: () => import('@/views/bill/index.vue'),
    },
    {
      path: '/billShow/:id',
      name: MenuItemTypeEnum.BILL_SHOW,
      component: () => import('@/views/bill-preview/index.vue'),
    },
    {
      path: '/billImport',
      name: MenuItemTypeEnum.BILL_IMPORT,
      component: () => import('@/views/bill-import/index.vue'),
    },
    {
      path: '/billApplyImport',
      name: MenuItemTypeEnum.BILL_APPLY_IMPORT,
      component: () => import('@/views/bill-import/index.vue'),
    },
    /* ----------------------------------- 订单 ----------------------------------- */
    {
      path: '/order/:id',
      name: MenuItemTypeEnum.ORDER,
      component: () => import('@/views/order/index.vue'),
    },
    // {
    //   path: '/import',
    //   name: MenuItemTypeEnum.ORDER_IMPORT,
    //   component: () => import('@/views/orderExport/index.vue'),
    // },
    {
      path: '/invThresholdImport/:id',
      name: MenuItemTypeEnum.INV_IMPORT,
      component: () => import('@/views/inv/index.vue'),
    },
    {
      path: '/user',
      name: MenuItemTypeEnum.USER,
      component: () => import('@/views/user/index.vue'),
    },
    {
      path: '/account',
      name: MenuItemTypeEnum.ACCOUNT,
      component: () => import('@/views/account/index.vue'),
    },
  ],
}
