import { IgenericError } from './errorInterface'

export type IGenericResponse = {
  statusCode: number | string
  message: string
  errorMessages: IgenericError[]
}
