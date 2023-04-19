import type { ToRefs } from 'vue'
import { createGlobalMachine } from '@/machines/global'
import type { GlobalContext } from '@/machines/global'
import type { DictResult } from '@/promises'
import { getDictPromise } from '@/promises'

export interface UseGlobalReturnType extends ToRefs<GlobalContext> {
  service: ReturnType<typeof useInterpret>
  /** 获取菜单 */
  getDict: (code: string) => Promise<DictResult>
}

export const useGlobal = (serviceInstance?: ReturnType<typeof useInterpret>): UseGlobalReturnType => {
  const service = serviceInstance || useInterpret(createGlobalMachine())
  const error = useSelector(service, state => state.context.error)
  const dictOptions = useSelector(service, state => state.context.dictOptions)
  const getDict = (code: string) => getDictPromise(service, code)

  return {
    service,
    error,
    dictOptions,
    getDict,
  }
}
