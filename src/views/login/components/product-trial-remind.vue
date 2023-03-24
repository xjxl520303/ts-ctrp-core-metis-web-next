<script lang="ts" setup>
import dayjs from 'dayjs'
import { useLogin } from '@/hooks/useLogin'
import type { CloseReason } from '@/types'
import { useMenu } from '@/hooks/useMenu'

const props = defineProps<{
  /** 对话框是否显示 */
  modelValue: boolean
  /** 试用过期时间 */
  date: string
}>()

const emit = defineEmits<{
  /** 对话框显示与关闭 */
  (e: 'update:modelValue', isClose: boolean): void
  /** 对话框关闭原因 */
  (e: 'close', reason: CloseReason): void
}>()

defineOptions({
  name: 'ProductTrialRemind',
  inheritAttrs: false,
})

const { getMenus } = useMenu()
const { updateUserAttr } = useLogin()

const localModelValue = ref(props.modelValue)
const isRemind = ref(false)
const expireDate = ref(dayjs(new Date(props.date)).format('YYYY年MM月DD日 HH:mm'))

watch(() => props.modelValue, (val) => {
  localModelValue.value = val
  expireDate.value = dayjs(new Date(props.date)).format('YYYY年MM月DD日 HH:mm')
})

watch(() => localModelValue.value, (val) => {
  emit('update:modelValue', val)
})

/**
 * 关闭对话框
 *
 * @param reason 关闭原因
 */
function handleClose(reason: CloseReason = 'cancel') {
  localModelValue.value = false
  emit('update:modelValue', false)
  emit('close', reason)
}

/**
 * 提交表单
 */
async function ok() {
  if (isRemind.value)
    updateUserAttr('pre_open_validity_end', props.date)

  const { isSuccess } = await getMenus()
  isSuccess && handleClose()
}
</script>

<template>
  <ZxModal v-model="localModelValue" title="产品试用提示" width="740px" :footer="false">
    <div class="product-trial-remind">
      <div class="title">
        尊敬的用户您好
      </div>
      <p>您当前使用的正行账号属于免费试用期，试用时间截至</p>
      <div class="expire-date mt-2">
        {{ expireDate }}
      </div>
      <p mt-2>
        如需开通正式账号，请您联系对应的顺丰销售，谢谢
      </p>
      <div class="btn-confirm" @click="ok">
        确认
      </div>
      <el-checkbox v-model="isRemind" label="不再提醒" mt-5 />
    </div>
  </ZxModal>
</template>

<style lang="scss" scoped>
.product-trial-remind {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 56px;
  .title {
    font-size: 24px;
    line-height: 33px;
    font-weight: bold;
    margin: 40px 0;
  }
  p {
    font-size: 14px;
    line-height: 20px;
  }
  .expire-date {
    background-color: #EEF7FF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    width: 336px;
    text-align: center;
    color: var(--zx-primary);
  }
  .btn-confirm {
    cursor: pointer;
    margin-top: 40px;
    color: #fff;
    width: 280px;
    height: 42px;
    text-align: center;
    line-height: 42px;
    background: #2697FF;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,1), inset 0px 1px 3px 0px rgba(117,189,255,1), inset 0px -2px 3px 0px rgba(0,0,0,0.50);
  }
  :deep(.el-checkbox__label) {
    color: #919398;
    text-decoration: underline;
    font-size: 12px;
  }
}
</style>
