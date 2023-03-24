export type RegisterStep = 'one' | 'two' | 'three'

export interface RegisterStepItem {
  /** 步骤 */
  step: RegisterStep
  /** 步骤名 */
  stepName: string
  /** 图标 */
  icon: string
  /** 激活图标 */
  activeIcon?: string
}

export interface RegisterContext {
  /** 是否显示 */
  visible: boolean
  /** 注册步骤 */
  step: RegisterStep
  /** 已选中步骤 */
  selected: RegisterStep[]
  /** 步骤配置 */
  stepOptions: RegisterStepItem[]
}

export const STEP_OPTIONS: RegisterStepItem[] = [
  {
    step: 'one',
    stepName: '身份验证',
    icon: 'regist-step1.png',
    activeIcon: 'regist-step1.png',
  },
  {
    step: 'two',
    stepName: '信息填报',
    icon: 'regist-step2.png',
    activeIcon: 'regist-step2-active.png',
  },
  {
    step: 'three',
    stepName: '等待审核',
    icon: 'regist-step3.png',
    activeIcon: 'regist-step3-active.png',
  },
]

export const INITIAL_REGISTER_CONTEXT: RegisterContext = {
  visible: false,
  step: 'one',
  selected: ['one'],
  stepOptions: STEP_OPTIONS,
}
