import { useQuery } from '@tanstack/react-query'
import { login } from '@/utils/api/requests/auth/login.ts'

export const useLogin = (initDataString?: string) => {
  const query = useQuery({
    queryKey: ['login'],
    queryFn: () => {
      if (initDataString) {
        return login({ params: { initData: { initData: initDataString } } })
      }
      return Promise.reject('Invalid init data')
    },
    staleTime: 60 * 60 * 1000,
    select: (data) => data,
  })

  return { ...query }
}
