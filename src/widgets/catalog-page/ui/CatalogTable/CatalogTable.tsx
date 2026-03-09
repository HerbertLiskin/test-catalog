'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { AddProductModal } from '@/features/add-product'
import { ProductRow, useProducts, ITEMS_PER_PAGE } from '@/entities/product'
import { Pagination, IconButton, SortableHeader } from '@/shared/ui'
import { useProductSelection } from '../../lib/useProductSelection'

export function CatalogTable() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentPage = Number(searchParams.get('page')) || 1
  const sortBy = searchParams.get('sortBy') || undefined
  const sortOrder = (searchParams.get('order') as 'asc' | 'desc') || undefined
  const q = searchParams.get('q') || undefined

  const tableRef = useRef<HTMLDivElement>(null)
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data, isLoading, isError, refetch } = useProducts(
    currentPage,
    sortBy,
    sortOrder,
    q
  )

  const products = data?.products ?? []
  const total = data?.total ?? 0
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)
  const targetIds = products.map((p) => p.id)

  const {
    selectedIds,
    isAllSelected,
    handleToggleSelect,
    handleToggleSelectAll,
  } = useProductSelection(targetIds)

  // Scroll to top *after* new data is loaded
  useEffect(() => {
    if (data && !isLoading) {
      tableRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [data, isLoading])

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

  return (
    <div className="flex min-h-0 flex-1 flex-col pt-[30px] pb-5">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-white">
        {/* Header — md */}
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

        {/* Table Content */}
        <div ref={tableRef} className="min-h-0 flex-1 overflow-y-auto px-[30px]">
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

          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <p className="font-cairo text-gray3 text-base">Загрузка товаров...</p>
            </div>
          )}
          {isError && (
            <div className="flex items-center justify-center py-20">
              <p className="font-cairo text-danger text-base">Ошибка загрузки данных</p>
            </div>
          )}
          {!isLoading && !isError && products.length === 0 && (
            <div className="flex items-center justify-center py-20">
              <p className="font-cairo text-gray3 text-base">По вашему запросу ничего не найдено.</p>
            </div>
          )}
          {!isLoading && !isError && products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              selected={selectedIds.has(product.id)}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>

        {/* Pagination */}
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

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}
