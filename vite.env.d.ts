/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
/// <reference types="unplugin-vue-macros/macros-global" />

interface ImportMetaEnv {
  /** 端口号 */
  readonly VITE_PORT: number
  /** 接口地址 */
  readonly VITE_API_URL: string
  /** Token, 只用于本地开发 */
  readonly VITE_API_TOKEN: string
  /** 应用路径 */
  readonly VITE_APP_BASE_URL: string
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface Window {
  // extend the window
  SfCaptcha: any;
}

declare interface Navigator {
  msSaveOrOpenBlob: Function
}