import express from 'express'
import userRoute from '../module/users/users.route'
import { academicSemesterRute } from '../module/academicSemester/academicSemester.route'

const routes = express.Router()

const appRoutes = [
  { path: '/users', route: userRoute },
  { path: '/academic-semester', route: academicSemesterRute.router },
]

appRoutes.forEach(route => routes.use(route.path, route.route))

export default routes
