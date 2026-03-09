// src/shared/ui/SortableHeader/SortableHeader.tsx
export type SortableFieldProps = {
  field: string
  label: string
  width: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  onSort: (field: string) => void
}

export const SortableHeader = ({
  field,
  label,
  width,
  sortBy,
  sortOrder,
  onSort,
}: SortableFieldProps) => {
  const isActive = sortBy === field
  return (
    <div
      className={`flex shrink-0 cursor-pointer items-center justify-center gap-1 ${width} transition-colors ${isActive ? 'text-black' : 'hover:text-black/70'}`}
      onClick={() => onSort(field)}
    >
      <div className="relative">
        <div>{label}</div>
        <div className="absolute top-1/2 right-[-16px] flex -translate-y-1/2 flex-col items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-colors ${isActive && sortOrder === 'asc' ? 'text-primary' : 'text-gray2'}`}
          >
            <path
              d="M7 15L12 10L17 15"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`-mt-1 transition-colors ${isActive && sortOrder === 'desc' ? 'text-primary' : 'text-gray2'}`}
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
