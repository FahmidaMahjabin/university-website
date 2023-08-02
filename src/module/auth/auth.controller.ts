import { Request, Response } from 'express'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { authService } from './auth.service'
import { loginResponse } from './auth.interface'

const createLogIn = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  console.log('login data:', loginData)
  const result = await authService.createLogIntoDB(loginData)
  sendResponse<loginResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully',
    data: result,
  })
})
export const authController = {
  createLogIn,
}
