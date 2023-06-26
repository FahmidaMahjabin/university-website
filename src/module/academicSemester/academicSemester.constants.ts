import { Code, Month, Title } from './academicSemester.interface'

export const month: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const title: Title[] = ['Autumn', 'Fall', 'Summer']
export const code: Code[] = ['01', '02', '03']

export const titleAndCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Fall: '02',
  Summer: '03',
}
export const filterableFields = ['searchTerm', 'title', 'year', 'code']
export const searchableFields = ['title', 'year', 'code']
export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
