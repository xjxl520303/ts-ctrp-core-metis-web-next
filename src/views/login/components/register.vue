<script lang="ts" setup>
import BrandContainer from './brand-container.vue'
import type { RegisterStep } from '@/machines/register'
import { useRegister } from '@/hooks/useRegister'

const props = withDefaults(defineProps<{
  /** 是否显示 */
  modelValue: boolean
  /** 进入第几步 */
  step?: RegisterStep
}>(), {})

const emit = defineEmits<{
  /** 显示与关闭 */
  (e: 'update:modelValue', isClose: boolean): void
}>()

defineOptions({
  name: 'Register',
  inheritAttrs: false,
})

const { service, step, setStep, toNextStep } = useRegister()

const localModelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localModelValue.value = val
})

watch(() => localModelValue.value, (val) => {
  emit('update:modelValue', val)
})

watch(() => props.step, (val) => {
  setStep(val)
})
</script>

<template>
  <BrandContainer
    v-model="localModelValue"
    :service="service"
    show-step
  >
    <el-button @click="toNextStep">
      步骤
    </el-button>
    <template v-if="step === 'one'">
      <div text-white>
        步骤1内容
      </div>
    </template>
    <template v-else-if="step === 'two'">
      <div text-white>
        步骤2内容
      </div>
    </template>
    <template v-else-if="step === 'three'">
      <div text-white>
        步骤3内容
      </div>
    </template>
  </BrandContainer>
</template>
