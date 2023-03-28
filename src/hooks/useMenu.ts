import type { MenuContext } from '@/machines/menu'
import { createMenuMachine } from '@/machines/menu'
import type { MenuResult } from '@/promises'
import { getMenuPromise } from '@/promises'

export interface UseMenuReturnType extends MenuContext {
  /** 实例引用 */
  service: ReturnType<typeof useInterpret>
  /** 获取菜单 */
  getMenus: () => MenuResult
}

/**
 * 使用 `useMenu` 来获取后端返回的菜单配置
 */
export const useMenu = (serviceInstance?: ReturnType<typeof useInterpret>) => {
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
  } as unknown as UseMenuReturnType
}
