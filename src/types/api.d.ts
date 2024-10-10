export type AxiosRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: import('axios').AxiosRequestConfig }
  : { params: Params; config?: import('axios').AxiosRequestConfig }

export interface ApplicationDTO {
  id: number
  name: string
  description: string
  icon: string
  screenshots: string[]
  category: string
  orderNumber?: number
  createdAt: string
  updatedAt: string
  url: string
  shortDescription: string
}

export interface PatchApplicationDto {
  name: string
  description: string
  icon: string
  screenshots: string[]
  category: string
  orderNumber?: number
  url: string
  shortDescription: string
}

export interface CreateApplicationDto {
  name: string
  description: string
  icon: string
  screenshots: string[]
  category: string
  orderNumber?: number
  url: string
  shortDescription: string
}

export interface MakeApplicationMainParams {
  applicationId: number
}

export interface PatchApplicationParams {
  dto: PatchApplicationDto
  applicationId: number
}

export interface GetApplicationParam {
  applicationId: number
}

export interface DeleteApplicationParam {
  applicationId: number
}

export interface LoginPayload {
  initData: { initData: string }
}

export interface LoginResponseData {
  token: string
  user: User
}

export interface User {
  id: number
  telegramId: string
  username: string
  isAdmin: boolean
  createdAt: string
}

export interface CreateBroadcastMessageDTO {
  text: string
  imageUrl: string | null
}
