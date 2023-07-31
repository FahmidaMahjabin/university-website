import httpStatus from 'http-status'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import {
  IResponseForPagination,
  Ipagination,
} from '../../interfaces/pagination'
import { errorLogger } from '../../shared/logger'
import { User } from '../users/users.model'
import { searchableFields } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import mongoose, { SortOrder } from 'mongoose'

const getAllFacultyFromBD = async (
  filters: IFacultyFilters,
  queryObject: Ipagination
): Promise<IResponseForPagination<IFaculty[]>> => {
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
  const result = await Faculty.find(whereCondition)

    .populate('academicFaculty')
    .populate('academicDepartment')
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
  const total = await Faculty.countDocuments(whereCondition)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

// get one Faculty from BD
const getOneFacultyFromBD = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
  return result
}

const deleteFacultyFromDB = async (id: string): Promise<IFaculty | null> => {
  const isExist = await Faculty.findById(id)
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not exixt')
  }
  const session = await mongoose.startSession()
  try {
    ;(await session).startTransaction()
    const facultyDelete = await Faculty.findOneAndDelete(
      { id: id },
      { session }
    )
    const userDelete = await User.deleteOne({ id: id })
    session.commitTransaction()
    session.endSession()
    return facultyDelete
  } catch (error) {
    ;(await session).abortTransaction()
    ;(await session).endSession()
    throw error
  }
}
// update one Faculty
const updateFacultyToBD = async (
  id: string,
  updateData: Partial<IFaculty>
): Promise<IFaculty | null> => {
  console.log('updatedData:', updateData)
  console.log('id from service:', id)
  const { ...FacultyData } = updateData
  const isExist = await Faculty.findOne({ id: id })
  console.log('isExist:', isExist)
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData }
  const result = await Faculty.findOneAndUpdate(
    { id: id },
    updatedFacultyData,
    {
      new: true,
    }
  )
    .populate('academicSemester')
    .populate('academicDepartment')
    .populate('academicFaculty')
  return result
}
export const FacultyService = {
  getAllFacultyFromBD,
  getOneFacultyFromBD,
  updateFacultyToBD,
  deleteFacultyFromDB,
}
