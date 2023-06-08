import express from 'express'
import cors from 'cors'
import userRoute from './users.route'

const app = express()
app.use(cors())
// body perser
app.use(express.json())
app.use(express.urlencoded())
// app route use
app.use('/', userRoute)

export default app
