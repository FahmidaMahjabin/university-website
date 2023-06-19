import { ZodError } from 'zod'
import { IgenericError } from '../interfaces/errorInterface'
import { IGenericResponse } from '../interfaces/common'

const zodErrorHandler = (error: ZodError): IGenericResponse => {
  const statusCode = 400
  const message = 'zod validation error'
  const errorMessages: IgenericError[] = error.errors.map(err => {
    return {
      path: err?.path[err.path.length - 1],
      message: err?.message,
    }
  })
  return {
    statusCode,
    errorMessages,
    message,
  }
}
export default zodErrorHandler
