import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserServices } from './users.service'
import { logger } from '../../shared/logger'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { IUser } from './users.interface'

const createUserToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await req.body
    logger.info(`data from controller ${data}`)
    const result = await UserServices.createUser(data)
    // res.status(200).json({
    //   success: true,
    //   message: 'user created successfully',
    // })
    sendResponse<IUser>(res, {
      statusCode: 200,
      message: 'user created successfully',
      data: result,
    })

    next()
  }
)
export const UserController = {
  createUserToDB,
}
