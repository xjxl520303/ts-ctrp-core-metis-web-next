/**
 * 拓展属性 - 语言
 */
export type SystemLanguageAttr = 'cn' | 'en'

/**
 * 拓展属性 - 主题样式
 */
export type SystemThemeAttr = 'white' | 'black'

/**
 * 拓展属性
 */
export interface SystemAttr {
  /** 语言 */
  language: SystemLanguageAttr

  /** 主题 */
  style: SystemThemeAttr

  /** 预开通过期时间 */
  preOpenValidityEnd: string
}

/**
 * 预开通信息
 */
export interface PreOpenDto {
  /** 是否需要提醒 */
  needRemind: boolean | null
  /** 是否预开通 */
  preOpenContract: boolean
  /** 预开通到期时间 */
  preOpenValidityEnd: string
}

/**
 * 包年信息
 */
export interface UserYearPayDto {
  /** 到期时间 */
  expirationDate: string
  /** 档次 */
  grade: string
  /** 支付订单号 */
  orderNo: string
  /** 是否支付 */
  pay: boolean
}

/**
 * 商机状态枚举
 */
export enum BusinessStatusEnum {
  /** 未填报 */
  PRISTINE,
  /** 已审核 */
  AUDITED,
  /** 待审核 */
  AWAIT,
  /** 已驳回 */
  REJECTED,
}

/**
 * 合同签署状态枚举
 */
export enum ContractSignStatusEnum {
  /** 未签署 */
  NOT_SIGN,
  /** 已签署 */
  SIGNED,
}

/**
 * 合同类型枚举
 */
export enum ContractTypeEnum {
  /** 线下合同 */
  OFFLINE,
  /** 线上协议 */
  ONLINE,
}

/**
 * 支付类型枚举
 */
export enum PayTypeEnum {
  /** 月付费 */
  MONTH = 'month',
  /** 年付费 */
  YEAR = 'year',
}

/**
 * 用户信息
 */
export interface UserDto {
  /** 区域 */
  area: string | null
  /** 拓展属性 */
  attr: SystemAttr
  /** 商机申请码 */
  businessCode: string | null
  /** 商机客户名称 */
  businessCustomerName: string
  /** 商机状态 */
  businessStatus: BusinessStatusEnum
  /** 货主信息 */
  companyCodeList: string[]
  /** 合同文件名 */
  contractFileName: string | null
  /** 合同文件路径 */
  contractFilePath: string | null
  /** 合同签署状态 */
  contractSignStatus: ContractSignStatusEnum
  /** 合同类型 */
  contractType: ContractTypeEnum
  /** 客户名 */
  customerName: string
  /** 邮件 */
  email: string
  /** ID */
  id: string
  /** 最后一次登录时间 */
  lastLoginTime: string | null
  /** 登录时间 */
  loginTime: string
  /** 支付类型 */
  payType: PayTypeEnum
  /** 手机 */
  phone: string
  /** 预开通 */
  preOpenDto: PreOpenDto
  /** 产品编码 */
  productCode: string
  /** 产品名 */
  productName: string
  /** 属性 */
  properties: Record<string, any>
  /** 角色 */
  role: string | null
  /** 角色描述 */
  roleDesc: string | null
  /** 顺丰用户 */
  sfuser: boolean
  /** 租房ID */
  tenantId: string | null
  /** 租户code */
  tenant: string
  /** 租户名 */
  tenantName: string
  /** TOKEN */
  token: string
  /** 账号 */
  userCode: string
  /** 用户姓名 */
  userName: string
  /** 包年信息 */
  userYearPayDto: UserYearPayDto | null
}
