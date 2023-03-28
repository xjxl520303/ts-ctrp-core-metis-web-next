<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import DownloadClient from './components/download-client.vue'
import ProductTrialRemind from './components/product-trial-remind.vue'
import Protocol from './components/protocol.vue'
import Register from './components/register.vue'
import { FooterLinkTypeEnum, LoginMethodEnum, ProtocolTypeEnum } from './types'
import type { RegisterStep } from '@/machines/register'
import { useLogin } from '@/hooks/useLogin'
import { useMenu } from '@/hooks/useMenu'
import { openWindow } from '@/utils'
import { BusinessStatusEnum, ContractSignStatusEnum, PayTypeEnum } from '@/types/model/userModel'
import type { PreOpenDto } from '@/types/model/userModel'

const router = useRouter()
const {
  showAppDownload,
  showTrialTips,
  showCountdown,
  showRegister,
  form,
  user,
  sendPhoneCode,
  loginByPhone,
} = useLogin()
const { getMenus } = useMenu()

const formRef = ref<FormInstance>()
/** 登录方式 */
const loginMethod = ref<LoginMethodEnum>(LoginMethodEnum.MOBILE)
/** 表单验证规则 */
const rules = reactive<FormRules>({
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
  ],
  phoneCode: [
    { required: true, message: '请输入短信验证码', trigger: 'blur' },
    { type: 'number', message: '请正确输入短信验证码', trigger: 'blur' },
  ],
})
/** 手机号输入框获得焦点 (没办法在CSS中反向控制父级样式) */
const isPhoneFocus = ref(false)
/** 短信验证码输入框获得焦点 (没办法在CSS中反向控制父级样式) */
const isPhoneCodeFocus = ref(false)
/** 倒计时 */
const countdown = ref()
/* -------------------------------------------------------------------------- */
/** 协议同意 */
const isProtocolCheck = ref(true)
/** 协议显示 */
const showProtocol = ref(false)
/** 协议类型 */
const protocolType = ref<ProtocolTypeEnum>()
/* -------------------------------------------------------------------------- */
/** 产品试用信息 */
const preOpenDto = ref<PreOpenDto>()
/* -------------------------------------------------------------------------- */
/** 显示在线咨询二维码 */
const showFaqQRcode = ref(false)
/* -------------------------------------------------------------------------- */
/** 默认步骤 */
const defaultStep = ref<RegisterStep>()
/** 显示审核结果 */
const showAuditResult = ref(false)

/**
 * 发送短信验证码
 */
async function sendCode() {
  if (showCountdown.value)
    return
  countdown.value = Date.now() + 1000 * 60
  const { error, isError } = await sendPhoneCode(form.phoneCode)
  if (isError)
    ElMessage.error(error?.message)
}

/**
 * 显示协议
 */
function openProtocol(type: ProtocolTypeEnum) {
  showProtocol.value = true
  protocolType.value = type
}

/**
 * 切换登录方式
 */
function changeLogin(method: LoginMethodEnum) {
  loginMethod.value = method
}

/**
 * 手机号登录
 */
async function submitForm() {
  if (!formRef.value)
    return
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const { error, isError } = await loginByPhone(form.value.phone, form.value.phoneCode)
      if (isError) {
        ElMessage.error(error?.message)
      }
      else {
        const { businessStatus, contractSignStatus, payType, preOpenDto, userYearPayDto } = user.value || {}

        if (businessStatus === BusinessStatusEnum.PRISTINE) {
          ElMessage.error('该用户未注册')
        }
        else if (businessStatus === BusinessStatusEnum.AUDITED) {
          if (
            (contractSignStatus === ContractSignStatusEnum.SIGNED && payType === PayTypeEnum.MONTH)
          || (contractSignStatus === ContractSignStatusEnum.SIGNED && payType === PayTypeEnum.YEAR && userYearPayDto?.pay)
          ) {
            console.log('正常')
            await getMenus()
          }
          else if (contractSignStatus === ContractSignStatusEnum.SIGNED && payType === PayTypeEnum.YEAR && !userYearPayDto?.pay) {
            // 年包 dialog
            console.log('年包 dialog')
          }
          else if (contractSignStatus === ContractSignStatusEnum.NOT_SIGN && payType === PayTypeEnum.YEAR && !userYearPayDto?.pay) {
            // 显示线上协议
            console.log('显示线上协议')
          }
          else if (contractSignStatus === ContractSignStatusEnum.NOT_SIGN && payType === PayTypeEnum.MONTH) {
            console.log('显示试用提醒')
            if (preOpenDto?.needRemind !== false)
              showTrialTips.value = true
            else
            // 获取菜单
              console.log('kkkk')
          }
        }
        else if ([BusinessStatusEnum.AWAIT, BusinessStatusEnum.REJECTED].includes(businessStatus.value)) {
          console.log('ohter')
          showAuditResult.value = true
        }
      }
    }
  })
}

