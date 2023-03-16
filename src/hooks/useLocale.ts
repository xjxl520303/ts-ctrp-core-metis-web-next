import type { LocaleEnum } from '@/enums'

export function useLocale() {
  const { locale } = useI18n()

  const currentLocale = computed(() => {
    return locale.value
  })
  function changeLocale(value: LocaleEnum) {
    locale.value = value
    // window.pluginWebUpdateNotice_ && window.pluginWebUpdateNotice_.setLocale(value)
  }

  return {
    currentLocale,
    changeLocale,
  }
}
