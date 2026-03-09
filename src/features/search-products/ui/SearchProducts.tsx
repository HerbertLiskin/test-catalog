'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SearchInput } from '@/shared/ui'

export function SearchProducts() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const handler = setTimeout(() => {
      const params = new URLSearchParams(window.location.search)
      const currentQ = params.get('q') || ''
      
      const trimmedQuery = query.trim()
      const newQ = trimmedQuery.length >= 3 ? trimmedQuery : ''
      
      if (currentQ !== newQ) {
        if (newQ) {
          params.set('q', newQ)
        } else {
          params.delete('q')
        }
        params.delete('page')
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query, pathname, router])

  return <SearchInput value={query} onChange={setQuery} placeholder="Найти..." />
}
