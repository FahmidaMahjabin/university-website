import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IgenericError } from '../interfaces/errorInterface'
import { handleValidationError } from '../errrorHandlers/validationErrorHandler'
import { ApiError } from '../errrorHandlers/ApiErrorHandler'
import { Error } from 'mongoose'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
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
  next()
}
