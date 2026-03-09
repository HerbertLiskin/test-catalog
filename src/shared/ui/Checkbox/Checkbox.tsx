'use client'

'use client'

import { Icon } from '../Icon/Icon'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
  checkType?: 'Checked' | 'UnChecked' | 'UnCheckedDark' | 'Checked Dark'
}

export function Checkbox({ checked, onChange, disabled, className = '', checkType = 'UnChecked' }: CheckboxProps) {
  const isChecked = checkType.startsWith('Checked') || checked

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!isChecked)}
      className={`rounded-[4px] size-[22px] flex items-center justify-center transition-all ${
        isChecked 
          ? 'bg-primary border-none p-[10px]' 
          : 'bg-white border border-gray-3 border-solid'
      } ${className}`}
    >
      {isChecked && (
        <Icon name="plus" size={10.8} color="white" className="rotate-45" />
      )}
    </button>
  )
}
