import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import {
  IResponseForPagination,
  Ipagination,
} from '../../interfaces/pagination'
import { errorLogger } from '../../shared/logger'
import {
  searchableFields,
  titleAndCodeMapper,
} from './academicSemester.constants'
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemster.model'
import { SortOrder } from 'mongoose'
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

const getAllSemesterFromBD = async (
  filters: IAcademicSemesterFilters,
  queryObject: Ipagination
): Promise<IResponseForPagination<IAcademicSemester[]>> => {
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
  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
export const academicSemesterService = {
  createAcademicSemesterToDB,
  getAllSemesterFromBD,
}
