import type { DynamicListRequest, MilestoneRequest } from '@/types'

export type DynamicListEvents =
  | { type: 'SET.slicerFormModels'; models: Record<string, any> }
  /* --------------------------------- REQUEST -------------------------------- */
  | { type: 'GET_PAGE_CONFIG'; menuId: number }
  | { type: 'GET_MILESTONE'; condition: MilestoneRequest }
  | { type: 'GET_DYNAMIC_LIST'; condition: DynamicListRequest }
