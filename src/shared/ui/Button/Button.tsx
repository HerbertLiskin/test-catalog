import { type ButtonHTMLAttributes, type ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="relative w-full cursor-pointer overflow-hidden rounded-xl border border-primary-border px-2 py-4 text-lg font-semibold leading-[1.2] tracking-[-0.18px] text-white"
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 100%), linear-gradient(90deg, #242edb 0%, #242edb 100%)',
        boxShadow: '0 8px 8px 0 rgba(54,122,255,0.03)',
      }}
    >
      {children}
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: 'inset 0 -2px 0 1px rgba(0,0,0,0.08)' }}
      />
    </button>
  )
}
