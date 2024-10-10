import {
  ApplicationDTO,
  AxiosRequestConfig,
  CreateApplicationDto,
} from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type CreateApplicationConfig = AxiosRequestConfig<CreateApplicationDto>
export const createApplication = ({
  params,
  config,
}: CreateApplicationConfig) =>
  api.post<ApplicationDTO>('/applications', params, config)
