import jwt, { Secret } from 'jsonwebtoken'
import { loginResponse } from '../module/auth/auth.interface'

export const jwtTokenCreate = (
  payload: object,
  secret: Secret,
  expireTime: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}
