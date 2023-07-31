import { Request, Response } from 'express'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'

const createLogIn = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await createLogIntoDB(loginData)
})
export const authController = {
  createLogIn,
}
