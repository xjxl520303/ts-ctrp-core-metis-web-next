import { setupWorker } from 'msw'
import { defaultHandlers, handlers } from './handlers'

export const mocker = setupWorker(...handlers, ...defaultHandlers)
