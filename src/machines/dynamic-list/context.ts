import type { ErrorPayload, ExportBtnItem, FjtItem, MenuBtnItem, MilestoneDataItem, MilestoneItem, OrderListItem, ResponseWithPagination, SlicerItem } from '@/types'

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
  /** Slicer 中提取的表单模型 */
  slicerFormModels: Record<string, any>
  /** 丰景台数据 */
  fjtOption: FjtItem | null
  /** 里程碑配置数据 */
  milestoneOptions: MilestoneItem[]
  /** 里程碑数据 */
  milestoneData: MilestoneDataItem[]
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
  slicerFormModels: reactive({}),
  fjtOption: null,
  milestoneOptions: [],
  milestoneData: [],
  orderListOptions: [],
  dynamicList: null,
}
