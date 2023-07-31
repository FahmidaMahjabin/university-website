import express from 'express'
import { academicFacultyController } from './academicFaculty.controller'
const router = express.Router()
router.post('/create', academicFacultyController.createAcademicFaculty)
router.get('/', academicFacultyController.getAllFaculty)
export default router
