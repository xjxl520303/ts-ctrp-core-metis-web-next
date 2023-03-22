import { createSetMenuMachine } from '@/machines/set-menu'
import { setMenuPromise } from '@/promises'

/**
 * 使用 `useMenu` 来获取后端返回的菜单配置
 */
export const useMenu = () => {
  const service = useInterpret(createSetMenuMachine)

  const isLoading = useSelector(service, state => state.matches('request'))
  const isSuccess = useSelector(service, state => state.matches('success'))
  const isError = useSelector(service, state => state.matches('error'))
  const error = useSelector(service, state => state.context.error)
  const menus = useSelector(service, state => state.context.menus)
  const fjtMenuIds = useSelector(service, state => state.context.fjtMenuIds)
  const activeGroupMenu = useSelector(service, state => state.context.activeGroupMenu)
  const activeMenu = useSelector(service, state => state.context.activeMenu)
  const cacheGroupMenu = useSelector(service, state => state.context.cacheGroupMenu)
  const cacheMenu = useSelector(service, state => state.context.cacheMenu)
  const __refs = useSelector(service, state => state.context.__refs)
  const setMenu = () => setMenuPromise(service)

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    menus,
    fjtMenuIds,
    activeGroupMenu,
    activeMenu,
    cacheGroupMenu,
    cacheMenu,
    __refs,
    setMenu,
  }
}
