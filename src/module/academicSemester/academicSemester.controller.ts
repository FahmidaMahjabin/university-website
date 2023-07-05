import { academicSemesterService } from './academicSemester.service'
import { catchAsync } from '../../shared/catchAsync'

import { IAcademicSemester } from './academicSemester.interface'
import { Request, Response, RequestHandler } from 'express'
import { sendResponse } from '../../shared/sendResponse'

import httpStatus from 'http-status'
import { mapReqQuerysProperty } from '../../shared/pick'
import {
  filterableFields,
  paginationFields,
} from './academicSemester.constants'

const createAcademicSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    console.log('data from academic semester controller:', data)
    const result = await academicSemesterService.createAcademicSemesterToDB(
      data
    )
    sendResponse<IAcademicSemester>(res, {
      statusCode: 200,
      success: true,
      message: 'academic semester is created',
      data: result,
    })
  }
)

// getAllSemester data
// step1: get req query parameter to search data
// step2: send the pagination option to the service function

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = mapReqQuerysProperty(req.query, filterableFields)
  const queryParameter = mapReqQuerysProperty(req.query, paginationFields)
  console.log('filters:', filters)
  console.log('queryParameter for pagination:', queryParameter)
  const result = await academicSemesterService.getAllSemesterFromBD(
    filters,
    queryParameter
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all semesters from db',
    data: result.data,
    meta: result.meta,
  })
})
// function get one semester by the id of the semester
const getOneSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await academicSemesterService.getOneSemesterFromBD(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'found the academic semester',
    data: result,
  })
})

// function update a semester
const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  console.log('updateData from cotroller:', updatedData)
  const result = await academicSemesterService.updateSemesterToBD(
    id,
    updatedData
  )
  sendResponse<IAcademicSemester>(res, {
    statusCode: 200,
    success: true,
    message: 'update successfully',
    data: result,
  })
})

// delete semester
const deleteSemester = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = academicSemesterService.deleteSemesterFromDB(id)
  sendResponse<IAcademicSemester | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete successfully',
    data: result,
  })
})
export const academicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getOneSemester,
  updateSemester,
  deleteSemester,
}
