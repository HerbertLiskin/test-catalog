'use client'

import Image from 'next/image'
import { type InputHTMLAttributes, useState } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  icon: string
  iconAlt?: string
  type?: 'text' | 'password'
  onClear?: () => void
}

export function Input({
  label,
  icon,
  iconAlt = '',
  type = 'text',
  value,
  onClear,
  ...rest
}: InputProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-lg font-medium leading-[1.5] tracking-[-0.27px] text-heading">
        {label}
      </label>
      <div className="flex w-[399px] items-center gap-3.5 rounded-xl border-[1.5px] border-input-border bg-card px-4 py-3.5">
        <Image src={icon} alt={iconAlt} width={24} height={24} className="shrink-0" />
        <input
          {...rest}
          type={inputType}
          value={value}
          className="min-w-0 flex-1 bg-transparent text-lg font-medium leading-[1.5] tracking-[-0.27px] text-heading outline-none placeholder:text-subtitle"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="shrink-0 cursor-pointer"
            aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
          >
            <Image
              src={visible ? '/icons/eye.svg' : '/icons/eye-off.svg'}
              alt=""
              width={24}
              height={24}
            />
          </button>
        )}
        {!isPassword && value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="shrink-0 cursor-pointer"
            aria-label="Очистить"
          >
            <Image src="/icons/close.svg" alt="" width={14} height={16} />
          </button>
        )}
      </div>
    </div>
  )
}
