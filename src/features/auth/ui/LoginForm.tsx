'use client'

import { useState } from 'react'
import { Input, Button, Checkbox, Divider } from '@/shared/ui'

export function LoginForm() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <Input
          label="Логин"
          icon="/icons/user.svg"
          iconAlt="Пользователь"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин"
          onClear={() => setLogin('')}
        />
        <Input
          label="Пароль"
          icon="/icons/lock.svg"
          iconAlt="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
      </div>

      <Checkbox
        label="Запомнить данные"
        checked={remember}
        onChange={setRemember}
      />

      <div className="flex w-full flex-col gap-4">
        <Button type="submit">Войти</Button>
        <Divider text="или" />
      </div>
    </form>
  )
}
