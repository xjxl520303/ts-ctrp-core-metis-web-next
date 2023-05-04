import type { ToRefs } from 'vue'
import { capitalize, cloneDeep, isEmpty } from 'lodash-es'
import dayjs from 'dayjs'
import { createDynamicListMachine } from '@/machines/dynamic-list'
import type { DynamicListContext } from '@/machines/dynamic-list'
import type { GetDynamicListResult, GetMilestoneResult, GetPageConfigResult } from '@/promises'
import { getDynamicListPromise, getMilestonePromise, getPageConfigPromise } from '@/promises'
import type { DynamicListRequest, LocalFjtItem, LocalMilestoneItem, LocalSlicerItem, MilestoneDataItem, MilestoneRequest, SlicerItem } from '@/types'
import { getCompactLocale, getCompactTheme } from '@/utils/compact'

/** 里程碑支持的颜色 */
const MILESTONE_DEFAULT_COLORS = ['#AA7CFF', '#2697FF', '#20DEFF', '#14F8B3', '#FFD300', '#FF7B43', '#FF393C']
/** 里程碑颜色兼容白名单 */
const MILESTONE_COLOR_WHITE_LIST: Record<string, any> = {
  BLUE: '#2697FF',
  ORANGE: '#FF7B43',
  GREEN: '#00EEA2',
  RED: '#FF393C',
}

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
  /** Slicer 格式化后的提交数据 */
  slicerSubmitModels?: ComputedRef<Record<string, any>>
  /** 合并后的里程碑数据 */
  localMilestoneData: Ref<LocalMilestoneItem[]>
  /** 获取页面配置信息 - loading */
  isGetPageConfigLoading: Ref<boolean>
  /** 获取列表数据 - loading */
  isGetDynamicListLoading: Ref<boolean>
  /** 获取里程碑数据 - loading */
  isGetMilestoneLoading: Ref<boolean>
  /** 初始化切片器表单 */
  initSlicerForm: (options: LocalSlicerItem[]) => Record<string, any>
  /** 设置切片器表单模型 */
  setFormSlicerModels: (models: Record<string, any>) => void
  /** 获取页面配置信息 */
  getPageConfig: (menuId: number) => Promise<GetPageConfigResult>
  /** 获取里程碑数据 */
  getMilestone: (condition?: MilestoneRequest) => Promise<GetMilestoneResult>
  /** 获取列表数据 */
  getDynamicList: (condition?: DynamicListRequest) => Promise<GetDynamicListResult>
}

export const useDynamicList = (serviceInstance?: ReturnType<typeof useInterpret>): UseDynamicListReturnType => {
  const { theme, locale } = useUser()
  const route = useRoute()

  const service: ReturnType<typeof useInterpret> = serviceInstance || useInterpret(createDynamicListMachine())
  const error = useSelector(service, state => state.context.error)
  const btnPermissionOptions = useSelector(service, state => state.context.btnPermissionOptions)
  const exportBtnOptions = useSelector(service, state => state.context.exportBtnOptions)
  const menuBtnOptions = useSelector(service, state => state.context.menuBtnOptions)
  const slicerOptions = useSelector(service, state => state.context.slicerOptions)
  const slicerFormModels = useSelector(service, state => state.context.slicerFormModels)
  const fjtOption = useSelector(service, state => state.context.fjtOption)
  const milestoneOptions = useSelector(service, state => state.context.milestoneOptions)
  const milestoneData = useSelector(service, state => state.context.milestoneData)
  const orderListOptions = useSelector(service, state => state.context.orderListOptions)
  const dynamicList = useSelector(service, state => state.context.dynamicList)
  const menuId = computed(() => +(route.params.id as string))
  const isGetPageConfigLoading = useSelector(service, state => state.matches('api.getPageConfig.initial'))
  const isGetMilestoneLoading = useSelector(service, state => state.matches('api.getMilestone.initial'))
  const isGetDynamicListLoading = useSelector(service, state => state.matches('api.getDynamicList.initial'))
  const setFormSlicerModels = (models: Record<string, any>) => service.send({ type: 'SET.slicerFormModels', models })

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

  const localMilestoneData = ref(_initLocalMilestoneData(milestoneData.value))

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

  const initSlicerForm = (options: LocalSlicerItem[]) => {
    if (!isEmpty(options)) {
      const result: Record<string, any> = {}
      options.forEach((item: LocalSlicerItem) => {
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
  }
  const getPageConfig = (menuId: number) => getPageConfigPromise(service, menuId)
  const getMilestone = (condition?: MilestoneRequest) => getMilestonePromise(service, {
    menuId: menuId.value,
    condition: slicerSubmitModels.value,
    orderType: 'SALE_ORDER',
    ...condition,
  })

  const getDynamicList = (condition?: DynamicListRequest) => getDynamicListPromise(service, {
    menuId: menuId.value,
    condition: slicerSubmitModels.value,
    milestoneList: [],
    orderType: 'SALE_ORDER',
    ...condition,
  })

  watch(() => milestoneData.value, (val) => {
    localMilestoneData.value = _initLocalMilestoneData(val)
  }, { deep: true })

  function _initLocalMilestoneData(options: MilestoneDataItem[]) {
    if (!isEmpty(options)) {
      return options.map((item: MilestoneDataItem, index: number) => {
        return {
          ...milestoneOptions.value[index],
          colour: (() => {
            const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
            const color = milestoneOptions.value[index].colour.toUpperCase()
            if (reg.test(color))
              return color

            else
              return MILESTONE_COLOR_WHITE_LIST[color] || MILESTONE_DEFAULT_COLORS[1]
          })(),
          count: item.count,
        }
      })
    }

    return []
  }

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
    milestoneData,
    localMilestoneData,
    orderListOptions,
    menuId,
    fjtUrl,
    localFjtOption,
    slicerFormModels,
    slicerSubmitModels,
    dynamicList,
    isGetPageConfigLoading,
    isGetMilestoneLoading,
    isGetDynamicListLoading,
    getPageConfig,
    getMilestone,
    getDynamicList,
    initSlicerForm,
    setFormSlicerModels,
  }
}
