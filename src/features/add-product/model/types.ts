import { z } from 'zod'

export const addProductSchema = z.object({
  title: z.string().min(1, 'Наименование обязательно'),
  price: z
    .string()
    .min(1, 'Цена обязательна')
    .refine((val) => /^\d+(\.\d+)?$/.test(val), 'Цена должна быть числом'),
  brand: z.string().min(1, 'Вендор обязателен'),
  sku: z.string().min(1, 'Артикул обязателен'),
})

export type AddProductFormValues = z.infer<typeof addProductSchema>
