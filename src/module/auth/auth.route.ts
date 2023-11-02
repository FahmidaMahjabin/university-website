import express from 'express'

import validateRequest from '../../middleware/validateRequest'

import { authValidation } from './auth.validation'
import { authController } from './auth.controller'
import { auth } from '../../middleware/auth'
import { enum_user_role } from '../../enum/user'

const router = express.Router()
router.post(
  '/login',
  validateRequest(authValidation.authZodSchema),
  authController.createLogIn
),
  router.post(
    '/refresh-token',
    validateRequest(authValidation.refreshTokenZodSchema),
    authController.createRefreshToken
  ),
  router.post(
    '/change-password',
    validateRequest(authValidation.changePasswordZodSchema),
    auth(
      enum_user_role.SUPER_ADMIN,
      enum_user_role.ADMIN,
      enum_user_role.FACULTY,
      enum_user_role.STUDENT
    ),
    authController.changePassword
  )
export const authRoutes = router
