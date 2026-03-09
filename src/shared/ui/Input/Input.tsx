'use client'

import Image from 'next/image'
import { type InputHTMLAttributes, useState, forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  icon?: string
  iconAlt?: string
  type?: 'text' | 'password'
  onClear?: () => void
  error?: FieldError
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  icon,
  iconAlt = '',
  type = 'text',
  value,
  onClear,
  error,
  ...rest
}, ref) => {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-lg font-medium leading-[1.5] tracking-[-0.27px] text-heading">
          {label}
        </label>
      )}
      <div className={`flex w-full items-center gap-3.5 rounded-xl border-[1.5px] bg-card px-4 py-3.5 transition-colors ${
        error ? 'border-red-500' : 'border-input-border'
      }`}>
        {icon && <Image src={icon} alt={iconAlt} width={24} height={24} className="shrink-0" />}
        <input
          {...rest}
          ref={ref}
          type={inputType}
          value={value}
          className="min-w-0 flex-1 bg-transparent text-lg font-medium leading-[1.5] tracking-[-0.27px] text-heading outline-none placeholder:text-subtitle"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="shrink-0 cursor-pointer flex items-center justify-center p-1"
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
            className="shrink-0 cursor-pointer flex items-center justify-center p-1"
            aria-label="Очистить"
          >
            <Image src="/icons/close.svg" alt="" width={14} height={16} />
          </button>
        )}
      </div>
      {error && (
        <span className="text-sm font-semibold text-red-500">
          {error.message}
        </span>
      )}
    </div>
  )
})
Input.displayName = 'Input'
