'use client'

import { useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { CatalogHeader } from './CatalogHeader/CatalogHeader'
import { CatalogTable } from './CatalogTable/CatalogTable'

const CATALOG_PARAMS_KEY = 'catalog_last_params'

export function CatalogPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Restore last params from storage if user arrives without any GET params
  useEffect(() => {
    if (searchParams.toString() === '') {
      const saved = localStorage.getItem(CATALOG_PARAMS_KEY)
      if (saved) {
        router.replace(`${pathname}?${saved}`, { scroll: false })
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Persist current query params to storage whenever they change
  useEffect(() => {
    const qs = searchParams.toString()
    localStorage.setItem(CATALOG_PARAMS_KEY, qs)
  }, [searchParams])

  return (
    <div className="bg-page-bg flex h-screen flex-col px-[30px]">
      <CatalogHeader />
      <CatalogTable />
    </div>
  )
}
