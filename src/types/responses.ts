import type { ErrorPayload, OptionsItem, ResponseWithPagination, Result } from './common'
import type { MilestoneDataItem, PageConfigDto } from './model/dynamicListModel'
import type { MenuGroupItem } from './model/menuModel'
import type { UserDto } from './model/userModel'

export interface NullableErrorResponse {
  error: ErrorPayload | null
}

/** 获取菜单 */
export interface GetMenuResponse extends NullableErrorResponse, Result<MenuGroupItem[]> {}

/** 获取列表项数据 */
export interface GetDictResponse extends NullableErrorResponse, Result<OptionsItem[]> {}

/* -------------------------- service: dynamic list ------------------------- */

/** 获取动态列表配置数据 */
export interface GetPageConfigResponse extends NullableErrorResponse, Result<PageConfigDto> {}

/** 获取动态列表数据 */
export interface GetDynamicListResponse extends NullableErrorResponse, Result<ResponseWithPagination<any>> {}

/** 获取里程碑数据 */
export interface GetMilestonesResponse extends NullableErrorResponse, Result<MilestoneDataItem[]> {}

/* ------------------------------- page: Login ------------------------------ */
/** 发送手机号短信验证码 */
export interface SendPhoneCodeResponse extends NullableErrorResponse, Result<boolean> {}

/** 手机号验证码登录 */
export interface LoginByPhoneResponse extends NullableErrorResponse, Result<UserDto> {}

/** 更新用户拓展信息（样式、语言） */
export interface UpdateUserAttrResponse extends NullableErrorResponse, Result<UserDto> {}
