import { Types } from 'mongoose'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type IacademicDepartment = {
  title: string
  faculty: Types.ObjectId | IAcademicFaculty
}
export type IAcademicDepartmentFilters = {
  searchTerm?: string
}
