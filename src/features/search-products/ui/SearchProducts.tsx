'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SearchInput } from '@/shared/ui'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'

export function SearchProducts() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const debouncedQuery = useDebounce(query, 500)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    const currentQ = params.get('q') || ''
    
    const trimmedQuery = debouncedQuery.trim()
    const newQ = trimmedQuery.length >= 3 ? trimmedQuery : ''
    
    if (currentQ !== newQ) {
      if (newQ) {
        params.set('q', newQ)
      } else {
        params.delete('q')
      }
      params.delete('page')
      params.delete('sortBy')
      params.delete('order')
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }
  }, [debouncedQuery, pathname, router, searchParams])

  return <SearchInput value={query} onChange={setQuery} placeholder="Найти..." />
}
