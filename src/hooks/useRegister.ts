import type { RegisterContext, RegisterStep } from '@/machines/register'
import { createRegisterMachine } from '@/machines/register'

export interface UseRegisterReturnType extends RegisterContext {
  /** 实例引用 */
  service: ReturnType<typeof useInterpret>
  /** 显示与关闭注册 */
  setVisible: (val?: boolean) => void
  /** 设置步骤 */
  setStep: (step?: RegisterStep) => void
  /** 上一步 */
  toPrevStep: () => void
  /** 下一步 */
  toNextStep: () => void
}

/**
 * 使用 `useRegister` 处理【注册控制塔】页面逻辑
 */
export const useRegister = (serviceInstance?: ReturnType<typeof useInterpret>) => {
  const service = serviceInstance || useInterpret(createRegisterMachine())
  // export const useRegister = (serviceInstance?: ReturnType<typeof useInterpret>) => {
  //   const service = serviceInstance || useInterpret(createRegisterMachine)

  // const isSmsLoading = useSelector(service, state => state.matches('form.sms'))
  // const isSuccess = useSelector(service, state => state.matches('form.success.sms'))
  // const error = useSelector(service, state => state.context.error)
  const visible = useSelector(service, state => state.context.visible)
  const step = useSelector(service, state => state.context.step)
  const selected = useSelector(service, state => state.context.selected)
  const stepOptions = useSelector(service, state => state.context.stepOptions)
  const setVisible = (val: boolean) => service.send({ type: 'SET_VISIBLE', val })
  const setStep = (step?: RegisterStep) => service.send({ type: 'SET_STEP', step })
  const toPrevStep = () => service.send({ type: 'STEP.prev' })
  const toNextStep = () => service.send({ type: 'STEP.next' })

  return {
    service,
    // isSmsLoading,
    // isSuccess,
    // error,
    visible,
    step,
    selected,
    stepOptions,
    setVisible,
    setStep,
    toPrevStep,
    toNextStep,
  } as unknown as UseRegisterReturnType
}
