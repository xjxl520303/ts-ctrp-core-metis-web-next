<script setup lang="ts">
import dayjs from 'dayjs'
import type { FormInstance } from 'element-plus'
import { LocaleEnum } from '@/enums'
import { useDynamicList } from '@/hooks/useDynamicList'
import type { ExportBtnItem, LocalSlicerItem, OptionsItem } from '@/types'
import ZxMultiSelect from '@/components/ZxMultiSelect.vue'

const props = withDefaults(defineProps<{
  /** dynamicList 服务实例 */
  service: ReturnType<typeof useInterpret>
}>(), {})

const emit = defineEmits<{
  /**
   * 切片器查询
   */
  (e: 'query'): void
}>()

defineOptions({
  name: 'ZxFormSlicer',
  inheritAttrs: false,
})

const { t } = useI18n()
const { locale } = useUser()
const { addMenu } = useMenu()
const { isGetDictLoading, dictOptions, getDict } = useGlobal()
const {
  slicerFormModels,
  localSlicerOptions,
  menuBtnOptions,
  exportBtnOptions,
  isGetPageConfigLoading,
  initSlicerForm,
  setFormSlicerModels,
} = useDynamicList(props.service)
const { shortcuts } = useElDateRangeShortcuts()

const formRef = ref<FormInstance>()
const form = ref(slicerFormModels.value)
/** select 选项映射 */
const optionsMap = ref<Map<string, OptionsItem[] | []>>(new Map())

watch(() => localSlicerOptions.value, (val) => {
  val.filter(item => item.options).forEach((item) => {
    optionsMap.value.set(item.field, item.options || [])
  })
  form.value = initSlicerForm(val)
  setFormSlicerModels(form.value)
})

/**
 * 获取选项数据
 */
async function getSelectOptions(item: LocalSlicerItem) {
  await getDict(item.query)
  optionsMap.value.set(item.field, dictOptions.value)
}

/**
 * 表单查询
 */
async function query() {
  setFormSlicerModels(form.value)
  emit('query')
}

/**
 * 重置表单
 */
function reset() {
  formRef.value?.resetFields()
  setFormSlicerModels(form.value)
}

/**
 * 处理导出
 */
async function handleExport(btn: ExportBtnItem) {
  // const count = await props.getCount(btn.id, props.milestones, props.page, props.pageSize);
  // if (count) {
  //   showMessageBox(count, btn);
  // }
}

/**
 * 日期改变事件
 */
function handleDateChange(value: string[] | null, item: LocalSlicerItem) {
  if (value && Array.isArray(value) && value.length === 2) {
    form.value[`${item.field}Begin`] = dayjs(value[0]).format('YYYY-MM-DD HH:mm:ss')
    form.value[`${item.field}End`] = dayjs(value[1]).format('YYYY-MM-DD HH:mm:ss')
  }
  else {
    form.value[`${item.field}Begin`] = ''
    form.value[`${item.field}End`] = ''
  }
}

/**
 * 调用运单号批量查询
 */
function handleWaybillNoBatchQuery(item: LocalSlicerItem) {

}

/**
 * 获取日期提示内容
 */
function getTooltipContent(item: LocalSlicerItem) {
  if (item.controlType === 'date') {
    if (form?.value[`${item.field}Begin`])
      return `${form.value[`${item.field}Begin`]} - ${form.value[`${item.field}End`]}`
    return ''
  }
  return ''
}
</script>

