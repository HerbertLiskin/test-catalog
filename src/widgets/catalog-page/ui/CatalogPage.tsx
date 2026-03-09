'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SearchProducts } from '@/features/search-products'
import { ProductRow, type Product } from '@/entities/product'
import { Pagination, IconButton } from '@/shared/ui'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'USB Флэшкарта 16GB',
    category: 'Аксессуары',
    vendor: 'Samsung',
    article: 'RCH45Q1A',
    rating: 4.3,
    price: 48652,
  },
  {
    id: '2',
    name: 'Утюг Braun TexStyle 9',
    category: 'Бытовая техника',
    vendor: 'TexStyle',
    article: 'DFCHQ1A',
    rating: 4.9,
    price: 4233,
  },
  {
    id: '3',
    name: 'Смартфон Apple iPhone 17',
    category: 'Телефоны',
    vendor: 'Apple',
    article: 'GUYHD2-X4',
    rating: 4.7,
    price: 88652,
    selected: true,
  },
  {
    id: '4',
    name: 'Игровая консоль PlaySta...',
    category: 'Игровые приставки',
    vendor: 'Sony',
    article: 'HT45Q21',
    rating: 4.1,
    price: 56236,
  },
  {
    id: '5',
    name: 'Фен Dyson Supersonic Nural',
    category: 'Электроника',
    vendor: 'Dyson',
    article: 'FJHHGF-CR4',
    rating: 3.3,
    price: 48652,
  },
]

export function CatalogPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [currentPage, setCurrentPage] = useState(1)

  const handleToggleSelect = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, selected: !p.selected } : p)),
    )
  }

  return (
    <div className="bg-page-bg min-h-screen flex items-start pr-[30px]">
      <div className="flex flex-col gap-[30px] py-5 w-full">
        {/* Navigation Bar */}
        <div className="bg-white rounded-[10px] h-[105px] flex items-center justify-between px-[30px]">
          {/* Title */}
          <h1 className="font-cairo font-bold text-2xl text-heading whitespace-nowrap">
            Товары
          </h1>

          {/* Search */}
          <div className="flex items-center justify-center flex-1 px-8">
            <SearchProducts />
          </div>
        </div>

        {/* Content */}
        <div className="flex items-start w-full">
          <div className="flex-1">
            <div className="bg-white rounded-xl flex flex-col gap-10 p-[30px]">
              {/* Header */}
              <div className="flex items-center justify-between w-full">
                <h2 className="font-cairo font-bold text-xl text-black">
                  Все позиции
                </h2>
                <div className="flex items-start gap-2">
                  <IconButton icon="/icons/refresh.svg" iconAlt="Обновить" />
                  <button className="flex items-center gap-[15px] bg-primary rounded-md px-5 py-2.5 min-h-[42px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                    <Image
                      src="/icons/plus-circle.svg"
                      alt=""
                      width={22}
                      height={22}
                    />
                    <span className="font-cairo font-semibold text-sm text-soft-green whitespace-nowrap">
                      Добавить
                    </span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="flex flex-col w-full">
                {/* Column Headers */}
                <div className="flex items-center h-[73px] px-[18px]">
                  <div className="flex items-center gap-5 w-[278px] shrink-0">
                    <div className="size-[22px] rounded border border-gray3 shrink-0" />
                    <p className="font-cairo font-bold text-base text-gray3">
                      Наименование
                    </p>
                  </div>
                  <div className="flex-1 flex items-center justify-evenly font-cairo font-bold text-base text-gray3 text-center">
                    <p className="w-[125px] shrink-0">Вендор</p>
                    <p className="w-[140px] shrink-0">Артикул</p>
                    <p className="w-[100px] shrink-0">Оценка</p>
                    <p className="w-[140px] shrink-0">Цена, ₽</p>
                    <div className="w-[100px] shrink-0" />
                  </div>
                </div>

                {/* Product Rows */}
                {products.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onToggleSelect={handleToggleSelect}
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={6}
                totalItems={120}
                itemsPerPage={20}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
