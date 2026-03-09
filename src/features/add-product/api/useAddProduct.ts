import { useMutation } from '@tanstack/react-query'
import { addProduct } from './addProductApi'

export function useAddProduct(options?: {
  onSuccess?: () => void
  onError?: (error: unknown) => void
}) {
  return useMutation({
    mutationFn: addProduct,
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  })
}
