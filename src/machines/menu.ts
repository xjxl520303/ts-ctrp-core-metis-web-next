/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/indent */
import { clone } from 'lodash-es'
import { URL_PREFIX } from '@/constants'
import { RequestEnum, ResponseCodeEnum } from '@/enums'
import type { ErrorPayload, MenuGroupItem, MenuItem, Result } from '@/types'
import type { GetMenuResponse } from '@/types/responses'
import callApi from '@/utils/request'

export type MenuAction = 'pre' | 'post' | 'current' | 'all'
export type MenuContext = {
  /** 接口错误信息 */
  error: ErrorPayload | null
  /** 菜单集合 */
  menus: MenuGroupItem[]
  /** 丰景台ID集合 */
  fjtMenuIds: number[]
  /** 当前激活菜单组 */
  activeGroupMenu: MenuGroupItem | undefined
  /** 当前激活菜单 */
  activeMenu: MenuItem | undefined
  /** 缓存菜单 */
  cacheMenu: MenuItem[]
  /** 菜单ID与菜单分组引用关系 */
  __refs?: Record<string, string>
  /** 标签选项卡是否可见，当关闭所有选项卡时标记为 `true` */
  isTabVisible?: boolean
}

export type MenuEvents =
  | { type: 'REQUEST'; data: MenuGroupItem[] }
  | { type: 'SET.tabVisible'; bool: boolean }
  | { type: 'SET.activeGroup'; group: MenuGroupItem | null }
  | { type: 'SET.active'; menu: MenuItem }
  | { type: 'SET.cache'; menus: MenuItem[] }
  | { type: 'ADD_CACHE.menu'; menu: MenuItem; index?: number }

export type MenuServices = {
  // request: { data: GetMenuResponse }
  request: GetMenuResponse
}

export type MenuMachine = ReturnType<typeof createMenuMachine>

