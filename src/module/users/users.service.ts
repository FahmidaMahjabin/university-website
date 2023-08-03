import { IUser } from './users.interface'
import { User } from './users.model'
import { createAdminId, createFacultyId, createStudentId } from './users.utils'
import config from '../../config/index'
import { logger } from '../../shared/logger'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemster.model'
import mongoose from 'mongoose'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import httpStatus from 'http-status'
import { Student } from '../student/student.model'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'
import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import bcrypt from 'bcrypt'
const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // create password
  if (!user.password) {
    user.password = config.student_default_password as string
  }
  // hash the password

  console.log('student password:', user.password)

  // role
  user.role = 'student'
  //  get the academic semester for the student from database by searching by reference id in academicSemester
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  ).lean()
  const session = await mongoose.startSession()
  let newUserAllData = null
  try {
    session.startTransaction()
    const id = await createStudentId(academicSemester as IAcademicSemester)
    user.id = id as string
    student.id = id as string
    const createdStudent = await Student.create([student], { session })
    if (!createdStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FAiled to create Student')
    }

    // set user.Student --> it's an objectId that should be createdStudent's _id
    user.student = createdStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FAiled to create user')
    }
    // user --> student ---> academicSemister, academicFaculty, academicDepartment
    newUserAllData = newUser[0]
    console.log('newUseeAllData:', newUserAllData)
    if (newUserAllData) {
      newUserAllData.populate({
        path: 'student',
        populate: [
          {
            path: 'academicSemester',
          },
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      })
    }
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.log('error:', error)
  }

  return newUserAllData
}

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // create password
  if (!user.password) {
    user.password = config.faculty_default_password as string
  }
  // role
  user.role = 'faculty'

  const session = await mongoose.startSession()
  let newUserAllData = null
  try {
    session.startTransaction()
    const id = await createFacultyId()
    user.id = id as string
    faculty.id = id as string
    const createdFaculty = await Faculty.create([faculty], { session })
    if (!createdFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FAiled to create faculty')
    }

    // set user.Student --> it's an objectId that should be createdStudent's _id
    user.faculty = createdFaculty[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FAiled to create user')
    }
    // user --> faculty ---> academicSemister, academicFaculty, academicDepartment
    newUserAllData = newUser[0]
    console.log('newUseeAllData:', newUserAllData)
    if (newUserAllData) {
      newUserAllData.populate({
        path: 'faculty',
        populate: [
          {
            path: 'academicDepartment',
          },
          {
            path: 'academicFaculty',
          },
        ],
      })
    }
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.log('error:', error)
  }

  return newUserAllData
}
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // create password
  if (!user.password) {
    user.password = config.admin_default_password as string
  }
  // role
  user.role = 'admin'

  const session = await mongoose.startSession()
  let newUserAllData = null
  try {
    session.startTransaction()
    const id = await createAdminId()
    user.id = id as string
    admin.id = id as string
    const createdAdmin = await Admin.create([admin], { session })
    if (!createdAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FAiled to create admin')
    }

    // set user.Student --> it's an objectId that should be createdStudent's _id
    user.admin = createdAdmin[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'FAiled to create user')
    }
    // user --> admin ---> managementDepartment
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.log('error:', error)
  }
  if (newUserAllData) {
    newUserAllData.populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    })
  }

  return newUserAllData
}
const getAllUsersfromDB = async () => {
  const result = await User.find({}).lean()
  // console.log('all users:', result)
  return result
}
export const UserServices = {
  createStudent,
  createFaculty,
  createAdmin,
  getAllUsersfromDB,
}
