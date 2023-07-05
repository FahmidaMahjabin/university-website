import validateRequest from '../../middleware/validateRequest'
import { academicSemesterValidation } from './academicSemester.validation'
import { academicSemesterController } from './academicSemester.controller'
import express from 'express'
const router = express.Router()
router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.academicSemesterCreateVedilation),
  academicSemesterController.createAcademicSemester
)
router.get('/get-semester/:id', academicSemesterController.getOneSemester)
router.get('/get-semester', academicSemesterController.getAllSemester)

// update: 1.for updating if want to update title then code must be updated too at routing level
// 2. for update at service level check title and code should match
router.post(
  '/:id',
  validateRequest(academicSemesterValidation.academicSemesterUpdateVelidation),
  academicSemesterController.updateSemester
)
// delete one semester
router.delete('/:id', academicSemesterController.deleteSemester)
export const academicSemesterRute = { router }
