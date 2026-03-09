'use client'

import { useState } from 'react'
import { SearchInput } from '@/shared/ui'

export function SearchProducts() {
  const [query, setQuery] = useState('')

  return <SearchInput value={query} onChange={setQuery} placeholder="Найти  " />
}
