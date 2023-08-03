import express from 'express'

import validateRequest from '../../middleware/validateRequest'

import { facultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controller'
import { auth } from '../../middleware/auth'
import { enum_user_role } from '../../enum/user'

const router = express.Router()
router.get(
  '/all',
  auth(enum_user_role.ADMIN, enum_user_role.FACULTY),
  FacultyController.getAllFaculty
)
router.get(
  '/getOne/:id',
  auth(enum_user_role.ADMIN, enum_user_role.FACULTY, enum_user_role.STUDENT),
  FacultyController.getOneFaculty
)

router.patch(
  '/update/:id',
  auth(enum_user_role.ADMIN, enum_user_role.FACULTY),
  validateRequest(facultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
)

router.delete(
  '/delete',
  auth(enum_user_role.ADMIN),
  FacultyController.deleteFaculty
)
export const facultyRoutes = router
