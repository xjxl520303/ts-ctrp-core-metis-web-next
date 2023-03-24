import type { InterpreterFrom } from 'xstate'
import type { MenuContext, MenuMachine } from '@/machines/menu'
import type { ActionErrorState } from '@/types'

export type MenuResult = ActionErrorState & Partial<MenuContext>

export const getMenuPromise = async (
  interpreter: InterpreterFrom<MenuMachine>,
): Promise<MenuResult> =>
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
