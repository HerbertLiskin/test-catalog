'use client'

import { Button, Icon } from '@/shared/ui'

interface AddProductButtonProps {
  onClick?: () => void
}

export function AddProductButton({ onClick }: AddProductButtonProps) {
  return (
    <Button variant="primary" onClick={onClick}>
      <Icon name="plus-circle" size={22} />
      <span>Добавить</span>
    </Button>
  )
}
