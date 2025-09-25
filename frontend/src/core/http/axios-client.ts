import AuthRemoteDatasource from '@/features/auth/data/datasource/auth-remote-datasource'
import { useAuthStore } from '@/features/auth/data/datasource/auth-store-datasource'
import AuthRepositoryImpl from '@/features/auth/data/repository/auth-repository-impl'
import LogoutUseCase from '@/features/auth/domain/use-cases/logoutUseCase'
import axios, { AxiosError } from 'axios'
import type { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: {
  resolve: (value?: any) => void
  reject: (err: any) => void
}[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  failedQueue = []
}

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  const token = auth.accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    if (
      error.config?.url !== '/auth/refresh' &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      const auth = useAuthStore()
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          if (!originalRequest.headers) originalRequest.headers = {}
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true
      try {
        const response = await api.post('/auth/refresh')
        const newToken = response.data.accessToken
        auth.setToken(newToken)
        processQueue(null, newToken)
        return api(originalRequest)
      } catch (err) {
        processQueue(err, null)
        const remoteAuthDatasource = new AuthRemoteDatasource(api)
        const authRepository = new AuthRepositoryImpl(remoteAuthDatasource, useAuthStore())
        const logoutUseCase = new LogoutUseCase(authRepository)
        await logoutUseCase.execute()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(error)
  },
)

export default api
