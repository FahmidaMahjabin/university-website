import express from 'express'

import validateRequest from '../../middleware/validateRequest'

import { facultyValidation } from './faculty.validation'
import { FacultyController } from './faculty.controller'

const router = express.Router()
router.get('/all', FacultyController.getAllFaculty)
router.get('/getOne/:id', FacultyController.getOneFaculty)

router.patch(
  '/update/:id',
  validateRequest(facultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
)

router.delete('/delete', FacultyController.deleteFaculty)
export const facultyRoutes = router
