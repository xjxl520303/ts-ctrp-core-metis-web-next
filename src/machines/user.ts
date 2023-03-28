/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { LocaleEnum, ThemeEnum } from '@/enums'
import type { SystemLanguageAttr, SystemThemeAttr, UserDto, UserYearPayDto } from '@/types'

export type UserContext = {
  /** 用户信息 */
  user: UserDto | null
  /** 国际化 */
  locale: LocaleEnum
  /** 主题 */
  theme: ThemeEnum
  /** Token */
  token: string
  /** 是否为企业内部用户 */
  isInternal: boolean
  /** 工单创建提交时是否显示滑动验证码 */
  showWoCaptcha: boolean
  /** 年包用户信息 */
  yearPayDto: UserYearPayDto | null
}

export type UserEvents =
  | { type: 'REQUEST' }
  | { type: 'SET_LOCAL'; lang?: LocaleEnum | SystemLanguageAttr }
  | { type: 'SET_THEME'; theme?: ThemeEnum | SystemThemeAttr }
  | { type: 'SET_TOKEN'; token?: string }
  | { type: 'SET_IS_INTERNAL'; val?: boolean }
  | { type: 'SET_SHOW_WO_CAPTCHA'; val: boolean }
  | { type: 'SET_YEAR_PAY_DTO'; val?: UserYearPayDto }
  | { type: 'SET_USER'; val: UserDto }

export type UserServices = {
  // request: GetUserResponse
}

export type UserMachine = ReturnType<typeof createUserMachine>

export const createUserMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4GIBKBRAigKq4DKAKgNoAMAuoqAA4D2sAlgC6tMB29IAHogDsQgDQgAnogCsATlkA6AMxylsqgCZpADiHbZARgC+R8agyYSuMgH0yACVwBZXNTpIQzNpx59BCA2kNBQAWIQA2aXCtcSkA+QV1aMitXX0qcJMzNCwrWwAZAHkAYQBBfLc+Lw4uXg9-QKVQ8KpZJSFpWMQDKmlE6SUDEM0dPSSskHNc6ztCgGlcADlKj2qfOtAGgYUNKkGYyW6NCanLGYBJEhtzxbJcbEXylcYWGt967qUqBW0DA7jtOEhAoIlFhqkxsZTJMcmdbCR7IUAOo2JGFGxlAAKZGK9lKz08r3WfkQsm0O06hwQIiavy0gQh+ih2QseRsAE1cKVsDZMaV2TYACJkQoEta1EkBDQGHYGXSUuJAxTaVTqRmGE6wtmEKzYMVEiUfaliKkhDSKcJKDTaDQiUbpTITbhMCBwPhTKoG96bRDmroIW19FVtNX28bQqYKVgQAA2YE93kNPoDBhlbQ6-rk5ODahGaQ1EZyClgyAAxqW4PBVl6NgJfanEu0FYglJblKq82MMpqMAoMOgmOgE29a-5ZMDpa0m5mlE0dHIgh181CTEA */
      schema: {
        context: {} as UserContext,
        events: {} as UserEvents,
        services: {} as UserServices,
      },
      tsTypes: {} as import('./user.typegen').Typegen0,
      predictableActionArguments: true,
      id: 'user',
      initial: 'idle',
      context: {
        user: null,
        locale: LocaleEnum.ZH_CN,
        theme: ThemeEnum.LIGHT,
        token: '',
        isInternal: false,
        showWoCaptcha: false,
        yearPayDto: null,
      },
      states: {
        idle: {},
        success: {
          entry: [
            raise({ type: 'SET_THEME' }),
            raise({ type: 'SET_LOCAL' }),
            raise({ type: 'SET_TOKEN' }),
            raise({ type: 'SET_IS_INTERNAL' }),
            raise({ type: 'SET_SHOW_WO_CAPTCHA', val: false }),
            raise({ type: 'SET_YEAR_PAY_DTO' }),
          ],
        },
        error: {},
      },
      on: {
        REQUEST: 'idle',
        SET_THEME: {
          actions: assign({
            theme: (event, { theme }) => {
              theme = theme || event.user?.attr.style || ThemeEnum.LIGHT
              if (['black', 'white'].includes(theme))
                return theme === 'black' ? ThemeEnum.DARK : ThemeEnum.LIGHT
              return theme as ThemeEnum
            },
          }),
        },
        SET_LOCAL: {
          actions: assign({
            locale: (event, { lang }) => {
              lang = lang || event.user?.attr.language || LocaleEnum.ZH_CN
              if (['cn', 'en'].includes(lang))
                return lang === 'en' ? LocaleEnum.EN : LocaleEnum.ZH_CN
              return lang as LocaleEnum
            },
          }),
        },
        SET_TOKEN: {
          actions: assign({ token: (event, { token }) => token || event.user?.token || '' }),
        },
        SET_IS_INTERNAL: {
          actions: assign({ isInternal: (event, { val }) => val || event.user?.sfuser || false }),
        },
        SET_SHOW_WO_CAPTCHA: {
          actions: assign({ showWoCaptcha: (_, { val }) => val }),
        },
        SET_YEAR_PAY_DTO: {
          actions: assign({ yearPayDto: (event, { val }) => val || event.user?.userYearPayDto || null }),
        },
        SET_USER: {
          actions: assign({ user: (_, { val }) => val }),
          target: 'success',
        },
      },
    },
    {
      actions: {

      },
      services: {

      },
    },
  )
}
