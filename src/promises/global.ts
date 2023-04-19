import type { InterpreterFrom } from 'xstate'
import type { GlobalMachine } from '@/machines/global'
import type { ActionErrorState } from '@/types'

export type DictResult = ActionErrorState

export const getDictPromise = async (
  interpreter: InterpreterFrom<GlobalMachine>,
  code: string,
): Promise<DictResult> =>
  new Promise((resolve) => {
    interpreter.send('GET_DICT', { code })
    interpreter.onTransition((state) => {
      if (state.matches('api.getDict.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.getDict.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })
