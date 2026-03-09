import { Header } from '@/widgets/header/ui/Header'
import { CatalogTable } from '@/widgets/catalog-table/ui/CatalogTable'

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-page p-[30px] flex flex-col gap-[30px]">
      <Header />
      <main className="flex-1 overflow-hidden">
        <CatalogTable />
      </main>
    </div>
  )
}
