import { catchAsync } from '../../shared/catchAsync'

import { Request, Response, RequestHandler } from 'express'
import { sendResponse } from '../../shared/sendResponse'

import httpStatus from 'http-status'
import { mapReqQuerysProperty } from '../../shared/pick'

import { IacademicDepartment } from './academicDepartment.interface'
import {
  filterableFieldsforDepartment,
  paginationFieldsforDepartment,
} from './aademicDepartment.constant'
import { academicDepartementService } from './academicDepartment.service'

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const data = req.body
    console.log('data from academic department controller:', data)
    const result =
      await academicDepartementService.createAcademicDepartmentToDB(data)
    sendResponse<IacademicDepartment>(res, {
      statusCode: 200,
      success: true,
      message: 'academic department is created',
      data: result,
    })
  }
)

// getAllDepartments data
// step1: get req query parameter to search data
// step2: send the pagination option to the service function

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = mapReqQuerysProperty(req.query, filterableFieldsforDepartment)
  const queryParameter = mapReqQuerysProperty(
    req.query,
    paginationFieldsforDepartment
  )
  console.log('filters:', filters)
  console.log('queryParameter for pagination:', queryParameter)
  const result = await academicDepartementService.getAllDepartmentsFromBD(
    filters,
    queryParameter
  )
  sendResponse<IacademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all departments from db',
    data: result.data,
    meta: result.meta,
  })
})

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllDepartments,
}
