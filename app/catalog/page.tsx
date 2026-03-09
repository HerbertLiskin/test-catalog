import { Suspense } from 'react'
import { CatalogPage } from '@/widgets/catalog-page'

export default function Catalog() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Загрузка...</div>}>
      <CatalogPage />
    </Suspense>
  )
}
