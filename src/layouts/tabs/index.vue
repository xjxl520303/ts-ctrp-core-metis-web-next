<script lang="ts" setup>
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { bus } from '@/utils/bus'
import type { MenuItem } from '@/types'
import type { MenuAction } from '@/machines/menu'

defineOptions({
  name: 'LayoutTabs',
  inheritAttrs: false,
})

const { t } = useI18n()
const { activeMenu, cacheMenu, selectMenu, removeMenu } = useMenu()
const { isZh } = useLocale()
const currentTab = ref(activeMenu.value?.id)
const showTabContextmenu = ref(cacheMenu.value.map(() => false))
const showTabAction = ref(false)

const activeMenuIndex = computed(() => cacheMenu.value.findIndex(item => item.id === activeMenu.value?.id))

bus.on('UPDATE_MENU', ({ context }) => {
  activeMenu.value = context.activeMenu
  cacheMenu.value = context.cacheMenu
  currentTab.value = activeMenu.value?.id
})

/**
 * 是否当前菜单
 */
function isMenuActive(menu: MenuItem) {
  return menu.id === activeMenu.value?.id
}

function selectTab(pane: TabsPaneContext) {
  const menu = cacheMenu.value.find(item => item.id === pane.paneName)
  if (menu?.id === activeMenu.value?.id)
    return

  selectMenu(menu!)
}

function removeTab(name: TabPaneName) {
  const menu = cacheMenu.value.find(item => item.id === name)
  removeMenu(menu!)
}

function reload(index: number) {
  showTabContextmenu.value[index] = false
}

function close(menu: MenuItem, index: number, type?: MenuAction) {
  showTabContextmenu.value[index] = false
  removeMenu(menu, type)
}

function tabCloseAction(type?: MenuAction) {
  showTabAction.value = false
  removeMenu(activeMenu.value!, type)
}

/**
 * 上下文菜单显示时关闭其它
 */
function handleContextmenuShow(menu: MenuItem, index: number) {
  showTabContextmenu.value = cacheMenu.value.map(() => false)
  showTabContextmenu.value[index] = true
}
</script>

