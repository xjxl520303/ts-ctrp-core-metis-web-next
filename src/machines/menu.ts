/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { ErrorPayload, MenuGroupItem, MenuItem, Result } from '@/types'
import type { GetMenuResponse } from '@/types/responses'
import callApi from '@/utils/request'

export type MenuContext = {
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

export type MenuEvents =
  | { type: 'GET_MENUS' }
  | { type: 'MARK.activeGroup'; code?: string }
  | { type: 'MARK.active'; id?: number }
  | { type: 'GET_FJT_IDS' }

export type MenuServices = {
  request: GetMenuResponse
}

export type MenuMachine = ReturnType<typeof createMenuMachine>

export const createMenuMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFswDsCuBiAsgQQCUBpAOgEMBjAFwEsA3MAcQCcB7DABwG0AGAXUSgOrWDVqs0gkAA9EARgCsAZhIA2AEwAWAJwAOBZtVy5S9QHZ1AGhABPROtWqS2nkc27VC7as3qFCgF8A61RMXEJSSloGXgEkEGFRcUl42QQ5MwUSXT1NOXUebyVdHk1rO3SlbRJNZR4zTVM9dXzdIJD0bEYAUQAVAH0AMQApAYBJABEAZVipRLEaCSk0jKyvJQalBRLdWoby+XV2kFCMcg4aLB6BnG6AOQBVGf45kQWl1MQzMwOEZV0SFttOolI0XLp9JpjqdzjQSDAqDhOrAsBAJGASDQ0HRWABrDEwsgXeFgRHIhBYnEUMjJWKzeLzZLLQ5WWyIbRmOSA3QOMzAuQc1yBYInTqwklkzAosDMNjMEgcAA2NIAZqxmMgSITiQikVKKdjWNTafx6UI3kzPul1KyKnIeCU1KZVB5QZlMqogiK0KwIHApKdXklFilQGkALQ235KVQqIE29R6bSGKrQsVEmhB96hmT2VS-Wo8bJeG3FROab5HEXauG65FZy1hr5lNkIMy6Ln6bRyfRGHkmORpzDiutSkiwDAUChweAMi0h5kIJTGQH5HRVYxKYr51vJ9SArwCnt+Yr1IdnDMSvUYWAkFVkGiKyANhdW5dc5dabQbkzb37GHh93jAx9A2bslC9AIgA */
      schema: {
        context: {} as MenuContext,
        events: {} as MenuEvents,
        services: {} as MenuServices,
      },
      tsTypes: {} as import('./menu.typegen').Typegen0,
      predictableActionArguments: true,
      id: 'menu',
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
      initial: 'api',
      states: {
        api: {
          states: {
            getMenus: {
              invoke: {
                src: 'getMenus',
                onDone: { target: '.success', actions: 'handleResSuccess' },
                onError: { target: '.failed', actions: 'handleResError' },
              },
              states: {
                success: {
                  type: 'final',
                  exit: [
                    raise({ type: 'MARK.activeGroup' }),
                    raise({ type: 'MARK.active' }),
                    raise({ type: 'GET_FJT_IDS' }),
                  ],
                },
                failed: {},
              },
            },
          },
          on: {
            GET_MENUS: {
              target: 'api.getMenus',
            },
          },
        },
      },
      on: {
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
        getMenus: async () => {
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
