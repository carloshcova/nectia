import { z } from 'zod'

export const authSchema = z.object({
  user: z.string({ required_error: 'Usuario es requerido' }),
  password: z.string({ required_error: 'Password es requerida' }).min(6, 'Password debe tener al menos 6 carácteres'),
})