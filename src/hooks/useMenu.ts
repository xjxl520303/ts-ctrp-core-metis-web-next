import type { ToRefs } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { MenuAction, MenuContext } from '@/machines/menu'
import { createMenuMachine } from '@/machines/menu'
import type { MenuResult } from '@/promises'
import { getMenuPromise } from '@/promises'
import type { MenuGroupItem, MenuItem } from '@/types'
import { toMenuRoute } from '@/utils/menu'
import { MENU_STORAGE_KEY } from '@/constants'
import { bus } from '@/utils/bus'

export interface UseMenuReturnType extends ToRefs<MenuContext> {
  /** 获取菜单 */
  getMenus: () => Promise<MenuResult>
  /** 选择菜单 */
  selectMenu: (menu: MenuItem) => void
  /** 关闭菜单 */
  removeMenu: (menu: MenuItem, action?: MenuAction) => void
  /** 添加菜单 */
  addMenu: (menu: MenuItem, index?: number, isBlank?: boolean) => void
  /** 设置显示标签页 */
  setTabVisible: (visible: boolean) => void
}

export const useMenu = (): UseMenuReturnType => {
  const machine = createMenuMachine()
  const persistedState = useStorage(MENU_STORAGE_KEY, machine.initialState, localStorage)
  const { service } = useMachine(machine, { state: persistedState.value })

  const error = useSelector(service, state => state.context.error)
  const menus = useSelector(service, state => state.context.menus)
  const fjtMenuIds = useSelector(service, state => state.context.fjtMenuIds)
  const activeGroupMenu = useSelector(service, state => state.context.activeGroupMenu)
  const activeMenu = useSelector(service, state => state.context.activeMenu)
  const cacheMenu = useSelector(service, state => state.context.cacheMenu)
  const isTabVisible = useSelector(service, state => state.context.isTabVisible)
  const __refs = useSelector(service, state => state.context.__refs)
  const getMenus = () => getMenuPromise(service)

  /**
   * 选择菜单
   */
  function selectMenu(menu: MenuItem) {
    const { context } = persistedState.value
    service.send('SET.cache', { menus: context.cacheMenu }) // !重置缓存
    service.send('SET.active', { menu })
    _setActiveGroupMenu(menu)
    toMenuRoute(menu)
  }

  /**
   * 添加菜单
   */
  function addMenu(menu: MenuItem, index?: number, isBlank = false) {
    const { context } = persistedState.value
    const cache = cloneDeep(context.cacheMenu)
    if (!context.isTabVisible)
      setTabVisible(true)

    const exist = cache.find((item: MenuItem) => item.id === menu.id && item.url === menu.url)
    if (exist) {
      selectMenu(menu)
    }
    else {
      service.send('SET.active', { menu })
      service.send('ADD_CACHE.menu', { menu })
      cache.splice(index || cache.length, 0, menu)
      service.send('SET.cache', { menus: cache })
      _setActiveGroupMenu(menu)
      toMenuRoute(context.activeMenu!, isBlank)
    }
  }

  /**
   * 移除菜单
   */
  function removeMenu(menu: MenuItem, action?: MenuAction) {
    const { context } = persistedState.value
    const cache = cloneDeep(context.cacheMenu)
    const removeIndex = cache.findIndex(item => item.id === menu.id)
    const activeIndex = cache.findIndex(item => item.id === context.activeMenu?.id)

    if (!action) {
      if (removeIndex === activeIndex) {
        if (cache.length > 1) {
          if (removeIndex === cache.length - 1)
            selectMenu(cache[removeIndex - 1])
          else
            selectMenu(cache[removeIndex + 1])

          cache.splice(removeIndex, 1)
          service.send('SET.cache', { menus: cache })
        }
      }
      else {
        cache.splice(removeIndex, 1)
        service.send('SET.cache', { menus: cache })
        selectMenu(context.activeMenu!)
      }
    }
    else if (action === 'left') {
      service.send('SET.cache', { menus: cache.slice(activeIndex, cache.length) })
      selectMenu(menu)
    }
    else if (action === 'right') {
      service.send('SET.cache', { menus: cache.slice(0, activeIndex + 1) })
      selectMenu(menu)
    }
    else if (action === 'other') {
      service.send('SET.cache', { menus: [context.activeMenu] })
      selectMenu(menu)
    }
    else if (action === 'all') {
      setTabVisible(false)
      service.send('SET.cache', { menus: [context.activeMenu!] })
      selectMenu(context.activeMenu!)
    }
  }

  /**
   * 设置显示标签页
   */
  function setTabVisible(visible: boolean) {
    service.send('SET.tabVisible', { visible })
  }

  function _setActiveGroupMenu(menu: MenuItem) {
    const code = __refs.value![String(menu.id)]
    if (code) {
      const group = menus.value.find((item: MenuGroupItem) => item.code === code)
      service.send('SET.activeGroup', { group })
    }
    else {
      service.send('SET.activeGroup')
    }
  }

  service.onTransition((state) => {
    persistedState.value = state
    bus.emit('UPDATE_MENU', { action: state.event.type, context: state.context })
  })

  return {
    error,
    menus,
    fjtMenuIds,
    activeGroupMenu,
    activeMenu,
    cacheMenu,
    isTabVisible,
    __refs,
    getMenus,
    selectMenu,
    removeMenu,
    addMenu,
    setTabVisible,
  }
}
