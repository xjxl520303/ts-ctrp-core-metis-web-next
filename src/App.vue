<script lang="ts" setup>
import { ModalsContainer } from 'vue-final-modal'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import enUS from 'element-plus/es/locale/lang/es'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import dayjs from 'dayjs'

const { currentLocale } = useLocale()

useHead({
  title: '供应链控制塔',
  meta: [
    { name: 'description', content: '正行供应链控制塔，助力企业数字化转型，一站式端到端可视化。看得见，管得好！' },
  ],
})

const locale = computed(() => {
  switch (currentLocale.value) {
    case 'zh-CN':
      dayjs.locale('zh-cn')
      return zhCN
    case 'en-US':
      dayjs.locale('en')
      return enUS
    default:
      dayjs.locale('zh-cn')
      return enUS
  }
})
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view />
    <ModalsContainer />
  </el-config-provider>
</template>
