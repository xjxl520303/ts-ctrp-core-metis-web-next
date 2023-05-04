<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import { createMilestonesMachine } from './machines/milestones'
import MilestoneItem from './MilestoneItem.vue'
import 'vue3-lottie/dist/style.css'
import animLightJson from './assets/anim_light.json'
import animDarkJson from './assets/anim_dark.json'
import { ThemeEnum } from '@/enums'

const props = withDefaults(defineProps<{
  service: ReturnType<typeof useInterpret>
}>(), {})

const emit = defineEmits<{
  (e: 'change', val: number[]): void
}>()

defineOptions({
  name: 'ZxMilestone',
  inheritAttrs: false,
})

const { theme } = useUser()
const {
  localMilestoneData,
  isGetMilestoneLoading,
} = useDynamicList(props.service)

const { state, send } = useMachine(createMilestonesMachine(), { devTools: true })
const milestones = computed(() => state.value.context.milestones)
const currentMilestone = computed(() => state.value.context.currentMilestone)

watch(() => localMilestoneData.value.length, () => {
  send({ type: 'INIT.options', options: localMilestoneData.value })
}, { immediate: true })

watch(() => milestones.value, (val) => {
  if (currentMilestone.value) {
    const isDone = val.every(option => !option.waiting)
    if (isDone) {
      const selectedNodes = val.filter(option => option.selected).map(option => option.id)
      emit('change', selectedNodes)
    }
  }
})
</script>

<template>
  <div v-loading="isGetMilestoneLoading" py-10px mx-5 min-h-100px relative>
    <perfect-scrollbar>
      <div
        :class="[state.context.milestones.length > 5 ? 'justify-between' : 'justify-start']"
        flex w-full px-5px first:pl-none
      >
        <template v-for="(item, index) in state.context.milestones" :key="item.id">
          <MilestoneItem :context="item" />
          <template v-if="index !== state.context.milestones.length - 1">
            <div flex flex-1 items-center content-center>
              <template v-if="item.arrow">
                <Vue3Lottie
                  :animation-data="theme === ThemeEnum.LIGHT ? animLightJson : animDarkJson"
                  :height="60" width="100%" style="min-width: 30px; max-width: 60px;"
                />
              </template>
            </div>
          </template>
        </template>
      </div>
    </perfect-scrollbar>
  </div>
</template>
