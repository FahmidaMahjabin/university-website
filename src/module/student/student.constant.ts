import { Gender } from './student.interface'

export const gender: Gender[] = ['male', 'female']
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
export const filterableFields = [
  'searchTerm',
  'id',
  'email',
  'contactNo',
  'bloodGroup',
]
export const searchableFields = [
  'id',
  'name.firstName',
  'name.lastName',
  'email',
  'contactNo',
]
export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
