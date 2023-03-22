<script setup lang="ts">
import { useMenu } from '@/hooks/useMenu'

const { isLoading, isSuccess, isError, error, menus, setMenu } = useMenu()
</script>

<template>
  <pre>{{ menus }}</pre>
  <div>{{ isLoading }}</div>
  <div>{{ isSuccess }}</div>
  <el-button @click="setMenu">
    请求数据
  </el-button>
</template>
