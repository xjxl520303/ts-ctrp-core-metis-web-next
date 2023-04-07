<script lang="ts" setup>
import type { TabPaneName, TabsPaneContext } from 'element-plus'

defineOptions({
  name: 'LayoutTabs',
  inheritAttrs: false,
})

const { activeMenu, cacheMenu, selectMenu, removeMenu } = useMenu()
const { isZh } = useLocale()
const currentTab = ref(activeMenu.value?.id)

function selectTab(pane: TabsPaneContext) {
  const menu = cacheMenu.value.find(item => item.id === pane.paneName)
  selectMenu(menu!)
}

function removeTab(name: TabPaneName) {
  const menu = cacheMenu.value.find(item => item.id === name)
  removeMenu(menu!)
}
</script>

<template>
  <div flex justify-between items-center>
    <el-tabs
      v-model="currentTab"
      type="card"
      class="w-[calc(100%-80px)] flex-1"
      :closable="cacheMenu.length > 1"
      style="--el-tabs-header-height:32px;"
      @tab-click="selectTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in cacheMenu"
        :key="item.id"
        :label="isZh ? item.nameCn : item.nameEn"
        :name="item.id"
      />
    </el-tabs>
    <div flex-basis-12 mr-3>
      <el-icon class="hover:text-$zx-primary" size="14" color="var(--zx-title)" ml-2 cursor-pointer>
        <Refresh />
      </el-icon>
      <el-icon class="hover:text-$zx-primary" size="14" color="var(--zx-title)" ml-2 cursor-pointer>
        <ArrowDown />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  --uno: mb-none border-b-none;
}

:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
  --uno: h-30px mt--1;
}

:deep(.el-tabs__nav) {
  --uno: "!rounded-0 !border-0";
}

:deep(.el-tabs__item) {
  --uno: "relative !border-l-none text-hex-50535A dark:text-hex-D3D4D6 font-normal !px-3 inline-flex justify-between items-center min-w-160px max-w-300px truncate";
  &.is-active {
    --uno: text-hex-242831 font-600 bg-hex-FAFAFB dark:(text-white bg-hex-000);
    --uno: shadow-[0_4px_10px_#d6d6d6_inset] dark:shadow-[0_4px_10px_#000_inset];
  }
  &::after {
    --uno: content-none absolute index-10 border-r-(solid 1px hex-ccc) dark:border-r-hex-50535A top-1 right-0 h-6;
  }
}
</style>
