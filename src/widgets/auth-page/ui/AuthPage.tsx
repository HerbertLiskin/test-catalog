import { Logo } from '@/shared/ui'
import { LoginForm } from '@/features/auth'

export function AuthPage() {
  return (
    <div className="bg-page flex min-h-screen items-center justify-center">
      <div className="bg-card w-[527px] overflow-hidden rounded-[40px] p-1.5 shadow-[0px_24px_32px_0px_rgba(0,0,0,0.04)]">
        <div
          className="border-input-border flex flex-col items-center gap-8 overflow-hidden rounded-[34px] border p-12"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(35,35,35,0.03), rgba(35,35,35,0) 50%)',
          }}
        >
          {/* Logo */}
          <Logo />

          {/* Heading */}
          <div className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="text-heading text-[40px] leading-[1.1] font-semibold tracking-[-0.6px]">
              Добро пожаловать!
            </h1>
            <p className="text-subtitle text-lg leading-[1.5] font-medium">
              Пожалуйста, авторизируйтесь
            </p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Sign up link */}
          <p className="text-body w-full text-center text-lg leading-[1.5]">
            Нет аккаунта?{' '}
            <a href="#" className="text-primary font-semibold underline">
              Создать
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
