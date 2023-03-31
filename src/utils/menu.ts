import { MenuItemTypeEnum } from '@/enums'
import type { MenuItem } from '@/types'
import { router } from '@/router'
import { openWindow } from '@/utils'

/**
 * 创建【消息中心】菜单
 */
export const createMessageMenu = (): MenuItem => ({
  id: 135790 << 1,
  orderType: 'SALE_ORDER',
  sort: '-1',
  url: '/message',
  type: MenuItemTypeEnum.MESSAGE,
  nameCn: '消息中心',
  nameEn: 'Message',
})

/**
 * 创建【创建工单】菜单
 */
export const createCreateWoMenu = (id: number): MenuItem => ({
  id,
  orderType: 'SALE_ORDER',
  sort: '-1',
  url: '/wo/create',
  type: MenuItemTypeEnum.WO_CREATE,
  nameCn: '创建工单',
  nameEn: 'Create Wo',
})

/**
 * 创建【订单详情】菜单
 */
export const createOrderDetailMenu = (id: number): MenuItem => ({
  id,
  orderType: 'SALE_ORDER',
  sort: '-1',
  url: '/order/detail',
  type: MenuItemTypeEnum.ORDER_DETAIL,
  nameCn: '订单详情',
  nameEn: 'Order detail',
})

/**
 * 进入菜单路由
 */
export const toMenuRoute = (menu: MenuItem, isBlank = false) => {
  let path
  if (menu.type === MenuItemTypeEnum.FJT)
    path = `/home/${menu.id}`
  else if (menu.type === MenuItemTypeEnum.ORDER)
    path = `/order/${menu.id}`
  else if (menu.type === MenuItemTypeEnum.ORDER_DETAIL)
    path = `/order/detail/${menu.id}`
  else if (menu.type === MenuItemTypeEnum.WO)
    path = `/wo/${menu.id}`
  else if (menu.type === MenuItemTypeEnum.WO_CREATE)
    path = `/wo/create/${menu.id}`
  else if (menu.type === MenuItemTypeEnum.BILL)
    path = `/bill/${menu.id}`
  else
    path = menu.url

  if (isBlank)
    openWindow(router.resolve(path).href)
  else
    router.push(path)
}
