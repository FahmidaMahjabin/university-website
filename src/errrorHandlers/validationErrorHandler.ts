import mongoose from 'mongoose'
import { IgenericError } from '../interfaces/errorInterface'

export const handleValidationError = (
  error: mongoose.Error.ValidationError
) => {
  const errors = Object.values(error.errors)
  const listOfErrors: IgenericError[] = errors.map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error?.path,
        message: error?.message,
      }
    }
  )
  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessage: listOfErrors,
  }
}
