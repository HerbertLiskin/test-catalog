import Image from 'next/image'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

function getVisiblePages(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current > 3) {
    pages.push('...')
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push('...')
  }

  pages.push(total)

  return pages
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

  const visiblePages = getVisiblePages(currentPage, totalPages)

  return (
    <div className="flex w-full items-center justify-between py-[30px]">
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
      <div className="flex items-center gap-2">
        {/* First page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="cursor-pointer disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 15L6 10L11 5" stroke="#B2B3B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 15L10 10L15 5" stroke="#B2B3B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Previous page */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="cursor-pointer disabled:opacity-40"
        >
          <Image
            src="/icons/caret-left.svg"
            alt="Назад"
            width={20}
            height={20}
          />
        </button>

        <div className="flex items-center gap-2">
          {visiblePages.map((page, idx) =>
            page === '...' ? (
              <span
                key={`ellipsis-${idx}`}
                className="font-cairo text-gray3 flex size-[30px] items-center justify-center text-sm"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`font-cairo flex size-[30px] cursor-pointer items-center justify-center rounded text-sm transition-colors ${
                  page === currentPage
                    ? 'bg-pagination-active text-white shadow-[0px_20px_50px_0px_rgba(0,0,0,0.12)]'
                    : 'border-gray2 text-gray3 border shadow-[0px_20px_50px_0px_rgba(0,0,0,0.12)] hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next page */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="cursor-pointer disabled:opacity-40"
        >
          <Image
            src="/icons/caret-right.svg"
            alt="Вперёд"
            width={20}
            height={20}
          />
        </button>

        {/* Last page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="cursor-pointer disabled:opacity-40"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5L10 10L5 15" stroke="#B2B3B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 5L14 10L9 15" stroke="#B2B3B9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
