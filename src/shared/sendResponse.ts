import { Response } from 'express'
export type IApiResponse<T> = {
  statusCode: number
  message?: string
  success: boolean
  data?: T
}

export const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
  }
  return res.status(data.statusCode).json(responseData)
}
