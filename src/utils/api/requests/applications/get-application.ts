import {
  ApplicationDTO,
  AxiosRequestConfig,
  GetApplicationParam,
} from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type GetApplicationConfig = AxiosRequestConfig<GetApplicationParam>
export const getApplication = ({ params, config }: GetApplicationConfig) =>
  api.get<ApplicationDTO>(`/applications/${params.applicationId}`, config)
