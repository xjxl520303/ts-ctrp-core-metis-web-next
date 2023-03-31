import type { ToRefs } from 'vue'
import { clone } from 'lodash-es'
import type { MenuAction, MenuContext } from '@/machines/menu'
import { createMenuMachine } from '@/machines/menu'
import type { MenuResult } from '@/promises'
import { getMenuPromise } from '@/promises'
import type { MenuGroupItem, MenuItem } from '@/types'
import { toMenuRoute } from '@/utils/menu'
import { MenuItemTypeEnum } from '@/enums'

export interface UseMenuReturnType extends ToRefs<MenuContext> {
  service: ReturnType<typeof useInterpret>
  /** 获取菜单 */
  getMenus: () => Promise<MenuResult>
  /** 选择菜单 */
  selectMenu: (menu: MenuItem) => void
  /** 关闭菜单 */
  removeMenu: (menu: MenuItem, action?: MenuAction) => void
  /** 添加菜单 */
  addMenu: (menu: MenuItem, index?: number, isBlank?: boolean) => void
}

/**
 * 使用 `useMenu` 来获取后端返回的菜单配置
 */
export const useMenu = (serviceInstance?: ReturnType<typeof useInterpret>): UseMenuReturnType => {
  const service = serviceInstance || useInterpret(createMenuMachine())
  const error = useSelector(service, state => state.context.error)
  const menus = useSelector(service, state => state.context.menus)
  const fjtMenuIds = useSelector(service, state => state.context.fjtMenuIds)
  const activeGroupMenu = useSelector(service, state => state.context.activeGroupMenu)
  const activeMenu = useSelector(service, state => state.context.activeMenu)
  const cacheGroupMenu = useSelector(service, state => state.context.cacheGroupMenu)
  const cacheMenu = useSelector(service, state => state.context.cacheMenu)
  const __refs = useSelector(service, state => state.context.__refs)
  const getMenus = () => getMenuPromise(service)

  /**
   * 选择菜单
   */
  function selectMenu(menu: MenuItem) {
    const code = __refs.value?.get(menu.id)
    service.send('SET.active', { menu })
    if (code) {
      const group = menus.value.find((item: MenuGroupItem) => item.code === code)
      service.send('SET.activeGroup', { group })
      service.send('ADD_CACHE.group', { group })
    }
    else {
      service.send('SET.activeGroup')
    }
    service.send('ADD_CACHE.menu', { menu })
    toMenuRoute(activeMenu.value)
  }

  /**
   * 添加菜单
   */
  function addMenu(menu: MenuItem, index?: number, isBlank = false) {
    const exist = cacheMenu.value.find((item: MenuItem) => item.id === menu.id && item.url === menu.url)
    if (exist) {
      selectMenu(menu)
    }
    else {
      service.send('SET.active', { menu })
      service.send('ADD_CACHE.menu', { menu })
      const code = __refs.value?.get(menu.id)
      if (code) {
        const group = menus.value.find((item: MenuGroupItem) => item.code === code)
        service.send('SET.activeGroup', { group })
        service.send('ADD_CACHE.group', { group })
      }
      else {
        service.send('SET.activeGroup')
      }
      toMenuRoute(activeMenu.value, isBlank)
    }
  }

  /**
   * 移除菜单
   */
  function removeMenu(menu: MenuItem, action: MenuAction = 'current') {
    const index = cacheMenu.value.findIndex(item => item.id === menu.id)
    if (action === 'current') {
      if (cacheMenu.value.length > 1) {
        if (index === cacheMenu.value.length - 1)
          selectMenu(cacheMenu.value[index - 1])

        else
          selectMenu(cacheMenu.value[index + 1])
      }
    }

    _removeCacheMenu(menu, action)
    if (action === 'post' || action === 'pre')
      toMenuRoute(activeMenu.value)
  }

  /**
   * 移除缓存菜单
   */
  function _removeCacheMenu(menu: MenuItem, action: MenuAction = 'current') {
    const cache = clone(unref(cacheMenu.value))
    const index = cache.findIndex((item: MenuItem) => item.id === menu.id)
    const getGroup = (id: number) => cacheGroupMenu.value.find((item: MenuGroupItem) => item.code === __refs.value.get(id))
    const shouldRemoveGroup = (id: number) => !cache
      .filter((item: MenuItem) => item.id !== id)
      .some((item: MenuItem) => __refs.value.get(item.id) === __refs.value.get(id))

    if (action === 'current') {
      if (cache.length === 1) {
        service.send('SET.tabVisible', { bool: false })
      }
      else {
        cache.splice(index, 1)
        if (shouldRemoveGroup(menu.id))
          service.send('REMOVE_CACHE.group', getGroup(menu.id))
      }
    }
    else if (action === 'pre') {
      for (let i = 0; i < cache.length; i++) {
        if (i < index) {
          cache.splice(i, 1)
          if (shouldRemoveGroup(cache[i].id))
            service.send('REMOVE_CACHE.group', getGroup(cache[i].id))
        }
      }
    }
    else if (action === 'post') {
      for (let i = 0; i < cache.length; i++) {
        if (i > index) {
          cache.splice(i, 1)
          if (shouldRemoveGroup(cache[i].id))
            service.send('REMOVE_CACHE.group', getGroup(cache[i].id))
        }
      }
    }
    else if (action === 'all') {
      service.send('SET.active', { menu: activeMenu.value })
      if (activeMenu.value.type !== MenuItemTypeEnum.MESSAGE) {
        const group = menus.value.find((item: MenuGroupItem) => item.code === __refs.value.get(activeMenu.value.id))
        service.send('SET.activeGroup', { group })
      }
      else {
        service.send('SET.activeGroup')
      }
      service.send('SET.tabVisible', { bool: false })
    }

    service.send('SET.cache', { menus: cache })
  }

  service.onTransition(state => console.log(state))

  return {
    service,
    error,
    menus,
    fjtMenuIds,
    activeGroupMenu,
    activeMenu,
    cacheGroupMenu,
    cacheMenu,
    __refs,
    getMenus,
    selectMenu,
    removeMenu,
    addMenu,
  }
}
