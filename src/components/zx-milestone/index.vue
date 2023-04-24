<script lang="ts" setup>
const props = withDefaults(defineProps<{
  modelValue: boolean
}>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

defineOptions({
  name: 'ZxMilestone',
  inheritAttrs: false,
})

const localModelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localModelValue.value = val
})

watch(() => localModelValue.value, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <div>ZxMilestone</div>
</template>
