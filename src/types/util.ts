export type GetMachineEventsType<E> = E extends { type: infer T } ? T : never
