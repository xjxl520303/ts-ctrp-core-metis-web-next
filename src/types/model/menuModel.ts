import type { MenuItemTypeEnum } from '@/enums'
import type { I18nItem } from '@/types'

/**
 * 菜单项
 */
export interface MenuItem extends I18nItem {
  /** 菜单id */
  id: number | string
  /** 订单类型 */
  orderType: string
  /** @date 2022-08-17 不知道作用 */
  subOrderType?: string
  /** 是否激活 */
  actived: boolean
  /** 排序 */
  order?: string
  /** 类型 */
  type: MenuItemTypeEnum | string
  /** 地址 */
  url: string
}

/**
 * 菜单组
 */
export interface MenuGroupItem extends I18nItem {
  /** 编码 */
  code: string
  /** 菜单 */
  menuList: MenuItem[]
}
