import express from 'express'

import validateRequest from '../../middleware/validateRequest'

import { authValidation } from './auth.validation'
import { authController } from './auth.controller'

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
    // () => {
    //   console.log('in route')
    // }
  )
export const authRoutes = router
