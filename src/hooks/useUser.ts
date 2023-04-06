import type { ToRefs } from 'vue'
import type { UserContext } from '@/machines/user'
import { createUserMachine } from '@/machines/user'
import { USER_STORAGE_KEY } from '@/constants'
import type { LocaleEnum, ThemeEnum } from '@/enums'
import type { SystemLanguageAttr, SystemThemeAttr, UserDto } from '@/types'

export interface UseUserReturnType extends ToRefs<UserContext> {
  /** 设置用户 */
  setUser: (user: UserDto) => void
  /** 设置主题 */
  setTheme: (theme?: ThemeEnum | SystemThemeAttr) => void
  /** 设置语言 */
  setLocale: (lang?: LocaleEnum | SystemLanguageAttr) => void
  /** 设置Token */
  setToken: (token?: string) => void
  /** 在工单创建时是否显示图形验证码 */
  setShowWoCaptcha: (val: boolean) => void
}

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
  const setUser = (user: UserDto) => service.send('SET_USER', { user })
  const setTheme = (theme?: ThemeEnum | SystemThemeAttr) => service.send('SET_THEME', { theme })
  const setLocale = (lang?: LocaleEnum | SystemLanguageAttr) => service.send('SET_LOCALE', { lang })
  const setToken = (token?: string) => service.send('SET_TOKEN', { token })
  const setShowWoCaptcha = (val?: boolean) => service.send('SET_SHOW_WO_CAPTCHA', { val })

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
    setUser,
    setTheme,
    setLocale,
    setToken,
    setShowWoCaptcha,
  }
}
