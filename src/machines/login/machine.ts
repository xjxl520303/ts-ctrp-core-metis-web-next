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
  sendPhoneCode: { data: SendPhoneCodeResponse }
  loginByPhone: { data: LoginByPhoneResponse }
  updateUserAttr: { data: UpdateUserAttrResponse }
}

export type LoginMachine = ReturnType<typeof createLoginMachine>

export const createLoginMachine = () => {
  return createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBsD2UCWA7AxAZQAkB5AdQH0AVAJQEkBBAGUpoAU8BtABgF1FQAHVLAwAXDKix8QAD0QAWAOwA2AHQKAzEoCcmgKycAHHN0BGLboA0IAJ6ITnXSsMAmLfa2c5DkwF8fVtExcQlIyOhYWMgARUgA5BiI6KK5eJBBBYTEJKVkEYzkVJWUDZ2dtTgc3K1sEE2c-APRsfGJyAGEiAFVYihiSWJSpDNFxSTTcuSVVYyn1BS0FuUXquwr1FV11AwUTZSVNsoUGkEDmkPIqAFEAcRo8CkuqQbThrLHQCYMTFWdPJU5NDs5OoPOoVggDEYfgZNOVNAY3AZjqdgpdYlEyCxiLFLmQOlFLs8BEIRtlxogiuDtKotAoFHJnApnHISiV6v4Tk1cJ0WFE6A8yJ08I8whRqET0iS3jkKQpwboFAY1OZDP8zCV5siuSoAGaoABOAFsVLBDbAcBAJGAVNgAG6oADW1pRuoNxtNsAQdtQAGMAIZvFIS16jGUIf6qdSeBnA3RTebOeUgtScEy6FlaLwmOQ5rVBV1Gk1mnBgfX6g0qfjIAN6wsu2vus1erD2-2BnjBqWh8nhziR6PM9RxopaRM2RC6AyqEqTTgKOPZkFHDn1t0qFEWq02luO53ahvrrnN1sB0ZBnhDLtkj7yTROIomdTqEz-dMOKnzjZKKdeOP0+e6Hm2AFsaG6luW+qVtWIgHqudZHt6bZnh2F4vFe7wyBOkJqJOcyjloXylGONRMloKg5pwmacM4MKlNRQFYCBKgAK6wKWm5YNa3pOoe+YHqxpbHr6p4SOeqTEpk3Y3ggug6IUBFxgsShpqOcrjnkFTkQYpieLSRgaFMDFMQJ+olmWFZVjWa5wcaJlCUhokoeJkqSdemEyXJ2jadoWjKbJjLgjmCiFIY9ggo+dKmIBxxYKgEBwFIKKXq5GG5GY4LZgUL4KnoDIgoZK7ahgEDIGAyWkqlspUlsKiQkozhDs+yg0cujR8W65XSj26ilCo2YIlOHiTPl4KMkqUwKgyRijjGShGQeHqdVJ7lzI4-UEeUw2+fKCicCotLxnOZhDpM83WVyS1ubkq19Rmg1-CN6lMsF2gvlGB2-AVbXAfxbH6pdlUIHMe3rfdW1KIFz5qGq6jAlO+hRq1nLtYW4EGgDYYzioWzKb5mz1TCWjgvSIPaM4cYONpsm+IVKPusxPo+nA8BoSlmMmN8ONmPsmg0SC4Kwn1+waIoXnk1OZ2FrADNM7AsBFizEkVZjsnY1O3P43zRPqaYBQNQCz49VseiS-TjPMyxf0Yz22lkVzeO84TgWbIU+zfkOCzmDsc1+D4QA */
    schema: {
      context: {} as LoginContext,
      events: {} as LoginEvents,
      services: {} as LoginServices,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    predictableActionArguments: true,
    id: 'login',
    context: INITIAL_LOGIN_CONTEXT,
    initial: 'idle',
    states: {
      idle: {},
      form: {
        states: {
          sms: {
            invoke: {
              src: 'sendPhoneCode',
              onDone: {
                target: 'success.sms',
              },
              onError: { target: 'error', actions: 'handleResError' },
            },
          },
          login: {
            invoke: {
              src: 'loginByPhone',
              onDone: {},
              onError: { target: 'error', actions: 'handleResError' },
            },
          },
          user: {
            invoke: {
              src: 'updateUserAttr',
              onDone: {
                target: 'success.user',
              },
              onError: { target: 'error', actions: 'handleResError' },
            },
          },
          error: {},
          success: {
            states: {
              sms: {
                type: 'final',
                entry: [
                  raise({ type: 'SHOW_COUNTDOWN' }),
                ],
              },
              user: {
                type: 'final',
              },
            },
          },
        },
      },
    },
    on: {
      SHOW_TRIAL_TIPS: {
        actions: assign({ showTrialTips: context => !context.showTrialTips }),
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
      SEND_PHONE_CODE: {
        target: 'form.sms',
        cond: context => !!context.form.phone.trim().length,
      },
      UPDATE_USER_ATTR: {
        target: 'form.user',
      },
    },
  }, {
    actions: {
      /** 处理请求失败 */
      handleResError: assign({ error: (_, event: any) => event.data }),
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
