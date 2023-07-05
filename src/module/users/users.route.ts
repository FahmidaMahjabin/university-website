import express from 'express'
import { UserController } from './users.controller'
import validateRequest from '../../middleware/validateRequest'
import { userValidation } from './users.validation'

const router = express.Router()
router.patch(
  '/create-user',
  validateRequest(userValidation.createUserZodSchema),
  UserController.createUserToDB
)
export default router
