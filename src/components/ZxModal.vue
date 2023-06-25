<script lang="ts" setup>
// https://vue-final-modal.org/guide/properties
import { VueFinalModal } from 'vue-final-modal'
import 'vue-final-modal/style.css'

const props = withDefaults(defineProps<{
  /** 显示 */
  modelValue: boolean
  /** 对话框标题 */
  title?: string
  /** 显示对话框头部 */
  header?: boolean
  /** 是否显示右上角的关闭按钮 */
  closable?: boolean
  /** 显示对话框底部 */
  footer?: boolean
  /** 是否显示对话框头部背景色 */
  headerBg?: boolean
  /** 是否显示对话框头部边框 */
  headerBorder?: boolean
  /** 是否显示对话框底部边框 */
  footerBorder?: boolean
  /** 顶部距离 */
  top?: string | number
  /** 宽度 */
  width?: string | number
  /** 高度 */
  height?: string | number
  /** 自定义类 */
  customClass?: string
}>(), {
  zIndex: 1000,
  header: true,
  closable: true,
  footer: true,
  headerBg: true,
  headerBorder: true,
  footerBorder: true,
})

const emit = defineEmits<{
  /** 对话框显示与关闭 */
  (e: 'update:modelValue', val: boolean): void
}>()

defineOptions({
  name: 'ZxModal',
  inheritAttrs: false,
})

const localModelValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

watch(() => props.modelValue, (val) => {
  localModelValue.value = val
})
</script>

<template>
  <VueFinalModal
    v-bind="$attrs"
    v-model="localModelValue"
    class="zx-modal__container"
    :content-class="`zx-modal__content ${props.customClass}`"
    :content-style="{
      marginTop: props.top || '15vh',
      width: props.width || 'fit-content',
      height: props.height || 'fit-content',
    }"
  >
    <!-- Header -->
    <template v-if="props.header">
      <div
        class="zx-modal__title" :class="[{
          'gray': props.headerBg,
          'header-border': props.headerBorder,
        }]"
      >
        <template v-if="$slots.title">
          <slot name="title" />
        </template>
        <template v-else>
          {{ props.title }}
        </template>
      </div>
    </template>

    <!-- Close -->
    <template v-if="props.closable">
      <div class="zx-modal__close" @click="localModelValue = false">
        <i class="iconfont icon-dankuangguanbi" />
      </div>
    </template>

    <!-- Content -->
    <div class="zx-modal__body" :class="[{ rect: !props.footer }]">
      <slot />
    </div>

    <!-- Footer -->
    <template v-if="props.footer">
      <div class="zx-modal__footer" :class="[{ 'footer-border': props.footerBorder }]">
        <slot name="footer" />
      </div>
    </template>
  </VueFinalModal>
</template>

<style lang="scss">
.zx-modal__container {
  --uno: flex justify-center items-start;
}

.zx-modal__content {
  --zx-modal_bg: #FFFFFF;
  --zx-modal_title-bg: #F7F8FA;
  --zx-modal_close-hover: var(--zx-title);
  --zx-modal_footer-bg: transparent;
  --uno: relative min-w-360px rounded-1;
  --uno: "bg-$zx-modal_bg";
  .zx-modal__title {
    --uno: h-52px border-b border-solid border-transparent py-14px px-5 bg-white text-4 leading-6 rounded-tr-1 rounded-tl-1;
    --uno: "text-$zx-title";
    &.gray {
      --uno: "bg-$zx-modal_title-bg";
    }
    &.header-border {
      --uno: "border-$zx-border";
    }
  }
  .zx-modal__close {
    --uno: flex-inline items-center justify-center absolute top-14px right-18px w-6 h-6 cursor-pointer;
    i {
      --uno: text-hex-919398;
    }
    &:hover i {
      --uno: font-bold;
      --uno: "text-$zx-modal_close-hover";
    }
  }
  .zx-modal__body {
    --uno: rounded(bl-1 br-1);
    &.rect {
      --uno: rounded-0;
    }
  }
  .zx-modal__footer {
    --uno: relative h-56px py-3 px-5;
    --uno: rounded(bl-1 br-1);
    --uno: "bg-$zx-modal_footer-bg";
    &.footer-border::after {
      --uno: content-empty absolute left-5 right-5 top-0 h-1px;
      --uno: "bg-$zx-border";
    }
  }
}

.dark .zx-modal__content {
  --zx-modal_bg: #181A1F;
  --zx-modal_title-bg: #40444F;
}
</style>
