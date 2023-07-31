import httpStatus from 'http-status'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import { IAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyToBD = async (
  title: string
): Promise<IAcademicFaculty> => {
  const sameFaculty = await AcademicFaculty.findOne({ title: title })
  if (sameFaculty) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'already exists')
  }
  const result = await AcademicFaculty.create({ title: title })
  return result
}
const getAllFacultyFromDb = async (): Promise<IAcademicFaculty[]> => {
  const result = await AcademicFaculty.find({})
  return result
}
export const academicFacultyService = {
  createAcademicFacultyToBD,
  getAllFacultyFromDb,
}
