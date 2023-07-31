import { z } from 'zod'
import { bloodGroup, designation, gender } from '../faculty/faculty.constant'
const updateFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'firstName is required',
          })
          .optional(),
        middleName: z.string().optional(),
        lastName: z
          .string({
            required_error: 'firstName is required',
          })
          .optional(),
      })
      .optional(),
    gender: z
      .enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      })
      .optional(),
    dateOfBirth: z
      .number({
        required_error: 'date of birth is required',
      })
      .optional(),
    contactNo: z
      .string({
        required_error: 'contact numberis required',
      })
      .optional(),
    emergencyContactNo: z
      .string({
        required_error: 'emergency contact numberis required',
      })
      .optional(),
    email: z
      .string({
        required_error: 'email is required',
      })
      .email()
      .optional(),
    presentAddress: z
      .string({
        required_error: 'present address is required',
      })
      .optional(),
    permanentAddress: z
      .string({
        required_error: 'permanent address is required',
      })
      .optional(),
    profileImage: z
      .string({
        required_error: 'profile image is required',
      })
      .optional(),
    bloodGroup: z
      .enum([...bloodGroup] as [string, ...string[]], {
        required_error: 'blood group is required',
      })
      .optional(),
    designation: z
      .enum([...designation] as [string, ...string[]], {
        required_error: 'designation is required',
      })
      .optional(),
  }),
})

export const facultyValidation = {
  updateFacultyZodSchema,
}
