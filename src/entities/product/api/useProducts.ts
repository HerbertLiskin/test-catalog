import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './productApi'
import type { ProductsResponse } from '../model/types'

const ITEMS_PER_PAGE = 20

export function useProducts(
  page: number,
  sortBy?: string,
  order?: 'asc' | 'desc',
  q?: string,
) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', page, sortBy, order, q],
    queryFn: ({ signal }) =>
      fetchProducts({
        limit: ITEMS_PER_PAGE,
        skip: (page - 1) * ITEMS_PER_PAGE,
        sortBy,
        order,
        q,
        signal,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export { ITEMS_PER_PAGE }
