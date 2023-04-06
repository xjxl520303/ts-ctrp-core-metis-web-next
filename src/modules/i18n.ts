import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
// import storage from 'store'
import en from '@/locale/en'
import cn from '@/locale/zh-CN'
import { LocaleEnum } from '@/enums'

const { locale } = useUser()

/** 国际化配置选项 */
export const LOCALE_OPTIONS = [
  { label: '中文', value: LocaleEnum.ZH_CN },
  { label: 'English', value: LocaleEnum.EN },
]

const defaultLocale = locale.value || LocaleEnum.ZH_CN

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    'en': en,
    'zh-CN': cn,
  },
})

export function setupI18n(app: App<Element>) {
  app.use(i18n)
}
