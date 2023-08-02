import httpStatus from 'http-status'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import { User } from '../users/users.model'
import { ILoginData, loginResponse } from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../config'
import { jwtTokenCreate } from '../../helpers/jwtToken'
// function = createlogin
// input = id, password
// step1: check if the user exists in db using id
// step2: if not exist then throw error
// step3: if exists check the given password with the saved password in DB
// step4: if not same then throw error
// step5: if same then check if needPassword change or not
// step6: if need to password change then take password input
// step7: else give access token
const createLogIntoDB = async (
  data: ILoginData
): Promise<loginResponse | null | undefined> => {
  const { id, password } = data
  console.log('data from auth service:', data)
  // check user exists
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needPasswordChange: 1 }
  // ).lean()
  const user = new User()
  const isUserExist = await user.isUserExist(id)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist")
  }
  if (
    isUserExist?.password &&
    !user.isPasswordMatch(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'incorrect password')
  }
  const { id: userId, role, needPasswordChange } = isUserExist
  // create access token
  const accessToken = jwtTokenCreate(
    {
      userId,
      role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  // refresh token
  const refreshToken = jwtTokenCreate(
    {
      userId,
      role,
    },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  )
  console.log(accessToken, refreshToken, needPasswordChange)
  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  }
}

// login -->degault password -->needPasswordChange (true| false) --> true --> change password else login
// otherwise always password change korte bolbe
export const authService = {
  createLogIntoDB,
}
