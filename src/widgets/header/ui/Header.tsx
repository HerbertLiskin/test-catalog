'use client'

import { SearchProducts } from '@/features/search-products/ui/SearchProducts'
import { useState } from 'react'

export function Header() {
  const [search, setSearch] = useState('')

  return (
    <header className="bg-white flex h-[105px] items-center justify-between px-[30px] rounded-[10px] w-full shadow-sm">
      <div className="flex flex-col items-start">
        <h1 className="font-cairo font-bold text-heading text-[24px] whitespace-nowrap">
          Товары
        </h1>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <SearchProducts value={search} onChange={setSearch} />
      </div>
    </header>
  )
}
