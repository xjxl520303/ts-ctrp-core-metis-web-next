/* eslint-disable @typescript-eslint/consistent-type-definitions */

export const MAX_HEIGHT = 80
export const DURATION = 1000 / 60

export type MilestoneContext = {
  id: number
  /** 动画层元素高度 */
  height: number
  /** requestAnimationFrame 引用 */
  rafId?: number
  /** 是否选中 */
  selected: boolean
  /** 是否等待中 */
  waiting: boolean
}

export type MilestoneEvents =
  | { type: 'SELECT' }
  | { type: 'SET.height'; height: number }
  | { type: 'SET.waiting'; isWaiting: boolean }
  | { type: 'SET.selected'; isSelected: boolean }
  | { type: 'START.anim'; elapsedTime: number }
  | { type: 'STOP.anim' }

export type MilestoneMachine = ReturnType<typeof createMilestoneMachine>

export const createMilestoneMachine = ({
  id,
  height,
  selected,
  waiting,
}: MilestoneContext) => {
  return createMachine(
    {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQFEAZegYQBUBtABgF1FQADgHtYuAC64h+fiAAeiAIwBmLiQDsADjUBWLlwBsAJgCcAFn3bTAGhABPRPq7aS2hVw3HDG8-uMalAL4BNmhYeISkAO7o4gRQdGwAggBKbCTo+Lio3HxIIMKiElIy8ghKXiT6Gl7lXIZKpsYKavo29gg+6kaNWtWuXAqmQSEYOATEJNGx+PG0bADyAArpmdm8MgWxxXmlzaYupgZG2i2GRlzWdojaNyRcStrGesZ+j5rDIKFjEZMxEjPUZL0BhpDJZHIbERbaQ7RCNBQkQwGEymbz6BQaBT6VpXBCODR3NweLw+PyBYKfUbhCZTf6zehpbBgXBQbBiCF5TZFGGgUpKfkkBSWNTKDSuZSaS7tJRqVSmUwy7QqEwyvwfL7UqJ-OJ0Bm-aZQDmCKHckqIcrGSotR5HBpKTxtRCGNT7BSGXRcNTO7rGfTqqnjLUG3VpTAAVwAThGwPgxGwsmAjfkTZIeXJzQoEZ5dPVdEpHDdHQhmmoSBoDEoiQ0DE01P6woH9XSQyQKOhYHGE0muamzWV3YjymKnGZ-Oii5iSKidEKWi8PG6ghT8EIIHAZBrA5DCr3YQgALQ49qH+vfCbkKjb6F90yGIvnMumNwveoKlR+imbn60uJX017ytLUsXx7keKo+ila4zBIYxK0MQwFVcVEPxGBsfmjWAwDERJVj-XdeQcQ51BFWstB6NR709GCTGOeovE9YwlwCIA */
      schema: {
        context: {} as MilestoneContext,
        events: {} as MilestoneEvents,
        services: {},
      },
      tsTypes: {} as import('./milestone.typegen').Typegen0,
      predictableActionArguments: true,
      id: `milestone-${id}`,
      context: {
        id,
        height,
        selected,
        waiting,
        rafId: 0,
      },
      initial: 'idle',
      states: {
        idle: {
          on: {
            SELECT: {
              target: 'waiting',
              cond: context => !context.waiting,
              actions: sendParent(context => ({ type: 'SELECT.item', milestone: context })),
            },
          },
        },
        waiting: {
          invoke: {
            id: 'raf',
            src: context => (callback) => {
              let lastTimestamp: number
              const render = (timestamp: number) => {
                if (lastTimestamp) {
                  const elapsedTime = timestamp - lastTimestamp
                  callback({ type: 'START.anim', elapsedTime })
                }
                lastTimestamp = timestamp
                context.rafId = window.requestAnimationFrame(render)
              }
              window.requestAnimationFrame(render)
              return () => window.cancelAnimationFrame(context.rafId as number)
            },
          },
          on: {
            'START.anim': {
              actions: [
                'setAnim',
                sendParent(context => ({ type: 'UPDATE.item', milestone: context })),
              ],
            },
            'STOP.anim': {
              target: 'idle',
            },
            'SET.height': {
              actions: 'setHeight',
            },
            'SET.waiting': {
              actions: 'setWaiting',
            },
          },
        },
      },
    },
    {
      actions: {
        setAnim: assign((context, { elapsedTime }) => {
          // 一个动画周期内的高度变化量
          const num = Math.max(1, (elapsedTime / DURATION) / 2)
          if (context.height <= MAX_HEIGHT) {
            context.waiting = true
            if (context.selected) {
              const h = context.height - num
              context.height = h < 0 ? 0 : h
            }
            else {
              const h = context.height + num
              context.height = h > MAX_HEIGHT ? MAX_HEIGHT : h
            }
          }
          else {
            context.waiting = false
            context.height = context.selected ? MAX_HEIGHT : 0
          }

          if (context.height === MAX_HEIGHT && !context.selected) {
            context.selected = true
            context.waiting = false
          }

          if (context.height === 0 && context.selected) {
            context.selected = false
            context.waiting = false
          }

          return context
        }),
        setHeight: assign({
          height: (context, { height }) => height,
        }),
        setWaiting: assign({
          waiting: (_, { isWaiting }) => isWaiting,
        }),
      },
    },
  )
}
