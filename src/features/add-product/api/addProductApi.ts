import { apiClient } from '@/shared/api'

interface AddProductPayload {
  title: string
  price: number
  brand: string
  sku: string
}

interface AddProductResponse {
  id: number
  title: string
  price: number
  brand: string
  sku: string
}

export async function addProduct(payload: AddProductPayload): Promise<AddProductResponse> {
  return apiClient<AddProductResponse>('/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
