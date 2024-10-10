import { ApplicationDTO, AxiosRequestConfig } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type GetApplicationsConfig = AxiosRequestConfig
export const getApplications = ({ config }: GetApplicationsConfig) =>
  api.get<ApplicationDTO[]>('/applications', config)
