import {
  ApplicationDTO,
  AxiosRequestConfig,
  DeleteApplicationParam,
} from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type DeleteApplicationConfig = AxiosRequestConfig<DeleteApplicationParam>
export const deleteApplication = ({
  params,
  config,
}: DeleteApplicationConfig) =>
  api.delete<ApplicationDTO>(`/applications/${params.applicationId}`, config)
