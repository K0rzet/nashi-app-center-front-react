import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import { ApplicationDTO } from '@/types/api'

function AppCard({ app }: { app: ApplicationDTO }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/app/${app.id}`)
  }

  return (
    <div
      className='flex w-full flex-row items-center justify-between overflow-hidden rounded-lg p-2'
      onClick={handleClick}
    >
      <div className='ml-2 mr-5 flex w-fit flex-row items-center justify-between'>
        {app.icon ? (
          <img
            src={app.icon}
            alt='icon'
            className='h-16 w-16 rounded-lg object-cover'
          />
        ) : (
          <div className='h-16 w-16 rounded-lg bg-gray-500'></div>
        )}
        <div className='ml-4 flex flex-col'>
          <h2 className='w-fit truncate text-lg font-semibold leading-none'>
            {app.name}
          </h2>
          <p className='max-w-45 mt-1 line-clamp-2 text-sm text-muted-foreground'>
            {app.shortDescription || app.description}
          </p>
        </div>
      </div>
      <Button
        className='mb-2 mt-2 h-8 w-20 rounded-2xl bg-purple-700 text-sm'
        size='sm'
      >
        Открыть
      </Button>
    </div>
  )
}

export default AppCard
