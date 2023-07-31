import { Model, Types } from 'mongoose'

export type Gender = 'male' | 'female'

type Name = {
  firstName: string
  middleName?: string
  lastName: string
}
export type IAdmin = {
  id: string
  name: Name

  gender: Gender
  dateOfBirth: string

  contactNo: string
  emergencyContactNo: string
  email: string

  designation: string
  managementDepartment: Types.ObjectId
}
export type IAdminModel = Model<IAdmin>
export type IAdminFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
}
