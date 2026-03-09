'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { SearchProducts } from '@/features/search-products'
import { UserProfile } from '@/features/user-profile'
import { AddProductModal } from '@/features/add-product'
import { ProductRow, useProducts, ITEMS_PER_PAGE } from '@/entities/product'
import { Pagination, IconButton } from '@/shared/ui'

type SortableFieldProps = {
  field: string
  label: string
  width: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort: (field: string) => void
}

const SortableHeader = ({
  field,
  label,
  width,
  sortBy,
  sortOrder,
  onSort,
}: SortableFieldProps) => {
  const isActive = sortBy === field
  return (
    <div
      className={`flex shrink-0 cursor-pointer items-center justify-center gap-1 ${width} transition-colors ${isActive ? 'text-black' : 'hover:text-black/70'}`}
      onClick={() => onSort(field)}
    >
      <div className="relative">
        <div>{label}</div>
        <div className="absolute top-1/2 right-[-16px] flex -translate-y-1/2 flex-col items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-colors ${isActive && sortOrder === 'asc' ? 'text-primary' : 'text-gray2'}`}
          >
            <path
              d="M7 15L12 10L17 15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`-mt-1 transition-colors ${isActive && sortOrder === 'desc' ? 'text-primary' : 'text-gray2'}`}
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

const CATALOG_PARAMS_KEY = 'catalog_last_params'

export function CatalogPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const sortBy = searchParams.get('sortBy') || undefined
  const sortOrder = (searchParams.get('order') as 'asc' | 'desc') || undefined
  const q = searchParams.get('q') || undefined

  const tableRef = useRef<HTMLDivElement>(null)

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
    if (qs) {
      localStorage.setItem(CATALOG_PARAMS_KEY, qs)
    }
  }, [searchParams])

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) {
      params.set('page', page.toString())
    } else {
      params.delete('page')
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (sortBy === field) {
      if (sortOrder === 'desc') {
        params.set('order', 'asc')
      } else {
        params.delete('sortBy')
        params.delete('order')
      }
    } else {
      params.set('sortBy', field)
      params.set('order', 'desc')
    }
    params.delete('page') // Reset page to 1
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleRemoveSort = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('sortBy')
    params.delete('order')
    params.delete('page')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useProducts(
    currentPage,
    sortBy,
    sortOrder,
    q
  )

  // Scroll to top *after* new data is loaded
  useEffect(() => {
    if (data && !isLoading) {
      tableRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [data, isLoading])

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const targetIds = products.map((p) => p.id)
  const isAllSelected =
    targetIds.length > 0 && targetIds.every((id) => selectedIds.has(id))

  const handleToggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (isAllSelected) {
        targetIds.forEach((id) => next.delete(id))
      } else {
        targetIds.forEach((id) => next.add(id))
      }
      return next
    })
  }

  return (
    <div className="bg-page-bg flex h-screen flex-col px-[30px]">
      {/* Navigation Bar — fixed height */}
      <div className="shrink-0 py-5 pb-0">
        <div className="flex h-[105px] items-center justify-between rounded-[10px] bg-white px-[30px]">
          <h1 className="font-cairo text-heading text-2xl font-bold whitespace-nowrap">
            Товары
          </h1>
          <div className="flex flex-1 items-center justify-end gap-6 px-8">
            <SearchProducts />
            <UserProfile />
          </div>
        </div>
      </div>

      {/* Content — fills remaining space */}
      <div className="flex min-h-0 flex-1 flex-col pt-[30px] pb-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white">
          {/* Header — fixed */}
          <div className="shrink-0 px-[30px] pt-[30px]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-6">
                <h2 className="font-cairo text-xl font-bold text-black">
                  Все позиции
                  <span className="font-cairo text-gray3 ml-2 text-base font-normal">
                    ({total})
                  </span>
                </h2>
                {sortBy && (
                  <button
                    onClick={handleRemoveSort}
                    className="font-cairo text-gray3 flex cursor-pointer items-center gap-1.5 text-sm transition-colors hover:text-black"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Сбросить сортировку
                  </button>
                )}
              </div>
              <div className="flex items-start gap-2">
                <IconButton
                  icon="/icons/refresh.svg"
                  iconAlt="Обновить"
                  onClick={() => refetch()}
                />
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-primary flex min-h-[42px] cursor-pointer items-center gap-[15px] overflow-hidden rounded-md px-5 py-2.5 transition-opacity hover:opacity-90"
                >
                  <Image
                    src="/icons/plus-circle.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                  <span className="font-cairo text-soft-green text-sm font-semibold whitespace-nowrap">
                    Добавить
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Table — scrollable area */}
          <div
            ref={tableRef}
            className="min-h-0 flex-1 overflow-y-auto px-[30px]"
          >
            {/* Column Headers — sticky */}
            <div className="sticky top-0 z-10 bg-white">
              <div className="flex h-[73px] items-center px-[18px]">
                <div className="flex w-[278px] shrink-0 items-center gap-5">
                  <button
                    onClick={handleToggleSelectAll}
                    disabled={products.length === 0}
                    className={`size-[22px] shrink-0 cursor-pointer rounded border transition-colors ${
                      isAllSelected
                        ? 'border-gray3 bg-dark-blue'
                        : 'border-gray3 bg-white'
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                  />
                  <p className="font-cairo text-gray3 text-base font-bold">
                    Наименование
                  </p>
                </div>
                <div className="font-cairo text-gray3 flex flex-1 items-center justify-evenly text-center text-base font-bold">
                  <p className="w-[125px] shrink-0">Вендор</p>
                  <p className="w-[140px] shrink-0">Артикул</p>
                  <SortableHeader
                    field="rating"
                    label="Оценка"
                    width="w-[100px]"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    field="price"
                    label="Цена, ₽"
                    width="w-[140px]"
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                  />
                  <div className="w-[100px] shrink-0" />
                </div>
              </div>
            </div>

            {/* Product Rows */}
            {isLoading && (
              <div className="flex items-center justify-center py-20">
                <p className="font-cairo text-gray3 text-base">
                  Загрузка товаров...
                </p>
              </div>
            )}

            {isError && (
              <div className="flex items-center justify-center py-20">
                <p className="font-cairo text-danger text-base">
                  Ошибка загрузки данных
                </p>
              </div>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <p className="font-cairo text-gray3 text-base">
                  По вашему запросу ничего не найдено.
                </p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  selected={selectedIds.has(product.id)}
                  onToggleSelect={handleToggleSelect}
                />
              ))}
          </div>

          {/* Pagination — pinned to bottom */}
          {!isLoading && !isError && totalPages > 0 && (
            <div className="border-table-border shrink-0 px-[30px]">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={total}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}
