import type { AxiosPromise } from 'axios'

/**
 * 错误信息
 */
export interface ErrorPayload {
  code: string
  message: string
  requestId: string
}

/**
 * 请求返回状态
 */
export interface ActionErrorState {
  isSuccess: boolean
  isError: boolean
  error: ErrorPayload | null
}

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

/** window.open 参数 */
export type TargetContext = '_self' | '_parent' | '_blank' | '_top'

/** 对话框关闭原因，[关闭] , [取消] 或 [再次打开] */
export type CloseReason = 'close' | 'cancel' | 'again'
