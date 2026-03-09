import Image from 'next/image'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Найти' }: SearchInputProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-search-bg px-5 py-3 w-full max-w-[1023px]">
      <Image src="/icons/search.svg" alt="" width={24} height={24} className="shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent font-sans text-sm leading-6 text-heading outline-none placeholder:text-text-gray"
      />
    </div>
  )
}
