import type { ErrorPayload, Result } from './common'
import type { MenuGroupItem } from './model/menuModel'
import type { UserDto } from './model/userModel'

export interface NullableErrorResponse {
  error: ErrorPayload | null
}

/** 获取菜单 */
export interface GetMenuResponse extends NullableErrorResponse, Result<MenuGroupItem[]> {}

/* ------------------------------- page: Login ------------------------------ */
/** 发送手机号短信验证码 */
export interface SendPhoneCodeResponse extends NullableErrorResponse, Result<boolean> {}

/** 手机号验证码登录 */
export interface LoginByPhoneResponse extends NullableErrorResponse, Result<UserDto> {}

/** 更新用户拓展信息（样式、语言） */
export interface UpdateUserAttrResponse extends NullableErrorResponse, Result<UserDto> {}
