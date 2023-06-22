import express from 'express'
import cors from 'cors'

import { globalErrorHandler } from './middleware/GlobalErrorHandler'

import routes from './routes/index'

const app = express()
app.use(cors())
// body perser
app.use(express.json())
app.use(express.urlencoded())
// app route use
app.use('/', routes)

// global error handler
app.use(globalErrorHandler)
export default app
