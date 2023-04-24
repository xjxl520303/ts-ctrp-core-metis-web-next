import { LocaleEnum } from '@/enums'

export function useElDateRangeShortcuts() {
  const { locale } = useUser()

  /** el-data-picker 快捷选项 */
  const shortcuts = [
    {
      text: locale.value === LocaleEnum.ZH_CN ? 'Last weeks' : '最近一周',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
        return [start, end]
      })(),
    },
    {
      text: locale.value === LocaleEnum.ZH_CN ? 'Last months' : '最近一个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
        return [start, end]
      })(),
    },
    {
      text: locale.value === LocaleEnum.ZH_CN ? 'Last 3 months' : '最近3个月',
      value: (() => {
        const end = new Date()
        const start = new Date()
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        return [start, end]
      })(),
    },
  ]

  /** el-data-picker 快捷选项2 */
  const shortcutsOfSinglePicker = [
    {
      text: locale.value === LocaleEnum.ZH_CN ? 'Today' : '今天',
      value: new Date(),
    },
    {
      text: locale.value === LocaleEnum.ZH_CN ? 'Yesterday' : '昨天',
      value: (() => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      })(),
    },
    {
      text: locale.value === LocaleEnum.ZH_CN ? 'Last weeks' : '一周前',
      value: (() => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      })(),
    },
  ]

  return {
    shortcuts,
    shortcutsOfSinglePicker,
  }
}
