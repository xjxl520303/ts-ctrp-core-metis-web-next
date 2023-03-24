<script lang="ts" setup>
import { useRegister } from '@/hooks/useRegister'

const props = withDefaults(defineProps<{
  /** 是否显示 */
  modelValue: boolean
  /** 显示注册步骤标签页 */
  showStep?: boolean
  /** 隐藏底部按钮 */
  hideFooter?: boolean
  /** register 服务实例 */
  service: ReturnType<typeof useInterpret>
}>(), {
  showStep: false,
  hideFooter: false,
})

const emit = defineEmits<{
  /** 显示与关闭 */
  (e: 'update:modelValue', isClose: boolean): void
}>()

defineOptions({
  name: 'BrandContainer',
  inheritAttrs: false,
})

const { visible, step, selected, stepOptions, setVisible, toPrevStep, toNextStep } = useRegister(props.service)

// const localModelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  // localModelValue.value = val
  setVisible(val)
})

watch(() => visible.value, (val) => {
  emit('update:modelValue', val)
})

// watch(() => props.step, (val) => {
//   setStep(val)
// })

// watch(() => stepOptions?.values, (val) => {
//   console.log(val, 'kkkk')
// })

/**
 * 关闭容器
 */
function close() {
  visible.value = false
}
</script>

<template>
  <template v-if="visible">
    <div absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full overflow-hidden bg-black rounded-1>
      <el-container>
        <el-header style="--el-header-padding:0">
          <div h-60px bg-hex-181A1F flex items-center justify-between px-30>
            <img src="../../../assets/images/logo_head_dark.png" h-10 w-a>
            <div>
              <span h-10 cursor-pointer text-white hover:text-coolgray @click="() => setVisible(false)">登录</span>
            </div>
          </div>
        </el-header>

        <!-- 注册步骤 -->
        <template v-if="props.showStep">
          <div class="h-[calc(100vh-132px)]" mx-21>
            <div flex justify-between w-500px mx-a my-5>
              <template v-for="item in stepOptions" :key="item.step">
                <div class="step" :class="[selected.includes(item.step) ? 'solid' : 'dashed']">
                  <img :src="selected.includes(item.step) ? `/src/assets/images/${item.activeIcon}` : `/src/assets/images/${item.icon}`" w-10 h-10>
                  <span text-hex-919398 text-14px leading-21px mt-6px>{{ item.stepName }}</span>
                </div>
              </template>
            </div>

            <perfect-scrollbar class="h-[calc(100%-107px)]" bg-hex-181a1f pr-6px>
              <slot />
            </perfect-scrollbar>
          </div>
        </template>

        <template v-else>
          <perfect-scrollbar class="h-[calc(100vh-172px)]" pr-6px mx-135px mt-10 bg-hex-181a1f>
            <slot />
          </perfect-scrollbar>
        </template>
        <el-footer height="72px" style="--el-footer-padding: 20" flex items-center>
          <template v-if="props.hideFooter || props.showStep">
            <div w-full text-right mx-21>
              <template v-if="step === 'one'">
                <el-button type="primary" text @click="() => setVisible(false)">
                  取消
                </el-button>
              </template>
              <template v-else>
                <el-button type="primary" text @click="toPrevStep">
                  上一步
                </el-button>
              </template>
              <el-button type="primary" @click="toNextStep">
                提交
              </el-button>
            </div>
          </template>
        </el-footer>
      </el-container>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.step {
  --uno: "flex flex-col justify-center items-center relative";
  &::before {
    --uno: "content-none absolute top-5 left--172px border-b w-172px";
  }
  &.solid::before {
    --uno: "border-solid border-b-$zx-primary";
  }
  &.dashed::before {
    --uno: "border-dashed border-b-hex-50535a";
  }
  &:first-child::before {
    display: none;
  }
}
</style>
