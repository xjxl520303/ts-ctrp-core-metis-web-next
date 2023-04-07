import { LocaleEnum } from '@/enums'

export function useLocale() {
  const { locale } = useI18n()

  const currentLocale = computed(() => {
    return locale.value
  })

  const isZh = computed(() => {
    return currentLocale.value === LocaleEnum.ZH_CN
  })

  function changeLocale(value: LocaleEnum) {
    locale.value = value
    // window.pluginWebUpdateNotice_ && window.pluginWebUpdateNotice_.setLocale(value)
  }

  return {
    currentLocale,
    isZh,
    changeLocale,
  }
}
