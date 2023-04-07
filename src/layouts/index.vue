<script lang="ts" setup>
import LayoutHeader from './header/index.vue'
import LayoutTabs from './tabs/index.vue'
// import Home from '@/views/home/index.vue'

defineOptions({
  name: 'Layout',
  inheritAttrs: false,
})

const route = useRoute()

const isHomeRoute = computed(() => {
  return route.fullPath.includes('home')
})
</script>

<template>
  <div flex flex-col min-w-0 h-full w-full>
    <header
      class="shadow-[0_4px_16px_0_rgb(214,214,214)] dark:shadow-[0_2px_6px_0_#000_inset]"
      bg-white relative z-100 px-5 h-50px flex-shrink-0 dark:bg-hex-242831
    >
      <LayoutHeader />
    </header>
    <nav class="shadow-[0_4px_10px_#d6d6d6_inset] dark:shadow-[0_4px_10px_#000_inset]" h-8 py-1px bg-hex-E9E9EA dark:bg-hex-25272C>
      <LayoutTabs />
    </nav>
    <main flex-1 dark:bg-black>
      fdsfsfsdf
    </main>
  </div>
  <!-- <div h-full w-full flex flex-col overflow-hidden relative>
    <div flex-grow-0>
      <LayoutHeader />
      <LayoutTabs />
    </div>

    <template v-if="!isHomeRoute">
      <router-view v-slot="{ Component }">
        <keep-alive :include="getCacheRouteNames">
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>
    </template>

    <Home v-show="isHomeRoute" />
  </div> -->
</template>
