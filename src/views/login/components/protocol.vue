<script lang="ts" setup>
import { ProtocolTypeEnum } from '../types'
import UserProtocol from './user.protocol.vue'
import PrivacyProtocol from './privacy.protocol.vue'

const props = withDefaults(defineProps<{
  /** 是否显示 */
  modelValue: boolean
  /** 协议类型 */
  type: ProtocolTypeEnum
}>(), {
  type: ProtocolTypeEnum.USER,
})

const emit = defineEmits<{
  /** 显示与关闭 */
  (e: 'update:modelValue', isClose: boolean): void
}>()

defineOptions({
  name: 'Protocol',
  inheritAttrs: false,
})

const localModelValue = ref(props.modelValue)
const localType = ref(props.type)

watch(() => props.modelValue, (val) => {
  localModelValue.value = val
})

watch(() => props.type, (val) => {
  localType.value = val
})

watch(() => localModelValue.value, (val) => {
  emit('update:modelValue', val)
})
</script>

<template>
  <template v-if="localModelValue">
    <div absolute top-0 left-0 right-0 bottom-0 z-10 h-full w-full overflow-hidden bg-white>
      <el-container>
        <el-header class="border-b-$zx-border" style="--el-header-padding: 0 30px" height="100px" flex items-center border-b border-b-solid>
          <img src="../../../assets/images/logo_head.png" w-50 basis-50 cursor-pointer @click="emit('update:modelValue', false)">
          <div flex-1 flex justify-center mr-50>
            <el-tabs v-model="localType" class="my-tabs">
              <el-tab-pane label="用户条款" :name="ProtocolTypeEnum.USER" />
              <el-tab-pane label="隐私条款" :name="ProtocolTypeEnum.PRIVACY" />
            </el-tabs>
          </div>
        </el-header>
        <perfect-scrollbar class="h-[calc(100vh-260px)]" pt-46px pr-6px mx-135px>
          <template v-if="localType === ProtocolTypeEnum.USER">
            <UserProtocol />
          </template>

          <template v-if="localType === ProtocolTypeEnum.PRIVACY">
            <PrivacyProtocol />
          </template>
        </perfect-scrollbar>
        <el-footer height="160px" flex items-center justify-center>
          <el-button class="btn-ok" type="primary" size="large" @click="emit('update:modelValue', false)">
            确认
          </el-button>
        </el-footer>
      </el-container>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.my-tabs {
  --el-tabs-header-height: 100px;
  --el-font-size-base: 24px;
}

:deep(.el-tabs__nav-wrap::after) {
  content: none;
}

:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tabs__active-bar) {
  display: none;
}

:deep(.el-tabs__item) {
  color: #7b7e83;
  &.is-active {
    color: var(--zx-title);
    border-bottom: 2px solid #5ab0ff;
  }
  &.is-top:nth-child(2) {
    padding-left: 20px;
    margin-right: 100px;
  }
  &.is-top:last-child {
    padding-right: 20px;
  }
}

.btn-ok {
  --el-button-size: 52px;
  width: 200px;
}
</style>
