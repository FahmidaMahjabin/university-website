import express from 'express'
import userRoute from '../module/users/users.route'
import { academicSemesterRute } from '../module/academicSemester/academicSemester.route'
import academicFacultyRoute from '../module/academicFaculty/academicFaculty.route'

import academicDepartment from '../module/academicDepartment/academicDepartment.route'
import { studentRoutes } from '../module/student/student.route'
import { facultyRoutes } from '../module/faculty/faculty.route'
import { authRoutes } from '../module/auth/auth.route'
// import { AcademicFaculty } from '../module/academicFaculty/academicFaculty.model'

const routes = express.Router()

const appRoutes = [
  { path: '/users', route: userRoute },
  { path: '/academic-semester', route: academicSemesterRute.router },
  {
    path: '/academic-faculty',
    route: academicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: academicDepartment,
  },
  {
    path: '/student',
    route: studentRoutes,
  },
  {
    path: '/faculty',
    route: facultyRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
]

appRoutes.forEach(route => routes.use(route.path, route.route))

export default routes
