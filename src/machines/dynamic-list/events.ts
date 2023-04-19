import type { DynamicListRequest } from '@/types'

export type DynamicListEvents =
  | { type: 'SHOW_TRIAL_TIPS' }
  | { type: 'SHOW_APP_DOWNLOAD' }
  | { type: 'SHOW_REGISTER' }
  | { type: 'SHOW_COUNTDOWN' }
  /* --------------------------------- REQUEST -------------------------------- */
  | { type: 'GET_PAGE_CONFIG'; menuId: number }
  | { type: 'GET_DYNAMIC_LIST'; condition: DynamicListRequest }
