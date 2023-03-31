import type { RegisterStep } from './context'

export type RegisterEvents =
  | { type: 'SET_VISIBLE'; val?: boolean }
  | { type: 'SET_STEP'; step?: RegisterStep }
  | { type: 'STEP.prev' }
  | { type: 'STEP.next' }
