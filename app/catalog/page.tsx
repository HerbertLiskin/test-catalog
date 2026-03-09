import { Suspense } from 'react'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { CatalogPage } from '@/widgets/catalog-page'
import { fetchProducts, ITEMS_PER_PAGE } from '@/entities/product'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Catalog(props: Props) {
  const queryClient = new QueryClient()
  
  // Await the searchParams to extract them
  const params = await props.searchParams;
  const page = Number(params.page) || 1
  const sortBy = params.sortBy as string | undefined
  const order = params.order as 'asc' | 'desc' | undefined
  const q = params.q as string | undefined

  // Prefetch the query
  await queryClient.prefetchQuery({
    queryKey: ['products', page, sortBy, order, q],
    queryFn: () => fetchProducts({
      limit: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      sortBy,
      order,
      q
    })
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Загрузка...</div>}>
        <CatalogPage />
      </Suspense>
    </HydrationBoundary>
  )
}
