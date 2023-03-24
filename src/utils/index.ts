import type { TargetContext } from '@/types'

/**
 * 打开新的浏览器页面
 *
 * @param url URL
 * @param opt window.open `feature` 参数
 */
export const openWindow = (
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean },
) => {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}
