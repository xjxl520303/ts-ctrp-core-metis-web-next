<script lang="ts" setup>
import type { LocalLocalMilestoneItem } from './machines/milestones'
import { MAX_HEIGHT } from './machines/milestone'
import { hexToRgba } from '@/utils/color'
import { LocaleEnum } from '@/enums'

const props = withDefaults(defineProps<{
  context: LocalLocalMilestoneItem
}>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

defineOptions({
  name: 'MilestoneItem',
  inheritAttrs: false,
})

const { locale } = useUser()
const { state, send } = useActor(props.context.ref)
// const { state, send } = useActor(computed(() => props.context.ref))
const context = computed(() => props.context)

watch(() => context.value.height, (val) => {
  if ((val === MAX_HEIGHT && context.value.selected) || (val === 0 && !context.value.selected))
    send({ type: 'STOP.anim' })
})

function select() {
  send({ type: 'SELECT' })
}
</script>

<template>
  <div
    relative flex flex-col justify-center items-center min-w-20 h-20 border-1 border-solid border-hex-DCDFE6
    rounded-3px bg-white dark:border-hex-585C6A dark:bg-hex-181A1F
    :style="{
      cursor: context.waiting ? 'wait' : 'pointer',
      ...((context.selected || context.waiting) && {
        borderColor: hexToRgba(context.colour, context.waiting ? 0.4 : 1),
        boxShadow: `inset 0 0 12px 0 ${hexToRgba(context.colour, context.waiting ? 0.4 : 1)}`,
      }) || null,
    }"
    @click="select"
  >
    <template v-if="context.waiting">
      <div
        absolute border-t-1 border-t-solid w-full h-0 left-0 right-0 bottom-0
        :style="{
          borderTopColor: context.colour,
          background: `linear-gradient(180deg, ${hexToRgba(context.colour, 0.5)}, ${hexToRgba(context.colour, 0.1)})`,
          height: `${context.height}px`,
        }"
      />
    </template>
    <i :class="`iconfont icon-milestone-${context.icon || 'undefined'} !text-6`" :style="`color: ${context.colour};`" />
    <span class="text-$zx-title" text-14px leading-5 break-all whitespace-pre>{{ locale === LocaleEnum.EN ? context.nameEn : context.nameCn }}</span>
    <span>
      <span class="text-$zx-title" text-4 leading-22px font-600>{{ context.count }}</span>
      <!-- 注意：这里省去了数字较大时的特殊处理 -->
      <span text-3 text-hex-007AFFF />
    </span>
  </div>
</template>
