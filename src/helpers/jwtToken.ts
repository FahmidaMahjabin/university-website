import jwt, { Secret } from 'jsonwebtoken'

export const jwtTokenCreate = (
  payload: object,
  secret: Secret,
  expireTime: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}
