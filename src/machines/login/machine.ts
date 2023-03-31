/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { createUserMachine } from '../user'
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
    /** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AdAVwwGIBlACQHkB1AfQBUAlASQEEAZOxgBWIG0AGALqJQAB1SwMAFwyoswkAA9EAJgCcARhwA2LQBZ1B5etW6tAdi0AaEAE9E+vjgDMZ1U5e6Lxp8q0BfP2s0TFwCEgoaZk5OagARKgA5VnJmWP4hJBAxCWlZeSUEX1Vnc3UADi0nPj4nMs9rOwQndS0cXV81ZWUAVjNlCoCg9Gx8IjIqagBhcgBVBNp4ygT0+WypGTlMgv7NZTMnXTLu0zKe9WVdBpUutv31F1Vesuf7wZBgkbDxmnoAUQBxRjEWi-egrTJrXKbUDbVStdSuMwtfple58SpXBDnMo4brGVRlJxabp1VR8fpvD64ACGIjGvwSsWonAoCV+U3IsV+4NE4nWeS2iGROFcfD6vXa3QuukutiFRl0JVJZl6VTFlOGNLphGSgIS1AAQgBNZms7mCVZ8qH5IVaZQisnisyS6WyxrqElOHBdVxEsVaI7KJwakI4WlEGacWLMEHUGbEUHUGMMHlZK0bG1Yu0OsU9Z09V2YsqubTtcllMV8ExOVQhkbhnCwMBYCCcAAWsjAk1QEDAhAgnZw2AAbqgANZgHBUsN0xvN1sdrBdntgBAj1AAY2pUPSqchGcFCF05JwGlVjxaCN03UxBmMOAMFSr5w0pjrWowc5b7c73d7hDAAAnQDUEAnARGQbcADNQIAWynTUZ0-Jtv0XZdezXLBRy3HdBD3dMBRhewTzPfYLy0K8bzlLEEWKPRjDqAw+G6R5-ECd5EIbKkDRsH8l37Qd1wnBDQy4zUeL41d1xwjZdwtCECOhRREFqMxtDhOESWUdEpWUW92mKKtuirExqhMcp3yQkTsAktCAOA0DwMgyQYMA+DpzEkJbM7TDsO3WS8Pk3kcgPIimmLdStE004dK6W9jhxYz7nubp3EeclLIbPARAgbcwBmJtAOYSRJEAgSlyHLDx0nDzZ2y3LJHywritK3zN382Q5IyYL+SUgpj26NpmicVKzDKVQJueMwi2qNoPU8dw+Hm7pMrqnK8oKoCWrKoCQLAiDoLg6yP3wdbGs2oqSsAtqZM6wLurTELCOUo9mKGlKXHGybiyLa9T2W45iTMdFgzeLAV3gTIqUtJ6+sQHQcydF0ZTdRAAFpBoJapyg9AMa20spLIIGHeszR85ocD09jqaorGo4zincC4NDMFUWIMMxVowEnrUPAxFVFJGCxRzFelafRujxT0nj4Qn2Nq5D50kv8wB50KXpGxVSJrPEKOdKjGkeHEKiOCtmOG84ua-BdfxXRs8A3Dc4EhnrebCijFSqSp9maANnTKW8qy9IkjlcOFznuOWhlE2cUJtpcVZwKDqQwZBIDV56Cg95wQZ9lpi0OW9tM0EOKPObotDFAZ5c42duN4tCM7hpoa0i6LtOJOLqJfRUWN0Ca+H0I4al0K368k+3HedpvMxJEvUqMFopWqFj9L0HBB9OXxxpxzma5jz9x7QpOU7TiAZ8POfnAXgxO5X1R4uB71qYqe4NGLKOOIP06GqararovmFEaaldDDVGl9AkP1qI6C9GeQ4hwJqvmUFbeqG1mpXUnk7WALtHqk0PJXNS9wZQmADAiCs01qKuBxBLeB5CJrmBQWdP+l1Son1TunBSsNMwEIfAcfuJwyFiiLAjPQ2kfDmBGhcNiAQgA */
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
    entry: assign({
      userRef: () => spawn(createUserMachine(), { sync: true }),
    }),
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
                actions: [
                  (context, event) => {
                    context.userRef?.send({ type: 'SET_USER', val: event.data })
                  },
                  assign({ user: ({ userRef }) => userRef?.getSnapshot().context.user }),
                ],
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
