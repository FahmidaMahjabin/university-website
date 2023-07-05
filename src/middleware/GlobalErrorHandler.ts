import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../config'
import { IgenericError } from '../interfaces/errorInterface'
import { handleValidationError } from '../errrorHandlers/validationErrorHandler'
import { ApiError } from '../errrorHandlers/ApiErrorHandler'
import { Error } from 'mongoose'
import { errorLogger } from '../shared/logger'
import { ZodError } from 'zod'
import zodErrorHandler from '../errrorHandlers/zodErrorHandler'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.env === 'development') {
    console.log('global error handler:', err)
  } else {
    errorLogger.error('global error handler:', err)
  }
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IgenericError[] = []
  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err)
    console.log('simplified error from global error handler:', simplifiedError)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env == 'development' ? err?.stack : undefined,
  })
}
