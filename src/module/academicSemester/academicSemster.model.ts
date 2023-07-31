import mongoose, { Schema, model } from 'mongoose'
import {
  IAcademicSemester,
  academicSemesterModel,
} from './academicSemester.interface'
import { code, month, title } from './academicSemester.constants'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  academicSemesterModel
>({
  title: { type: String, enum: title, required: true },
  year: { type: String, required: true },
  code: { type: String, enum: code, required: true },
  startMonth: { type: String, enum: month, required: true },
  endMonth: { type: String, enum: month, required: true },
})
// same year and same semester duplicate entry check
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  })
  console.log('isExist:', isExist)
  if (isExist) {
    throw new ApiError(409, 'conflict for same year and same semester')
  }
  next()
})
export const AcademicSemester = model<IAcademicSemester, academicSemesterModel>(
  'academicSemester',
  academicSemesterSchema
)
