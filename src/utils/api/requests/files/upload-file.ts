import api from '@/utils/api/axios-instance.ts'

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('files', file)
  })

  const response = await api.post<[{ name: string; url: string }]>(
    `/files?folder=projects`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  )

  return response.data
}
