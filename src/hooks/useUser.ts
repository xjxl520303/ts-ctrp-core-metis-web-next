import type { ToRefs } from 'vue'
import type { UserContext } from '@/machines/user'
import { createUserMachine } from '@/machines/user'

export interface UseUserReturnType extends ToRefs<UserContext> {
  service: ReturnType<typeof useInterpret>
}

/**
 * 使用 `useRegister` 处理【注册控制塔】页面逻辑
 */
export const useUser = (serviceInstance?: ReturnType<typeof useInterpret>): UseUserReturnType => {
  const service = serviceInstance || useInterpret(createUserMachine())
  const user = useSelector(service, state => state.context.user)
  const locale = useSelector(service, state => state.context.locale)
  const theme = useSelector(service, state => state.context.theme)
  const token = useSelector(service, state => state.context.token)
  const isInternal = useSelector(service, state => state.context.isInternal)
  const showWoCaptcha = useSelector(service, state => state.context.showWoCaptcha)
  const yearPayDto = useSelector(service, state => state.context.yearPayDto)

  return {
    service,
    user,
    locale,
    theme,
    token,
    isInternal,
    showWoCaptcha,
    yearPayDto,
  }
}
