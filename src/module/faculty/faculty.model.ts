import { Schema, model } from 'mongoose'
import { IFaculty, IFacultyModel } from './faculty.interface'
import { bloodGroup, designation, gender } from './faculty.constant'

export const facultySchema = new Schema<IFaculty, IFacultyModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
        },
        lastName: {
          type: String,
        },
      },
    },
    gender: {
      type: String,
      enum: gender,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },

    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    bloodGroup: {
      type: String,

      enum: bloodGroup,
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'academicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
    designation: {
      type: String,
      enum: designation,
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
export const Faculty = model<IFaculty>('faculty', facultySchema)
