import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  needPasswordChange: boolean
  student?: Types.ObjectId | IStudent
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
}
export type IUserMethod = {
  isUserExist(id: string): Promise<Partial<IUser>>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}
export type userModel = Model<IUser, Record<string, never>, IUserMethod>
