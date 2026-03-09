'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { SearchProducts } from '@/features/search-products'
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

export function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<string | undefined>()
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | undefined>()

  const tableRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      if (sortOrder === 'desc') {
        setSortOrder('asc')
      } else {
        setSortBy(undefined)
        setSortOrder(undefined)
      }
    } else {
      setSortBy(field)
      setSortOrder('desc')
    }
    setCurrentPage(1)
  }

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const { data, isLoading, isError } = useProducts(
    currentPage,
    sortBy,
    sortOrder
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

  return (
    <div className="bg-page-bg flex h-screen flex-col pr-[30px]">
      {/* Navigation Bar — fixed height */}
      <div className="shrink-0 py-5 pb-0">
        <div className="flex h-[105px] items-center justify-between rounded-[10px] bg-white px-[30px]">
          <h1 className="font-cairo text-heading text-2xl font-bold whitespace-nowrap">
            Товары
          </h1>
          <div className="flex flex-1 items-center justify-center px-8">
            <SearchProducts />
          </div>
        </div>
      </div>

      {/* Content — fills remaining space */}
      <div className="flex min-h-0 flex-1 flex-col pt-[30px] pb-5">
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white">
          {/* Header — fixed */}
          <div className="shrink-0 px-[30px] pt-[30px]">
            <div className="flex w-full items-center justify-between">
              <h2 className="font-cairo text-xl font-bold text-black">
                Все позиции
                <span className="font-cairo text-gray3 ml-2 text-base font-normal">
                  ({total})
                </span>
              </h2>
              <div className="flex items-start gap-2">
                <IconButton icon="/icons/refresh.svg" iconAlt="Обновить" />
                <button className="bg-primary flex min-h-[42px] cursor-pointer items-center gap-[15px] overflow-hidden rounded-md px-5 py-2.5 transition-opacity hover:opacity-90">
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
                  <div className="border-gray3 size-[22px] shrink-0 rounded border" />
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
    </div>
  )
}
