import { LocaleEnum, ThemeEnum } from '@/enums'
import type { SystemLanguageAttr, SystemThemeAttr } from '@/types'

/**
 * 获取兼容主题
 */
export const getCompactTheme = (theme: ThemeEnum): SystemThemeAttr => {
  if (theme === ThemeEnum.LIGHT)
    return 'white'
  else if (theme === ThemeEnum.DARK)
    return 'black'
  else
    return 'white'
}

/**
 * 获取兼容国际化
 */
export const getCompactLocale = (locale: LocaleEnum): SystemLanguageAttr => {
  if (locale === LocaleEnum.ZH_CN)
    return 'cn'
  else if (locale === LocaleEnum.EN)
    return 'en'
  else
    return 'cn'
}

/**
 * 设置主题
 */
export const setCompactTheme = (theme: SystemThemeAttr | ThemeEnum): ThemeEnum => {
  if (['black', 'white'].includes(theme))
    return theme === 'black' ? ThemeEnum.DARK : ThemeEnum.LIGHT
  else
    return theme as ThemeEnum
}

/**
 * 设置国际化
 */
export const setCompactLocale = (locale: SystemLanguageAttr | LocaleEnum): LocaleEnum => {
  if (['cn', 'en'].includes(locale))
    return locale === 'en' ? LocaleEnum.EN : LocaleEnum.ZH_CN
  else
    return locale as LocaleEnum
}
