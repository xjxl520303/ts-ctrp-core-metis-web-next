import type { Emitter } from 'mitt'
import mitt from 'mitt'
import type { MenuContext } from '@/machines/menu'

interface Events {
  UPDATE_MENU: MenuContext
}

export const bus: Emitter<Events> = mitt<Events>()
