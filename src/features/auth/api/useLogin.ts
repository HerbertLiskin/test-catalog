import { useMutation } from '@tanstack/react-query'
import { login } from './authApi'
import { setSessionToken } from '@/entities/session'
import type { LoginFormValues, LoginResponse } from '../model/authTypes'

interface UseLoginParams {
  onSuccess?: (data: LoginResponse) => void
  onError?: (error: Error) => void
}

export function useLogin({ onSuccess, onError }: UseLoginParams = {}) {
  return useMutation({
    mutationFn: (credentials: LoginFormValues) => login(credentials),
    onSuccess: (data, variables) => {
      // Save token according to "rememberMe" choice
      setSessionToken(data.accessToken, variables.rememberMe)
      
      // Optionally pre-populate or invalidate user profile queries here
      // queryClient.setQueryData(['user'], data)
      
      onSuccess?.(data)
    },
    onError,
  })
}
