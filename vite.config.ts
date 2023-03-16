import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import VueMacros from 'unplugin-vue-macros'
import DefineOptions from 'unplugin-vue-define-options'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Unocss from 'unocss/vite'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
// import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import Inspect from 'vite-plugin-inspect'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
    plugins: [
      // https://github.com/sxzz/unplugin-vue-macros#readme
      VueMacros.vite({
        plugins: {
          vue: Vue({
            include: [/\.vue$/, /\.md$/],
            reactivityTransform: true,
          }),
          vueJsx: VueJsx(),
        },
      }),
      // https://vue-macros.sxzz.moe/macros/define-options.html
      DefineOptions.vite(),
      // https://github.com/jpkleemans/vite-svg-loader
      svgLoader(),
      // https://github.com/unocss/unocss
      Unocss(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          '@vueuse/head',
          '@vueuse/core',
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: [
          'src/hooks',
        ],
        vueTemplate: true,
      }),
      // https://github.com/element-plus/unplugin-element-plus
      ElementPlus({}),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        deep: false,
        resolvers: [
          ElementPlusResolver(),
        ],
        types: [{
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        }],
        dts: 'src/components.d.ts',
      }),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: ['unplugin-vue-i18n'],
      }),
      command === 'serve' ? Inspect() : null,
      command !== 'serve'
        ? legacy({
          targets: {
            chrome: '65',
          },
        })
        : null,
      // https://github.com/ZhongxuYang/vite-plugin-version-mark
      vitePluginVersionMark({
        name: 'app',
        ifGitSHA: true,
        ifShortSHA: true,
        ifMeta: true,
        ifLog: false,
        ifGlobal: false,
      }),
      // https://github.com/GreatAuk/plugin-web-update-notification
      // webUpdateNotice({
      //   logVersion: true,
      // }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: {
        '@': `${resolve(__dirname, 'src')}`,
        'assets': `${resolve(__dirname, 'src/assets')}`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        'vue': 'vue/dist/vue.esm-bundler.js',
      },
      extensions: ['.ts', '.js'],
    },
    define: {
      'process.env': {},
    },
    server: {
      open: true,
      port: Number(env.VITE_PORT),
      fs: {
        strict: true,
      },
      proxy: {
        '^/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api\/metis/, '/api/metis/'),
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            ui: ['element-plus', '@element-plus/icons-vue'],
          },
        },
      },
      chunkSizeWarningLimit: 2000,
    },
  }
})
