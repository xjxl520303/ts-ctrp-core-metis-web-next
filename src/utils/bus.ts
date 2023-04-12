/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Emitter } from 'mitt'
import mitt from 'mitt'
import type { MenuContext, MenuEvents } from '@/machines/menu'
import type { GetMachineEventsType } from '@/types'

type UpdateMenu = {
  action: GetMachineEventsType<MenuEvents>
  context: MenuContext
}

type Events = {
  /** 菜单变化 */
  UPDATE_MENU: UpdateMenu
}

export const bus: Emitter<Events> = mitt<Events>()
