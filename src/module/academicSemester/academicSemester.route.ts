import validateRequest from '../../middleware/validateRequest'
import { academicSemesterVedilation } from './academicSemester.validation'
import { academicSemesterController } from './academicSemester.controller'
import express from 'express'
const router = express.Router()
router.post(
  '/create-semester',
  validateRequest(academicSemesterVedilation),
  academicSemesterController.createAcademicSemester
)

router.get('/get-semester', academicSemesterController.getAllSemester)
export const academicSemesterRute = { router }
