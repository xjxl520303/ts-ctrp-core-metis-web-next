/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { LocaleEnum, ThemeEnum } from '@/enums'
import type { SystemLanguageAttr, SystemThemeAttr, UserDto, UserYearPayDto } from '@/types'
import { setCompactLocale, setCompactTheme } from '@/utils/compact'

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
  | { type: 'SET_LOCALE'; lang?: LocaleEnum | SystemLanguageAttr }
  | { type: 'SET_THEME'; theme?: ThemeEnum | SystemThemeAttr }
  | { type: 'SET_TOKEN'; token?: string }
  | { type: 'SET_IS_INTERNAL'; val?: boolean }
  | { type: 'SET_SHOW_WO_CAPTCHA'; val?: boolean }
  | { type: 'SET_YEAR_PAY_DTO'; val?: UserYearPayDto }
  | { type: 'SET_USER'; user: UserDto }

export type UserServices = {
  // request: GetUserResponse
}

export type UserMachine = ReturnType<typeof createUserMachine>

export const createUserMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFdZgE4GIDKBRAKgPoCqeASgNoAMAuoqAA4D2sAlgC6tMB29IAHogAsAJgA0IAJ6IRIgBwA6AKxVVARiUilcgOxyAnFQBsAXxMTUGHAUL4AErgCyuanSQhmbTjz6CEoiWkEAGYdJWVVKg0tXQNjMws0LDwiABkAeQBhAEFUl1o+Tw4uXnc-AKlhHTUFISVgtSEqGL1DU3MQS2SbfHSAaVwAOVdClmKfMuFxSoQlIx1a4xEjTW1WtQTOpOsiAElsQl3B-FwyQdyR9yLvUtBy6aCjI2CFYKV9YMMWgw2Orp3CNg7OkAOqEEHpQg5AAK+Eydmyl0YYxuvimgUQYX0rzUWmiax+m3+KUIAE1cNkyIRodlSYQACK9JEeFElNH+B6IOQ1JRmDrcJgQOB8LqjLxsyYIAC0Rgx0vaiQwCjQ7GISTF41uAkQwVUiyMIjU+iEchEoiNcrUzwUshWOntBLaRKSyrA7HwAAswABbMAa1GS3VUfWG42m836OWfRQ6ZZKe1hWJOv4ulWpJgAYwAhgAbP1XVkTO46vVNA1Gk1m0NyoTGhTzfQ6ZqJ1rxFNKlX4JgAazAWuuEuLIVLSwr4erM3ewee8hEDqTv0V6Fd7F2sF23HYGG4uf9g+1w+DZdDlYjcqMciMyjk700LcJ7eXKuwHqYAHcQUxMlmGOwMx6sz3IsDyDEMxyrC0Zj0ERlE+KgE0dRctg7N1STALN0GhLNJHpdgmCArU-FA49wLPGY1CoIQFFjFYDV5PkgA */
      schema: {
        context: {} as UserContext,
        events: {} as UserEvents,
        services: {} as UserServices,
      },
      tsTypes: {} as import('./user.typegen').Typegen0,
      predictableActionArguments: true,
      id: 'user',
      context: {
        user: null,
        locale: LocaleEnum.ZH_CN,
        theme: ThemeEnum.LIGHT,
        token: '',
        isInternal: false,
        showWoCaptcha: false,
        yearPayDto: null,
      },
      type: 'parallel',
      states: {
        setUser: {
          entry: [
            'setTheme',
            'setLocale',
            'setToken',
            'setIsInternal',
            'setShowWoCaptcha',
            'setYearPayDto',
          ],
        },
        setTheme: {},
        setLocale: {},
        setToken: {},
        setIsInternal: {},
        setShowWoCaptcha: {},
        setYearPayDto: {},
      },
      on: {
        SET_USER: {
          actions: 'setUser',
          target: 'setUser',
        },
        SET_THEME: {
          actions: 'setTheme',
          target: 'setTheme',
        },
        SET_LOCALE: {
          actions: 'setLocale',
          target: 'setLocale',
        },
        SET_TOKEN: {
          actions: 'setToken',
          target: 'setToken',
        },
        SET_IS_INTERNAL: {
          actions: 'setIsInternal',
          target: 'setIsInternal',
        },
        SET_SHOW_WO_CAPTCHA: {
          actions: 'setShowWoCaptcha',
          target: 'setShowWoCaptcha',
        },
        SET_YEAR_PAY_DTO: {
          actions: 'setYearPayDto',
          target: 'setYearPayDto',
        },
      },
    },
    {
      actions: {
        /**
         * 设置主题
         */
        setTheme: assign({
          theme: (event, { theme }: any) => {
            theme = theme || event.user?.attr.style || ThemeEnum.LIGHT
            return setCompactTheme(theme)
          },
        }),

        /**
         * 设置语言
         */
        setLocale: assign({
          locale: (event, { lang }: any) => {
            lang = lang || event.user?.attr.language || LocaleEnum.ZH_CN
            return setCompactLocale(lang)
          },
        }),

        /**
         * 设置Token
         */
        setToken: assign({ token: (event, { token }: any) => token || event.user?.token || '' }),

        /**
         * 设置是否内部用户
         */
        setIsInternal: assign({ isInternal: (event, { val }: any) => val || event.user?.sfuser || false }),

        /**
         * 设置工单创建时是否显示图形验证码
         */
        setShowWoCaptcha: assign({ showWoCaptcha: (_, { val }: any) => val }),

        /**
         * 设置年包用户信息
         */
        setYearPayDto: assign({ yearPayDto: (event, { val }: any) => val || event.user?.userYearPayDto || null }),

        /**
         * 设置用户
         */
        setUser: assign({ user: (_, { user }) => user }),
      },
    },
  )
}
