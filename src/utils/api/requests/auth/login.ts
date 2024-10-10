import {
  AxiosRequestConfig,
  LoginPayload,
  LoginResponseData,
} from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type LoginConfig = AxiosRequestConfig<LoginPayload>

export const login = (config: LoginConfig) =>
  api.post<LoginResponseData>(
    `/auth/login`,
    config.params.initData,
    config?.config
  )
