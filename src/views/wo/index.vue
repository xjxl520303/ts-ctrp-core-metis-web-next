<script setup lang="ts">
import { useDynamicList } from '@/hooks/useDynamicList'
import ZxFormSlicer from '@/components/zx-form-slicer/index.vue'
import ZxMilestone from '@/components/zx-milestone'
import { createCreateWoMenu } from '@/utils/menu'

defineOptions({
  name: 'WoList',
  inheritAttrs: false,
})

const { addMenu } = useMenu()
const {
  service,
  menuId,
  btnPermissionOptions,
  getPageConfig,
  getMilestone,
  getDynamicList,
} = useDynamicList()
const cacheMilestoneIds = ref<number[]>([])

onMounted(async () => {
  await getPageConfig(menuId.value)
  await getMilestone()
  await getDynamicList()
})

/**
 * 创建工单
 */
function create() {
  const menu = createCreateWoMenu()
  addMenu(menu)
}

/**
 * 切片器查询事件
 */
async function handleQuery() {
  await getMilestone()
  await getDynamicList({ milestoneList: cacheMilestoneIds.value })
}

/**
 * 里程碑变更事件
 */
async function handleMilestoneChange(val: number[]) {
  cacheMilestoneIds.value = val
  await getDynamicList({ milestoneList: val })
}
</script>

<template>
  <div flex flex-col>
    <div relative bg-hex-FAFAFB min-h-180px dark:bg-black>
      <ZxFormSlicer :service="service" @query="handleQuery">
        <template v-if="btnPermissionOptions.includes('add')">
          <el-button class="btn-default--dark" type="default" @click="create">
            新建工单
          </el-button>
        </template>
      </ZxFormSlicer>
      <ZxMilestone :service="service" @change="handleMilestoneChange" />
    </div>
  </div>
</template>
