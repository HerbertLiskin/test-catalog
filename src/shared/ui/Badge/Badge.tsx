import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  className?: string
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <div className={`text-sm font-normal text-gray-3 font-cairo ${className}`}>
      {children}
    </div>
  )
}
