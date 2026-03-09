import { apiClient } from '@/shared/api'
import type { ProductsResponse } from '../model/types'

interface FetchProductsParams {
  limit: number
  skip: number
  sortBy?: string
  order?: 'asc' | 'desc'
  q?: string
  signal?: AbortSignal
}

export const fetchProducts = ({
  limit,
  skip,
  sortBy,
  order,
  q,
  signal,
}: FetchProductsParams): Promise<ProductsResponse> => {
  const endpoint = q ? '/products/search' : '/products'
  let url = `${endpoint}?limit=${limit}&skip=${skip}&select=title,category,brand,sku,rating,price,thumbnail`
  
  if (q) {
    url += `&q=${encodeURIComponent(q)}`
  }
  if (sortBy) {
    url += `&sortBy=${sortBy}&order=${order || 'desc'}`
  }
  
  return apiClient<ProductsResponse>(url, { signal })
}
