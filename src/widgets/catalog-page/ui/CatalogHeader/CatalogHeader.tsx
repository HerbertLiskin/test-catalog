import { SearchProducts } from '@/features/search-products'
import { UserProfile } from '@/features/user-profile'

export function CatalogHeader() {
  return (
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
  )
}
