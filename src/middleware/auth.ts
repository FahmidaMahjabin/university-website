import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errrorHandlers/ApiErrorHandler'
import httpStatus from 'http-status'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../config'
export const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'unauthorized token')
      }

      // verify token
      const verifiedToken = jwt.verify(
        token,
        config.jwt.jwt_secret as Secret
      ) as JwtPayload
      console.log('verified token:', verifiedToken)
      if (!verifiedToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, ' unauthorized user')
      }
      // verify role if he is able to go to the route
      // if verified token's role is in the input role then he can get the access
      req.user = verifiedToken
      // authorized
      if (roles.length && !roles.includes(verifiedToken?.role)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'user is forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
