import { z } from 'zod'
import { code, month, title } from './academicSemester.constants'

export const academicSemesterVedilation = z.object({
  body: z.object({
    title: z.enum([...title] as [string, ...string[]], {
      required_error: 'title is required',
    }),

    code: z.enum([...code] as [string, ...string[]], {
      required_error: 'code is required',
    }),

    year: z.number({
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
