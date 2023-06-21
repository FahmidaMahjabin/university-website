import { NextFunction, Request, Response } from 'express'
import { academicSemesterService } from './academicSemester.service'
const createAcademicSemester = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    await academicSemesterService.createAcademicSemesterToDB(data)
    res.status(200).json({
      success: true,
      message: 'academic semester is created',
    })
  } catch (error) {
    next(error)
  }
}

export const academicSemesterController = {
  createAcademicSemester,
}
