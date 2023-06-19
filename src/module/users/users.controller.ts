import { NextFunction, Request, Response } from 'express'
import { UserServices } from './users.service'
import { logger } from '../../shared/logger'

const createUserToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await req.body
    logger.info(`data from controller ${data}`)
    await UserServices.createUser(data)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
    })
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: 'failed to create user',
    // })
    next(error)
  }
}
export const UserController = {
  createUserToDB,
}
