/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { ErrorPayload, OptionsItem, Result } from '@/types'
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { GetDictResponse } from '@/types/responses'
import callApi from '@/utils/request'

// 定义上下文
export type GlobalContext = {
  /** 注释 */
  error: ErrorPayload | null
  /** 列表项数据 */
  dictOptions: OptionsItem[]
}

// 定义事件
export type GlobalEvents =
  | { type: 'GET_DICT'; code: string }

// 定义服务
export type GlobalServices = {
  getDict: GetDictResponse
}

// 定义类型
export type GlobalMachine = ReturnType<typeof createGlobalMachine>

// 这里根据情况也可以指定参数传入
export const createGlobalMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5RQDYHsBGBDFA6LADgJYDEA4gKIAquERAxgC4DaADALqKgFqxGNE0AOy4gAHogDsAJgA0IAJ6IAzAE4ALLgCMk1ZOUBWAGxH1ADlaGAvlfmpMOfMVwxGAEQaMSEYWFxEhADc0AGs-e2w8QiIXMHdPBADg+iwBYTZ2DNEePjSRJHFEaWkjXFVWI2llLQNldVYSjXklBBLJXANWLuktMy1e9SNJAxs7dEinGNcPJhIwACd5tHncAhRUgDNlgFsXccdo2PimRKC0FLyMrIKc-kF80AlWkrKKqpq6hqMmxRUjVlw6lqvTMGi06hKZhsthAQjQEDgogiOGyvDuwlETwAtNJ1M1EFiIaMQMiosRUbl7piinjfgggYDVEzJKxOpIaqpjMTSZMjjNGBT0Q9CggdGZXpVqrV6o1aS0tMppGUmUzFdIupJ6spufsyVM4vzcLAAK70ehweA3NF5akINQGXBmTWqPpGZSsVTFLT41qg3DFIzGMy1AzFOpGHUOPV8zy4DZYIgoSCCm0FJ72x3O13uz09H3KMxKnSqIxmOoGcrmWrQqxAA */
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
          states: {
            getDict: {
              invoke: {
                src: 'getDict',
                onDone: {
                  target: '.success',
                  actions: 'setDict',
                },
                onError: { target: '.failed', actions: 'handleResError' },
              },
              states: {
                success: {},
                failed: {},
              },
            },
          },
          on: {
            GET_DICT: {
              target: 'api.getDict',
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
