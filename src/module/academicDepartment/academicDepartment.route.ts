import express from 'express'

import { academicDepartmentController } from './academicDepartment.controller'
const router = express.Router()
router.post('/create', academicDepartmentController.createAcademicDepartment)
router.get('/all-departments', academicDepartmentController.getAllDepartments)

export default router
