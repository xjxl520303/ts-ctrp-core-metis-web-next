/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { ErrorPayload, MenuGroupItem, MenuItem, Result } from '@/types'
import callApi from '@/utils/request'

export type SetMenuContext = {
  /** 接口错误信息 */
  error: ErrorPayload | null
  /** 菜单集合 */
  menus: MenuGroupItem[]
  /** 丰景台ID集合 */
  fjtMenuIds: number[]
  /** 当前激活菜单组 */
  activeGroupMenu: MenuGroupItem | null
  /** 当前激活菜单 */
  activeMenu: MenuItem | undefined
  /** 缓存菜单分组 */
  cacheGroupMenu: MenuGroupItem[]
  /** 缓存菜单 */
  cacheMenu: MenuItem | undefined
  /** 菜单ID与菜单分组引用关系 */
  __refs?: Map<number, string>
}

export type SetMenuEvents =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS' }
  | { type: 'ERROR'; error: ErrorPayload | null }
  | { type: 'MARK.activeGroup'; code?: string }
  | { type: 'MARK.active'; id?: number }
  | { type: 'GET_FJT_IDS' }

export type SetMenuServices = {
  request: { data: Result<MenuGroupItem[]> | { error: ErrorPayload } | null }
}

export type SetMenuMachine = ReturnType<typeof createSetMenuMachine>

export const createSetMenuMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5SzAFwLJgHYFcDEASgKICKAqkQMoAqA2gAwC6ioADgPawCWqX7WLEAA9EANgDsAGhABPRAFYAjIoB0AZnkBONQBY9ADgBMOw4s0Bfc9JQZs+IgQIB5Ag2ZIQHbr36CRCCWk5BDU1QxUdelFTTR0jEzNLazRMXDx0AEECAGkVAEMAY14ANzAAcQAndhxWN0EvHj4BD38w8RVFOJ01cXkgxEUeiPk1RUN5JJAbVPxMnPyirlK6jwafZtBWnU0I031e-oQxyem7PDKiagB9ADEAKWuASQARShW2TkbfFsRdHeVxIp9n1ZIhATt5NEdKJYvEYicUnYVBUwABHHBwVB4CD8MAqLhYYrsADWeJR6Mx708n3WfkQ230HXG9DU9CUvXE+kUh0h7X0Gk0UU0cMSVimiNwyLRGNgWLAFSqFRUrAANnlUAAzdgVAC2UopsqpayadIQDKZ8hZbMUHK5hx04h0Kn0Rk5ZhFFkmWHYEDgglOuHqNJNPyOmkOxidguiZjixj2+gRtklXAgKrAQe8Ic2AzZKmF3QOoLNalE6i0ugM8dFyWTOH1MtQma+G2EiEMoXzomB9v25e0ejjCU9tZmKlgOAKBTg8FWwe+OYCfcLI2ttu5xfkkRUUWMMKH8LFAfr8sVzdpoe77RXrPZ8jdh1LqhdhjdwurnssQA */
      schema: {
        context: {} as SetMenuContext,
        events: {} as SetMenuEvents,
        services: {} as SetMenuServices,
      },
      tsTypes: {} as import('./set-menu.typegen').Typegen0,
      predictableActionArguments: true,
      id: 'setMenu',
      initial: 'idle',
      context: {
        error: null,
        menus: [],
        fjtMenuIds: [],
        activeGroupMenu: null,
        activeMenu: undefined,
        cacheGroupMenu: [],
        cacheMenu: undefined,
        __refs: undefined,
      },
      states: {
        idle: {

        },
        request: {
          invoke: {
            src: 'fetchMenus',
            id: 'request',
            onDone: { target: 'success', actions: 'handleResSuccess' },
            onError: { target: 'error', actions: 'handleResError' },
          },
        },
        success: {
          entry: [
            raise({ type: 'MARK.activeGroup' }),
            raise({ type: 'MARK.active' }),
            raise({ type: 'GET_FJT_IDS' }),
          ],
        },
        error: {},
      },
      on: {
        'REQUEST': 'request',
        'ERROR': {
          actions: 'handleResError',
          target: 'error',
        },
        'MARK.activeGroup': {
          cond: context => context.menus.length > 0,
          actions: ['getActiveGroupMenu'],
          description: '获取当前激活菜单所在分组菜单',
        },
        'MARK.active': {
          cond: context => context.menus.length > 0,
          actions: ['getActiveMenu'],
          description: '获取当前激活菜单',
        },
        'GET_FJT_IDS': {
          cond: context => context.menus.length > 0,
          actions: ['getFjtIds'],
          description: '获取丰景台菜单ID',
        },
      },
    },
    {
      actions: {
        /** 处理请求成功 */
        handleResSuccess: assign({
          menus: (_, event: any) => event.data,
          __refs: (_, event: any) => {
            const map = new Map()
            event.data.forEach((item: MenuGroupItem) => {
              if (item.menuList && Array.isArray(item.menuList) && item.menuList.length > 0)
                item.menuList.forEach(menu => map.set(menu.id, item.code))
            })
            return map
          },
        }),
        /** 处理请求失败 */
        handleResError: assign({ error: (_, event: any) => event.data }),
        /** 获取激活菜单组 */
        getActiveGroupMenu: assign({
          activeGroupMenu: (context, event) => context.menus.find((group: MenuGroupItem) => {
            if (event.code) {
              if (group.code === event.code)
                return group.menuList
              else
                return group.menuList && Array.isArray(group.menuList)
            }

            return group.menuList && Array.isArray(group.menuList)
          }) || null,
        }),
        /** 获取激活菜单 */
        getActiveMenu: assign({
          activeMenu: (context, event) => {
            if (event.id) {
              if (context.activeGroupMenu)
                return context.activeGroupMenu.menuList.find(item => item.id === event.id)
              else
                return context.menus.find(item => item.code === context!.__refs?.get(event.id!))?.menuList.find(item => item.id === event.id)
            }
            else {
              if (context.activeGroupMenu)
                return context.activeGroupMenu.menuList[0]
            }
          },
        }),
        /** 获取默认激活菜单组 */
        getFjtIds: assign({
          fjtMenuIds: (context) => {
            const ids: number[] = []
            context.menus.forEach((group: MenuGroupItem) => {
              if (group.menuList) {
                group.menuList.forEach((item: MenuItem) => {
                  if (item.type === 'fjt')
                    ids.push(item.id as number)
                })
              }
            })
            return ids
          },
        }),
      },
      services: {
        /** 获取菜单 */
        fetchMenus: async () => {
          const res: Result<MenuGroupItem[]> = await callApi({
            url: `${URL_PREFIX}/menu/getMenu`,
            method: RequestEnum.GET,
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
