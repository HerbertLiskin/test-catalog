import Image from 'next/image'
import { type ButtonHTMLAttributes } from 'react'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  iconAlt?: string
  size?: number
}

export function IconButton({ icon, iconAlt = '', size = 22, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      className="flex items-center justify-center rounded-lg border border-gray2 bg-white p-2.5 transition-colors hover:bg-gray-50 cursor-pointer"
    >
      <Image src={icon} alt={iconAlt} width={size} height={size} />
    </button>
  )
}
