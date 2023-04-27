import type { ErrorPayload, ExportBtnItem, FjtItem, MenuBtnItem, MilestoneItem, OrderListItem, ResponseWithPagination, SlicerItem } from '@/types'

export interface DynamicListContext {
  /** 接口错误信息 */
  error: ErrorPayload | null
  /** 按钮权限 */
  btnPermissionOptions: string[]
  /** 导出按钮 */
  exportBtnOptions: ExportBtnItem[]
  /** 菜单跳转按钮 */
  menuBtnOptions: MenuBtnItem[]
  /** 切片器数据 */
  slicerOptions: SlicerItem[]
  /** 丰景台数据 */
  fjtOption: FjtItem | null
  /** 里程碑数据 */
  milestoneOptions: MilestoneItem[]
  /** 订单列表数据 */
  orderListOptions: OrderListItem[]
  /** 动态列表数据 */
  dynamicList: ResponseWithPagination<any> | null
}

export const INITIAL_DYNAMIC_LIST_CONTEXT: DynamicListContext = {
  error: null,
  btnPermissionOptions: [],
  exportBtnOptions: [],
  menuBtnOptions: [],
  slicerOptions: [],
  fjtOption: null,
  milestoneOptions: [],
  orderListOptions: [],
  dynamicList: null,
}
