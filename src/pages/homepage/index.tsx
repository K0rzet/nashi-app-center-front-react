import AppCard from '@/pages/homepage/app-card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import { trackEvent } from '@/utils/mixpanel.ts'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getApplications } from '@/utils/api/requests/applications/get-applications.ts'
import { Spinner } from '@/components/ui/spinner.tsx'
import { ApplicationDTO } from '@/types/api'
import { useInitData } from '@vkruglikov/react-telegram-web-app'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/redux/store.ts'
import { CodeXml, Eye, Plus, RadioTower } from 'lucide-react'
import { SeparatorLine } from '@/components/ui/separator/separator.tsx'
import AppCardForAdmin from '@/pages/homepage/app-card-for-admin.tsx'
import { setModeToggled } from '@/utils/redux/adminSlice.ts'

export default function Homepage() {
  const navigate = useNavigate()
  const initData = useInitData()
  const dispatch = useDispatch()
  const telegramUser = initData[0]?.user
  const [apps, setApps] = useState<ApplicationDTO[]>([])
  const appUser = useSelector((state: RootState) => state.user.user)
  const isToggledBefore = useSelector(
    (state: RootState) => state.admin.adminModeToggled
  )
  const [isAdminModeToggled, setIsAdminModeToggled] = useState(
    appUser?.isAdmin && isToggledBefore
  )

  const { data, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => getApplications({}),
    select: (data) => data.data,
  })

  useEffect(() => {
    if (data) {
      setApps(data as ApplicationDTO[])
    }
  }, [data])

  useEffect(() => {
    if (telegramUser) {
      trackEvent('Page View: Home', { $user_id: telegramUser.id })
    }
  }, [telegramUser, telegramUser?.id, telegramUser?.username])

  const handleToggle = () => {
    setIsAdminModeToggled(!isAdminModeToggled)
    dispatch(setModeToggled(!isAdminModeToggled))
  }

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='mx-auto w-full max-w-[600px] p-4'>
      {apps.find((app) => app.orderNumber === 1) && (
        <>
          <div className='mx-auto h-fit w-[2/3] space-y-3 rounded-t-2xl bg-[linear-gradient(180deg,_#82B1FF_0%,_#6f7aff_100%)] p-3 shadow'>
            <h1 className='mb-2 text-3xl font-bold'>Выбор редакции</h1>
          </div>
          <div className='h-fit w-[2/3] space-y-3 rounded-b-2xl bg-[linear-gradient(180deg,_rgba(111,122,255,0.6166841736694677)_100%,_#665FFF_100%)] p-3 text-white shadow'>
            <div className='flex w-full flex-row items-center justify-between overflow-hidden rounded-lg p-1'>
              <div className='ml-2 mr-5 flex w-fit flex-row items-center justify-between'>
                <img
                  src={apps.find((app) => app.orderNumber === 1)?.icon}
                  alt='icon'
                  className='h-12 w-12 rounded-lg object-cover'
                />
                <div className='ml-4 flex flex-col'>
                  <h2 className='w-fit truncate text-lg font-semibold leading-none'>
                    {apps.find((app) => app.orderNumber === 1)?.name}
                  </h2>
                  <p className='max-w-45 text-md mt-1 line-clamp-2 text-white'>
                    {apps.find((app) => app.orderNumber === 1)?.description}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigate(
                    `/app/${apps.find((app) => app.orderNumber === 1)?.id}`
                  )
                }}
                className='dark mb-2 mt-2 h-8 w-20 rounded-2xl text-sm'
                size='sm'
              >
                Открыть
              </Button>
            </div>
          </div>
        </>
      )}
      <div>
        <h1 className='mb-1 mt-6 p-2 text-xl font-bold'>
          Популярно на этой неделе
        </h1>
        {apps.map((app) =>
          isAdminModeToggled ? (
            <AppCardForAdmin app={app} key={app.id} />
          ) : (
            <AppCard app={app} key={app.id} />
          )
        )}
      </div>
      <div className='mt-6 flex flex-col items-center justify-center space-y-2'>
        <SeparatorLine orientation='horizontal' />
        {appUser?.isAdmin && (
          <Button onClick={handleToggle} className='w-[100%] rounded-2xl'>
            {isAdminModeToggled ? (
              <>
                <Eye className='mr-2' /> Включить режим пользователя
              </>
            ) : (
              <>
                <CodeXml className='mr-2' />
                Включить режим админа
              </>
            )}
          </Button>
        )}
        {isAdminModeToggled && (
          <div className='flex w-[100%] flex-col items-center justify-center space-y-2'>
            <Button
              onClick={() => navigate('/app/create')}
              className='w-[100%] rounded-2xl'
            >
              <Plus className='mr-2' /> Создать новое приложение
            </Button>
            <Button
              onClick={() => navigate('/broadcast-message')}
              className='w-[100%] rounded-2xl'
            >
              <RadioTower className='mr-2' /> Создать рекламное сообщение
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
