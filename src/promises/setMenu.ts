import type { InterpreterFrom } from 'xstate'
import type { SetMenuContext, SetMenuMachine } from '@/machines/set-menu'
import type { ActionErrorState } from '@/types'

export type SetMenuResult = ActionErrorState & Partial<SetMenuContext>

export const setMenuPromise = async (
  interpreter: InterpreterFrom<SetMenuMachine>,
): Promise<SetMenuResult> =>
  new Promise((resolve) => {
    interpreter.send('REQUEST')
    interpreter.onTransition((state) => {
      if (state.matches('error')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('success')) {
        resolve({
          isError: false,
          isSuccess: true,
          ...state.context,
          error: null,
        })
      }
    })
  })
