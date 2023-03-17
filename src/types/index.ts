import type { AxiosPromise } from 'axios'

/**
 * 服务器返回的数据 - 国际化字段
 */
export interface I18nItem {
  /** 中文名称 */
  nameCn: string
  /** 英文名称 */
  nameEn: string
}

/**
 * 字典/选项类型数据
 */
export interface OptionsItem<T = string> extends I18nItem {
  code: T
  children?: OptionsItem<T>[] | null
}

/**
 * 服务端返回数据
 */
export interface Result<T = any> {
  code: string
  requestId: string
  message: string
  data: T
}

/**
 * 分页请求通用参数
 */
export interface RequestWithPagination {
  /** 页数 */
  pageNum?: number
  /** 分页大小 */
  pageSize?: number
  /** 排序 */
  sort?: string
}

/**
 * 带分页返回数据
 */
export interface ResponseWithPagination<T> {
  dataList: T[]
  dataTotal: number
  pageNum: number
  pageSize: number
  pageTotal: number
}

/** 通用数据返回 */
export type ResponseOfDefault<T> = AxiosPromise<Result<T>>
/** 返回列表数据 */
export type ResponseOfList<T> = AxiosPromise<Result<T[]>>
/** 返回带分页数据 */
export type ResponseOfPaginationList<T> = AxiosPromise<Result<ResponseWithPagination<T>>>
/** 服务器返回的字典/选项类数据 */
export type ResponseOfOptions<T = string> = AxiosPromise<Result<OptionsItem<T>>>

/** 代码运行环境 */
export type AppMode = 'test' | 'dev' | 'sit' | 'uat' | 'pre' | 'prod'

/**
 * 通用选项配置
 **/
export type OptionItem = {
  /** 标签名 */
  label: string
  /** 值 */
  value: any
  /** 字段名 */
  field?: string
  /** 图标 */
  icon?: string
  /** 颜色 */
  color?: string
  /** 类型 */
  type?: string | number
  /** 名字 */
  name?: string
  /** 默认值 */
  default?: any
  /** 宽度 */
  width?: number
} & Record<string, any>

export interface BaseRes<T> {
  data: T
  message: string
}

/**
 * Notice: 不同的接口可能不一样，如果后端没有规范就 game over 了~
 */
export interface BaseList<T> {
  dataList: T[]
  dataTotal: number
  pageNum: number
  pageSize: number
  pageTotal: number
}

export type ResList<T> = Result<Array<T>>
export type ResListWithPagination<T> = Result<BaseList<T>>

/**
 * 对话框关闭原因，[关闭] , [取消] 或 [再次打开]
 */
export type CloseReason = 'close' | 'cancel' | 'again'
