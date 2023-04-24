import cls from 'classnames/dedupe'
import { ThemeEnum } from '@/enums'

export const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: ThemeEnum.DARK,
  valueLight: ThemeEnum.LIGHT,
  // storageKey: StorageEnum.THEME,
})

const toggle = useToggle(isDark)
export function toggleDark() {
  const curHtmlCls = document.getElementsByTagName('html')[0].getAttribute('class')
  const clsWithTheme = cls(curHtmlCls ?? '', { dark: !isDark.value })
  document.getElementsByTagName('html')[0].setAttribute('class', clsWithTheme)
  if (isDark.value)
    import.meta.glob('element-plus/theme-chalk/dark/css-vars.css', { eager: true })
  toggle()
}
