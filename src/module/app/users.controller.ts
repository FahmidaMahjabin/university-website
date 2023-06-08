import { Request, Response } from 'express'
import userService from './users.service'
const createUserToDB = async (req: Request, res: Response) => {
  try {
    const data = req.body
    console.log('data from controller:', data)
    await userService.createUser(data)
    res.status(200).json({
      success: true,
      message: 'user created successfully',
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'failed to create user',
    })
  }
}
export default {
  createUserToDB,
}
