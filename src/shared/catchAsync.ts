import { NextFunction, Request, RequestHandler, Response } from 'express'
import { globalErrorHandler } from '../middleware/GlobalErrorHandler'
import { ApiError } from '../errrorHandlers/ApiErrorHandler'
import httpStatus from 'http-status'

export const catchAsync =
  (controllerFunction: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controllerFunction(req, res, next)
    } catch (error) {
      next(error)
    }
  }