/**
 * 底部导航点击
 */
function footerLinkEvent(type: FooterLinkTypeEnum) {
  switch (type) {
    case FooterLinkTypeEnum.INTRO:
      openWindow(router.resolve('/about?tab=0').href)
      break
    case FooterLinkTypeEnum.DATA_HUB:
      openWindow('http://dhub-web.sf-express.com/total/#/introduce')
      break
    case FooterLinkTypeEnum.LAAS:
      openWindow('https://www.sf-laas.com/')
      break
    case FooterLinkTypeEnum.D2C:
      openWindow('http://efdd.sf-express.com/')
      break
    case FooterLinkTypeEnum.ABOUT:
      openWindow(router.resolve('/about?tab=1').href)
      break
    default:
      openWindow(router.resolve('/about?tab=0').href)
  }
}
</script>

<template>
  <!-- 页眉 -->
  <portal to="header">
    <div h-60px bg-hex-181A1F flex items-center justify-between px-30>
      <img src="../../assets/images/logo_head_dark.png" h-10 w-a>
      <div>
        <span h-10 cursor-pointer text-white mr-30px hover:text-coolgray @click="showAppDownload = true">下载客户端</span>
        <span h-10 cursor-pointer text-white hover:text-coolgray @click="showRegister = true">注册控制塔</span>
      </div>
    </div>
  </portal>

  <!-- 主体 -->
  <portal to="main">
    <div class="bg-[rgba(255,255,255,.1)]" w-100 h-380px border-6px mr-130px pt-10 px-30px>
      <div flex justify-between>
        <div text-5 leading-30px tracking-widest text-white>
          登录&nbsp;<span font-bold>正行-供应链控制塔</span>
        </div>
        <el-tooltip content="顺丰内部员工登录" placement="left" :disabled="loginMethod === LoginMethodEnum.QRCODE">
          <span
            class="iconfont !text-10"
            :class="[loginMethod === LoginMethodEnum.QRCODE ? 'icon-login-icon2-iphone' : 'icon-login-icon1-qr']"
            text-white basis-10 cursor-pointer
            @click="changeLogin(loginMethod === LoginMethodEnum.MOBILE ? LoginMethodEnum.QRCODE : LoginMethodEnum.MOBILE)"
          />
        </el-tooltip>
      </div>

      <!-- 手机号登录 -->
      <template v-if="loginMethod === LoginMethodEnum.MOBILE">
        <div text-right text-3 text-hex-919398 mt-4>
          海外用户
          <el-tooltip placement="bottom-end">
            <template #content>
              <p>海外用户输入手机号时请携带</p>
              <p>国家（地区）编码</p>
              <p>示例：香港 852-55821528</p>
              <p style="padding-left:36px;">
                北美 1-320****581
              </p>
            </template>
            <i class="iconfont icon-cuowu !text-14px" ml-6px cursor-pointer />
          </el-tooltip>
        </div>

        <el-form ref="formRef" :model="form" :rules="rules" size="large" mt-10px>
          <!-- 手机号 -->
          <el-form-item prop="phone" :class="{ focus: isPhoneFocus }">
            <el-input v-model="form.phone" placeholder="手机号" @focus="isPhoneFocus = true" @blur="isPhoneFocus = false">
              <template #prefix>
                <i class="iconfont icon-shouji !text-5 text-hex-93A2BB" />
              </template>
            </el-input>
          </el-form-item>
          <!-- 短信验证码 -->
          <el-form-item prop="phoneCode" :class="{ focus: isPhoneCodeFocus }">
            <el-input
              v-model.number="form.phoneCode"
              placeholder="短信验证码"
              maxlength="4"
              :disabled="!form.phone"
              @focus="isPhoneCodeFocus = true"
              @blur="isPhoneCodeFocus = false"
            >
              <template #prefix>
                <i class="iconfont icon-duanxin1 !text-5 text-hex-93A2BB" />
              </template>
              <template #append>
                <div
                  class="bg-$zx-primary" :class="[showCountdown ? 'w-120px' : 'w-100px', {
                    'cursor-not-allowed bg-hex-8ac7ff': !form.phone || showCountdown,
                    'cursor-pointer': !showCountdown,
                  }]"
                  h-8 mx--15px rounded-2px text-14px text-white leading-22px flex items-center justify-center
                  @click="sendCode"
                >
                  <template v-if="showCountdown">
                    <el-countdown
                      format="ss秒后重新发送"
                      :value="countdown"
                      @finish="showCountdown = false"
                    />
                  </template>

                  <template v-else>
                    发送验证码
                  </template>
                </div>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <div flex items-center text-hex-add1fb text-3 mt--10px>
          <el-checkbox v-model="isProtocolCheck" />
          <a underline cursor-pointer @click="openProtocol(ProtocolTypeEnum.USER)">
            《用户服务协议》
          </a>
          <span mx-2px>及</span>
          <a underline cursor-pointer @click="openProtocol(ProtocolTypeEnum.PRIVACY)">
            《用户个人信息保护政策》
          </a>
        </div>

        <div class="btn-login" @click="submitForm">
          登录
        </div>

        <div text-3 text-hex-65686e mt-30px text-center>
          © 上海顺如丰来科技有限公司  版权所有
        </div>
      </template>

      <!-- 员工扫码登录 -->
      <template v-if="loginMethod === LoginMethodEnum.QRCODE">
        <div>jj</div>
      </template>
    </div>
  </portal>

  <!-- 页脚 -->
  <portal to="footer">
    <div class="bg-[rgba(255,255,255,.1)] " flex items-center justify-between pl-110px w-full h-25>
      <!-- 链接 -->
      <div flex>
        <div
          class="group border-[rgba(255,255,255,.4)]"
          flex flex-col items-center justify-center w-20 h-20 rounded-2px border-1px border-solid opactiy-30
          cursor-pointer hover:bg-black hover:border-hex-50535a
          @click="footerLinkEvent(FooterLinkTypeEnum.INTRO)"
        >
          <div class="bg-[url(assets/images/zhengxing1.png)] group-hover:bg-[url(assets/images/zhengxing2.png)] bg-cover w-28px h-28px" />
          <span leading-21px mt-6px text-white text-14px>产品介绍</span>
        </div>
        <div
          class="group border-[rgba(255,255,255,.4)]"
          flex flex-col items-center justify-center w-20 h-20 rounded-2px border-1px border-solid opactiy-30 ml-30px
          cursor-pointer hover:bg-black hover:border-hex-50535a
          @click="footerLinkEvent(FooterLinkTypeEnum.DATA_HUB)"
        >
          <div class="bg-[url(assets/images/datahub1.png)] group-hover:bg-[url(assets/images/datahub2.png)] bg-cover w-28px h-28px" />
          <span leading-21px mt-6px text-white text-14px>数据接入</span>
        </div>
        <div
          class="group border-[rgba(255,255,255,.4)]"
          flex flex-col items-center justify-center w-20 h-20 rounded-2px border-1px border-solid opactiy-30 ml-30px
          cursor-pointer hover:bg-black hover:border-hex-50535a
          @click="footerLinkEvent(FooterLinkTypeEnum.LAAS)"
        >
          <span class="iconfont icon-Laas !text-17px" text-white mt-11px />
          <span leading-21px mt-6px text-white text-14px>物流及服务</span>
        </div>
        <div
          class="group border-[rgba(255,255,255,.4)]"
          flex flex-col items-center justify-center w-20 h-20 rounded-2px border-1px border-solid opactiy-30 ml-30px
          cursor-pointer hover:bg-black hover:border-hex-50535a
          @click="footerLinkEvent(FooterLinkTypeEnum.D2C)"
        >
          <div class="bg-[url(assets/images/D2Clogo.png)] group-hover:bg-[url(assets/images/D2Clogo2.png)] bg-cover w-50px h-26px mt-2px" />
          <span leading-21px mt-6px text-white text-14px>大数据决策</span>
        </div>
        <div
          class="group border-[rgba(255,255,255,.4)]"
          flex flex-col items-center justify-center w-20 h-20 rounded-2px border-1px border-solid opactiy-30 ml-30px
          cursor-pointer hover:bg-black hover:border-hex-50535a
          @click="footerLinkEvent(FooterLinkTypeEnum.ABOUT)"
        >
          <span class="iconfont icon-lianxiwomen !text-30px" text-white mt-11px />
          <span leading-21px mt-6px text-white text-14px>联系我们</span>
        </div>
      </div>
      <!-- 在线咨询 -->
      <div flex>
        <div
          :class="[showFaqQRcode ? 'bg-[rgba(38,151,255,.8)] select-none cursor-default' : 'bg-[rgba(38,151,255,.5)] cursor-pointer hover:text-coolgray']"
          w-10 h-25 text-14px leading-22px text-white py-6px px-11px
          @click="showFaqQRcode = !showFaqQRcode"
        >
          {{ showFaqQRcode ? '微信扫码' : '在线咨询' }}
        </div>
        <div v-show="showFaqQRcode" class="bg-[rgb(38,151,255,.5)]" p-10px w-25 h-25>
          <img src="../../assets/images/code.png" w-full h-full>
        </div>
      </div>
    </div>
  </portal>

  <div h-full overflow-hidden relative>
    <el-container class="bg-[url(assets/images/scct_bg.jpg)]" bg-cover min-w-200 xl:min-w-1280px>
      <el-header style="--el-header-padding:0">
        <portal-target name="header" />
      </el-header>
      <el-main class="!flex h-[calc(100vh-160px)]" style="--el-main-padding:0" items-center justify-end>
        <portal-target name="main" />
      </el-main>
      <el-footer height="100px" style="--el-footer-padding:0">
        <portal-target name="footer" />
      </el-footer>
    </el-container>
  </div>

  <!-- 产品试用提示 -->
  <template v-if="preOpenDto">
    <ProductTrialRemind v-model="showTrialTips" :date="preOpenDto?.preOpenValidityEnd" />
  </template>

  <!-- 下载客户端弹出框 -->
  <DownloadClient v-model="showAppDownload" />

  <!-- 用户协议 -->
  <Protocol v-model="showProtocol" :type="protocolType" />

  <!-- 审核结果 -->
  <!-- <AuditResult
    v-model="showAuditResult" :status="businessStatus" @to-step="(step) => {
      showRegisterStep = true
      defaultStep = 'one'
    }" @close="() => close()"
  >
    <template #name>
      {{ businessCustomerName }}
    </template>
    <template #code>
      {{ businessCode }}
    </template>
  </AuditResult> -->

  <!-- 注册控制塔 -->
  <Register v-model="showRegister" :step="defaultStep" />
