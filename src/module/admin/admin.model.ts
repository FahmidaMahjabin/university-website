import { Schema, model } from 'mongoose'
import { IAdmin, IAdminModel } from './admin.interface'
import { gender } from '../student/student.constant'

export const adminSchema = new Schema<IAdmin, IAdminModel>(
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

    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'managementDepartment',
    },

    designation: {
      type: String,

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
export const Admin = model<IAdmin>('admin', adminSchema)
