import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import { errorLogger } from '../../shared/logger'
import { titleAndCodeMapper } from './academicSemester.constants'
import { IAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemster.model'
const createAcademicSemesterToDB = async (
  semesterData: IAcademicSemester
): Promise<IAcademicSemester | null> => {
  // check if code for a certail title is same
  if (titleAndCodeMapper[semesterData.title] != semesterData.code) {
    throw new ApiError(406, 'not acceptable code for this title')
  }
  const createdSemester = await AcademicSemester.create(semesterData)
  if (createdSemester) {
    return createdSemester
  }
  errorLogger.error('failed to create new academic semester')
  throw new Error('failed to create academic semester')
}

export const academicSemesterService = {
  createAcademicSemesterToDB,
}
