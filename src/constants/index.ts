export const URL_PREFIX = '/api/metis'
export const REDIRECT_NAME = 'Redirect'
export const PAGE_NOT_FOUND_NAME = 'PageNotFound'
export const EXCEPTION_COMPONENT = () => import('@/views/sys/exception/index.vue')
export const LAYOUT = () => import('@/layouts/index.vue')

export const MENU_STORAGE_KEY = 'ZX_MENU_STORE'
export const USER_STORAGE_KEY = 'ZX_USER_STORE'

/** 里程碑支持的颜色 */
export const MILESTONE_NODE_COLORS = ['#AA7CFF', '#2697FF', '#20DEFF', '#14F8B3', '#FFD300', '#FF7B43', '#FF393C']

/** 里程碑颜色兼容白名单 */
export const MILESTONE_COMPACT_COLOR_NAME: Record<string, any> = {
  BLUE: '#2697FF',
  ORANGE: '#FF7B43',
  GREEN: '#00EEA2',
  RED: '#FF393C',
}
