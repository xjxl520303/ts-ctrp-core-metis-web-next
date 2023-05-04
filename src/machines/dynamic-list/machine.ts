/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DynamicListContext } from './context'
import { INITIAL_DYNAMIC_LIST_CONTEXT } from './context'
import type { DynamicListEvents } from './events'
import type { GetDynamicListResponse, GetMilestonesResponse, GetPageConfigResponse } from '@/types/responses'
import callApi from '@/utils/request'
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { Result } from '@/types'

type DynamicListServices = {
  getPageConfig: GetPageConfigResponse
  getMilestone: GetMilestonesResponse
  getDynamicList: GetDynamicListResponse
}

export type DynamicListMachine = ReturnType<typeof createDynamicListMachine>

export const createDynamicListMachine = () => {
  return createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QQJ4DsCGBbAlgYwBkdYAXAOgFccBiAZQFEAVM2AG3zACcAxAe06wBZXhDCtYAbQAMAXUSgADr1g4SOXmnkgAHogDsAJgA0IFIgCMAVgAsAZjJ69l87YCc1gGwHbLvQF8-E1RMXEJicgwFGgBxJgB9AAUAQVi4gGEAeQA5bgBJaOk5JBAlFTUNLV0EQxMzBAAOPWsHVyl622t653qpVw8AoPRsfCJSMkiY+MFcgnpaRmz6Qq1S1XVNYqqa0wsDeo8yNz1ey26m5wGQYOGwsYnqWMY4gBEATSyk6bS4glz55eKq3KG1AW2MOwQnns5nq1ksBgR8Nslkcl2uoVGESiZBgJASGBgaQ0ADMcFBqBANGAyDg0AA3XgAa2p6JG4XG2Nx+MJJLJCFpDLwGGBhQBimUawqm0QtikljIBk89VcKKatg8nlqiA8elcZDlHlsXThUgMhlsaKGGPZExxYDxBLARLQpPJXE4-DIClYwuJ-CwZFZtyxODtDp5Lr5At4QpFsjFJQlwMqMrlCqVKscdg1Hi1DWsUjI+2V5ikeg6OtclpCbLunPtghwrDgJCpFKpNPpTJZVtrIbDjebpCp-K7sfWotkKyT6xTCD2eharj6Hl6bV69TzpdaZA8Xg8rh61lchmsBmrN0xHNDuMHLbb7s93t9-sDveD14HTfvaDAo8FwoTvGU6AjOUqgogC5Liua49IeW4GPCZDWE4CK2Oh1guOYF7WnWN72s876Yu2v6dgyzJvjWH62rihFUZi-4xoBGiTkU4plLO0oID45hFr06qnOYTidJYeYGDqyGWFI0nHAehqypYOF9p+tFEeE1CPpwXo+iQfoCJRl42vWJB0YZpCMeOLHAWxiYceBOgyuYvFwQJzjCV0eZnnq4mIYeLjwmaFqXGgIhwFoQaYtOdkgg5CAALSKnmcVnkpH44BAzZRZKMVVGeW6YfKupuB4jQeOYh7+IEVxqWMVBZcmXGJRC5hwgcC4avUBhWDq4mpVeVAsPatDsHgXB8AIwiiOI9WcRB84nvqiFymaMIlTqehbpYEkwnoZXGgerh7H1Rk4DN9lVE1dRwshjTHuYip7phQWDPRJ1htyTq8lAZ05ZBKLpiVmZqjmeY2M0lj1L4kOwrtbTHXh72Os6rqdmsGCsD9c7IgcfSYVIa1bZDG0QnonWHE45geDYy49Ci8P9lySNfSwFB4KNsDwKB0VzlJBy7fUPSlrCVModYebHIWfTKqaXSw4q9MqfaH3I2SZDEhg34QJjXG8w4JWC20ng2E0eb7AYDiQ248LOAVilVRFb23t+w6-trc3eHqurLnusEbnmKoHDtB5lrCXVmgrNENs7rakbSaMY1z2VY+hZBbQWQs9F4QlbuV9h+ShcGHSi-T2zVDNR0OMfUrArPs5z7FJ1xKGLrb5aYSeOqUzn92p6hnQdLtnQR8Zd4u9S6ua27sXN8hVgoh05W7XoXfNWazRGrtrQ2NJezWMP+EmWXU8XYafGuK5Qk2B5zW2ObJ7HjTUiYV1e+l69COqe-5Bx2o6PHzKVMFTHB4oqVwMIbB5lsMcPWjRGhOTAY9EuL0zLl0Pl-FmbM4D11so3OazgDjQyaFIIWBdbBiWVIcLwpxyw6lOCVfeYZTK4XIBPZsWtE4NTwZTIsO106G1JmQiEcJeKXzaOJZwfQoEBACEAA */
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
        states: {
          setSlicerFormModels: {},
        },
        on: {
          'SET.slicerFormModels': {
            target: '.setSlicerFormModels',
            actions: 'setSlicerFormModels',
          },
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
          getMilestone: {
            initial: 'initial',
            invoke: {
              src: 'getMilestone',
              onDone: {
                target: '.success',
                actions: 'initMilestone',
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
          GET_MILESTONE: {
            target: 'api.getMilestone',
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
       * 设置切片器表单模型
       */
      setSlicerFormModels: assign({ slicerFormModels: (_, { models }) => models }),

      /**
       * 初始化里程碑数据
       */
      initMilestone: assign({ milestoneData: (_, event) => event.data }),

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
       * 获取里程碑数据
       **/
      getMilestone: async (_, { condition }) => {
        const res: Result = await callApi({
          url: `${URL_PREFIX}/dynamic/getMileStoneData`,
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
