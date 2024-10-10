import { Button } from '@/components/ui/button.tsx'
import { FileX, PlusCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PatchApplicationDto } from '@/types/api'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import * as ScrollArea from '@radix-ui/react-scroll-area'
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
import { uploadFiles } from '@/utils/api/requests/files/upload-file.ts'
import toast, { Toaster } from 'react-hot-toast'
import { showErrorMessage, showSuccessMessage } from '@/utils/notify.ts'
import { createApplication } from '@/utils/api/requests/applications/create-application.ts'
import { useWebApp } from '@vkruglikov/react-telegram-web-app'
import { API_URL } from '@/utils/api/axios-instance'

const createApplicationSchema = z.object({
  name: z.string().min(1, 'Введите название приложения'),
  description: z.string().min(1, 'Введите описание приложения'),
  shortDescription: z.string().min(1, 'Введите краткое описание приложения'),
  category: z.string().min(1, 'Введите категорию'),
  orderNumber: z
    .string()
    .regex(/^([0-9]*|\s*)$/, {
      message: 'Введите корректное порядковое число (от 1)',
    })
    .optional(),
  url: z.string().url('Введите корректный URL приложения'),
})

type CreateApplicationSchema = z.infer<typeof createApplicationSchema>

function CreateAppPage() {
  const navigate = useNavigate()
  const iconInputRef = useRef<HTMLInputElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [currentIcon, setCurrentIcon] = useState<string | null>(null)
  const [currentScreenshots, setCurrentScreenshots] = useState<string[]>([])
  const [indexToDelete, setIndexToDelete] = useState<number | null>(null)
  const queryClient = useQueryClient()
  const webapp = useWebApp()

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

  const { mutate, isPending } = useMutation({
    mutationFn: createApplication,
    onSuccess: () => {
      showSuccessMessage('Приложение успешно создано!')
      navigate('/')
    },
    onError: () => {
      showErrorMessage(
        'Произошла непредвиденная ошибка. Попробуйте снова позже'
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  const form = useForm<CreateApplicationSchema>({
    resolver: zodResolver(createApplicationSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      category: '',
      orderNumber: '',
      url: '',
    },
  })

  const handleAddIconClick = () => {
    if (iconInputRef.current) {
      iconInputRef.current.click()
    }
  }

  const handleIconChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const fileUrls = await prepareFileNames(fileArray)
      setCurrentIcon(fileUrls[0])
    }
  }

  const handleAddScreenshotClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
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
    return response.map((file) => API_URL + file.url)
  }

  const handleScreenshotsChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    if (files) {
      const fileArray = Array.from(files)
      const fileUrls = await prepareFileNames(fileArray)

      setCurrentScreenshots((prevState) => {
        const uniqueFiles = fileUrls.filter(
          (fileUrl) => !prevState.includes(fileUrl)
        )
        return [...prevState, ...uniqueFiles]
      })
    }
  }

  const handleDeleteFile = (index: number) => {
    setCurrentScreenshots((prevState) =>
      prevState.filter((_, i) => i !== index)
    )
  }

  const onSubmit = (values: CreateApplicationSchema) => {
    const checkedData = createApplicationSchema.safeParse(values)
    if (checkedData.success) {
      const formData = checkedData.data
      const editedApplication: PatchApplicationDto = {
        ...formData,
        orderNumber:
          formData.orderNumber === ''
            ? undefined
            : Number(formData.orderNumber),
        icon: currentIcon ?? '',
        screenshots: currentScreenshots,
      }
      mutate({ params: editedApplication })
    }
  }

  return (
    <>
      <div className='mx-auto mt-3 flex w-[95%] flex-col'>
        <div className='flex flex-row items-center'>
          <h1 className='text-2xl font-bold'>Редактор приложений</h1>
        </div>
        <div className='mt-3'>
          <Card>
            <CardHeader>
              <CardTitle>Создание проекта</CardTitle>
              <CardDescription>
                Введите данные для создания нового проекта
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>Добавление иконки</CardTitle>
                  <CardContent className='flex flex-row items-center justify-between p-0'>
                    <div>
                      <Button
                        size='sm'
                        className='gap-1'
                        onClick={handleAddIconClick}
                      >
                        <PlusCircle className='h-3.5 w-3.5' />
                        Добавить иконку
                      </Button>
                      <input
                        type='file'
                        ref={iconInputRef}
                        className='hidden'
                        onChange={handleIconChange}
                        accept='image/*'
                      />
                    </div>
                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl'>
                      {currentIcon ? (
                        <img
                          src={currentIcon || ''}
                          alt={''}
                          className='h-full w-full object-cover'
                        />
                      ) : (
                        <div className='h-full w-full bg-gray-500'></div>
                      )}
                    </div>
                  </CardContent>
                </CardHeader>
              </Card>

              <Card className='mb-1 mt-2'>
                <CardHeader>
                  <CardTitle>Добавление скриншотов</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea.Root className='w-full' type='scroll'>
                    <ScrollArea.Viewport className='w-full overflow-x-scroll'>
                      <div className='flex flex-row justify-center gap-4 p-4'>
                        {currentScreenshots.map((screenshot, index) => (
                          <div
                            key={`${screenshot}-${index}`}
                            className='relative h-96 w-48 overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105'
                          >
                            <img
                              src={screenshot}
                              alt={`Screenshot ${index + 1}`}
                              className='h-full w-full object-cover'
                            />

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  onClick={() => setIndexToDelete(index)}
                                  className='absolute right-2 top-2 rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
                                  aria-label={`Delete screenshot ${index + 1}`}
                                >
                                  <FileX className='h-4 w-4' />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Вы уверены?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Это действие нельзя отменить. Скриншот будет
                                    удален навсегда.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      indexToDelete !== null &&
                                      handleDeleteFile(indexToDelete)
                                    }
                                  >
                                    Удалить
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
                </CardContent>
                <CardFooter className='justify-center border-t p-4'>
                  <Button
                    size='sm'
                    className='gap-1'
                    onClick={handleAddScreenshotClick}
                  >
                    <PlusCircle className='h-3.5 w-3.5' />
                    Добавить скриншоты
                  </Button>
                  <input
                    type='file'
                    ref={fileInputRef}
                    className='hidden'
                    onChange={handleScreenshotsChange}
                    accept='image/*'
                    multiple
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
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder='Введите название приложения...'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Описание</FormLabel>
                        <FormControl>
                          <Textarea
                            className='min-h-[150px] resize-none'
                            placeholder='Введите полное описание...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='shortDescription'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Короткое описание</FormLabel>
                        <FormControl>
                          <Textarea
                            className='min-h-[100px] resize-none'
                            placeholder='Введите краткое описание...'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Категория</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder='Введите категорию...'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='orderNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Порядковый номер</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder='Введите порядковый номер приложения...'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Введите URL приложения...'
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button loading={isPending} type='submit' className='w-full'>
                    Сохранить
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

export default CreateAppPage
