import express from 'express'
import cors from 'cors'
import userRoute from './users.route'
import { globalErrorHandler } from '../../middleware/GlobalErrorHandler'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import { academicSemesterRute } from '../academicSemester/academicSemester.route'

const app = express()
app.use(cors())
// body perser
app.use(express.json())
app.use(express.urlencoded())
// app route use
app.use('/', userRoute)
// customized error
app.use('/academic-semester', academicSemesterRute.router)
app.get('/', () => {
  Promise.reject(new ApiError(400, 'juct checking error'))
})
// global error handler
app.use(globalErrorHandler)
export default app
