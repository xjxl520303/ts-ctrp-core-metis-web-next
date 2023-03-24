<script lang="ts" setup>
import { RegistStepEnum } from '../types'
import BrandContainer from './brand-container.vue'
import { BusinessStatusEnum } from '@/types/model/userModel'

const props = withDefaults(defineProps<{
  /** 是否显示 */
  modelValue: boolean
  /** 审核状态(商机状态) */
  status?: BusinessStatusEnum
  /** 内联显示 */
  inline?: boolean
}>(), {
  inline: false,
})

const emit = defineEmits<{
  /** 显示与关闭 */
  (e: 'update:modelValue', isClose: boolean): void
  /** 切换注册面板 */
  (e: 'toStep', step: RegistStepEnum): void
  /** 关闭事件 */
  (e: 'close', callback: Function): void
}>()

defineOptions({
  name: 'AuditResult',
  inheritAttrs: false,
})

const localModelValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  localModelValue.value = val
})

watch(() => localModelValue.value, (val) => {
  emit('update:modelValue', val)
})

/**
 * 切换注册
 */
function showRegist() {
  localModelValue.value = false
  emit('toStep', RegistStepEnum.STEP_1)
}

/**
 * 关闭容器
 */
function close() {
  localModelValue.value = false
}
</script>

<template>
  <portal to="audited">
    <div w-full h-full flex flex-col justify-center items-center text-white>
      <div
        relative w-200 h-20 flex justify-center items-center bg-no-repeat bg-gradient-to-r from-hex-181A1F via-hex-002F5B to-hex-181A1F
        un-before="content-none absolute top-0 h-1px w-full bg-no-repeat bg-gradient-to-r from-hex-112337 via-hex-012e58 to-hex-112337"
        un-after="content-none absolute bottom-0 h-1px w-full bg-no-repeat bg-gradient-to-r from-hex-112337 via-hex-012e58 to-hex-112337"
      >
        <i class="iconfont icon-gouxuan text-$zx-primary !text-45px" />
        <span ml-4 text-6>审核失败</span>
      </div>
      <div mt-10 text-4 leading-30px text-center>
        <!-- slot: 商机客户名称 -->
        <p>恭喜【<slot name="name" />】</p>
        <p>可直接进入「正行-应链控制塔」，为生意保驾护航！</p>
      </div>
      <span class="btn-login" @click="() => emit('close', close)">登录 控制塔</span>
    </div>
  </portal>

  <portal to="await">
    <div w-full h-full flex flex-col justify-center items-center text-white>
      <div flex flex-col justify-center items-center>
        <img src="../../../assets/step3-review.png" w-90px h-96px>
        <span mt-14px text-18px leading-27px text-hex-B4DBFF>审核中...</span>
      </div>
      <p mt-3 text-4 leading-30px text-center>
        【<slot name="name" />】正在等待审核
      </p>
      <p>
        <span class="text-$zx-primary" cursor-pointer underline text-14px leading-6 mt-10px @click="showRegist">还想注册新用户</span>
        <el-tooltip
          content="如您有更多商机信息需要提报，可以再次进行用户注册流程，注意再次注册需要更换手机号"
        >
          <i class="iconfont icon-cuowu !text-hex-EE7879 !text-3" ml-10px />
        </el-tooltip>
      </p>
      <div h-1px bg-hex-2F333C w-100 mt-35px />
      <div mt-30px text-14px leading-21px text-center text-hex-A7A9AD>
        <!-- slot: 商机申请码 -->
        <p>【<slot name="code" />】是您信息的专属申请号</p>
        <p>及时发送给您的销售，会加快审核进度</p>
      </div>
      <el-button type="primary" mt-45px @click="() => emit('close', close)">
        已知悉
      </el-button>
    </div>
  </portal>

  <portal to="rejected">
    <div w-full h-full flex flex-col justify-center items-center text-white>
      <div
        relative w-200 h-20 flex justify-center items-center bg-no-repeat bg-gradient-to-r from-hex-181A1F via-hex-340E0E to-hex-181A1F
        un-before="content-none absolute top-0 h-1px w-full bg-no-repeat bg-gradient-to-r from-hex-271b1f via-hex-471c1e to-hex-271b1f"
        un-after="content-none absolute bottom-0 h-1px w-full bg-no-repeat bg-gradient-to-r from-hex-271b1f via-hex-471c1e to-hex-271b1f"
      >
        <i class="iconfont icon-shibai1 text-hex-E83F40 !text-45px" />
        <span ml-4 text-6>审核失败</span>
      </div>
      <div mt-10 text-4 leading-30px text-center>
        <p>【<slot name="name" />】申请已被驳回</p>
        <p>详情会由我们的客服进行回访</p>
      </div>
      <el-button type="primary" mt-70px @click="() => emit('close', close)">
        已知悉
      </el-button>
    </div>
  </portal>

  <template v-if="inline">
    <template v-if="props.status === BusinessStatusEnum.AUDITED">
      <portal-target name="audited" />
    </template>
    <template v-else-if="props.status === BusinessStatusEnum.AWAIT">
      <portal-target name="await" />
    </template>
    <template v-else-if="props.status === BusinessStatusEnum.REJECTED">
      <portal-target name="rejected" />
    </template>
  </template>

  <template v-else>
    <BrandContainer v-model="localModelValue">
      <template v-if="props.status === BusinessStatusEnum.AUDITED">
        <portal-target name="audited" />
      </template>
      <template v-else-if="props.status === BusinessStatusEnum.AWAIT">
        <portal-target name="await" />
      </template>
      <template v-else-if="props.status === BusinessStatusEnum.REJECTED">
        <portal-target name="rejected" />
      </template>
    </BrandContainer>
  </template>
</template>

<style lang="scss" scoped>
.btn-login {
  cursor: pointer;
  margin-top: 40px;
  color: #fff;
  width: 340px;
  height: 42px;
  text-align: center;
  line-height: 42px;
  background: linear-gradient(180.00deg, rgba(38,151,255,1) 11%,rgba(0,109,209,1) 100%);
  box-shadow: 0px 2px 5px rgb(0, 0, 0),inset 0px 1px 3px rgb(117, 189, 255),inset 0px -2px 3px rgba(0, 0, 0, 0.5);
  border-radius: 2px;
}
</style>
