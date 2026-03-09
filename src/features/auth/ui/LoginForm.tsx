'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Button, Checkbox, Divider } from '@/shared/ui'
import { loginSchema, type LoginFormValues } from '../model/authTypes'
import { useLogin } from '../api/useLogin'
import { decodeJwt } from 'jose'

export function LoginForm() {
  const router = useRouter()
  const [apiError, setApiError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  // ... rest identical until return
  const { mutate: login, isPending } = useLogin({
    onSuccess: (data) => {
      try {
        const payload = decodeJwt(data.accessToken)
        console.log('Decoded Token:', payload)
      } catch (err) {
        console.error('Error decoding token', err)
      }
      router.push('/catalog')
    },
    onError: (error: unknown) => {
      const err = error as { response?: { data?: { message?: string } } }
      setApiError(err?.response?.data?.message || 'Неверный логин или пароль')
    },
  })

  const onSubmit = (data: LoginFormValues) => {
    setApiError(null)
    login(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Input
          label="Логин"
          icon="/icons/user.svg"
          iconAlt="Пользователь"
          placeholder="Введите логин"
          error={errors.username}
          {...register('username')}
        />
        
        <Input
          label="Пароль"
          icon="/icons/lock.svg"
          iconAlt="Пароль"
          type="password"
          placeholder="Введите пароль"
          error={errors.password}
          {...register('password')}
        />
      </div>

      <Controller
        name="rememberMe"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox
            label="Запомнить данные"
            checked={value}
            onChange={onChange}
          />
        )}
      />

      {apiError && (
        <div className="mt-2 text-center text-sm font-semibold text-red-500">
          {apiError}
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <Button type="submit" disabled={isSubmitting || isPending}>
          {isSubmitting || isPending ? 'Вход...' : 'Войти'}
        </Button>
        <Divider text="или" />
      </div>
    </form>
  )
}

