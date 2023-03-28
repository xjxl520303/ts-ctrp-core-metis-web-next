/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { RegisterContext, RegisterStep } from './context'
import { INITIAL_REGISTER_CONTEXT } from './context'
import type { RegisterEvents } from './events'

type RegisterServices = {

}

export type RegisterMachine = ReturnType<typeof createRegisterMachine>

export const createRegisterMachine = () => {
  return createMachine({
    schema: {
      context: {} as RegisterContext,
      events: {} as RegisterEvents,
      services: {} as RegisterServices,
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    predictableActionArguments: true,
    id: 'register',
    context: INITIAL_REGISTER_CONTEXT,
    states: {
      ui: {
        initial: 'one',
        states: {
          one: {},
          two: {},
          three: {},
        },
        on: {
          'SET_VISIBLE': {
            actions: assign({ visible: (_, event) => event.val }),
          },
          'SET_STEP': {
            actions: 'selectStep',
            cond: context => !!context.stepOptions,
          },
          'STEP.prev': {
            cond: context => !!context.step,
            actions: 'selectPrev',
          },
          'STEP.next': {
            cond: context => !!context.step,
            actions: 'selectNext',
          },
        },
      },
      api: {},
    },
  }, {
    actions: {
      /** 选中步骤 */
      selectStep: assign({
        step: (_, { step }) => step || 'one',
        selected: (_, { step }): RegisterStep[] => step === 'one'
          ? ['one']
          : step === 'two'
            ? ['one', 'two']
            : ['one', 'two', 'three'],
      }),
      /** 选中上一步 */
      selectPrev: assign({
        step: ({ step }): RegisterStep => step === 'one'
          ? 'one'
          : step === 'two'
            ? 'one'
            : 'two',
        selected: ({ step }): RegisterStep[] => step === 'one'
          ? ['one']
          : step === 'two'
            ? ['one']
            : ['one', 'two'],
      }),
      /** 选中下一步 */
      selectNext: assign({
        step: ({ step }): RegisterStep => step === 'one'
          ? 'two'
          : step === 'two'
            ? 'three'
            : 'three',
        selected: ({ step }): RegisterStep[] => step === 'one'
          ? ['one', 'two']
          : step === 'two'
            ? ['one', 'two', 'three']
            : ['one', 'two', 'three'],
      }),
    },
    services: {},
  })
}
