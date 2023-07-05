import { Schema, model } from 'mongoose'
import { IacademicDepartment } from './academicDepartment.interface'

const academicDepartmentSchema = new Schema<IacademicDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',

      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AcademicDepartment = model<IacademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema
)
