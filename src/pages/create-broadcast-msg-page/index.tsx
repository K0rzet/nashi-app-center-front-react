import { z } from 'zod'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { FileX, PlusCircle } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx'
import { Textarea } from '@/components/ui/textarea.tsx'
import toast, { Toaster } from 'react-hot-toast'
import { API_URL } from '@/utils/api/axios-instance.ts'
import { uploadFiles } from '@/utils/api/requests/files/upload-file.ts'
import { CreateBroadcastMessageDTO } from '@/types/api'
import { useMutation } from '@tanstack/react-query'
import { createMessage } from '@/utils/api/requests/broadcast/create-message.ts'
import { showErrorMessage, showSuccessMessage } from '@/utils/notify.ts'

const createBroadcastMsgSchema = z.object({
  text: z.string().min(5, 'Сообщение должно быть длиннее 5 символов'),
})

type CreateBroadcastMsgSchema = z.infer<typeof createBroadcastMsgSchema>

function CreateBroadcastMsgPage() {
  const webapp = useWebApp()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [currentAttachment, setCurrentAttachment] = useState<string | null>(
    null
  )
  const [isFileUploading, setFileUploading] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      showSuccessMessage('Сообщение успешно отправлено')
      navigate('/')
    },
    onError: () => {
      showErrorMessage('Произошла ошибка')
    },
  })

  const handleAddFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const deleteFile = () => {
    setCurrentAttachment(null)
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setFileUploading(true)
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const fileUrls = await prepareFileNames(fileArray)
      setCurrentAttachment(fileUrls[0])
    }
  }

  const prepareFileNames = async (files: File[]) => {
    const response = await toast.promise(
      uploadFiles(files),
      {
        success: 'Загрузка файлов прошла успешно',
        error: 'Произошла непредвиденная ошибка при загрузке файлов',
        loading: 'Загрузка файлов',
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    )
    setFileUploading(false)
    return response.map((file) => API_URL + file.url)
  }

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

  const form = useForm<CreateBroadcastMsgSchema>({
    resolver: zodResolver(createBroadcastMsgSchema),
    defaultValues: {
      text: '',
    },
  })

  const onSubmit = (values: CreateBroadcastMsgSchema) => {
    const checkedData = createBroadcastMsgSchema.safeParse(values)
    if (checkedData.success) {
      const formData = checkedData.data
      const newMessage: CreateBroadcastMessageDTO = {
        text: formData.text,
        imageUrl: currentAttachment ?? null,
      }
      mutate({ params: newMessage })
    }
  }

  return (
    <>
      <div className='mx-auto mt-3 flex w-[95%] flex-col'>
        <div className='flex flex-row items-center'>
          <h1 className='text-2xl font-bold'>Создание рекламных сообщений</h1>
        </div>
        <div className='mt-3'>
          <Card>
            <CardHeader>
              <CardTitle>Создание сообщения</CardTitle>
              <CardDescription>
                Введите данные для создания нового сообщения
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card className='mb-3 overflow-hidden'>
                <CardHeader>
                  <CardTitle>Вложение</CardTitle>
                  <CardDescription>
                    Прикрепите картинку, которая будет отправлена вместе с
                    сообщением
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='relative'>
                    {currentAttachment ? (
                      <>
                        <img
                          alt='attachment'
                          className='w-full rounded-md object-cover'
                          src={currentAttachment}
                          style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                        />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className='absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'>
                              <FileX className='h-4 w-4' />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction onClick={deleteFile}>
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    ) : (
                      <div className='w-full rounded-md bg-gray-500 object-cover' />
                    )}
                  </div>
                </CardContent>
                <CardFooter className='justify-center border-t p-4'>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='gap-1'
                    onClick={handleAddFileClick}
                    disabled={isFileUploading}
                  >
                    <PlusCircle className='h-3.5 w-3.5' />
                    Прикрепить
                  </Button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    className='hidden'
                    onChange={handleFileChange}
                    accept='image/*'
                  />
                </CardFooter>
              </Card>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={form.control}
                    name='text'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Текст сообщбения</FormLabel>
                        <FormControl>
                          <Textarea
                            className='min-h-[150px] resize-none'
                            placeholder='Введите текст сообщения...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button loading={isPending} type='submit' className='w-full'>
                    Отправить
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default CreateBroadcastMsgPage
