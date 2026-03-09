import { useState } from 'react'

export function useProductSelection(targetIds: number[]) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())

  const isAllSelected =
    targetIds.length > 0 && targetIds.every((id) => selectedIds.has(id))

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleToggleSelectAll = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (isAllSelected) {
        targetIds.forEach((id) => next.delete(id))
      } else {
        targetIds.forEach((id) => next.add(id))
      }
      return next
    })
  }

  return {
    selectedIds,
    isAllSelected,
    handleToggleSelect,
    handleToggleSelectAll,
  }
}
