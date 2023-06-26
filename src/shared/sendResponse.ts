import { Response } from 'express'
export type IApiResponse<T> = {
  statusCode: number
  message?: string
  success: boolean
  data?: T | null
  meta?: {
    page?: number
    limit?: number
    total?: number
  }
}

export const sendResponse = <T>(res: Response, data: IApiResponse<T>) => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta || {},
  }
  return res.status(data.statusCode).json(responseData)
}
