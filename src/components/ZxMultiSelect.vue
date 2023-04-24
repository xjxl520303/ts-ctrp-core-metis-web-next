<script lang="ts" setup>
import type { CheckboxValueType } from 'element-plus'
import { LocaleEnum } from '@/enums'

const props = withDefaults(defineProps<{
  /** 绑定的 v-model */
  modelValue: string[]
  /** 配置选项 */
  options: DictionaryData[]
}>(), {
  modelValue: () => [],
  options: () => [],
})

const emit = defineEmits<{
  /**
   * 对话框显示与关闭
   */
  (e: 'update:modelValue', val: string[]): void
}>()

defineOptions({
  name: 'ZxMultiSelect',
  inheritAttrs: false,
})

const { t } = useI18n()
const { locale } = useUser()

const localModelValue = ref(props.modelValue)
const checkAll = ref(false)
const reverseCheck = ref(false)
const isIndeterminate = ref(false)

watch(() => props.modelValue, (val, oldVal) => {
  if (val.length > 0 && !oldVal)
    isIndeterminate.value = true
  if (val.length === 0)
    isIndeterminate.value = false
  localModelValue.value = val
})

watch(() => localModelValue.value, (val) => {
  emit('update:modelValue', val)
})

/**
 * 全选事件
 */
function handleCheckAllChange(val: CheckboxValueType) {
  reverseCheck.value = false
  localModelValue.value = val ? props.options.map(item => item.code) : []
  isIndeterminate.value = false
}

/**
 * 单选事件
 */
function handleCheckedChange(val: CheckboxValueType[]) {
  const count = val.length
  reverseCheck.value = false
  checkAll.value = count === props.options.length
  isIndeterminate.value = count > 0 && count < props.options.length
}

/**
 * 反选事件
 */
function handleReverseCheckChange() {
  const codes = props.options.map(item => item.code)
  const resetCodes: string[] = []
  codes.forEach((code) => {
    if (!localModelValue.value.includes(code))
      resetCodes.push(code)
  })
  localModelValue.value = resetCodes
  if (localModelValue.value.length === codes.length) {
    isIndeterminate.value = false
    if (localModelValue.value.length === 0)
      checkAll.value = false

    else
      checkAll.value = true
  }
  else if (localModelValue.value.length === 0) {
    isIndeterminate.value = false
    checkAll.value = false
  }
}

/**
 * 重置
 */
function reset() {
  checkAll.value = false
  isIndeterminate.value = false
  reverseCheck.value = false
  localModelValue.value = []
}
</script>

<template>
  <el-select v-bind="$attrs" v-model="localModelValue" :placeholder="t('sys.common.text.select')" clearable multiple collapse-tags filterable>
    <div
      class="border-$Border" absolute z-100 top-0 flex justify-between items-center w-full h-10 px-5 border-b bg-white
      dark:bg-black
    >
      <div flex-1>
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
          {{ t('sys.common.action.selectAll') }}
        </el-checkbox>
        <el-checkbox v-model="reverseCheck" @change="handleReverseCheckChange">
          {{ t('sys.common.action.unselect') }}
        </el-checkbox>
      </div>
      <span class="hover:text-$Primary" cursor-pointer @click="reset">{{ t('sys.common.action.reset') }}</span>
    </div>
    <el-checkbox-group v-model="localModelValue" mt-10 @change="handleCheckedChange">
      <el-option
        v-for="(option, index) in props.options" :key="index" class="!after:content-none"
        :label="locale === LocaleEnum.ZH_CN ? option.nameCn : option.nameEn" :value="option.code"
      >
        <el-checkbox :label="option.code" @click.stop>
          {{ locale === LocaleEnum.ZH_CN ? option.nameCn : option.nameEn }}
        </el-checkbox>
      </el-option>
    </el-checkbox-group>
  </el-select>
</template>
