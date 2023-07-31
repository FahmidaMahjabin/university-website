import { InferSchemaType, Model, Types } from 'mongoose'
import { gender } from './student.constant'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { IacademicDepartment } from '../academicDepartment/academicDepartment.interface'
import { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface'

export type Gender = 'male' | 'female'
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}
type LocalGuardian = {
  name: string
  address: string
  contactNo: string
}
type Name = {
  firstName: string
  middleName?: string
  lastName: string
}
export type IStudent = {
  id: string
  name: Name

  gender: Gender
  dateOfBirth: string
  guardian: Guardian
  localGuardian: LocalGuardian
  contactNo: string
  emergencyContactNo: string
  email: string
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  bloodGroup?: BloodGroup
  academicSemester: Types.ObjectId | IAcademicSemester
  academicDepartment: Types.ObjectId | IacademicDepartment
  academicFaculty: Types.ObjectId | IAcademicFaculty
}
export type IStudentModel = Model<IStudent>
export type IStudentFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  bloodGroup?: BloodGroup
}
