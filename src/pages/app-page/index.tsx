import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Button } from '@/components/ui/button'
import { IconShare3 } from '@tabler/icons-react'
import { trackEvent } from '@/utils/mixpanel.ts'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getApplication } from '@/utils/api/requests/applications/get-application.ts'
import { Spinner } from '@/components/ui/spinner.tsx'
import { ApplicationDTO } from '@/types/api'
import { useInitData, useWebApp } from '@vkruglikov/react-telegram-web-app'

export default function AppPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const webapp = useWebApp()
  const initData = useInitData()
  const user = initData[0]?.user

  const [appData, setAppData] = useState<ApplicationDTO | null>(null)

  useEffect(() => {
    webapp.ready()

    const backButton = webapp.BackButton
    backButton.show()
    backButton.onClick(function () {
      backButton.hide()
    })

    const handleBack = () => {
      navigate('/')
      backButton.hide()
    }

    webapp.onEvent('backButtonClicked', handleBack)
  }, [navigate, webapp])

  const { data, isLoading } = useQuery({
    queryKey: ['application', id],
    queryFn: async () => {
      if (!id) {
        throw new Error('App Id invalid')
      }
      return getApplication({ params: { applicationId: Number(id) } })
    },
    enabled: !!id,
    select: (data) => data,
  })

  useEffect(() => {
    if (data) {
      setAppData({ ...data.data } as ApplicationDTO)
      trackEvent(`Page View: ${data.data.name}`, {$user_id: user?.id})
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='font-custom app-card mx-auto w-full max-w-[600px] space-y-6 rounded-lg px-2 pt-5'>
      <div className='flex items-start space-x-4'>
        <div className='h-32 w-32 flex-shrink-0 overflow-hidden rounded-2xl'>
          {appData?.icon ? (
            <img
              src={appData?.icon}
              alt={`${appData?.name} icon`}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='h-full w-full bg-gray-500'></div>
          )}
        </div>
        <div className='flex h-32 min-w-0 flex-1 flex-col justify-between space-y-2'>
          <div>
            <h1 className='truncate text-2xl font-bold text-white'>
              {appData?.name}
            </h1>
            <p className='line-clamp-2 text-sm text-gray-300'>
              {appData?.shortDescription || appData?.description}
            </p>
          </div>
          <div className='flex justify-between align-middle'>
            <Button
              className='text-md w-[100px] rounded-2xl bg-purple-700'
              onClick={() => {
		trackEvent(`Service Open: ${appData?.name}`, {$user_id: user?.id});
                if (appData) {
                  if (appData.url.includes('t.me'))
                    webapp.openTelegramLink(appData.url)
                  else webapp.openLink(appData.url)
                }
              }}
            >
              Открыть
            </Button>
            <Button variant='ghost' className='px-[5px]'>
              <IconShare3></IconShare3>
            </Button>
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <ScrollArea.Root className='w-full' type='scroll'>
          <ScrollArea.Viewport className='w-full overflow-x-scroll'>
            <div className='flex space-x-4 pb-4'>
              {appData?.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`${appData?.name} screenshot ${index + 1}`}
                  className='h-96 w-48 rounded-lg object-cover'
                />
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className='flex touch-none select-none bg-[#212121] p-0.5 transition-colors duration-150 ease-out hover:bg-gray-800 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col'
            orientation='horizontal'
          >
            <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-gray-600 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>

      <div className='space-y-2 pb-2'>
        <h2 className='text-2xl font-bold text-white'>Description</h2>
        <p className='text-sm text-gray-300'>{appData?.description}</p>
      </div>
    </div>
  )
}
