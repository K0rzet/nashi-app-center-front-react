import {
  ApplicationDTO,
  AxiosRequestConfig,
  PatchApplicationParams,
} from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type EditApplicationConfig = AxiosRequestConfig<PatchApplicationParams>
export const editApplication = ({ params, config }: EditApplicationConfig) =>
  api.patch<ApplicationDTO>(
    `/applications/${params.applicationId}`,
    params.dto,
    config
  )