<template>
  <div v-loading="isGetPageConfigLoading" pt-4 px-5 min-h-128px relative>
    <el-form ref="formRef" :model="form" label-position="top">
      <div class="border-b-(solid 1 $zx-border)" flex flex-wrap relative>
        <template v-for="item in localSlicerOptions" :key="item.label">
          <el-tooltip
            :content="getTooltipContent(item)"
            placement="top"
            :disabled="item.controlType !== 'date' || !getTooltipContent(item)"
          >
            <el-form-item :label="item.label" :prop="item.field">
              <!-- 文本 -->
              <template v-if="item.controlType === 'text'">
                <el-input v-model.trim="form[item.field]" type="text" :placeholder="t('sys.common.text.input')" clearable />
              </template>

              <!-- 运单号输入与批量查询  -->
              <template v-if="item.controlType === 'textArea'">
                <el-input v-model="form[item.field]" type="text" :placeholder="t('sys.common.text.input')" clearable>
                  <template v-if="!form[item.field]" #suffix>
                    <el-button class="!mr--10px" @click="handleWaybillNoBatchQuery(item)">
                      <i class="iconfont icon-piliangchaxun !text-hex-919398" />
                    </el-button>
                  </template>
                </el-input>
              </template>

              <!-- 下拉单选 -->
              <template v-else-if="item.controlType === 'select'">
                <el-select
                  v-model="form[item.field]"
                  :placeholder="t('sys.common.text.select')"
                  clearable
                  filterable
                  @focus="() => getSelectOptions(item)"
                >
                  <el-option
                    v-for="option in optionsMap.get(item.field)"
                    :key="option.code"
                    :label="locale === LocaleEnum.ZH_CN ? option.nameCn : option.nameEn"
                    :value="option.code"
                  />
                </el-select>
              </template>

              <!-- 下拉多选 -->
              <template v-else-if="item.controlType === 'multiSelect'">
                <ZxMultiSelect
                  v-model="form[item.field]"
                  :loading="isGetDictLoading"
                  :options="optionsMap.get(item.field)"
                  @focus="() => getSelectOptions(item)"
                />
              </template>

              <!-- 日期选择 -->
              <template v-else-if="item.controlType === 'date'">
                <el-date-picker
                  v-model="form[item.field]"
                  type="datetimerange"
                  :start-placeholder="t('sys.common.text.startAt')"
                  :end-placeholder="t('sys.common.text.endAt')"
                  format="YYYY/MM/DD HH:mm:ss"
                  :default-time="item.value"
                  :shortcuts="shortcuts"
                  clearable
                  style="width: 100%;"
                  @change="(value: string[]) => handleDateChange(value, item)"
                />
              </template>
            </el-form-item>
          </el-tooltip>
        </template>

        <el-form-item self-end min-w-auto>
          <el-button v-if="localSlicerOptions.length > 0" type="primary" @click="query">
            {{ t('sys.common.action.query') }}
          </el-button>
          <el-button v-if="localSlicerOptions.length > 0" @click="reset">
            {{ t('sys.common.action.reset') }}
          </el-button>
          <!-- 菜单按钮 -->
          <template v-if="menuBtnOptions.length > 0">
            <template v-for="btn in menuBtnOptions" :key="btn">
              <el-tooltip
                :content="locale === LocaleEnum.EN ? btn.tipsEn : btn.tips"
                placement="top"
                :disabled="!(locale === LocaleEnum.EN ? btn.tipsEn : btn.tips)"
              >
                <el-button plain @click="() => addMenu(btn)">
                  {{ locale === LocaleEnum.EN ? btn.buttonNameEn : btn.buttonName }}
                </el-button>
              </el-tooltip>
            </template>
          </template>
          <!-- 导出按钮 -->
          <template v-if="exportBtnOptions.length > 0">
            <template v-for="btn in exportBtnOptions" :key="btn">
              <el-button type="primary" plain @click="() => handleExport(btn)">
                {{ locale === LocaleEnum.EN ? btn.nameEn : btn.nameCn }}
              </el-button>
            </template>
          </template>
          <!-- 额外按钮 -->
          <slot />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
  --uno: "w-[calc(16.66%-12px)] min-w-50 mb-10px mr-3";
  .el-form-item__label {
    --uno: "text-$zx-text h-4 leading-4 pb-none font-normal";
  }
  .el-input,
  .el-select {
    --uno: "w-full";
    .el-select__input {
      --uno: "w-10%";
    }
  }
}
</style>
