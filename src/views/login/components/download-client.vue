<script lang="ts" setup>
const props = defineProps<{
  /** 对话框是否显示 */
  modelValue: boolean
}>()

const emit = defineEmits<{
  /** 对话框显示与关闭 */
  (e: 'update:modelValue', isClose: boolean): void
}>()

defineOptions({
  name: 'DownloadClientDialog',
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
  <ZxModal
    v-model="localModelValue"
    width="1200px"
    custom-class="zx-modal__download-client"
    :click-to-close="false"
    :header-border="false"
    :footer-border="false"
  >
    <div flex justify-between>
      <div w-260px grow-0 shrink-0 basis-260px>
        <img transform style="--un-rotate:180deg" src="../../../assets/images/login/arrow.png">
      </div>
      <div flex-1 text-center text-white>
        <div text-26px leading-37px>
          正行-供应链控制塔 客户端下载二维码
        </div>
        <div text-4 leading-22px mt-5>
          智慧版web端用户现支持使用客户端查看数据
        </div>
        <div mt-43px flex justify-center>
          <div w-220px bg-hex-000C5A py-30px px-25px>
            <div flex items-center leading-25px text-18px text-hex-05FFFF>
              <i class="iconfont icon-apple !text-25px mr-4" />
              iPhone版下载
            </div>
            <img w-170px h-170px mt-15px src="../../../assets/images/login/ios.png" alt="iPhone版下载二维码">
          </div>
          <div w-220px bg-hex-000C5A py-30px px-25px>
            <div flex items-center leading-25px text-18px text-hex-05FFFF>
              <i class="iconfont icon-android !text-25px mr-4" />
              Android版下载
            </div>
            <img w-170px h-170px mt-15px src="../../../assets/images/login/android.png" alt="Android版下载二维码">
          </div>
        </div>
        <div mt-64px text-hex-A7A9AD>
          *iOS端扫码后请在safari浏览器打开
        </div>
      </div>
      <div w-260px grow-0 shrink-0 basis-260px>
        <img src="../../../assets/images/login/arrow.png">
      </div>
    </div>
  </ZxModal>
</template>

<style lang="scss">
.zx-modal__download-client {
  --zx-modal_bg: rgba(0,0,0,.9);
  --zx-modal_title-bg: rgba(0,0,0,.9);
  --zx-modal_close-hover: var(--zx-primary);
  opacity: 0.85;
}
</style>
