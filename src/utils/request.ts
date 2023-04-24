import axios from 'axios'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { isFunction } from 'lodash-es'
import { bus } from './bus'
import { router } from '@/router'
import { ResponseCodeEnum } from '@/enums'
import { isDev } from '@/utils/env'
import { i18n } from '@/modules/i18n'

const { VITE_APP_BASE_URL } = import.meta.env
const { t } = i18n.global as any
const { token } = useUser()
let showAlert = false

bus.on('UPDATE_USER', ({ action, context }) => {
  if (action === 'SET_TOKEN' || action === 'SET_USER')
    token.value = context.token
})

axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: VITE_APP_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
  timeout: 5 * 60 * 1000,
})

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  const status = error.response?.status
  // const useStore = useUserStore()
  switch (status) {
    case 400:
      error.message = t('sys.api.errorMessage')
      break
    case 401:
      // useStore.logout()
      error.message = t('sys.api.errMsg401')
      break
    case 403:
      error.message = t('sys.api.errMsg403')
      break
    case 404:
      error.message = t('sys.api.errMsg404')
      break
    case 408:
      error.message = t('sys.api.errMsg408')
      break
    case 500:
      error.message = t('sys.api.errMsg500')
      break
    case 501:
      error.message = t('sys.api.errMsg500')
      break
    case 502:
      error.message = t('sys.api.errMsg502')
      break
    case 503:
      error.message = t('sys.api.errMsg503')
      break
    case 504:
      error.message = t('sys.api.errMsg504')
      break
    case 505:
      error.message = t('sys.api.errMsg505')
      break
    default:
      break
  }
  ElMessage.error(error.message)
  return Promise.reject(error)
}

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log(token.value, 'kkkk')
  const _token = token.value || (isDev() ? import.meta.env.VITE_API_TOKEN : null)
  if (_token)
    isFunction(config.headers?.set) && config.headers?.set('token', _token)

  // console.log(config, 'req')
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  // TODO: 文件上传/下载
  // console.log(response.data, 'res', router)
  if (response.data.code === ResponseCodeEnum.SUCCESS)
    return response.data

  if (response.data.code === ResponseCodeEnum.INVALID_AUTH) {
    ElMessage.error(response.data.message)
    // storage.clearAll()
    router.push('/login')
    return response.data
  }

  if (response.data.code === ResponseCodeEnum.LOGIN_BY_OTHERS) {
    if (!showAlert) {
      showAlert = true
      ElMessageBox.alert(response.data.message || t('sys.api.accountBeenLoggedIn'), t('sys.common.text.tip'), {
        confirmButtonText: t('sys.common.action.ok'),
        type: 'warning',
        callback() {
          showAlert = false
          // storage.clearAll()
          router.push('/login')
        },
      })
    }

    return response.data
  }
  return response.data
}, (error) => {
  errorHandler(error)
})

export default service
