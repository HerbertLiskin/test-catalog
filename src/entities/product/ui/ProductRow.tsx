'use client'

import { Badge, Checkbox, Icon, Button } from '@/shared/ui'
import { type Product } from '../model/types'

interface ProductRowProps {
  product: Product
  onToggleSelect: (id: string) => void
}

export function ProductRow({ product, onToggleSelect }: ProductRowProps) {
  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price)
  
  const [integerPart, decimalPart] = formattedPrice.split(',')

  return (
    <div className="border-b border-gray-2 border-solid flex items-center h-[71px] px-[18px] w-full group hover:bg-page transition-colors relative">
      {product.hasBlueStatus && (
        <div className="absolute left-0 bg-[#3c538e] h-[69px] w-[3px]" />
      )}
      
      <div className="flex items-center gap-[18px] w-[278px] shrink-0">
        <Checkbox 
          checked={product.isSelected || false} 
          onChange={() => onToggleSelect(product.id)}
          checkType={product.hasBlueStatus ? 'Checked Dark' : 'UnChecked'}
          className={product.hasBlueStatus ? 'bg-[#3c538e] border-none' : ''}
        />
        <div className="bg-[#c4c4c4] border border-gray-2 border-solid rounded-[8px] size-[48px] overflow-hidden">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="size-full object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-cairo font-bold text-text-black text-[16px] truncate max-w-[180px]">
            {product.name}
          </p>
          <Badge>{product.category}</Badge>
        </div>
      </div>

      <div className="flex items-center flex-1 ml-[110px]">
        <p className="font-open-sans font-bold text-[16px] text-black text-center w-[125px]">
          {product.vendor}
        </p>
        <p className="font-open-sans font-normal text-[16px] text-black text-center w-[200px]">
          {product.sku}
        </p>
        <p className="font-open-sans font-normal text-[16px] text-black text-center w-[125px]">
          {product.rating}/5
        </p>
        <p className="font-roboto-mono font-normal text-[#222] text-[16px] text-center w-[200px]">
          <span>{integerPart}</span>
          <span className="text-muted">,{decimalPart}</span>
        </p>
        
        <div className="flex items-center justify-center gap-[32px] w-[133px] ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="icon">
            <Icon name="plus" size={24} />
          </Button>
          <button className="text-gray-3 hover:text-black transition-colors">
            <Icon name="dots" size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}
