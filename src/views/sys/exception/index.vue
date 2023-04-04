<script lang="ts" setup>
const props = defineProps<{
  /** 标题 */
  title: string
  /** 子标题 */
  subTitle: string
  /** 状态码 */
  status: string
  /** 按钮文字 */
  btnText: string
  /** 图标 */
  icon?: string
  /**  */
  handler: Function
}>()

defineOptions({
  name: 'Exception',
  inheritAttrs: false,
})
</script>

<template>
  <div w-full h-full mx-a my-0>
    <div>异常页面</div>
  </div>
</template>
