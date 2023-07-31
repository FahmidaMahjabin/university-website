import httpStatus from 'http-status'
import { catchAsync } from '../../shared/catchAsync'
import { sendResponse } from '../../shared/sendResponse'
import { IAcademicFaculty } from './academicFaculty.interface'
import { Request, Response } from 'express'
import { academicFacultyService } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { title } = req.body
    const result = await academicFacultyService.createAcademicFacultyToBD(title)
    sendResponse<IAcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      message: 'successfully create academic faculty',
      success: true,
      data: result,
    })
  }
)

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await academicFacultyService.getAllFacultyFromDb()
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    message: 'successfully retrived academic faculty',
    success: true,
    data: result,
  })
})

export const academicFacultyController = {
  createAcademicFaculty,
  getAllFaculty,
}
