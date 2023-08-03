import { FacultyService } from './faculty.service'
import { catchAsync } from '../../shared/catchAsync'

import { Request, Response, RequestHandler } from 'express'
import { sendResponse } from '../../shared/sendResponse'

import httpStatus from 'http-status'
import { mapReqQuerysProperty } from '../../shared/pick'
import { filterableFields, paginationFields } from './faculty.constant'
import { IFaculty } from './faculty.interface'

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  console.log('token from controller:', req.headers.authorization)
  const filters = mapReqQuerysProperty(req.query, filterableFields)
  const queryParameter = mapReqQuerysProperty(req.query, paginationFields)
  console.log('filters:', filters)
  console.log('queryParameter for pagination:', queryParameter)
  const result = await FacultyService.getAllFacultyFromBD(
    filters,
    queryParameter
  )
  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all Facultys from db',
    data: result.data,
    meta: result.meta,
  })
})
// function get one Facultyby the id of the Faculty
const getOneFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await FacultyService.getOneFacultyFromBD(id)

  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'found the  Faculty',
    data: result,
  })
})

// function update a Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  console.log('updateData from cotroller:', updatedData)
  const result = await FacultyService.updateFacultyToBD(id, updatedData)
  console.log('result from controller:', result)
  sendResponse<IFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'update successfully',
    data: result,
  })
})

// delete Faculty
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = FacultyService.deleteFacultyFromDB(id)
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete successfully',
    // data: result,
  })
})
export const FacultyController = {
  getAllFaculty,
  getOneFaculty,
  updateFaculty,
  deleteFaculty,
}
