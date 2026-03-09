import Image from 'next/image'

export interface Product {
  id: string
  name: string
  category: string
  vendor: string
  article: string
  rating: number
  price: number
  selected?: boolean
}

interface ProductRowProps {
  product: Product
  onToggleSelect?: (id: string) => void
}

function formatPrice(price: number): { whole: string; decimal: string } {
  const parts = price.toFixed(2).split('.')
  const whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return { whole, decimal: `,${parts[1]}` }
}

export function ProductRow({ product, onToggleSelect }: ProductRowProps) {
  const { whole, decimal } = formatPrice(product.price)
  const isLowRating = product.rating < 4.0

  return (
    <div className="border-y border-table-border">
      <div className="flex items-center h-[71px] overflow-hidden relative">
        {/* Selected row stripe */}
        {product.selected && (
          <div className="w-[3px] h-[69px] bg-dark-blue shrink-0" />
        )}

        <div className={`flex items-center w-full gap-0 ${product.selected ? 'pl-[15px] pr-[18px]' : 'px-[18px]'}`}>
          {/* Left: Checkbox + Photo + Name */}
          <div className="flex items-center gap-[18px] w-[278px] shrink-0">
            {/* Checkbox */}
            <button
              onClick={() => onToggleSelect?.(product.id)}
              className={`size-[22px] rounded border shrink-0 cursor-pointer transition-colors ${
                product.selected
                  ? 'bg-dark-blue border-gray3'
                  : 'bg-white border-gray3'
              }`}
            />

            {/* Photo placeholder */}
            <div className="size-[48px] rounded-lg bg-[#c4c4c4] border border-gray2 shrink-0" />

            {/* Name + Category */}
            <div className="flex flex-col gap-[10px] w-[210px]">
              <p className="font-cairo font-bold text-base text-text-black truncate">
                {product.name}
              </p>
              <p className="font-cairo text-sm text-gray3">
                {product.category}
              </p>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 flex items-center justify-evenly">
            {/* Vendor */}
            <p className="font-open-sans font-bold text-base text-black text-center w-[125px] shrink-0">
              {product.vendor}
            </p>

            {/* Article */}
            <p className="font-open-sans text-base text-black text-center w-[140px] shrink-0">
              {product.article}
            </p>

            {/* Rating */}
            <p className="font-open-sans text-base text-black text-center w-[100px] shrink-0">
              <span className={isLowRating ? 'text-danger' : ''}>{product.rating}</span>
              /5
            </p>

            {/* Price */}
            <p className="font-roboto-mono text-base text-text-black text-center w-[140px] shrink-0">
              <span>{whole}</span>
              <span className="text-text-gray">{decimal}</span>
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 justify-center shrink-0">
              {/* Add button */}
              <button className="flex items-center justify-center w-[52px] h-[27px] bg-primary rounded-full p-1 cursor-pointer hover:opacity-90 transition-opacity">
                <Image src="/icons/plus.svg" alt="Добавить" width={14} height={14} />
              </button>

              {/* More button */}
              <button className="cursor-pointer hover:opacity-70 transition-opacity">
                <Image src="/icons/dots-circle.svg" alt="Ещё" width={32} height={32} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
