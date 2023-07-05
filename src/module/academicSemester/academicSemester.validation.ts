import { z } from 'zod'
import { code, month, title } from './academicSemester.constants'

const academicSemesterCreateVedilation = z.object({
  body: z.object({
    title: z.enum([...title] as [string, ...string[]], {
      required_error: 'title is required',
    }),

    code: z.enum([...code] as [string, ...string[]], {
      required_error: 'code is required',
    }),

    year: z.string({
      required_error: 'year is required',
    }),
    startMonth: z.enum([...month] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),

    endMonth: z.enum([...month] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
})

const academicSemesterUpdateVelidation = z
  .object({
    body: z.object({
      title: z
        .enum([...title] as [string, ...string[]], {
          required_error: 'title is required',
        })
        .optional(),

      code: z
        .enum([...code] as [string, ...string[]], {
          required_error: 'code is required',
        })
        .optional(),

      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      startMonth: z
        .enum([...month] as [string, ...string[]], {
          required_error: 'startMonth is required',
        })
        .optional(),

      endMonth: z
        .enum([...month] as [string, ...string[]], {
          required_error: 'endMonth is required',
        })
        .optional(),
    }),
  })
  .refine(
    value =>
      (value.body.title && value.body.code) ||
      (!value.body.title && !value.body.code),
    {
      message:
        "Both title and code shuld be provided or  don't give any of the title and code",
    }
  )

export const academicSemesterValidation = {
  academicSemesterCreateVedilation,
  academicSemesterUpdateVelidation,
}
