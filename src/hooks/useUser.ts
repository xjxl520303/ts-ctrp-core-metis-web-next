import type { ToRefs } from 'vue'
import type { UserContext } from '@/machines/user'
import { createUserMachine } from '@/machines/user'
import { USER_STORAGE_KEY } from '@/constants'

export interface UseUserReturnType extends ToRefs<UserContext> {
  // service: ReturnType<typeof useInterpret>
}

/**
 * 使用 `useRegister` 处理【注册控制塔】页面逻辑
 */
export const useUser = (): UseUserReturnType => {
  const machine = createUserMachine()
  const persistedState = useStorage(USER_STORAGE_KEY, machine.initialState, localStorage)
  const { service } = useMachine(machine, { state: persistedState.value })

  const user = useSelector(service, state => state.context.user)
  const locale = useSelector(service, state => state.context.locale)
  const theme = useSelector(service, state => state.context.theme)
  const token = useSelector(service, state => state.context.token)
  const isInternal = useSelector(service, state => state.context.isInternal)
  const showWoCaptcha = useSelector(service, state => state.context.showWoCaptcha)
  const yearPayDto = useSelector(service, state => state.context.yearPayDto)

  service.onTransition((state) => {
    persistedState.value = state
  })

  return {
    user,
    locale,
    theme,
    token,
    isInternal,
    showWoCaptcha,
    yearPayDto,
  }
}
