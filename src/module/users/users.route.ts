import express from 'express'
import { UserController } from './users.controller'
import validateRequest from '../../middleware/validateRequest'
import { userValidation } from './users.validation'

const router = express.Router()
router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  UserController.createStudentToDB
)
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  UserController.createFacultyToDB
)

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  UserController.createAdminToDB
)
router.get('/all-user', UserController.getAllUsers)
export default router
