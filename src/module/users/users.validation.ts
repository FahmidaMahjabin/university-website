import { z } from 'zod'
import { bloodGroup, gender } from '../student/student.constant'
import { designation } from '../faculty/faculty.constant'
import { ObjectId } from 'mongodb'
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string({}).optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'firstName is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      contactNo: z.string({
        required_error: 'contact numberis required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact numberis required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),
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
      academicFaculty: z
        .string({ required_error: 'academic Faculty is required' })
        .refine(value => new ObjectId(value)),
      academicDepartment: z
        .string({ required_error: 'academic Department is required' })
        .refine(value => new ObjectId(value)),
      academicSemester: z
        .string({ required_error: 'academic semester is required' })
        .refine(value => new ObjectId(value)),
    }),
  }),
})

const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string({}).optional(),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'firstName is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      contactNo: z.string({
        required_error: 'contact numberis required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact numberis required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),
      presentAddress: z.string({
        required_error: 'present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'permanent address is required',
      }),
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
      designation: z.enum([...designation] as [string, ...string[]], {
        required_error: 'designation is required',
      }),
      academicFaculty: z
        .string({ required_error: 'academic Faculty is required' })
        .refine(value => new ObjectId(value)),
      academicDepartment: z
        .string({ required_error: 'academic Department is required' })
        .refine(value => new ObjectId(value)),
    }),
  }),
})
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({}).optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'firstName is required',
        }),
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'date of birth is required',
      }),
      contactNo: z.string({
        required_error: 'contact numberis required',
      }),
      emergencyContactNo: z.string({
        required_error: 'emergency contact numberis required',
      }),
      email: z
        .string({
          required_error: 'email is required',
        })
        .email(),

      designation: z.string({
        required_error: 'designation is required',
      }),
      managementDepartment: z.string({
        required_error: 'department is required',
      }),
    }),
  }),
})
export const userValidation = {
  createStudentZodSchema,
  createFacultyZodSchema,
  createAdminZodSchema,
}
