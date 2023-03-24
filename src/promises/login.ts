import type { InterpreterFrom } from 'xstate'
import type { ActionErrorState } from '@/types'
import type { UserDto } from '@/types/model/userModel'
import type { LoginMachine } from '@/machines/login'

export type SendPhoneCodeResult = ActionErrorState
export type LoginByPhoneResult = ActionErrorState & Partial<UserDto>
export type LoginByPhoneResult = ActionErrorState & Partial<UserDto>

export const sendPhoneCodePromise = async (
  interpreter: InterpreterFrom<LoginMachine>,
  phone?: string,
): Promise<SendPhoneCodeResult> =>
  new Promise((resolve) => {
    interpreter.send({ type: 'SEND_PHONE_CODE', phone })
    interpreter.onTransition((state) => {
      if (state.matches('form.error')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('form.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })

export const updateUserAttrPromise = async (
  interpreter: InterpreterFrom<LoginMachine>,
  key: string,
  value: string,
): Promise<SendPhoneCodeResult> =>
  new Promise((resolve) => {
    interpreter.send({ type: 'UPDATE_USER_ATTR', key, value })
    interpreter.onTransition((state) => {
      if (state.matches('form.error')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('form.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })
