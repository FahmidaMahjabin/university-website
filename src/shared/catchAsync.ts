import { NextFunction, Request, RequestHandler, Response } from 'express'

export const catchAsync =
  (controllerFunction: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controllerFunction(req, res, next)
    } catch (error) {
      next(error)
    }
  }
