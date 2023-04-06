/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { LoginContext } from './context'
import { INITIAL_LOGIN_CONTEXT } from './context'
import type { LoginEvents } from './events'
import type { LoginByPhoneResponse, SendPhoneCodeResponse, UpdateUserAttrResponse } from '@/types/responses'
import callApi from '@/utils/request'
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { Result } from '@/types'

type LoginServices = {
  sendPhoneCode: SendPhoneCodeResponse
  loginByPhone: LoginByPhoneResponse
  updateUserAttr: UpdateUserAttrResponse
}

export type LoginMachine = ReturnType<typeof createLoginMachine>

export const createLoginMachine = () => {
  return createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AdAVwwGIBlACQHkB1AfQBUAlASQEEAZOxgBWIG0AGALqJQAB1SwMAFwyoswkAA9EAdgDMAVhzqAbACYALAA51fAJyrt607oA0IAJ6JVpwzgCM63ce-q1ugL7+dmiYuAQkFDTMnJzUACJUAHKs5Mxx-EJIIGIS0rLySgie2jhq+hqW6m5efIZ2jgiqunw4+rp6hk3ayp2q+sqBwejY+ERkVNQAwuQAqom0CZSJGfI5UjJyWYXqqq7a+nzaZtqmym5u+-WIugatah76lS6m6oMgISPh4zT0AKIA4oxiLRfvQVlk1nlNqBtjstI9jG5jKZ9C5bA5ENVXJ4+HxztptKplMcAkF3sNcABDERjX6JOLUTgURK-KbkOK-cGicTrfJbFTohpuWqqHCdXTqfTqQxuYm6C5vD5UmmEFKAxLUABCAE1GczOYJVjyoQUBVcEG42iVdLtibjfEidoqKThqUQZpw4swQdQZsRQdRvQwudljRtTQhlIKVEZ3HwrKY+Ko3Ko8R5naFXTScLAwFgIJwABayMCTVAQMCECAlnDYABuqAA1mAcEqsxgc3mC8WsKXy2AEPXUABjSlQjIhyHh-mNS3uCV4l5GfRS6MIZ5aQwSqrOVOGU4ZkZuzv5oslssVwhgABO19Q15wImQY4AZveALatl3H3Onnt9itBywBtR3HQRJzDPkYScOdqhMNwl0MFdPHNYUTDjKxDGJZM+gPMk22PJVNXsM9eyrGsh2bL9M0IiliNIgch1AjYJ0NCFIOhRRrhcHBEz0bRZU8UxTjqDELV0YStCsJM+HKYksLcQ9lQ7IiSP-K9b3vR9n0kN9r0-Ajs1UhigJAscWPAtjuVyadoIQCTXD49pBIkkTUOcXQtGqS1qjOKpdAGfDv2zPARAgMcwBmXNr2YSRJGvcje1rYCmxbQyO1C8LJEi6LYvi0yR3M2RWMyazeU4wpkxKfZDmUSVOmUKVVHNAkSiw8wXCqYSmkCoYaJCsKIqim88oSm87wfJ9Xw-aijwGrKcpGuLrwK5jiss0rQxsqCuNnaqDm6eqiSa80zn0HAiRRPgAoJR5lG0QIySwft4CyJUjW2irEAAWgMc1vs0U5hOBkHgaU0YPvKiNzlMVpLXjbpTmlG1mrEto3Au5QUXOdruka1RwbdSGTRnP60fKMUsYOKo2jq-dCezX9u3Pftids3b2hKODF3q5C1y3WHVCaB1qnaCxTAZjsmYYi8W1gPBh2HOBXrKkm7M8TQqh0PF+hXRdzVMQkxWFgT5R0awHqC-qpa7GX+xwF9KQwZBIDZnbtglLztctRqDgQ1C+DOY2JSlGU5QVK25pUui1JLN2vvs9CnIEurXJ6VCLk0eNExEyxlDqxTI+U2asHo-8cwVpXYBVraoZnVFPJ0EPUVMC5sfUdz5RwLx1Glawbjq6xJZLsua0d53XfYz6IwbrQ9ElFu2-0DxUOX86bSw3F4zOJDDGHzKhty5b44jdo9gOuqjGOnZzR2DHLuX5wkSOCx98G7Lhpi5aK8V5WT5nHEF1yhbg8PGfcloWqWEpldP2mcURvwWp-UaDsnYuwgP-dWzQgG7DNmA1u+hToWAwsJJMKY0yWz6iMLsGDdq+FQnVEojwNbymzrsS2gQgA */
    schema: {
      context: {} as LoginContext,
      events: {} as LoginEvents,
      services: {} as LoginServices,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    predictableActionArguments: true,
    id: 'login',
    context: INITIAL_LOGIN_CONTEXT,
    type: 'parallel',
    // entry: assign({
    //   userRef: () => spawn(createUserMachine(), { sync: true }),
    // }),
    states: {
      ui: {
        on: {
          SHOW_TRIAL_TIPS: {
            actions: assign({ showTrialTips: context => !context.showTrialTips }),
            target: 'end',
          },
          SHOW_APP_DOWNLOAD: {
            actions: assign({ showAppDownload: context => !context.showAppDownload }),
          },
          SHOW_COUNTDOWN: {
            actions: assign({
              showCountdown: context => !context.showCountdown,
            }),
          },
          SHOW_REGISTER: {
            actions: [
              assign({ showRegister: context => !context.showRegister }),
            ],
          },
        },
      },
      api: {
        states: {
          sendPhoneCode: {
            invoke: {
              src: 'sendPhoneCode',
              onDone: {
                target: '.success',
              },
              onError: { target: '.failed', actions: 'handleError' },
            },
            states: {
              success: {
                type: 'final',
                exit: [
                  raise({ type: 'SHOW_COUNTDOWN' }),
                ],
              },
              failed: {},
            },
          },
          loginByPhone: {
            invoke: {
              src: 'loginByPhone',
              onDone: {
                target: '.success',
                actions: assign({
                  user: (_, { data }) => data,
                }),
                // actions: [
                //   (context, event) => {
                //     context.userRef?.send({ type: 'SET_USER', user: event.data })
                //     console.log(context.userRef?.getSnapshot(), 'kkk')
                //     if (!localStorage.getItem(USER_STORAGE_KEY))
                //       // 持久化用户数据
                //       useStorage(USER_STORAGE_KEY, context.userRef?.getSnapshot(), localStorage)
                //   },
                //   assign({ user: ({ userRef }) => userRef?.getSnapshot().context.user }),
                // ],
              },
              onError: { target: '.failed', actions: 'handleError' },
            },
            states: {
              success: {},
              failed: {},
            },
          },
          updateUserAttr: {
            invoke: {
              src: 'updateUserAttr',
              onDone: {
                target: '.success',
              },
              onError: { target: '.failed', actions: 'handleError' },
            },
            states: {
              success: {},
              failed: {},
            },
          },
        },
        on: {
          SEND_PHONE_CODE: {
            target: 'api.sendPhoneCode',
          },
          LOGIN_BY_PHONE: {
            target: 'api.loginByPhone',
          },
          UPDATE_USER_ATTR: {
            target: 'api.updateUserAttr',
          },
        },
      },
      end: {
        type: 'final',
      },
    },
  }, {
    actions: {
      handleError: assign({ error: (_, event: any) => event.data }),
    },
    services: {
      /** 发送手机号短信验证码 */
      sendPhoneCode: async (context, event) => {
        const phone = event.phone || context.form.phone
        const res: Result = await callApi({
          url: `${URL_PREFIX}/user/send/phoneCode?phone=${encodeURIComponent(phone)}`,
          method: RequestEnum.POST,
          data: {
            phone: encodeURIComponent(phone),
          },
        })
        if (res.code === ResponseCodeEnum.SUCCESS)
          return res.data
        else
          return Promise.reject(res)
      },
      /** 手机号验证码登录 */
      loginByPhone: async (_, { phone, phoneCode }) => {
        const res: Result = await callApi({
          url: `${URL_PREFIX}/user/phone/login`,
          method: RequestEnum.POST,
          data: {
            phone: encodeURIComponent(phone),
            phoneCode,
          },
        })
        if (res.code === ResponseCodeEnum.SUCCESS)
          return res.data
        else
          return Promise.reject(res)
      },
      /** 更新用户拓展信息（样式、语言） */
      updateUserAttr: async (_, { key, value }) => {
        const res: Result = await callApi({
          url: `${URL_PREFIX}/user/updateAttr`,
          method: RequestEnum.POST,
          data: { key, value },
        })
        if (res.code === ResponseCodeEnum.SUCCESS)
          return res.data
        else
          return Promise.reject(res)
      },
    },
  })
}
