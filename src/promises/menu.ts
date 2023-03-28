import type { InterpreterFrom } from 'xstate'
import type { MenuMachine } from '@/machines/menu'
import type { ActionErrorState } from '@/types'

export type MenuResult = ActionErrorState

export const getMenuPromise = async (
  interpreter: InterpreterFrom<MenuMachine>,
): Promise<MenuResult> =>
  new Promise((resolve) => {
    interpreter.send('GET_MENUS')
    interpreter.onTransition((state) => {
      if (state.matches('api.getMenus.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.getMenus.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })
