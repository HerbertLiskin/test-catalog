import Image from 'next/image'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const start = (currentPage - 1) * itemsPerPage + 1
  const end = Math.min(currentPage * itemsPerPage, totalItems)

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between py-[11px] w-full">
      {/* Counter */}
      <p className="font-sans text-lg whitespace-nowrap">
        <span className="text-pagination-muted">Показано </span>
        <span className="text-black">{start}-</span>
        <span className="text-black">{end}</span>
        <span className="text-black"> </span>
        <span className="text-pagination-muted">из</span>
        <span className="text-black"> {totalItems} </span>
      </p>

      {/* Pagination controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="cursor-pointer disabled:opacity-40"
        >
          <Image src="/icons/caret-left.svg" alt="Назад" width={20} height={20} />
        </button>

        <div className="flex items-center gap-2">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex size-[30px] cursor-pointer items-center justify-center rounded font-cairo text-sm transition-colors ${
                page === currentPage
                  ? 'bg-pagination-active text-white shadow-[0px_20px_50px_0px_rgba(0,0,0,0.12)]'
                  : 'border border-gray2 text-gray3 shadow-[0px_20px_50px_0px_rgba(0,0,0,0.12)] hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="cursor-pointer disabled:opacity-40"
        >
          <Image src="/icons/caret-right.svg" alt="Вперёд" width={20} height={20} />
        </button>
      </div>
    </div>
  )
}