</template>

<style lang="scss" scoped>
.el-form-item {
  border: 1px solid transparent;
  &.focus {
    border-radius: 2px;
    border: 1px solid rgb(138, 199, 255);
    box-shadow: 0px 0px 16px 4px rgba(38, 151, 255, 1),
      inset 0px 0px 4px 0px rgba(38, 151, 255, 1);
    :deep(.el-input-group__append) {
      border: 1px solid rgb(138, 199, 255);
      border-left: 0 none;
    }
  }
  &.is-error {
    :deep(.el-input-group__append) {
      border: 1px solid var(--el-color-danger);
      border-left: 0 none;
    }
  }
}

:deep(.el-input__wrapper) {
  padding-left: 10px;
}

:deep(.el-input-group__append) {
  margin-left: -1px;
  background-color: var(--el-input-bg-color);
  box-shadow: none;
}

:deep(.el-statistic__content) {
  --el-statistic-content-font-weight: normal;
  --el-statistic-content-font-size: 14px;
  --el-statistic-content-color: white;
}
.btn-login {
  cursor: pointer;
  color: #fff;
  height: 42px;
  text-align: center;
  line-height: 42px;
  background: #2697FF;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,1), inset 0px 1px 3px 0px rgba(117,189,255,1), inset 0px -2px 3px 0px rgba(0,0,0,0.50);
}
</style>
