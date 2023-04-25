/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { ErrorPayload, OptionsItem, Result } from '@/types'
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { GetDictResponse } from '@/types/responses'
import callApi from '@/utils/request'

export type GlobalContext = {
  /** 注释 */
  error: ErrorPayload | null
  /** 列表项数据 */
  dictOptions: OptionsItem[]
}

export type GlobalEvents =
  | { type: 'GET_DICT'; code: string }

export type GlobalServices = {
  getDict: GetDictResponse
}

export type GlobalMachine = ReturnType<typeof createGlobalMachine>

export const createGlobalMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5RQDYHsBGBDFA6LADgJa5EQpgDEA4gKIAqA+gCICSAwvQNoAMAuolAE0sIgBciaAHaCQAD0QBGAKwA2ADQgAnkuWKAvvs2pMOfMVwwxzIgGMxlCNLCkpANzQBrFyex5CJFY29ghE7mi2WBLSvHyxssKi0TJI8kqKAOyaOgjKAEwAnIbG6H7mgWDWdg5gAE61aLW4BChRAGaNALaWpWYBlpXBYqHhkcmx8amJ4pIpoAoIipnZiKp5irgFygDMinnKhkYgUmgQcLK+OAkiM9KyCwC0eVnaiE8ALMUgl-7E10mze6IdYrBCqba4A5HH7lUjkMD-W5zNIIDJ5UEqDZQkqmX4VKr2RHJIFggqg7YFd6Qr4w-pBaq4WAAV1stjg8CmN2JqQWeQAHMpNqo+RllKDlMoeLg0ao1Psab08QMCWJcG0sEQKBAiYCecCBUKRWLXmD3hDVBkCsLRYd9EA */
      schema: {
        context: {} as GlobalContext,
        events: {} as GlobalEvents,
        services: {} as GlobalServices,
      },
      tsTypes: {} as import('./global.typegen').Typegen0,
      predictableActionArguments: true,
      id: 'global',
      context: {
        error: null,
        dictOptions: [],
      },
      type: 'parallel',
      states: {
        api: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                GET_DICT: {
                  target: 'getDict',
                },
              },
            },
            getDict: {
              initial: 'initial',
              invoke: {
                src: 'getDict',
                onDone: {
                  target: '.success',
                  actions: 'setDict',
                },
                onError: { target: '.failed', actions: 'handleResError' },
              },
              states: {
                initial: {
                  entry: () => assign({ dictOptions: [] }),
                },
                success: {},
                failed: {},
              },
            },
          },
        },
      },
    },
    {
      actions: {
        /**
         * 处理请求失败
         **/
        handleResError: assign({ error: (_, event: any) => event.data }),

        /**
         * 设置配置字典
         */
        setDict: assign({ dictOptions: (_, { data }) => data }),
      },
      services: {
        /**
         * 获取配置字典
         **/
        getDict: async (_, event) => {
          const res: Result = await callApi({
            url: `${URL_PREFIX}/dict/getDict`,
            method: RequestEnum.GET,
            params: {
              dictCode: event.code,
            },
          })
          if (res.code === ResponseCodeEnum.SUCCESS)
            return res.data
          else
            return Promise.reject(res)
        },
      },
    },
  )
}
