import { z } from 'zod'

export const carSchema = z.object({
  brand: z.string({ required_error: 'Marca es requerida' }),
  model: z.string({ required_error: 'Modelo es requerido' }),
  year: z.string().datetime().optional()
})