<template>
  <div flex justify-between items-center>
    <el-tabs
      v-model="currentTab"
      type="card"
      class="w-[calc(100%-80px)] flex-1"
      :closable="cacheMenu.length > 1"
      :hide-after="0"
      style="--el-tabs-header-height:32px;"
      @tab-click="selectTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="(item, index) in cacheMenu"
        :key="item.id"
        :name="item.id"
      >
        <template #label>
          <el-popover
            v-model:visible="showTabContextmenu[index]"
            placement="bottom"
            trigger="contextmenu"
            :offset="4"
            :show-arrow="false"
            @show="() => handleContextmenuShow(item, index)"
          >
            <template #reference>
              <div min-w-30>
                {{ isZh ? item.nameCn : item.nameEn }}
              </div>
            </template>
            <ul class="pop-menu">
              <li
                class="pop-menu-item" :class="{ disabled: !isMenuActive(item) }"
                @click="() => reload(index)"
              >
                {{ t('sys.layout.tabs.reload') }}
              </li>
              <li
                class="pop-menu-item" :class="{ disabled: cacheMenu.length === 1 }"
                @click="() => cacheMenu.length > 1 && close(item, index)"
              >
                {{ t('sys.layout.tabs.close') }}
              </li>
              <el-divider class="!my-2px" />
              <li
                class="pop-menu-item" :class="{ disabled: index === 0 || !isMenuActive(item) }"
                @click="() => (index > 0 || isMenuActive(item)) && close(item, index, 'left')"
              >
                {{ t('sys.layout.tabs.closeToLeft') }}
              </li>
              <li
                class="pop-menu-item" :class="{ disabled: index === cacheMenu.length - 1 || !isMenuActive(item) }"
                @click="() => (index === cacheMenu.length - 1 || isMenuActive(item)) && close(item, index, 'right')"
              >
                {{ t('sys.layout.tabs.closeToRight') }}
              </li>
              <el-divider class="!my-2px" />
              <li
                class="pop-menu-item" :class="{ disabled: cacheMenu.length === 1 || !isMenuActive(item) }"
                @click="() => (cacheMenu.length !== 1 || isMenuActive(item)) && close(item, index, 'other')"
              >
                {{ t('sys.layout.tabs.closeOther') }}
              </li>
              <li
                class="pop-menu-item"
                @click="() => close(item, index, 'all')"
              >
                {{ t('sys.layout.tabs.closeAll') }}
              </li>
            </ul>
          </el-popover>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div flex-basis-20 mr-3 flex items-center>
      <div class="border-$zx-border shadow-[0_4px_6px_#d6d6d6_inset] dark:shadow-[0_4px_6px_#000_inset]" w-8 h-8 leading-8 border-l border-l-solid bg-hex-E9E9EA dark:bg-hex-25272C>
        <el-icon class="hover:text-$zx-primary" size="16" color="var(--zx-title)" ml-2 cursor-pointer>
          <Refresh />
        </el-icon>
      </div>
      <el-popover v-model:visible="showTabAction" placement="bottom" trigger="click" :offset="4" :show-arrow="false">
        <template #reference>
          <div class="border-$zx-border shadow-[0_4px_6px_#d6d6d6_inset] dark:shadow-[0_4px_6px_#000_inset]" w-8 h-8 leading-8 border-l border-l-solid bg-hex-E9E9EA dark:bg-hex-25272C>
            <el-icon class="hover:text-$zx-primary" size="16" color="var(--zx-title)" ml-2 cursor-pointer>
              <ArrowDown />
            </el-icon>
          </div>
        </template>
        <ul class="pop-menu">
          <li class="pop-menu-item">
            {{ t('sys.layout.tabs.reload') }}
          </li>
          <li
            class="pop-menu-item" :class="{ disabled: cacheMenu.length === 1 }"
            @click="() => cacheMenu.length > 1 && tabCloseAction()"
          >
            {{ t('sys.layout.tabs.close') }}
          </li>
          <el-divider class="!my-2px" />
          <li
            class="pop-menu-item" :class="{ disabled: activeMenuIndex === 0 }"
            @click="() => activeMenuIndex > 0 && tabCloseAction('left')"
          >
            {{ t('sys.layout.tabs.closeToLeft') }}
          </li>
          <li
            class="pop-menu-item" :class="{ disabled: activeMenuIndex === cacheMenu.length - 1 }"
            @click="() => activeMenuIndex === cacheMenu.length - 1 && tabCloseAction('right')"
          >
            {{ t('sys.layout.tabs.closeToRight') }}
          </li>
          <el-divider class="!my-2px" />
          <li
            class="pop-menu-item" :class="{ disabled: cacheMenu.length === 1 }"
            @click="() => cacheMenu.length !== 1 && tabCloseAction('other')"
          >
            {{ t('sys.layout.tabs.closeOther') }}
          </li>
          <li
            class="pop-menu-item"
            @click="() => tabCloseAction('all')"
          >
            {{ t('sys.layout.tabs.closeAll') }}
          </li>
        </ul>
      </el-popover>
      <!-- <div class="border-$zx-border shadow-[0_4px_6px_#d6d6d6_inset] dark:shadow-[0_4px_6px_#000_inset]" w-8 h-8 leading-8 border-l border-l-solid bg-white>
        <el-icon class="hover:text-$zx-primary" size="16" color="var(--zx-title)" ml-2 cursor-pointer>
          <ArrowDown />
        </el-icon>
      </div> -->
      <div class="border-$zx-border shadow-[0_4px_6px_#d6d6d6_inset] dark:shadow-[0_4px_6px_#000_inset]" w-8 h-8 leading-8 border-l border-l-solid bg-hex-E9E9EA dark:bg-hex-25272C>
        <el-icon class="hover:text-$zx-primary" size="16" color="var(--zx-title)" ml-2 cursor-pointer>
          <FullScreen />
        </el-icon>
      </div>
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
    border-bottom-color: transparent !important;
  }
  &::after {
    --uno: content-none absolute index-10 border-r-(solid 1px hex-ccc) dark:border-r-hex-50535A top-1 right-0 h-6;
  }
}

.pop-menu {
  --uno: "py-3 list-none m--14px text-14px leading-22px rounded-1 dark:bg-[rgba(36,40,49,0.96)] dark:text-white";
  .pop-menu-item {
    --uno: "py-5px pl-14px pr-4 relative mx-10px text-$zx-title cursor-pointer";
    &:hover:not(.disabled) {
      --uno: "bg-$el-color-primary-light-9 rounded-1 dark:(bg-$el-color-primary-dark-2 text-white)"
    }
    &.disabled {
      --uno: "cursor-not-allowed text-gray";
    }
  }
}
</style>
