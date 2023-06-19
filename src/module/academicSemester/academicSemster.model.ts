import { Schema } from 'mongoose'
import {
  IAcademicSemester,
  academicSemesterModel,
} from './academicSemester.interface'
import { code, month, title } from './academicSemester.constants'

export const academicSemester = new Schema<
  IAcademicSemester,
  academicSemesterModel
>({
  title: { type: String, enum: title, required: true },
  year: { type: Number, required: true },
  code: { type: String, enum: code, required: true },
  startMonth: { type: String, enum: month, required: true },
  endMonth: { type: String, enum: month, required: true },
})
