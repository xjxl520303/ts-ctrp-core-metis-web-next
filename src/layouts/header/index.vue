<script lang="ts" setup>
import { LocaleEnum, ThemeEnum } from '@/enums'
import type { MenuGroupItem, MenuItem } from '@/types'

defineOptions({
  name: 'LayoutHeader',
  inheritAttrs: false,
})

const { t } = useI18n()
const { currentLocale, changeLocale } = useLocale()
const { user, setLocale, setTheme } = useUser()
const { activeMenu, activeGroupMenu, menus, selectMenu } = useMenu()

const showMenu = ref(false)

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

/**
 * 进入指定菜单路由
 */
function toMenu(menu: MenuItem) {
  if (menu.id === activeMenu.value?.id)
    return
  showMenu.value = false
  selectMenu(menu)
}

/**
 * 是否当前菜单组
 */
function isMenuGroupActive(group: MenuGroupItem) {
  return group.code === activeGroupMenu.value?.code
}

/**
 * 是否当前菜单
 */
function isMenuActive(menu: MenuItem) {
  return menu.id === activeMenu.value?.id
}

/**
 * 切换语言
 */
function handleLocaleChange(lang: LocaleEnum) {
  setLocale(lang)
  changeLocale(lang)
}

/**
 * 切换主题
 */
function handleThemeChange(theme: ThemeEnum) {
  setTheme(theme)
  toggleDark()
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
      <ul class="pop-menu">
        <li
          class="pop-menu-item" :class="{ selected: isZh, unselect: !isZh }"
          @click="() => !isZh && handleLocaleChange(LocaleEnum.ZH_CN)"
        >
          简体中文
        </li>
        <li
          class="pop-menu-item" :class="{ selected: !isZh, unselect: isZh }"
          @click="() => isZh && handleLocaleChange(LocaleEnum.EN)"
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
      <ul class="pop-menu">
        <li
          class="pop-menu-item" :class="{ selected: !isDark, unselect: isDark }"
          @click="() => isDark && handleThemeChange(ThemeEnum.DARK)"
        >
          {{ t('sys.layout.header.light') }}
        </li>
        <li
          class="pop-menu-item" :class="{ selected: isDark, unselect: !isDark }"
          @click="() => !isDark && handleThemeChange(ThemeEnum.LIGHT)"
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
      <ul class="pop-menu">
        <li class="pop-menu-item unselect">
          <span text-14px truncate max-h-22px block>创建一个 HTML5 历史，即单页面应用程序中最常见的历史记录。应用程序必须通过 http 协议被提供服务。</span>
          <span text-3>2022-10-12 10:10:00</span>
        </li>
        <li class="hover:text-$zx-primary" py-5px pl-14px pr-4 relative mx-10px cursor-pointer text-3>
          {{ t('sys.layout.header.more') }}&nbsp;&gt;
        </li>
      </ul>
    </el-popover>
  </portal>

  <portal to="menu">
    <div
      class="h-[calc(100vh-70px)]"
      flex flex-col p-10px bg-white rounded-1 dark:bg-hex-181A1F
    >
      <perfect-scrollbar flex-1 pr-15px mr--10px mb-10px>
        <template v-for="(group, index) in menuGroups" :key="group.id">
          <template v-if="group.menuList && group.menuList.length > 0">
            <div
              class="menu-group"
              :class="{
                'unselect': !isMenuGroupActive(group),
                'selected': isMenuGroupActive(group),
                'mt-10px': index > 0,
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
                      class="menu"
                      :class="{
                        unselect: !isMenuActive(menu),
                        selected: isMenuActive(menu),
                      }"
                      @click="() => toMenu(menu)"
                    >
                      {{ isZh ? menu.nameCn : menu.nameEn }}
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </template>
        </template>
      </perfect-scrollbar>
      <template v-if="bottomMenuGroup">
        <template v-for="menu in bottomMenuGroup" :key="menu.id">
          <div
            class="menu-group bottom"
            :class="{
              unselect: !isMenuActive(menu),
              selected: isMenuActive(menu),
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
              @click="() => toMenu(menu)"
            >{{ isZh ? menu.nameCn : menu.nameEn }}</span>
          </div>
        </template>
      </template>
    </div>
  </portal>

  <div grid grid-cols-3 items-center h-full>
    <el-popover
      v-model:visible="showMenu"
      popper-class="global-menu"
      placement="bottom-start"
      trigger="click"
      :offset="16"
      :width="560"
      :show-arrow="false"
      transition="el-zoom-in-top"
    >
      <template #reference>
        <i class="iconfont icon-caidan !text-6 text-$zx-primary" dark:text-hex-979797 cursor-pointer w-8 />
      </template>
      <portal-target name="menu" />
    </el-popover>
    <!-- <div>
      <i class="iconfont icon-caidan !text-6 text-$zx-primary" dark:text-hex-979797 cursor-pointer />
    </div> -->
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
</template>

<style lang="scss">
.global-menu {
  --el-popover-padding: 0;
  border: 0 none !important;
}
</style>

<style lang="scss" scoped>
.pop-menu {
  --uno: "py-3 list-none m--14px text-14px leading-22px rounded-1 dark:bg-[rgba(36,40,49,0.96)] dark:text-white";
  .pop-menu-item {
    --uno: "py-5px pl-14px pr-4 relative mx-10px";
    &.selected {
      --uno: "text-$zx-primary cursor-text pl-6 !mx-0";
      &::before {
        --uno: "content-none absolute w-1 h-1 rounded-1 left-3 top-14px bg-$zx-primary";
      }
    }
    &.unselect {
      --uno: "cursor-pointer hover:(bg-$el-color-primary-light-9 rounded-1) hover:dark:(bg-$el-color-primary-dark-2 text-white)";
      &::before {
        --uno: "display-none";
      }
    }
  }
}

.menu-group {
  --uno: "w-full flex items-stretch pl-22px pt-10px rounded-2px border border-solid";
  &.bottom {
    --uno: "h-10 pt-none items-center w-[calc(100%-5px)]";
  }
  &.selected {
    --uno: "bg-$el-color-primary-light-9 border-hex-EEF7FF dark:bg-hex-081E33"
  }
  &.unselect {
    --uno: "border-$zx-border hover:(dark:bg-hex-424243 border-hex-F2F9FF dark:border-hex-636466)"
  }
}

.menu {
  --uno: "mr-8 cursor-pointer relative break-keep text-14px leading-8";
  &.selected {
    --uno: "text-$zx-primary cursor-text"
  }
  &.unselect {
    --uno: "hover:text-$el-color-primary-light-3 cursor-pointer"
  }
  &::after {
    --uno: "content-none border border-solid border-$zx-border h-14px absolute top-2 right--4"
  }
  &:last-child::after {
    display: none;
  }
}
</style>
