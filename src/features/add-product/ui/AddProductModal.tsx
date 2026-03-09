'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Modal } from '@/shared/ui/Modal/Modal'
import { Input, Button } from '@/shared/ui'
import { addProductSchema, type AddProductFormValues } from '../model/types'
import { useAddProduct } from '../api/useAddProduct'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      title: '',
      price: '',
      brand: '',
      sku: '',
    },
  })

  const { mutate: addProduct, isPending } = useAddProduct({
    onSuccess: () => {
      toast.success('Товар успешно добавлен!')
      reset()
      onClose()
    },
    onError: () => {
      toast.error('Ошибка при добавлении товара')
    },
  })

  const onSubmit = (data: AddProductFormValues) => {
    addProduct({
      title: data.title,
      price: parseFloat(data.price),
      brand: data.brand,
      sku: data.sku,
    })
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className="text-heading font-cairo text-2xl font-bold text-center">
        Добавить товар
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-4">
          <Input
            label="Наименование"
            placeholder="Введите наименование"
            error={errors.title}
            {...register('title')}
          />

          <Input
            label="Цена"
            placeholder="Введите цену"
            error={errors.price}
            {...register('price')}
          />

          <Input
            label="Вендор"
            placeholder="Введите вендор"
            error={errors.brand}
            {...register('brand')}
          />

          <Input
            label="Артикул"
            placeholder="Введите артикул"
            error={errors.sku}
            {...register('sku')}
          />
        </div>

        <Button type="submit" disabled={isSubmitting || isPending}>
          {isSubmitting || isPending ? 'Отправка...' : 'Отправить'}
        </Button>
      </form>
    </Modal>
  )
}
