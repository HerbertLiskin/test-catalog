import { Logo } from '@/src/shared/ui'
import { LoginForm } from '@/src/features/auth'

export function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page">
      <div className="w-[527px] overflow-hidden rounded-[40px] bg-card p-1.5 shadow-[0px_24px_32px_0px_rgba(0,0,0,0.04)]">
        <div
          className="flex flex-col items-center gap-8 overflow-hidden rounded-[34px] border border-input-border p-12"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(35,35,35,0.03), rgba(35,35,35,0) 50%)',
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Heading */}
          <div className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.6px] text-heading">
              Добро пожаловать!
            </h1>
            <p className="text-lg font-medium leading-[1.5] text-subtitle">
              Пожалуйста, авторизируйтесь
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Sign up link */}
          <p className="w-full text-center text-lg leading-[1.5] text-body">
            Нет аккаунта?{' '}
            <a
              href="#"
              className="font-semibold text-primary underline"
            >
              Создать
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
