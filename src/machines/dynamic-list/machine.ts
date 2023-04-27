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
    /** @xstate-layout N4IgpgJg5mDOIC5QQJ4DsCGBbAlgYwBkdYAXAOgwAccBiAcQFEAVAfQAUBBRlgYQHkAcgDEAknQDaABgC6iUJQD2sHCRwK0ckAA9EAdgBMAGhApEAFgBs+shd0BOW5LN2nADgCsrgL5fjqTLiExORUtIysACIAmgIcALIiPCwEIgDKTFKySCCKyqrqmjoIBsamCK66AMxknu66uhZOAIxN9t6+IP7Y+ESkFNRkMCRsGDA86gBmOFA0EOpgZDhoAG4KANYLXYG9IQNDI2OT0whLq3gY+WiZmZq5Kmoa2UWVku5k+q5N+laS+maudjslVKiG+ujIzkBujMlT+kgsQJ8fnQ3SCfVCgzAw1GYHGaCmMzAACciQoiWRKAAbC4TMlYMhbHrBfo4THYw7446nBTnS7XGS3JT3ApPRAvN4fL4-P4AoEghBmD5kOzuSpNGH6SovKyuCxIzoo7bMjFDCKGpmkWbzRYrdabc1o3as00OnYnW28h78rLyIWXQpilpkVwwqoGdyvSqK+W2VwQ+H6RMhsxNXWVfWMx0stlmgIWkg0Ymk8lUml0hmu417LG51Fu7me9TewV5B4BhBqprB0OVcOR6MmRCuSp2YPuOwy3TD3TuBE+DpoBQQOCaTM7FvCx6gIoAWj+8p3KeVgJPp5P7gzlb6OAglLAG-9ooVRkHCCakl+wa+sLMM61+kkdpkTzLMAFccAfNsnwHMp3wsLs1T+VoEX0Gd4UvECdhZSCRW3UEzHlMw3khOwPCjL53GcMwMLrKtnSxA5cSOKAcK3bRQTqd5Pm+ACZUBYFXyaWFjyheFXH0CNSPTDo1zotlGLxAkbXuDBKVY9tKk434o0k3VVQsAjX17SQIVVL5WinKN-hoo10WrdkmM5KAyFgUC8DwOB4GyO5HzwhAIwsYM0N4wCZUkASyg+UdEwsdw4qaFVfk8Gz82zfYcUU6YyAmDAcDvCB1KfAKgojELxP+cLCIjGx7EcZw3GSmSrydHNmsKvzvmqENe17CT+xfMpKOqFwrAS3irDnJrMLkl1puvNAVLU7y-SgvzKlishYVcSQ7DaCxxPg9x5SnBDx30UjPl7CNpOA2i7Pokha1s8hXPczz2vY-ymkCidU0qAFhzGixjo-MghNQiN32+naboNOaWtmu7yByvLIA+op3G+5V9D+gG1QnYHX11LtanqRoU1aQF5y8IA */
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
        states: {
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
                actions: 'initDynamicList',
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

      /**
       * 初始化页面配置信息
       **/
      initPageConfig: assign({
        btnPermissionOptions: (_, { data }) => data.button ?? [],
        exportBtnOptions: (_, { data }) => data.export ?? [],
        menuBtnOptions: (_, { data }) => data.menuButton ?? [],
        slicerOptions: (_, { data }) => data.slicer ?? [],
        fjtOption: (_, { data }) => data.fjt ?? null,
        milestoneOptions: (_, { data }) => data.mileStone ?? [],
        orderListOptions: (_, { data }) => data.orderList ?? [],
      }),

      /**
       * 初始化列表数据
       */
      initDynamicList: assign({ dynamicList: (_, event) => event.data }),
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
