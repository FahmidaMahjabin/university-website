import { NextFunction, Request, RequestHandler, Response } from 'express'
import { UserServices } from './users.service'
import { logger } from '../../shared/logger'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { IUser } from './users.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

const createStudentToDB: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { student, ...userData } = await req.body
    logger.info(`data from controller ${student}, ${userData}`)
    const result = await UserServices.createStudent(student, userData)
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'student created successfully',
      data: result,
    })
  }
)

const createFacultyToDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { faculty, ...userData } = await req.body
    const result = await UserServices.createFaculty(faculty, userData)
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'faculty created successfully',
      data: result,
    })
  }
)

const createAdminToDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { admin, ...userData } = await req.body
    const result = await UserServices.createAdmin(admin, userData)
    sendResponse<IUser>(res, {
      statusCode: 200,
      success: true,
      message: 'admin created successfully',
      data: result,
    })
  }
)
export const UserController = {
  createStudentToDB,
  createFacultyToDB,
  createAdminToDB,
}
