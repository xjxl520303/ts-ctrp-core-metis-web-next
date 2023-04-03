<script lang="ts" setup>
import type { MenuGroupItem, MenuItem } from '@/types'
import { LocaleEnum } from '@/enums'

defineOptions({
  name: 'LayoutHeader',
  inheritAttrs: false,
})

const { t } = useI18n()
const { currentLocale, changeLocale } = useLocale()
const { user } = useUser()
const { activeMenu, activeGroupMenu, menus } = useMenu()

const isMenuVisible = ref(false)
const timeout = ref<ReturnType<typeof setTimeout>>()

const isZh = computed(() => {
  return currentLocale.value === LocaleEnum.ZH_CN
})
/** 菜单配置 - 排除底部固定菜单 */
const menuGroups = computed(() => {
  return menus.value.filter(item => item.code !== 'bottom')
})
/** 底部菜单配置 */
const bottomMenuGroup = computed(() => {
  return menus.value.find(item => item.code === 'bottom')?.menuList
})

function showMenu() {
  if (timeout.value)
    clearTimeout(timeout.value)
  if (!isMenuVisible.value)
    isMenuVisible.value = true
}

function delayHideMenu() {
  if (timeout.value)
    clearTimeout(timeout.value)
  timeout.value = setTimeout(() => {
    isMenuVisible.value = false
  }, 200)
}

function selectMenu(menu: MenuItem) {
  if (menu.id === activeMenu.value?.id)
    return
  isMenuVisible.value = false
  // addTab(menu)
}

function isMenuGroupActive(group: MenuGroupItem) {
  return group.code === activeGroupMenu.value?.code
}

function isMenuActive(menu: MenuItem) {
  return menu.id === activeMenu.value?.id
}
</script>

