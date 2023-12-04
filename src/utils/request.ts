import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { removeToken } from './index'
import { API_URL } from '@/constant'

const axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? API_URL : '',
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json; charset=utf-8',
  },
})

setupInterceptors(axiosInstance)

// 泛型接口,T的类型支持
export interface IResponseData<T> {
  code: number
  msg: string
  data: T
}

// 通用的请求函数
export default async function request<T = any>(config: AxiosRequestConfig) {
  return axiosInstance.request<IResponseData<T>>(config).then(res => res.data)
}

function setupInterceptors(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    config => {
      if (!config?.headers) {
        throw new Error("Expected 'config' and 'config.headers' not to be undefined")
      }
      if (!config?.url?.includes('/login')) {
        // 从 localstorage 里面获取 token
        // config.headers.Authorization = `Bearer `
        config.headers.token = localStorage.getItem('token') || 'not found token'
      }
      return config
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    },
  )

  axiosInstance.interceptors.response.use(
    response => {
      if (response.data?.code === 0) {
        return response
      } else if (response.data?.code === 10003) {
        ElMessage.error('Please login')
        removeToken()
        window.location.replace('/')
        return Promise.reject(response.data)
      } else {
        return Promise.reject(response.data)
      }
    },
    error => {
      const status = error.status || error.response?.status || 0
      if (status === 401 || status === 403) {
        ElMessage.error('Please login')
        setTimeout(() => {
          removeToken()
          window.location.replace('/')
        }, 1000)
        return
      }
      let errData = error.response?.data || {
        msg: error.message,
        errors: {},
      }
      errData = { ...errData, status }
      return Promise.reject(errData)
    },
  )
}
