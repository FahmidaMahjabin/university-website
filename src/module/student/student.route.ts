import express from 'express'

import validateRequest from '../../middleware/validateRequest'

import { studentValidation } from './student.validation'
import { StudentController } from './student.controller'

const router = express.Router()
router.get('/all', StudentController.getAllStudent)
router.get('/getOne/:id', StudentController.getOneStudent)
router.delete('/delete/:id', StudentController.deleteStudent)
router.patch(
  '/update/:id',
  validateRequest(studentValidation.updateStudentZodSchema),
  StudentController.updateStudent
)
export const studentRoutes = router
