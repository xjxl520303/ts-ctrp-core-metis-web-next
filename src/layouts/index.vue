<script lang="ts" setup>
import LayoutHeader from './header/index.vue'
import LayoutTabs from './tabs/index.vue'
import { MenuItemTypeEnum } from '@/enums'
import type { MenuItem } from '@/types'
import { bus } from '@/utils/bus'
import Home from '@/views/home/index.vue'

defineOptions({
  name: 'Layout',
  inheritAttrs: false,
})

const route = useRoute()
const { cacheMenu } = useMenu()

const isTabVisible = ref<boolean | undefined>(true)
const cacheMenuKey = ref(_getCacheMenuKey(cacheMenu.value))

const isHomeRoute = computed(() => {
  return route.fullPath.includes('home')
})

bus.on('UPDATE_MENU', ({ action, context }) => {
  if (action === 'SET.tabVisible')
    isTabVisible.value = context.isTabVisible
  if (action === 'SET.cache')
    cacheMenuKey.value = _getCacheMenuKey(context.cacheMenu)
})

/** 获取缓存Key */
function _getCacheMenuKey(caches: MenuItem[]) {
  return caches.filter(menu => menu.type !== MenuItemTypeEnum.FJT).map(menu => `${menu.url}/${menu.id}`)
}
</script>

<template>
  <div flex flex-col min-w-0 h-full w-full>
    <header
      class="shadow-[0_4px_16px_0_rgb(214,214,214)] dark:shadow-[0_2px_6px_0_#000_inset]"
      bg-white relative z-100 px-5 h-50px flex-shrink-0 dark:bg-hex-242831
    >
      <LayoutHeader />
    </header>
    <nav v-show="isTabVisible" class="shadow-[0_4px_10px_#d6d6d6_inset] dark:shadow-[0_4px_10px_#000_inset]" h-8 py-1px bg-hex-E9E9EA dark:bg-hex-25272C>
      <LayoutTabs />
    </nav>
    <main flex-1 dark:bg-black>
      <template v-if="!isHomeRoute">
        <router-view v-slot="{ Component }">
          <keep-alive :include="cacheMenuKey">
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </template>

      <Home v-show="isHomeRoute" />
    </main>
  </div>
</template>
