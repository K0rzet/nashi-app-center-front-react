import { AxiosRequestConfig, CreateBroadcastMessageDTO } from '@/types/api'
import api from '@/utils/api/axios-instance.ts'

export type CreateMessageConfig = AxiosRequestConfig<CreateBroadcastMessageDTO>
export const createMessage = ({ params, config }: CreateMessageConfig) =>
  api.post<void>('/advertising/broadcast', params, config)
