import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(error.message || 'Произошла ошибка при загрузке данных')
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(error.message || 'Произошла ошибка')
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
