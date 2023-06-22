import { academicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../shared/catchAsync'
import { NextFunction, RequestHandler } from 'express'
import { IAcademicSemester } from './academicSemester.interface'

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = req.body
    console.log('data from academic semester controller:', data)
    const result = await academicSemesterService.createAcademicSemesterToDB(
      data
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      message: 'academic semester is created',
      data: result,
    })
    next()
  }
)

// res.status(200).json({
//   success: true,
//   message: 'academic semester is created',
// })

export const academicSemesterController = {
  createAcademicSemester,
}
