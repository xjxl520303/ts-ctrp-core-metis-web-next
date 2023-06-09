/**
 * 请求方式枚举
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * 请求内容类型
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

/**
 * 请求返回 code 状态值
 */
export enum ResponseCodeEnum {
  /** 成功 */
  SUCCESS = '00000',
  /** 无效授权 */
  INVALID_AUTH = 'C0401',
  /** 此账号已被其他人登录 */
  LOGIN_BY_OTHERS = 'BS0004',
  /** 404 */
  CODE_404 = 'C0404',
}

/**
 * 主题色枚举
 */
export enum ThemeEnum {
  /** 暗色主题 */
  DARK = 'dark',
  /** 亮色主题 */
  LIGHT = 'light',
}

/**
 * 国际化枚举
 */
export enum LocaleEnum {
  /** 中文 */
  ZH_CN = 'zh-CN',
  /** 英文 */
  EN = 'en',
}

/**
 * PUB/SUB 消息定义枚举
 */
export enum BusEventEnum {
  UPDATE_NEW_MES,
  /** 改变导航选项卡 */
  CHANGE_TAB,
  /** 工单处理【关闭】通知 */
  WO_HANDLE_CLOSE,
}

/**
 * 文件上传媒体类型枚举值
 */
export enum MediaTypeEnum {
  /** 所有类型 */
  ALL = 1,
  /** 文本 */
  TEXT = 2,
  /** 图片 */
  IMAGE = 3,
  /** 视频 */
  VIDEO = 4,
  /** 音频 */
  AUDIO = 5,
  /** 二进制数据 */
  APPLICATION = 6,
}

/**
 * 表单提交状态枚举值
 */
export enum FormSubmitStatusEnum {
  /** 成功 */
  SUCCESS = 1,
  /** 失败 */
  FAIL = 2,
  /** 取消 */
  CANCEL = 3,
  /** 再次新建，不退出组件 */
  CONTINUE = 4,
  /** 再次新建，退出组件 */
  RESET = 5,
}

/**
 * 租户配置信息枚举值
 */
export enum TenantConfigEnum {
  /** 工单下发最长等待时间 */
  COLLECT_FINISH_DAY = 'collect_finish_day',
}

/**
 * 模板下载场景值
 */
export enum TemplateTypeEnum {
  /** 工单导入 */
  IMPORT = 1,
  /** 工单处理 */
  PROCESS = 2,
  /** 切片器运单号 */
  WAYBILL_NO = 3,
  /** 库存水位导入 */
  STOCK_LEVEL = 4,
}

/**
 * 菜单项类型枚举
 */
export enum MenuItemTypeEnum {
  /** 丰景台 */
  FJT = 'fjt',
  /** 订单 */
  ORDER = 'order',
  /** 订单导出 */
  ORDER_IMPORT = 'import',
  /** 订单详情 */
  ORDER_DETAIL = 'orderDetail',
  /** 工单 */
  WO = 'wo',
  /** 工单创建【本地】 */
  WO_CREATE = 'woCreate',
  /** 工单处理结果导入 */
  WORK_ORDER_IMPORT = 'woImport',
  /** 工单处理结果导入 */
  WORK_ORDER_PROCESS_IMPORT = 'processImport',
  /** 库存水位导入 */
  INV_IMPORT = 'invThresholdImport',
  /** 账单列表正式 */
  BILL = 'bill',
  /** 账单批量导入 */
  BILL_IMPORT = 'billImport',
  /** 账单审核批量导入 */
  BILL_APPLY_IMPORT = 'billApplyImport',
  /** 账单审核测试 */
  BILL_APPLY = 'billApply',
  /** 账单预览 */
  BILL_SHOW = 'billShow',
  /** 预警 */
  WARNING = 'waring',
  /** 用户信息 */
  USER = 'user',
  /** 账务中心 */
  ACCOUNT = 'account',
  /** 消息中心 */
  MESSAGE = 'message',
}
