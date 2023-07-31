import { StudentService } from './student.service'
import { catchAsync } from '../../shared/catchAsync'

import { IStudent } from './student.interface'
import { Request, Response, RequestHandler } from 'express'
import { sendResponse } from '../../shared/sendResponse'

import httpStatus from 'http-status'
import { mapReqQuerysProperty } from '../../shared/pick'
import { filterableFields, paginationFields } from './student.constant'

const getAllStudent = catchAsync(async (req: Request, res: Response) => {
  const filters = mapReqQuerysProperty(req.query, filterableFields)
  const queryParameter = mapReqQuerysProperty(req.query, paginationFields)
  console.log('filters:', filters)
  console.log('queryParameter for pagination:', queryParameter)
  const result = await StudentService.getAllStudentFromBD(
    filters,
    queryParameter
  )
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get all Students from db',
    data: result.data,
    meta: result.meta,
  })
})
// function get one Student by the id of the Student
const getOneStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await StudentService.getOneStudentFromBD(id)

  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'found the  Student',
    data: result,
  })
})

// function update a Student
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const updatedData = req.body
  console.log('updateData from cotroller:', updatedData)
  const result = await StudentService.updateStudentToBD(id, updatedData)
  console.log('result from controller:', result)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'update successfully',
    data: result,
  })
})

// delete Student
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = StudentService.deleteStudentFromDB(id)
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'delete successfully',
    data: result,
  })
})
export const StudentController = {
  getAllStudent,
  getOneStudent,
  updateStudent,
  deleteStudent,
}
