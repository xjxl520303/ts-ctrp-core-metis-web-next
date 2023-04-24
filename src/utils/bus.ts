/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { Emitter } from 'mitt'
import mitt from 'mitt'
import type { MenuContext, MenuEvents } from '@/machines/menu'
import type { GetMachineEventsType } from '@/types'
import type { UserContext, UserEvents } from '@/machines/user'

type UpdateUser = {
  action: GetMachineEventsType<UserEvents>
  context: UserContext
}

type UpdateMenu = {
  action: GetMachineEventsType<MenuEvents>
  context: MenuContext
}

type Events = {
  /** 用户信息变化 */
  UPDATE_USER: UpdateUser
  /** 菜单变化 */
  UPDATE_MENU: UpdateMenu
}

export const bus: Emitter<Events> = mitt<Events>()
