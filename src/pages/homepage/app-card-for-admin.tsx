import { Button } from '@/components/ui/button.tsx'
import { useNavigate } from 'react-router-dom'
import { ApplicationDTO } from '@/types/api'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Ellipsis, Flame, Pencil, Trash2 } from 'lucide-react'
import styles from '@/components/ui/dropdown-menu/dropdown-menu.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeMain } from '@/utils/api/requests/applications/make-main.ts'
import {
  showErrorMessage,
  showSuccessMessage,
  showToastWithPromise,
} from '@/utils/notify.ts'
import { Toaster } from 'react-hot-toast'
import { deleteApplication } from '@/utils/api/requests/applications/delete-application.ts'

function AppCardForAdmin({ app }: { app: ApplicationDTO }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { mutateAsync } = useMutation({
    mutationFn: makeMain,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  const { mutate } = useMutation({
    mutationFn: deleteApplication,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
    onSuccess: () => {
      showSuccessMessage('Приложение успешно удалено')
    },
    onError: () => {
      showErrorMessage('Произошла ошибка')
    },
  })

  const handleClickEdit = () => {
    navigate(`/app/${app.id}/edit`)
  }

  const handleMakeMain = async () => {
    await showToastWithPromise({
      success: 'Widget data updated!',
      error: 'Oh! Error occurred!',
      process: 'Processing the request',
      callback: () => mutateAsync({ params: { applicationId: app.id } }),
    })
  }

  const handleDeleteApp = () => {
    mutate({ params: { applicationId: app.id } })
  }

  return (
    <>
      <div className='flex w-full flex-row items-center justify-between overflow-hidden rounded-lg p-2'>
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
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button
              variant='ghost'
              className='mb-2 mt-2 h-10 w-10 rounded-2xl bg-purple-700 text-sm'
              size='sm'
            >
              <Ellipsis className='h-5 w-5' />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              side='left'
              className={styles.DropdownMenuContent}
            >
              <DropdownMenu.Item
                className={styles.DropdownMenuItem}
                onClick={handleClickEdit}
              >
                <Pencil className='mr-2' /> Редактировать
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={styles.DropdownMenuItem}
                onClick={handleMakeMain}
              >
                <Flame className='mr-2' /> Сделать основным
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={styles.DropdownMenuItem}
                onClick={handleDeleteApp}
              >
                <Trash2 className='mr-2' /> Удалить
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <Toaster />
    </>
  )
}

export default AppCardForAdmin
