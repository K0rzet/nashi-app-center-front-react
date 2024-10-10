import {
  ApplicationDTO,
  AxiosRequestConfig,
  MakeApplicationMainParams,
} from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type MakeMainConfig = AxiosRequestConfig<MakeApplicationMainParams>
export const makeMain = ({ params, config }: MakeMainConfig) =>
  api.patch<ApplicationDTO>(
    `/applications/${params.applicationId}/order`,
    { orderNumber: 1 },
    config
  )
