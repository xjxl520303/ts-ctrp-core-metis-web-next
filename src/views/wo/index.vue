<script setup lang="ts">
import { useDynamicList } from '@/hooks/useDynamicList'
import ZxFormSlicer from '@/components/zx-form-slicer/index.vue'
import { createCreateWoMenu } from '@/utils/menu'

defineOptions({
  name: 'WoList',
  inheritAttrs: false,
})

const { addMenu } = useMenu()
const { service, btnPermissionOptions } = useDynamicList()

// onMounted(() => {
//   getPageConfig(menuId.value)
// })

/**
 * 创建工单
 */
function create() {
  const menu = createCreateWoMenu()
  addMenu(menu)
}
</script>

<template>
  <div flex flex-col>
    <div relative bg-hex-FAFAFB min-h-180px dark:bg-black>
      <ZxFormSlicer :service="service">
        <template v-if="btnPermissionOptions.includes('add')">
          <el-button class="btn-default--dark" type="default" @click="create">新建工单</el-button>
        </template>
      </ZxFormSlicer>
    </div>
  </div>
</template>
