import { Designation, Gender } from './faculty.interface'
export const designation: Designation[] = [
  'Lecturer',
  'Assistant Professor',
  'Associate Professor',
  'Professor',
]
export const gender: Gender[] = ['male', 'female']
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
export const filterableFields = [
  'searchTerm',
  'id',
  'email',
  'contactNo',
  'bloodGroup',
  'designation',
]
export const searchableFields = [
  'id',
  'name.firstName',
  'name.lastName',
  'email',
  'contactNo',
  'emergencyContactNo',
]
export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
