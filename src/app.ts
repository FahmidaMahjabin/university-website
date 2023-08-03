import express from 'express'
import cors from 'cors'

import { globalErrorHandler } from './middleware/GlobalErrorHandler'

import routes from './routes/index'

import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors())
// body perser
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
// app route use
app.use('/', routes)

// global error handler
app.use(globalErrorHandler)

// page not found route
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'page not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: ' wrong API',
      },
    ],
  })
})

export default app
