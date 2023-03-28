import type { InterpreterFrom } from 'xstate'
import type { ActionErrorState } from '@/types'
import type { LoginMachine } from '@/machines/login'

export type SendPhoneCodeResult = ActionErrorState
export type LoginByPhoneResult = ActionErrorState
export type UpdateUserAttrResult = ActionErrorState

export const sendPhoneCodePromise = async (
  interpreter: InterpreterFrom<LoginMachine>,
  phone?: string,
): Promise<SendPhoneCodeResult> =>
  new Promise((resolve) => {
    interpreter.send({ type: 'SEND_PHONE_CODE', phone })
    interpreter.onTransition((state) => {
      if (state.matches('api.sendPhoneCode.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.sendPhoneCode.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })

export const loginByPhonePromise = async (
  interpreter: InterpreterFrom<LoginMachine>,
  phone: string,
  phoneCode: string,
): Promise<LoginByPhoneResult> =>
  new Promise((resolve) => {
    interpreter.send({ type: 'LOGIN_BY_PHONE', phone, phoneCode })
    interpreter.onTransition((state) => {
      if (state.matches('api.loginByPhone.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.loginByPhone.success')) {
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
): Promise<UpdateUserAttrResult> =>
  new Promise((resolve) => {
    interpreter.send({ type: 'UPDATE_USER_ATTR', key, value })
    interpreter.onTransition((state) => {
      if (state.matches('api.updateUserAttr.failed')) {
        resolve({
          error: state.context.error,
          isError: true,
          isSuccess: false,
        })
      }

      if (state.matches('api.updateUserAttr.success')) {
        resolve({
          isError: false,
          isSuccess: true,
          error: null,
        })
      }
    })
  })
