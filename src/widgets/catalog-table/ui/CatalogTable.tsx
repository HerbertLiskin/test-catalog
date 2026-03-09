'use client'

import { useState } from 'react'
import { ProductRow } from '@/entities/product/ui/ProductRow'
import { type Product } from '@/entities/product/model/types'
import { Button, Icon } from '@/shared/ui'
import { AddProductButton } from '@/features/add-product/ui/AddProductButton'

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'USB Флэшкарта 16GB',
    category: 'Аксессуары',
    vendor: 'Samsung',
    sku: 'RCH45Q1A',
    rating: 4.3,
    price: 48652,
    imageUrl: '', // Will use placeholders or colors if none
  },
  {
    id: '2',
    name: 'Утюг Braun TexStyle 9',
    category: 'Бытовая техника',
    vendor: 'TexStyle',
    sku: 'DFCHQ1A',
    rating: 4.9,
    price: 4233,
    imageUrl: '',
  },
  {
    id: '3',
    name: 'Смартфон Apple iPhone 17',
    category: 'Телефоны',
    vendor: 'Apple',
    sku: 'GUYHD2-X4',
    rating: 4.7,
    price: 88652,
    imageUrl: '',
    hasBlueStatus: true,
    isSelected: true,
  },
  {
    id: '4',
    name: 'Игровая консоль PlaySta...',
    category: 'Игровые приставки',
    vendor: 'Sony',
    sku: 'HT45Q21',
    rating: 4.1,
    price: 56236,
    imageUrl: '',
  },
  {
    id: '5',
    name: 'Фен Dyson Supersonic Nural',
    category: 'Электроника',
    vendor: 'Dyson',
    sku: 'FJHHGF-CR4',
    rating: 3.3,
    price: 48652,
    imageUrl: '',
  },
]

export function CatalogTable() {
  const [products, setProducts] = useState(MOCK_PRODUCTS)

  const toggleSelect = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSelected: !p.isSelected } : p))
    )
  }

  return (
    <div className="bg-white flex flex-col gap-[40px] p-[30px] rounded-[12px] w-full shadow-sm min-h-[669px]">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-cairo font-bold text-black text-[20px] leading-[20px]">
          Все позиции
        </h2>
        <div className="flex gap-[8px] items-center">
          <Button variant="ghost">
            <Icon name="refresh" size={22} className="text-[#333]" />
          </Button>
          <AddProductButton />
        </div>
      </div>

      <div className="flex flex-col w-full overflow-x-auto">
        {/* Table Header */}
        <div className="flex items-center h-[73px] px-[18px] w-full">
          <div className="flex items-center gap-[20px] w-[278px] shrink-0">
            <div className="border border-gray-3 border-solid rounded-[4px] size-[22px]" />
            <span className="font-cairo font-bold text-gray-3 text-[16px]">
              Наименование
            </span>
          </div>
          <div className="flex items-center flex-1 ml-[110px]">
            <span className="font-cairo font-bold text-gray-3 text-[16px] text-center w-[125px]">
              Вендор
            </span>
            <span className="font-cairo font-bold text-gray-3 text-[16px] text-center w-[200px]">
              Артикул
            </span>
            <span className="font-cairo font-bold text-gray-3 text-[16px] text-center w-[125px]">
              Оценка
            </span>
            <span className="font-cairo font-bold text-gray-3 text-[16px] text-center w-[200px]">
              Цена, ₽
            </span>
            <div className="w-[133px]" />
          </div>
        </div>

        {/* Product Rows */}
        <div className="flex flex-col border-t border-gray-2 border-solid">
          {products.map((product) => (
            <ProductRow 
              key={product.id} 
              product={product} 
              onToggleSelect={toggleSelect} 
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-[11px] w-full mt-auto">
        <p className="font-roboto font-normal text-gray-3 text-[18px]">
          <span className="text-[#969b9f]">Показано </span>
          <span className="text-black">1-20</span>
          <span className="text-[#969b9f]"> из </span>
          <span className="text-black">120</span>
        </p>
        <div className="flex gap-[16px] items-center">
          <button className="text-muted hover:text-black">
            <Icon name="caret-left" size={20} />
          </button>
          <div className="flex gap-[8px] items-center">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`flex items-center justify-center rounded-[4px] size-[30px] cursor-pointer transition-all ${
                  num === 1
                    ? 'bg-[#797fea] text-white shadow-2'
                    : 'bg-white border border-gray-2 text-gray-3'
                }`}
              >
                <span className="font-cairo text-[14px]">{num}</span>
              </div>
            ))}
          </div>
          <button className="text-muted hover:text-black">
            <Icon name="caret-right" size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
