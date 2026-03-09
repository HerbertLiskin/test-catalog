import Image from 'next/image'
import type { Product } from '../model/types'

interface ProductRowProps {
  product: Product
  selected?: boolean
  onToggleSelect?: (id: number) => void
}

function formatPrice(price: number): { whole: string; decimal: string } {
  const parts = price.toFixed(2).split('.')
  const whole = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return { whole, decimal: `,${parts[1]}` }
}

export function ProductRow({
  product,
  selected,
  onToggleSelect,
}: ProductRowProps) {
  const { whole, decimal } = formatPrice(product.price)
  const isLowRating = product.rating < 3.0

  return (
    <div className="border-table-border border-y">
      <div className="relative flex h-[71px] items-center overflow-hidden">
        {/* Selected row stripe */}
        {selected && <div className="bg-dark-blue h-[69px] w-[3px] shrink-0" />}

        <div
          className={`flex w-full items-center gap-0 ${selected ? 'pr-[18px] pl-[15px]' : 'px-[18px]'}`}
        >
          {/* Left: Checkbox + Photo + Name */}
          <div className="flex w-[278px] shrink-0 items-center gap-[18px]">
            {/* Checkbox */}
            <button
              onClick={() => onToggleSelect?.(product.id)}
              className={`size-[22px] shrink-0 cursor-pointer rounded border transition-colors ${
                selected ? 'border-gray3 bg-dark-blue' : 'border-gray3 bg-white'
              }`}
            />

            {/* Photo */}
            <div className="border-gray2 relative size-[48px] shrink-0 overflow-hidden rounded-lg border bg-[#f5f5f5]">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              ) : (
                <div className="size-full bg-[#c4c4c4]" />
              )}
            </div>

            {/* Name + Category */}
            <div className="flex w-[210px] flex-col gap-[10px]">
              <p className="font-cairo text-text-black truncate text-base font-bold">
                {product.title}
              </p>
              <p className="font-cairo text-gray3 text-sm">
                {product.category}
              </p>
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-1 items-center justify-evenly">
            {/* Vendor (brand) */}
            <p className="font-open-sans w-[125px] shrink-0 text-center text-base font-bold text-black">
              {product.brand || '—'}
            </p>

            {/* Article (sku) */}
            <p className="font-open-sans w-[140px] shrink-0 text-center text-base text-black">
              {product.sku}
            </p>

            {/* Rating */}
            <p className="font-open-sans w-[100px] shrink-0 text-center text-base text-black">
              <span className={isLowRating ? 'text-danger' : ''}>
                {product.rating}
              </span>
              /5
            </p>

            {/* Price */}
            <p className="font-roboto-mono text-text-black w-[140px] shrink-0 text-center text-base">
              <span>{whole}</span>
              <span className="text-text-gray">{decimal}</span>
            </p>

            {/* Actions */}
            <div className="flex shrink-0 items-center justify-center gap-4">
              {/* Add button */}
              <button className="bg-primary flex h-[27px] w-[52px] cursor-pointer items-center justify-center rounded-full p-1 transition-opacity hover:opacity-90">
                <Image
                  src="/icons/plus.svg"
                  alt="Добавить"
                  width={14}
                  height={14}
                />
              </button>

              {/* More button */}
              <button className="cursor-pointer transition-opacity hover:opacity-70">
                <Image
                  src="/icons/dots-circle.svg"
                  alt="Ещё"
                  width={32}
                  height={32}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
