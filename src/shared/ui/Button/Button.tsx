import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  variant?: 'primary' | 'ghost' | 'icon'
  size?: 'md' | 'sm' | 'xs'
}

export function Button({ children, variant = 'primary', size = 'md', className = '', ...rest }: ButtonProps) {
  const baseStyles = 'relative cursor-pointer overflow-hidden leading-[1.2] font-semibold transition-all flex items-center justify-center gap-[15px]'
  
  const variants = {
    primary: 'rounded-[6px] bg-primary text-[#ebf3ea] px-[20px] py-[10px] text-[14px] border-none font-cairo',
    ghost: 'rounded-[8px] bg-white border border-gray-2 p-[10px]',
    icon: 'bg-primary rounded-full text-white p-0 size-[32px]'
  }

  const sizes = {
    md: 'min-h-[42px]',
    sm: '',
    xs: ''
  }

  return (
    <button
      {...rest}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {variant === 'primary' && (
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 100%)' }}
        />
      )}
    </button>
  )
}
