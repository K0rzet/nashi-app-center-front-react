import { createBrowserRouter, Outlet } from 'react-router-dom'
import { ProtectedRoute } from '@/components/protected-route.tsx'
import { Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Suspense
          fallback={
            <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
              <Spinner />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        lazy: async () => ({
          Component: (await import('@/pages/homepage')).default,
        }),
      },
      {
        path: 'app/:id',
        lazy: async () => ({
          Component: (await import('@/pages/app-page')).default,
        }),
      },
      {
        path: 'app/:id/edit',
        lazy: async () => ({
          Component: (await import('@/pages/edit-app-page')).default,
        }),
      },
      {
        path: 'app/create',
        lazy: async () => ({
          Component: (await import('@/pages/create-app-page')).default,
        }),
      },
      {
        path: 'broadcast-message',
        lazy: async () => ({
          Component: (await import('@/pages/create-broadcast-msg-page'))
            .default,
        }),
      },
    ],
  },
])

export default router
