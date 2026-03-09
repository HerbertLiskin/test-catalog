import { apiClient } from '@/shared/api'
import type { LoginResponse, LoginFormValues } from '../model/authTypes'

export const login = async (
  credentials: Omit<LoginFormValues, 'rememberMe'>
): Promise<LoginResponse> => {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      expiresInMins: 60, // Optional parameter for dummyjson
    }),
  })
}
