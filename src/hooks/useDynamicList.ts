import type { ToRefs } from 'vue'
import { capitalize, cloneDeep, isEmpty } from 'lodash-es'
import dayjs from 'dayjs'
import { createDynamicListMachine } from '@/machines/dynamic-list'
import type { DynamicListContext } from '@/machines/dynamic-list'
import type { GetDynamicListResult, GetPageConfigResult } from '@/promises'
import { getDynamicListPromise, getPageConfigPromise } from '@/promises'
import type { DynamicListRequest, LocalFjtItem, LocalSlicerItem, SlicerItem } from '@/types'
import { getCompactLocale, getCompactTheme } from '@/utils/compact'

export interface UseDynamicListReturnType extends ToRefs<DynamicListContext> {
  service: ReturnType<typeof useInterpret>
  /** 菜单 ID */
  menuId: ComputedRef<number>
  /** 解析后的风景台 iframe 地址 */
  fjtUrl?: ComputedRef<string>
  /** 丰景台数据 */
  localFjtOption?: ComputedRef<LocalFjtItem[]>
  /** 本地化后的切片器数据 */
  localSlicerOptions: ComputedRef<LocalSlicerItem[]>
  /** Slicer 中提取的表单模型 */
  slicerFormModels: ComputedRef<Record<string, any>>
  /** Slicer 格式化后的提交数据 */
  slicerSubmitModels?: ComputedRef<Record<string, any>>
  /** 获取页面配置信息 */
  getPageConfig: (menuId: number) => Promise<GetPageConfigResult>
  /** 获取列表数据 */
  getDynamicList: (condition: DynamicListRequest) => Promise<GetDynamicListResult>
}

export const useDynamicList = (serviceInstance?: ReturnType<typeof useInterpret>): UseDynamicListReturnType => {
  const { theme, locale } = useUser()
  const route = useRoute()

  const service = serviceInstance || useInterpret(createDynamicListMachine())
  const error = useSelector(service, state => state.context.error)
  const btnPermissionOptions = useSelector(service, state => state.context.btnPermissionOptions)
  const exportBtnOptions = useSelector(service, state => state.context.exportBtnOptions)
  const menuBtnOptions = useSelector(service, state => state.context.menuBtnOptions)
  const slicerOptions = useSelector(service, state => state.context.slicerOptions)
  const fjtOption = useSelector(service, state => state.context.fjtOption)
  const milestoneOptions = useSelector(service, state => state.context.milestoneOptions)
  const orderListOptions = useSelector(service, state => state.context.orderListOptions)
  const menuId = computed(() => +(route.params.id as string))

  const fjtUrl = computed(() => {
    const compactTheme = getCompactTheme(theme.value)
    const compactLocale = getCompactLocale(locale.value)
    const field = `page${capitalize(compactTheme)}${capitalize(compactLocale)}Url`
    return isEmpty(fjtOption.value) ? undefined : fjtOption.value[0][field]
  })

  const localFjtOption = computed(() => {
    if (isEmpty(fjtOption.value))
      return undefined
    return fjtOption.value.push({
      menuId: menuId.value,
      url: fjtUrl.value,
    })
  })

  const localSlicerOptions = computed(() => {
    if (!isEmpty(slicerOptions.value)) {
      const result: LocalSlicerItem[] = []
      for (let i = 0; i < slicerOptions.value.length; i++) {
        const slicer: SlicerItem = slicerOptions.value[i]
        const item: LocalSlicerItem = {
          label: getCompactLocale(locale.value) === 'en' ? slicer.nameEn : slicer.nameCn,
          field: slicer.field,
          query: slicer.dict,
          limit: slicer.limit,
          controlType: slicer.type,
          value: '',
        }

        if (slicer.type === 'date') {
          // ?不知道后端怎么返回，坑~
          if (slicer.defaultValue) {
            if (Array.isArray(slicer.defaultValue) && slicer.defaultValue.length > 0) {
              item.value = [
                dayjs(slicer.defaultValue[0]).format('YYYY-MM-DD HH:mm:ss'),
                dayjs(slicer.defaultValue[1]).format('YYYY-MM-DD HH:mm:ss'),
              ]
            }
            else {
              const defaultValueArray = (slicer.defaultValue as string).split(',')
              if (defaultValueArray.length === 1) {
                // 当前日期减去 `defaultValue` 天
                item.value = [
                  dayjs().subtract(+slicer.defaultValue, 'day').startOf('date').format('YYYY-MM-DD HH:mm:ss'),
                  dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss'),
                ]
              }
              else {
                item.value = [
                  dayjs(defaultValueArray[0]).format('YYYY-MM-DD HH:mm:ss'),
                  dayjs(defaultValueArray[1]).format('YYYY-MM-DD HH:mm:ss'),
                ]
              }
            }
          }
          else {
            item.value = [
              new Date(dayjs().format('YYYY-MM-DD 00:00:00')),
              new Date(dayjs().format('YYYY-MM-DD 23:59:59')),
            ]
          }
        }
        else if (['select', 'multiSelect'].includes(slicer.type)) {
          if (slicer.type === 'multiSelect')
            item.value = slicer.defaultValue ? slicer.defaultValue.join(',') : ''

          item.options = []
        }
        else {
          item.value = slicer.defaultValue === null ? '' : slicer.defaultValue as string
        }

        result.push(item)
      }

      return result
    }

    return []
  })

  const slicerFormModels = computed(() => {
    if (!isEmpty(localSlicerOptions.value)) {
      const result: Record<string, any> = {}
      localSlicerOptions.value.forEach((item: LocalSlicerItem) => {
        // 这里在提交时将日期区间拆分成2个字段
        if (item.controlType === 'date') {
          result[`${item.field}Begin`] = item.value[0]
          result[`${item.field}End`] = item.value[1]
          result[item.field] = item.value
        }
        else {
          result[item.field] = item.value
        }
      })
      return result
    }

    return {}
  })

  const slicerSubmitModels = computed(() => {
    let dateFields: string[]

    if (!isEmpty(localSlicerOptions.value)) {
      const submitData = cloneDeep(slicerFormModels.value)
      if (!isEmpty(slicerOptions.value)) {
        dateFields = slicerOptions.value
          .filter((item: SlicerItem) => item.type === 'date')
          .map((item: SlicerItem) => item.field)
      }
      else { dateFields = [] }

      for (const [key, value] of Object.entries(submitData)) {
        if (dateFields.includes(key)) {
          delete submitData[key]
          if (!value) {
            submitData[`${key}Begin`] = ''
            submitData[`${key}End`] = ''
          }
        }
        else if (Array.isArray(value)) {
          submitData[key] = submitData[key].join(',')
        }
      }

      return submitData
    }

    return {}
  })

  const getPageConfig = (menuId: number) => getPageConfigPromise(service, menuId)
  const getDynamicList = (condition: DynamicListRequest) => getDynamicListPromise(service, condition)

  return {
    service,
    error,
    btnPermissionOptions,
    exportBtnOptions,
    menuBtnOptions,
    slicerOptions,
    localSlicerOptions,
    fjtOption,
    milestoneOptions,
    orderListOptions,
    menuId,
    fjtUrl,
    localFjtOption,
    slicerFormModels,
    slicerSubmitModels,
    getPageConfig,
    getDynamicList,
  }
}
