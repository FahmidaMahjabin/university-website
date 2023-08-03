import { z } from 'zod'
import { bloodGroup, designation, gender } from '../faculty/faculty.constant'
const authZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token is required',
    }),
  }),
})
export const authValidation = {
  authZodSchema,
  refreshTokenZodSchema,
}
