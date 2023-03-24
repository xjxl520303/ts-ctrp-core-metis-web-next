import type { LoginContext } from '@/machines/login'
import { createLoginMachine } from '@/machines/login'
import { sendPhoneCodePromise, updateUserAttrPromise } from '@/promises'

export interface UseLoginReturnType extends LoginContext {
  /** 实例引用 */
  service: ReturnType<typeof useInterpret>
  /** 发送短信验证码 */
  sendPhoneCode: (phone?: string) => void
  /** 更新用户拓展信息（样式、语言） */
  updateUserAttr: (key: string, value: string) => void
}

/**
 * 使用 `useLogin` 处理登录页面逻辑
 */
export const useLogin = (serviceInstance?: ReturnType<typeof useInterpret>) => {
  const service = serviceInstance || useInterpret(createLoginMachine())
  const error = useSelector(service, state => state.context.error)
  const showTrialTips = useSelector(service, state => state.context.showTrialTips)
  const showAppDownload = useSelector(service, state => state.context.showAppDownload)
  const showCountdown = useSelector(service, state => state.context.showCountdown)
  const showRegister = useSelector(service, state => state.context.showRegister)
  const form = useSelector(service, state => state.context.form)
  const sendPhoneCode = (phone?: string) => sendPhoneCodePromise(service, phone)
  const updateUserAttr = (key: string, value: string) => updateUserAttrPromise(service, key, value)

  return {
    service,
    error,
    showTrialTips,
    showAppDownload,
    showCountdown,
    showRegister,
    form,
    sendPhoneCode,
    updateUserAttr,
  } as unknown as UseLoginReturnType
}
