import type { I18nItem, MenuItem, OptionsItem, RequestWithPagination } from '@/types'

/**
 * 表单控件类型
 */
export type ControlType = 'text' | 'textArea' | 'select' | 'multiSelect' | 'date'

/**
 * 导出按钮配置信息
 */
export interface ExportBtnItem extends I18nItem {
  id: number
}

/**
 * 菜单跳转按钮配置信息
 */
export interface MenuBtnItem extends MenuItem {
  /** 按钮标签中文名 */
  buttonName: string
  /** 按钮标签英文名 */
  buttonNameEn: string
  /** 按钮标签提示中文名 */
  tips: string
  /** 按钮标签提示英文名 */
  tipsEn: string
}

/**
 * 切片器配置信息
 */
export interface SlicerItem extends I18nItem {
/** 默认值  */
  defaultValue: any
  /** 字典 code */
  dict: string
  /** 字段名 */
  field: string
  /** 类型 */
  type: ControlType
  /** 批量查询限制输入个数 */
  limit?: number
}

/**
 * 处理后的切片器配置信息
 */
export interface LocalSlicerItem {
  /** 标签 */
  label: string
  /** 默认值 */
  value: any
  /** 字段 */
  field: string
  /** 控件类型 */
  controlType: ControlType
  /** 下拉选择框数据请求查询关键词 */
  query: string
  /** select 的数据源 */
  options?: OptionsItem[]
  /** 批量查询限制输入个数 */
  limit?: number
  /** 保留用于日期拆分 */
  [k: string]: any
}

/**
 * 丰景台配置信息
 */
export interface FjtItem {
  pageBlackCnUrl: string
  pageBlackEnUrl: string
  pageWhiteCnUrl: string
  pageWhiteEnUrl: string
}

/**
 * 处理后的丰景台配置信息
 */
export interface LocalFjtItem {
  /** 菜单ID */
  menuId: number
  /** 页面地址 */
  url: string
}

/**
 * 里程碑配置信息
 */
export interface MilestoneItem extends I18nItem {
/** 是否显示右侧箭头 */
  arrow: boolean
  /** 颜色 */
  colour: string
  /** 图标代码 */
  icon: string
  /** 元素标识 */
  id: number
}

/**
 * 里程碑配置信息
 */
export interface OrderListItem extends I18nItem {
/** 字段 */
  field: string
  tableField?: string
  /** 所属类型 */
  model?: string
  /** 字典 code */
  dict?: string
  /** 格式化 */
  format?: string
}

/**
 * 页面配置返回
 */
export interface PageConfigDto {
  /** 按钮权限 */
  button?: string[]
  /** 导出按钮 */
  export?: ExportBtnItem[]
  /** 页面跳转按钮 */
  menuButton?: MenuBtnItem[]
  /** 丰景台 */
  fjt?: FjtItem
  /** 里程碑 */
  mileStone?: MilestoneItem[]
  /** 搜索条件 */
  slicer?: SlicerItem[]
  /** 订单列表 */
  orderList?: OrderListItem[]
}

/**
 * 动态列表请求参数
 */
export interface DynamicListRequest extends RequestWithPagination {
  /** 动态搜索条件 */
  condition?: Record<string, any>
  /** 页面 id */
  menuId?: number
  /** 里程碑 id 集合 */
  milestoneList?: number[]
  /** 订单类型 */
  orderType?: string
}
