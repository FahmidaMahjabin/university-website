import { Model } from 'mongoose'
export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type Title = 'Autumn' | 'Fall' | 'Summer'
export type Code = '1' | '2' | '3'
export type IAcademicSemester = {
  title: Title
  year: number
  code: Code
  startMonth: Month
  endMonth: Month
}

export type academicSemesterModel = Model<IAcademicSemester>