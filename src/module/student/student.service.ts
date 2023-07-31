import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import {
  IResponseForPagination,
  Ipagination,
} from '../../interfaces/pagination'
import { errorLogger } from '../../shared/logger'
import { searchableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { Student } from './student.model'
import { SortOrder } from 'mongoose'

const getAllStudentFromBD = async (
  filters: IStudentFilters,
  queryObject: Ipagination
): Promise<IResponseForPagination<IStudent[]>> => {
  const { searchTerm, ...filterableFields } = filters
  console.log('filterableFields:', filterableFields)
  const andConditions = []

  // add searchTerm to the andCondition
  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  // add filterable conditions to the and condition
  // if (Object.keys(filterableFields).length) {
  //   andConditions.push({
  //     $and: Object.keys(filterableFields).map(eachField => ({
  //       [eachField]: {
  //         $regex: filterableFields[eachField],
  //         $options: 'i',
  //       },
  //     })),
  //   })
  // }
  // alternative option for filterable data
  if (Object.keys(filterableFields).length) {
    andConditions.push({
      $or: Object.entries(filterableFields).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  console.log('andConditions:', andConditions)
  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },

  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },

  //       {
  //         year: {
  //           $in: searchTerm,
  //         },
  //       },
  //     ],
  //   },
  // ]
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = queryObject
  const skip = (page - 1) * limit
  const sortOption: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortOption[sortBy] = sortOrder
  }
  // search condition
  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Student.find(whereCondition)
    .populate('academicSemester')
    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
  const total = await Student.countDocuments(whereCondition)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// get one Student from BD
const getOneStudentFromBD = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
  return result
}

const deleteStudentFromDB = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
  return result
}
// update one Student
const updateStudentToBD = async (
  id: string,
  updateData: Partial<IStudent>
): Promise<IStudent | null> => {
  console.log('updatedData:', updateData)
  console.log('id from service:', id)
  const { ...studentData } = updateData
  const isExist = await Student.findOne({ id: id })
  console.log('isExist:', isExist)
  const updatedStudentData: Partial<IStudent> = { ...studentData }
  const result = await Student.findOneAndUpdate(
    { id: id },
    updatedStudentData,
    {
      new: true,
    }
  )
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}
export const StudentService = {
  getAllStudentFromBD,
  getOneStudentFromBD,
  updateStudentToBD,
  deleteStudentFromDB,
}
