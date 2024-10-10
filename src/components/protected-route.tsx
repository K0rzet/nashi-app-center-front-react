import { useLogin } from '@/utils/api/hooks/use-login.ts'
import { PropsWithChildren, useEffect } from 'react'
import { useInitData } from '@vkruglikov/react-telegram-web-app'
import { useDispatch } from 'react-redux'
import { Spinner } from '@/components/ui/spinner.tsx'
import { Navigate } from 'react-router-dom'
import { setUser } from '@/utils/redux/userSlice.ts'

export function ProtectedRoute({ children }: PropsWithChildren) {
  const [_initDataUnsafe, initData] = useInitData()
  const { isLoading, data, error } = useLogin(initData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data.user))
      localStorage.setItem('token', data.data.token)
    }
  }, [data, dispatch])

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (error) {
    return <Navigate to='/unauthorized' state={{ from: location }} />
  }

  return children
}
