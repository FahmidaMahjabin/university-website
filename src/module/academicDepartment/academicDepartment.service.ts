import { SortOrder } from 'mongoose'
import {
  IResponseForPagination,
  Ipagination,
} from '../../interfaces/pagination'
import { searchableFields } from './aademicDepartment.constant'
import {
  IAcademicDepartmentFilters,
  IacademicDepartment,
} from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createAcademicDepartmentToDB = async (
  departmentData: IacademicDepartment
): Promise<IacademicDepartment | null> => {
  const result = (await AcademicDepartment.create(departmentData)).populate(
    'faculty'
  )
  return result
}

const getAllDepartmentsFromBD = async (
  filters: IAcademicDepartmentFilters,
  queryObject: Ipagination
): Promise<IResponseForPagination<IacademicDepartment[]>> => {
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
  const result = await AcademicDepartment.find(whereCondition)
    .populate('faculty')
    .sort(sortOption)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const academicDepartementService = {
  createAcademicDepartmentToDB,
  getAllDepartmentsFromBD,
}
