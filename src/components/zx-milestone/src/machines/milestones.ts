/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type { ActorRef } from 'xstate'
import type { MilestoneContext } from './milestone'
import { MAX_HEIGHT, createMilestoneMachine } from './milestone'
import type { LocalMilestoneItem } from '@/types'

export type LocalLocalMilestoneItem = LocalMilestoneItem & MilestoneContext & { ref: ActorRef<any> }

export type MilestonesContext = {
  currentMilestone: LocalLocalMilestoneItem | null
  milestones: LocalLocalMilestoneItem[]
}

export type MilestonesEvents =
  | { type: 'INIT.options'; options: LocalMilestoneItem[] }
  | { type: 'SELECT.item'; milestone: LocalLocalMilestoneItem }
  | { type: 'UPDATE.item'; milestone: MilestoneContext }

export type MilestonesMachine = ReturnType<typeof createMilestonesMachine>

const createMilestoneState = (id: number): MilestoneContext => ({
  id,
  height: 0,
  selected: false,
  waiting: false,
})

export const createMilestonesMachine = () => {
  return createMachine(
    {
      /** @xstate-layout N4IgpgJg5mDOIC5QFsCWAbOAXA9gOzgGIBJAOWIBUA6HABy1X1gG0AGAXUVFp1lQfxcQAD0QBGAKxUA7ADYAHNIAsATgnzZAJjEqVSgDQgAnuNbyqAZjGLZFlZIutp6gL4vDaTLFwFYhAMoAogAygQDC1PxgyGycSCA8fAJ4QqIIYpqGJumabu4geDgQcEKe2Pgl8Yn8jCnxaZqsVPIqCtLyYmKO7awqWYiN0lS2GUpirJoWskrSZnkuQA */
      schema: {
        context: {} as MilestonesContext,
        events: {} as MilestonesEvents,
        services: {},
      },
      tsTypes: {} as import('./milestones.typegen').Typegen0,
      predictableActionArguments: true,
      id: 'milestones',
      context: {
        currentMilestone: null,
        milestones: [],
      },
      states: {
      },
      on: {
        'INIT.options': {
          actions: 'initOptions',
        },
        'SELECT.item': {
          actions: ['selectItem', 'updateList'],
        },
        'UPDATE.item': {
          actions: 'updateItem',
        },
      },
    },
    {
      actions: {
        initOptions: assign({
          milestones: (_, event) => {
            return event.options.map((milestone) => {
              const milestoneState = createMilestoneState(milestone.id)
              const ref: ActorRef<any> = spawn(createMilestoneMachine(milestoneState))
              return {
                ref,
                ...milestone,
                ...ref.getSnapshot().context,
              }
            })
          },
        }),
        selectItem: assign({
          currentMilestone: (context, { milestone }) => milestone,
        }),
        updateItem: assign({
          milestones: (context, { milestone }) => {
            return context.milestones.map((item) => {
              if (item.id === milestone.id) {
                return {
                  ...item,
                  ...milestone,
                }
              }
              return item
            })
          },
        }),
        updateList: (context, { milestone }) => {
          context.milestones.forEach((item) => {
            if (item.id !== milestone.id && item.waiting) {
              item.ref.send({ type: 'SET.height', height: item.selected ? MAX_HEIGHT : 0 })
              item.ref.send('SELECT')
            }

            return {
              milestones: context.milestones,
            }
          })
        },
      },
      services: {

      },
    },
  )
}