export const createMenuMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFswDsCuA6AlhANmAMQBKAogIoCqZAygCoDaADALqKgAOA9rDgC45uaDiAAeiAIwBmZlgDsADnkBWZgDZ5zSSvmTJAGhABPRACYALBazSd0+RemzpFyWekBfD0dSYsAMzB+AGMACwBZdAxYIghhMFw0ADduAGsE32xAkIio2AQcZO5ggENBYRZWStEePnKRJHFECyUsSWZbaUV1FQBOXUULdSNTBF7ehUUVHUlFMw75aTNerx8ogKCwyMwYsAAnPe49rE58Mv8j5CxMjZzt6IKi0vrK6sbagSEG0AkEGTklKoNFodHpDCYpGosON1Op9Opeu15kNViAbiVgvVcARiLQyPQsBjBEkwABxQ4YThvLi8T7CUS-QYTFqzRTSab6JyKEbmFpYZb2FRC9QdFouVHozFfbGEIh4glEnAk6kgD71BmIJlYFmKNkcmRdHkIFTSdT8izjQYilTKDQS9aK4Qy4gAQQAIm6APoAYRd3oAEmQsFAKVS2DVaerGoyLdq9Lr2foDdyIX8ob0gW4VBZpvIzGz7X5HWhnUR3V7fQGg5kVWqvhqEFqdXqk1yjeollgVOplIp9Dm9BZC9hi6X5VhSmEwLXI-Xo5rY83E5zDam84osLrVJZJCLdVNh4SpU68LLyOEAPIANTIPr9geDoZndTnPwXzPjLZXKdGLmkWDhSxeimVQVDMWZD1HU9cXxLB+BKAAjK8cD4BDCGfOlviaRtF0-ZdkyNRwJl6Wwdz6DRenUdwvG8EA0G4CA4FETIIxfel5wQABaYZU04ywsGYQShOE4T5EPaDWMwhsLDMI1JFaC1JFcWY1GYIZFEPbItjySSozfBBlgmPNZn6NS5g6HjRl3FQbHzXoOlsNR+gcSDjywut2P02F5AAwYLA0bNs0UcZ23-CxlDUKi8xtdRXBUVysQk95Z087C9BsnsrACnNwpC1NWU3MwzFhOF5LA9wzAS6VYCCF0pRJcluEpXTX2w9o5gE8ZxkWXp3EkDMjTMLQFA0MwhSWBE9Sqp0av4OriTAFrUt+dqzE6rqer6gbUyFCZYTG1twtcSraMlLESggCBvQxUIyVDJasJW5gOuYLqM2kXrbG2qyHBsCK3FsWZXuYE61iLNzCUu66p3uB6G1W9buo+rb5HbIVoT7WREThcLJGmktZuh264Y4hHXo25GvtRtcwP5LrYpzbstE8U6HQhvYwGQbgSSJu6ms4WHkrYx6pGetbyaRz7+up39NAEoDgJccDdAzfGsFm+hEOQ1DCBJ-SybezaqcIjsbEcBwZF0JxLBojwgA */
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
        activeGroupMenu: undefined,
        activeMenu: undefined,
        cacheMenu: [],
        __refs: undefined,
        isTabVisible: undefined,
      },
      initial: 'idle',
      states: {
        idle: {
          on: {
            REQUEST: {
              target: 'fetchMenus',
            },
          },
        },
        fetchMenus: {
          invoke: {
            src: 'request',
            onDone: {
              target: '#menu.action.idle',
              actions: [
                'initMenus',
                'initFjdIds',
                'initActiveGroupMenu',
                'initActiveMenu',
                'initCacheMenu',
              ],
            },
            onError: { target: 'idle', actions: 'handleResError' },
          },
        },
        action: {
          type: 'parallel',
          states: {
            idle: {
              on: {
                'SET.activeGroup': {
                  target: 'setActiveGroup',
                  actions: 'setActiveGroupMenu',
                },
                'SET.active': {
                  target: 'setActive',
                  actions: 'setActiveMenu',
                },
                'ADD_CACHE.menu': {
                  target: 'addCacheMenu',
                  actions: 'addCacheMenu',
                },
                'SET.cache': {
                  target: 'setCache',
                  actions: 'setCache',
                },
                'SET.tabVisible': {
                  target: 'setTabVisible',
                  actions: 'setTabVisible',
                },
              },
            },
            setActiveGroup: {},
            setActive: {},
            addCacheGroup: {},
            addCacheMenu: {},
            setCache: {},
            removeCacheGroupMenu: {},
            setTabVisible: {},
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
         * 是否显示标签页
         **/
        setTabVisible: assign({ isTabVisible: (_, event) => event.bool }),

        /**
         * 初始化菜单
         **/
        initMenus: assign({
          menus: (_, event) => event.data,
          __refs: (_, event: any) => {
            const result: Record<string, string> = {}
            event.data.forEach((item: MenuGroupItem) => {
              if (item.menuList && Array.isArray(item.menuList) && item.menuList.length > 0)
                item.menuList.forEach(menu => result[`${menu.id}`] = item.code)
            })
            return result
          },
        }),

        /**
         * 初始化丰景台ID
         **/
        initFjdIds: assign({
          fjtMenuIds: (_, event: any) => {
            const ids: number[] = []
            event.data.forEach((group: MenuGroupItem) => {
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

        /**
         * 初始化激活菜单组
         **/
        initActiveGroupMenu: assign({
          activeGroupMenu: (_, event) => event.data[0],
        }),

        /**
         * 初始化激活菜单
         **/
        initActiveMenu: assign({
          activeMenu: (_, event) => event.data[0].menuList[0],
        }),

        /**
         * 初始化菜单缓存
         **/
        initCacheMenu: assign({
          cacheMenu: (_, event) => [event.data[0].menuList[0]],
        }),

        /**
         * 设置缓存
         */
        setCache: assign({
          cacheMenu: (context, event) => event.menus || context.cacheMenu,
        }),

        /**
         * 获取激活菜单组
         **/
        setActiveGroupMenu: assign({
          activeGroupMenu: (_, event) => event.group ? event.group : undefined,
        }),

        /**
         * 获取激活菜单
         **/
        setActiveMenu: assign({
          activeMenu: (_, event) => event.menu,
        }),

        /**
         * 添加菜单到缓存
         **/
        addCacheMenu: assign({
          cacheMenu: (context, event) => {
            const cache = clone(context.cacheMenu) as MenuItem[]
            const index = event.index
              ? (event.index > cache.length || event.index < 0)
                ? cache.length
                : event.index
              : cache.length
            const sameIdMenus = cache.filter(item => item.id === event.menu.id)
            if (sameIdMenus.length > 0) {
              for (let i = 0; i < sameIdMenus.length; i++) {
                if (sameIdMenus[i].url !== event.menu.url)
                  cache.splice(index, 0, event.menu!)
              }
            }
            else {
              cache.splice(index, 0, event.menu!)
            }

            return cache
          },
        }),
      },
      services: {
        /**
         * 获取菜单
         **/
        request: async () => {
          const res: Result = await callApi({
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
