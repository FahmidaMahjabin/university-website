import { Request, Response } from 'express'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { authService } from './auth.service'
import { IRefreshToken, loginResponse } from './auth.interface'
import config from '../../config'

const createLogIn = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  console.log('login data:', loginData)
  const result = await authService.createLogIntoDB(loginData)
  const { refreshToken, ...otherData } = result
  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOption)
  sendResponse<loginResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully',
    data: otherData,
  })
})
const createRefreshToken = catchAsync(async (req: Request, res: Response) => {
  console.log('in controller')
  const { refreshToken } = req.cookies
  console.log('refresh token:', refreshToken)
  const result = await authService.createRefreshToken(refreshToken)

  const cookieOption = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOption)
  sendResponse<IRefreshToken>(res, {
    statusCode: 200,
    success: true,
    message: 'login successfully',
    data: result,
  })
})
export const authController = {
  createLogIn,
  createRefreshToken,
}
