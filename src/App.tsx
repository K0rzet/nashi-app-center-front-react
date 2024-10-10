import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WebAppProvider } from '@vkruglikov/react-telegram-web-app'
import { store } from '@/utils/redux/store.ts'
import { Provider } from 'react-redux'

function App() {
  const queryClient = new QueryClient()

  return (
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </WebAppProvider>
  )
}

export default App
