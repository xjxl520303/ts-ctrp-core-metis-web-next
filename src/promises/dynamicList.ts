import type { InterpreterFrom } from 'xstate'
import type { DynamicListMachine } from '@/machines/dynamic-list'
import type { ActionErrorState, DynamicListRequest, MilestoneRequest } from '@/types'

export type GetPageConfigResult = ActionErrorState
export type GetMilestoneResult = ActionErrorState
export type GetDynamicListResult = ActionErrorState

export const getPageConfigPromise = async (
  interpreter: InterpreterFrom<DynamicListMachine>,
  menuId: number,
): Promise<GetPageConfigResult> =>
  new Promise((resolve) => {
    interpreter.send('GET_PAGE_CONFIG', { menuId })
    interpreter.onTransition((state) => {
      if (state.matches('api.getPageConfig.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.getPageConfig.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })

export const getMilestonePromise = async (
  interpreter: InterpreterFrom<DynamicListMachine>,
  condition: MilestoneRequest,
): Promise<GetMilestoneResult> =>
  new Promise((resolve) => {
    interpreter.send('GET_MILESTONE', { condition })
    interpreter.onTransition((state) => {
      if (state.matches('api.getMilestone.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.getMilestone.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })

export const getDynamicListPromise = async (
  interpreter: InterpreterFrom<DynamicListMachine>,
  condition: DynamicListRequest,
): Promise<GetDynamicListResult> =>
  new Promise((resolve) => {
    interpreter.send('GET_DYNAMIC_LIST', { condition })
    interpreter.onTransition((state) => {
      if (state.matches('api.getDynamicList.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.getDynamicList.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })
