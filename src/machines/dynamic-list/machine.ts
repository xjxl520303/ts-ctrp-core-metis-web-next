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
    /** @xstate-layout N4IgpgJg5mDOIC5QQJ4DsCGBbAlgYwBkdYAXAOgwAccBiAcQFEAVAfQAUBBRlgYQHkAcgDEAknQDaABgC6iUJQD2sHCRwK0ckAA9EAdgBMAGhApE+yQE4yAVkl39AFgsAOAMy2AjLoBsAX1-GqJi4hMTkVDhkMCRsGDA86gBmOFA0EOpgZDhoAG4KANaZQdj4RKQU1FFgMXFgCWjJUAjZeXgYqupS0l2aisodGkjaiB5exqYI3h6uZI4WFrquzt76Fg6u-oHoJaHlEVU18UkpNGAATmcKZ2SUADbtiVdYZMUhZeGV0bFHDSnNuQo2gMuj0hn0VGpBqAdAhRrpxohvIsyLpFg4nB5vBZ9NZUf4AiA0AoIHBNK9SmFekoIepNDCALT6eEmRD07xkOycrnc3SbEDk3bkACuOCp-UhdMQDiMLIQzg8Ni5S3MTNckl5BIF7wqorB1IGkoQ+g8CNh+n0HM5xsxrnNzg1W2CFL2n2q3zqxygYppUOGkwspoc1hm3Os5uDrlRfk12zeYR1B3d9UaZFgQrweDg8D14tpQxhrg8zhsFkj3nVLkkDnV3lN1ntis5Dg8Lms3kjfK18f2X1qyZSZESGBwt0g3oN+cQheL1lLPgrzirNdNWOsjbsHnWbhx0f8QA */
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
    states: {
      ui: {
        on: {

        },
      },
      api: {
        states: {
          getPageConfig: {
            invoke: {
              src: 'getPageConfig',
              onDone: {
                target: '.success',
                actions: 'initPageConfig',
              },
              onError: { target: '.failed', actions: 'handleError' },
            },
            states: {
              success: {},
              failed: {},
            },
          },
          getDynamicList: {
            invoke: {
              src: 'getDynamicList',
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
          GET_PAGE_CONFIG: {
            target: 'api.getPageConfig',
          },
          GET_DYNAMIC_LIST: {
            target: 'api.getDynamicList',
          },
        },
      },
    },
  }, {
    actions: {
      handleError: assign({ error: (_, event: any) => event.data }),

      /** 初始化页面配置信息 */
      initPageConfig: assign({
        btnPermissionOptions: (_, { data }) => data.button || [],
        exportBtnOptions: (_, { data }) => data.export || [],
        menuBtnOptions: (_, { data }) => data.menuButton || [],
        slicerOptions: (_, { data }) => data.slicer || [],
        fjtOption: (_, { data }) => data.fjt,
        milestoneOptions: (_, { data }) => data.mileStone || [],
        orderListOptions: (_, { data }) => data.orderList || [],
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