<template>
  <!-- 语言 -->
  <portal to="locale">
    <el-popover placement="bottom" :offset="16" :show-arrow="false">
      <template #reference>
        <i
          class="iconfont text-hex-BDBEC1 !text-5 hover:!text-$zx-primary" :class="[{
            'icon-zhongwen1': isZh,
            'icon-yingyu': !isZh,
          }]"
          cursor-pointer
        />
      </template>
      <ul class="dark:bg-[rgba(36,40,49,0.96)]" py-3 list-none m--14px text-14px leading-22px rounded-1 dark:text-white>
        <li
          :class="{
            'text-$zx-primary cursor-text pl-6 !mx-0': isZh,
            'cursor-pointer hover:(bg-$el-color-primary-light-9 rounded-1) hover:dark:(bg-$el-color-primary-dark-2 text-white)': !isZh,
          }"
          py-5px pl-14px pr-4 relative mx-10px
          :un-before="`content-none absolute w-1 h-1 rounded-1 left-3 top-14px bg-$zx-primary ${!isZh && 'display-none'}`"
          @click="() => !isZh && changeLocale(LocaleEnum.ZH_CN)"
        >
          简体中文
        </li>
        <li
          :class="{
            'text-$zx-primary cursor-text pl-6 !mx-0': !isZh,
            'cursor-pointer hover:(bg-$el-color-primary-light-9 rounded-1) hover:dark:(bg-$el-color-primary-dark-2 text-white)': isZh,
          }"
          py-5px pl-14px pr-4 relative mx-10px
          :un-before="`content-none absolute w-1 h-1 rounded-1 left-3 top-14px bg-$zx-primary ${isZh && 'display-none'}`"
          @click="() => isZh && changeLocale(LocaleEnum.EN)"
        >
          English
        </li>
      </ul>
    </el-popover>
  </portal>

  <!-- 主题 -->
  <portal to="theme">
    <el-popover placement="bottom" :offset="16" :show-arrow="false">
      <template #reference>
        <i
          class="iconfont text-hex-BDBEC1 !text-5 hover:!text-$zx-primary" :class="[{
            'icon-yejianmoshi': isDark,
            'icon-liangsemoshi': !isDark,
          }]"
          cursor-pointer
          ml-6
        />
      </template>
      <ul class="dark:bg-[rgba(36,40,49,0.96)]" py-3 list-none m--14px text-14px leading-22px rounded-1 dark:text-white>
        <li
          :class="{
            'text-$zx-primary cursor-text pl-6 !mx-0': !isDark,
            'cursor-pointer hover:(bg-$el-color-primary-light-9 rounded-1) hover:dark:(bg-$el-color-primary-dark-2 text-white)': isDark,
          }"
          py-5px pl-14px pr-4 relative mx-10px
          :un-before="`content-none absolute w-1 h-1 rounded-1 left-3 top-14px bg-$zx-primary ${isDark && 'display-none'}`"
          @click="() => isDark && toggleDark()"
        >
          {{ t('sys.layout.header.light') }}
        </li>
        <li
          :class="{
            'text-$zx-primary cursor-text pl-6 !mx-0': isDark,
            'cursor-pointer hover:(bg-$el-color-primary-light-9 rounded-1) hover:dark:(bg-$el-color-primary-dark-2 text-white)': !isDark,
          }"
          py-5px pl-14px pr-4 relative mx-10px
          :un-before="`content-none absolute w-1 h-1 rounded-1 left-3 top-14px bg-$zx-primary ${!isDark && 'display-none'}`"
          @click="() => !isDark && toggleDark()"
        >
          {{ t('sys.layout.header.dark') }}
        </li>
      </ul>
    </el-popover>
  </portal>

  <!-- 消息 -->
  <portal to="message">
    <el-popover width="300px" placement="bottom" :offset="16" :show-arrow="false">
      <template #reference>
        <!-- <i
          class="iconfont icon-xiaoxizhongxin text-hex-BDBEC1 !text-22px hover:!text-$zx-primary"
          cursor-pointer
          ml-6
        /> -->
        <el-badge is-dot>
          <i
            class="iconfont icon-xiaoxizhongxin text-hex-BDBEC1 !text-5 hover:!text-$zx-primary"
            cursor-pointer
            ml-6
          />
        </el-badge>
      </template>
      <ul class="dark:bg-[rgba(36,40,49,0.96)]" py-3 list-none m--14px leading-22px rounded-1 dark:text-white>
        <li
          class="hover:(bg-$el-color-primary-light-9 rounded-1) hover:dark:(bg-$el-color-primary-dark-2 text-white)"
          py-5px pl-14px pr-4 relative mx-10px cursor-pointer mb-1
          un-after="content-none absolute bottom--1 left-0 w-full border-b border-b-$zx-border border-b-solid bg-$zx-border"
        >
          <span text-14px truncate max-h-22px block>创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录。应用程序必须通过 http 协议被提供服务。</span>
          <span text-3>2022-10-12 10:10:00</span>
        </li>
        <li class="hover:text-$zx-primary" py-5px pl-14px pr-4 relative mx-10px cursor-pointer text-3>
          {{ t('sys.layout.header.more') }}&nbsp;&gt;
        </li>
      </ul>
    </el-popover>
  </portal>

  <div grid grid-cols-3 items-center h-full @mouseleave="delayHideMenu">
    <div>
      <i class="iconfont icon-caidan !text-6 text-$zx-primary" dark:text-hex-979797 cursor-pointer @mouseover="isMenuVisible = true" />
    </div>
    <div flex justify-center w-full>
      <img :src="isDark ? '/src/assets/images/logo_head_dark.png' : '/src/assets/images/logo_head.png'" w-50>
    </div>
    <div flex justify-end items-center>
      <portal-target name="locale" />
      <portal-target name="theme" />
      <portal-target name="message" />
      <span class="text-$zx-title hover:text-$zx-primary" block text-14px leading-22px max-w-30 ml-6 truncate cursor-pointer>{{ user?.tenantName }}</span>
      <el-tooltip placement="bottom" :content="t('sys.layout.header.exit')">
        <i
          class="iconfont icon-tuichu text-hex-BDBEC1 !text-5 hover:!text-$zx-primary"
          cursor-pointer
          ml-6
        />
      </el-tooltip>
    </div>
  </div>

  <!-- 菜单 -->
  <translation name="el-zoom-in-top">
    <div
      v-show="isMenuVisible"
      class="h-[calc(100vh-70px)] dark:(bg-hex-181A1F shadow-white)"
      fixed w-560px left-10px top-60px z-1001 text-22px overflow-y-hidden text-0 p-10px rounded-1 flex flex-col
      bg-white drop-shadow-xl
      @mouseenter="showMenu" @mouseleave="delayHideMenu"
    >
      <perfect-scrollbar flex-1 pr-10px mr--10px>
        <template v-for="(group, index) in menuGroups" :key="group.id">
          <div
            w-full flex items-stretch pl-22px pt-10px rounded-2px border border-solid :class="{
              'border-$zx-border hover:(bg-$el-color-primary-light-9 dark:bg-hex-424243 border-$el-color-primary-light-7 dark:border-hex-636466)': !isMenuGroupActive(group),
              'bg-$el-color-primary-light-9 border-$el-color-primary-light-3 dark:bg-hex-39393A': isMenuGroupActive(group),
              'mt-10px': index > 0,
              'mb-10px': index === menuGroups.length - 1,
            }"
          >
            <i
              class="iconfont !text-18px pt-2px" :class="[`icon-menu-${group.code}`, {
                '!text-hex-E9E9EA': !isMenuGroupActive(group),
                '!text-$el-color-primary-light-5 !dark:text-$el-color-primary-dark-2': isMenuGroupActive(group),
              }]"
            />
            <div ml-22px flex-1>
              <div
                :class="{
                  'text-$zx-title dark:text-white': isMenuGroupActive(group),
                  'text-hex-A7A9AD': !isMenuGroupActive(group),
                }" text-4 leading-6 select-none dark:text-hex-7C7E83
              >
                {{ isZh ? group.nameCn : group.nameEn }}
              </div>
              <ul class="text-$zx-text" list-none text-14px leading-8 flex flex-wrap mb-1>
                <template v-for="menu in group.menuList" :key="menu.id">
                  <li
                    :class="{
                      'hover:text-$el-color-primary-light-3 cursor-pointer': !isMenuActive(menu),
                      'text-$zx-primary cursor-text': isMenuActive(menu),
                    }"
                    mr-8 cursor-pointer relative break-keep
                    un-after="content-none border border-solid border-$zx-border h-14px absolute top-2 right--4 last:display-none"
                    @click="() => selectMenu(menu)"
                  >
                    {{ isZh ? menu.nameCn : menu.nameEn }}
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </template>
      </perfect-scrollbar>
      <template v-if="bottomMenuGroup">
        <template v-for="menu in bottomMenuGroup" :key="menu.id">
          <div
            class="w-full h-10 flex items-center pl-22px rounded-2px border border-solid" :class="{
              'border-$zx-border hover:(bg-$el-color-primary-light-9 dark:bg-hex-424243 border-$el-color-primary-light-7 dark:border-hex-636466)': !isMenuActive(menu),
              'bg-$el-color-primary-light-9 border-$el-color-primary-light-3 dark:bg-hex-39393A': isMenuActive(menu),
            }"
          >
            <i
              class="iconfont icon-menu-account !text-18px" :class="{
                '!text-hex-E9E9EA': !isMenuActive(menu),
                '!text-$el-color-primary-light-5 !dark:text-$el-color-primary-dark-2': isMenuActive(menu),
              }"
            />
            <span
              ml-22px text-14px leading-8 :class="{
                'text-$zx-title hover:text-$zx-primary cursor-pointer': !isMenuActive(menu),
                'text-$zx-primary cursor-text': isMenuActive(menu),
              }"
              @click="() => selectMenu(menu)"
            >{{ isZh ? menu.nameCn : menu.nameEn }}</span>
          </div>
        </template>
      </template>
    </div>
  </translation>
</template>
