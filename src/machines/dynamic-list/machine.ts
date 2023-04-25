/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DynamicListContext } from './context'
import { INITIAL_DYNAMIC_LIST_CONTEXT } from './context'
import type { DynamicListEvents } from './events'
import type { GetDynamicListResponse, GetPageConfigResponse } from '@/types/responses'
import callApi from '@/utils/request'
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { Result } from '@/types'

type DynamicListServices = {
  getPageConfig: GetPageConfigResponse
  getDynamicList: GetDynamicListResponse
}

export type DynamicListMachine = ReturnType<typeof createDynamicListMachine>

export const createDynamicListMachine = () => {
  return createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QQJ4DsCGBbAlgYwBkdYAXAOgwAccycIAbMAYgHEBRAFQH0AFAQXZcAwgHkAcgDEAkiwDaABgC6iUJQD2sHCRxq0KkAA9EARgCsANgA0IFIgAspgJxlzAdkdvHADlfzz80ztXAF9g61RMXEJicioaOkZWTi4AEQBNMT4AWSkhLgIpAGUOBWUkEHVNbV19IwQzKxtEVwsXAGYAJi95Ox8-ANNQ8PRsfCJSCmoyGBIeDBghXQAzHCgmCF0wWjQANzUAay2I0eiJuOmwWfmwRbQVqAQcXbU8DGq0UtL9Sq0dPXK6m0vM4usYOsZHL0OnZwY5rLYEB03GQ7I40Y4Om1fP5AiEwiBjlFxrEpjM5gtlqsmGAAE40tQ0siUehvJYMrBkQljGKTGhk663e6PZ6vd6fJTfDS-GoAxBAkFeMEQqEwiHw+xIsiOUxtYzGVxY-q4oYEkZEnnnGYpM3c0jrTbbPaHTk204kvmXa2RW0kYV7UV-cVlVRS961OXasheOxY5VeaGw9UINymFF+BOGnGDfFct28i4kL0nYnUukMpkskhsmkc3PE-NW13Ev0vN6BpRfco-MOyhBtSPR2OQ+OquFNBCuDodLXpmGZgahfFoNQQOD6OsxSVVP7hhAAWmhSb3MJNG4mCTAW+l-1AdRhSa8XlTT8cbTc89M2eG3rzAFccFePa3hqSaQnYZBtE4b4GtiC45k2FrUIBO69oe44OCi6IYh+QSnghZxTBeyEysBE4dEmdjmOYZBOOYbSUTqk6TmYeE-vWlqXOSNyUlAxE3oYcp2MYZCgrCKqJuOxidFqWGYrBxrwWxiEelcFJ3KstAMJeXahihpF2AZNGuN0YEjhJCJvl4KI6nqMFGrhinFspBZcYKGmwL+eB4HA8A6duJECQgpiPlGriouYw4Jmq45dFZU7mJ+vTyQ535OQRKmuTxZBLBgOCMBAfG7sFVk+OFkWjhRQQuO4nh9DiKWmkp6UFkW5qkIVvb0a4UYxq4cZRWOCI6s4jiznJRpfo1aXui1+HkB5Xk+R1pH+PIWrgtGBlmdFCJuOBdhjR+k1njNjZNeQOV5ZAy2Bat63GJt4k7c0hl0V0PR1XBoRAA */
    schema: {
      context: {} as DynamicListContext,
      events: {} as DynamicListEvents,
      services: {} as DynamicListServices,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    predictableActionArguments: true,
    id: 'dynamicList',
    context: INITIAL_DYNAMIC_LIST_CONTEXT,
    type: 'parallel',
    initial: 'idle',
    states: {
      idle: {},
      ui: {
        on: {

        },
      },
      api: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              GET_PAGE_CONFIG: {
                target: 'getPageConfig',
              },
              GET_DYNAMIC_LIST: {
                target: 'getDynamicList',
              },
            },
          },
          getPageConfig: {
            initial: 'initial',
            invoke: {
              src: 'getPageConfig',
              onDone: {
                target: '.success',
                actions: 'initPageConfig',
              },
              onError: { target: '.failed', actions: 'handleError' },
            },
            states: {
              initial: {},
              success: {},
              failed: {},
            },
          },
          getDynamicList: {
            initial: 'initial',
            invoke: {
              src: 'getDynamicList',
              onDone: {
                target: '.success',
              },
              onError: { target: '.failed', actions: 'handleError' },
            },
            states: {
              initial: {},
              success: {},
              failed: {},
            },
          },
        },
      },
    },
  }, {
    actions: {
      handleError: assign({ error: (_, event: any) => event.data }),

      /** 初始化页面配置信息 */
      initPageConfig: assign({
        btnPermissionOptions: (_, { data }) => data.button ?? [],
        exportBtnOptions: (_, { data }) => data.export ?? [],
        menuBtnOptions: (_, { data }) => data.menuButton ?? [],
        slicerOptions: (_, { data }) => data.slicer ?? [],
        fjtOption: (_, { data }) => data.fjt ?? null,
        milestoneOptions: (_, { data }) => data.mileStone ?? [],
        orderListOptions: (_, { data }) => data.orderList ?? [],
      }),
    },
    services: {
      /**
       * 获取页面配置信息
       **/
      getPageConfig: async (_, { menuId }) => {
        const res: Result = await callApi({
          url: `${URL_PREFIX}/menu/getPageConfig`,
          method: RequestEnum.GET,
          params: {
            menuId,
          },
        })
        if (res.code === ResponseCodeEnum.SUCCESS)
          return { ...res.data, menuId }
        else
          return Promise.reject(res)
      },

      /**
       * 获取列表数据
       **/
      getDynamicList: async (_, { condition }) => {
        const res: Result = await callApi({
          url: `${URL_PREFIX}/dynamic/getPage`,
          method: RequestEnum.POST,
          data: {
            ...condition,
          },
        })
        if (res.code === ResponseCodeEnum.SUCCESS)
          return res.data
        else
          return Promise.reject(res)
      },
    },
  })
}
