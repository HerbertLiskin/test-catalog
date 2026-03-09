import { apiClient } from '@/shared/api'
import type { ProductsResponse } from '../model/types'

interface FetchProductsParams {
  limit: number
  skip: number
  sortBy?: string
  order?: 'asc' | 'desc'
  signal?: AbortSignal
}

export const fetchProducts = ({
  limit,
  skip,
  sortBy,
  order,
  signal,
}: FetchProductsParams): Promise<ProductsResponse> => {
  let url = `/products?limit=${limit}&skip=${skip}&select=title,category,brand,sku,rating,price,thumbnail`
  if (sortBy) {
    url += `&sortBy=${sortBy}&order=${order || 'desc'}`
  }
  return apiClient<ProductsResponse>(url, { signal })
}
