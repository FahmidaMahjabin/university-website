import { User } from './users.model'
import { logger } from '../../shared/logger'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'

// studentID = 230100001 (23 is the last two digits of academic year, 01 is semister code, then 5 digit number )
export const createStudentId = async (academicSemester: IAcademicSemester) => {
  let previousId = await getPreviousID('student')
  console.log('previousId:', previousId)
  let currentId
  if (previousId) {
    currentId = parseInt(previousId) + 1
  } else {
    previousId = (0).toString().padStart(5, '0')
    currentId =
      academicSemester?.year.substring(2) + academicSemester?.code + previousId
  }

  logger.info(`user current id is: ${currentId}`)
  return currentId
}
const getPreviousID = async (role: string) => {
  const createStudentID = await User.findOne({ role: role }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()
  return createStudentID?.id
}

// create facultyId
const createSixeDigitId = async (initial: string, role: string) => {
  const previousStudentId =
    (await getPreviousID(role)) || (0).toString().padStart(5, '0')
  console.log('previousId:', previousStudentId)
  const currentSerial = parseInt(previousStudentId.substring(1)) + 1
  const currentId = initial + currentSerial.toString().padStart(5, '0')
  return currentId
}
export const createFacultyId = async () => {
  const facultyId = await createSixeDigitId('F', 'faculty')
  return facultyId
}
export const createAdminId = async () => {
  const adminId = await createSixeDigitId('A', 'admin')
  return adminId
}
