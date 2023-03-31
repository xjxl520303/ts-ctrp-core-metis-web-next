import type { ToRefs } from 'vue'
import type { LoginContext } from '@/machines/login'
import { createLoginMachine } from '@/machines/login'
import { loginByPhonePromise, sendPhoneCodePromise, updateUserAttrPromise } from '@/promises'
import type { ActionErrorState } from '@/types'

export interface UseLoginReturnType extends ToRefs<LoginContext> {
  service: ReturnType<typeof useInterpret>
  /** 发送短信验证码 */
  sendPhoneCode: (phone?: string) => Promise<ActionErrorState>
  /** 手机号登录 */
  loginByPhone: (phone: string, phoneCode: string) => Promise<ActionErrorState>
  /** 更新用户拓展信息（样式、语言） */
  updateUserAttr: (key: string, value: string) => Promise<ActionErrorState>
}

/**
 * 使用 `useLogin` 处理登录页面逻辑
 */
export const useLogin = (serviceInstance?: ReturnType<typeof useInterpret>): UseLoginReturnType => {
  const service = serviceInstance || useInterpret(createLoginMachine())
  const error = useSelector(service, state => state.context.error)
  const user = useSelector(service, state => state.context.user)
  const showTrialTips = useSelector(service, state => state.context.showTrialTips)
  const showAppDownload = useSelector(service, state => state.context.showAppDownload)
  const showCountdown = useSelector(service, state => state.context.showCountdown)
  const showRegister = useSelector(service, state => state.context.showRegister)
  const form = useSelector(service, state => state.context.form)
  const sendPhoneCode = (phone?: string) => sendPhoneCodePromise(service, phone)
  const loginByPhone = (phone: string, phoneCode: string) => loginByPhonePromise(service, phone, phoneCode)
  const updateUserAttr = (key: string, value: string) => updateUserAttrPromise(service, key, value)

  return {
    service,
    error,
    user,
    showTrialTips,
    showAppDownload,
    showCountdown,
    showRegister,
    form,
    sendPhoneCode,
    loginByPhone,
    updateUserAttr,
  }
}
