'use client'

import { Icon } from '@/shared/ui'

interface SearchProductsProps {
  value: string
  onChange: (value: string) => void
}

export function SearchProducts({ value, onChange }: SearchProductsProps) {
  return (
    <div className="bg-subtitle flex gap-[8px] items-center px-[20px] py-[12px] rounded-[8px] w-[1023px]">
      <div className="text-muted shrink-0">
        <Icon name="search" size={24} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Найти"
        className="flex-1 bg-transparent font-sans font-normal text-muted text-[14px] outline-none placeholder:text-muted"
      />
    </div>
  )
}
