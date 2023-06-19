import { IgenericError } from './errorInterface'

export type IGenericResponse = {
  statusCode: number
  message: string
  errorMessages: IgenericError[]
}
