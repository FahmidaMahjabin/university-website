import { Model, Types } from 'mongoose'

import { IacademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type Gender = 'male' | 'female'
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
export type Designation =
  | 'Lecturer'
  | 'Assistant Professor'
  | 'Associate Professor'
  | 'Professor'
type Name = {
  firstName: string
  middleName?: string
  lastName: string
}
export type IFaculty = {
  id: string
  name: Name

  gender: Gender
  dateOfBirth: string

  contactNo: string
  emergencyContactNo: string
  email: string
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  bloodGroup?: BloodGroup
  designation: Designation
  academicDepartment: Types.ObjectId | IacademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
}
export type IFacultyModel = Model<IFaculty>
export type IFacultyFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  bloodGroup?: BloodGroup
}
