import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Логин обязателен'),
  password: z.string().min(1, 'Пароль обязателен'),
  rememberMe: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export interface LoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}
