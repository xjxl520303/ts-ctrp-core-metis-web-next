import type { ActorRef } from 'xstate'
import type { ErrorPayload, UserDto } from '@/types'

export interface LoginContext {
  /** 接口错误信息 */
  error: ErrorPayload | null
  /** 显示试用提示 */
  showTrialTips: boolean
  /** 显示下载客户端弹出框 */
  showAppDownload: boolean
  /** 是否显示倒计时 */
  showCountdown: boolean
  /** 注册 */
  showRegister: boolean
  /** 表单 */
  form: {
    /** 手机号 */
    phone: string
    /** 短信验证码 */
    phoneCode: string
  }
  /** 用户信息 */
  user?: UserDto
  /** user Machine 引用 */
  userRef?: ActorRef<any>
}

export const INITIAL_LOGIN_CONTEXT: LoginContext = {
  error: null,
  showTrialTips: true,
  showAppDownload: false,
  showCountdown: false,
  showRegister: false,
  form: reactive({
    phone: '',
    phoneCode: '',
  }),
  user: undefined,
  userRef: undefined,
}
