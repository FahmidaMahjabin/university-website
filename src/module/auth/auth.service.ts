import httpStatus from 'http-status'
import { ApiError } from '../../errrorHandlers/ApiErrorHandler'
import { User } from '../users/users.model'
import {
  ILoginData,
  IRefreshToken,
  changePassword,
  loginResponse,
} from './auth.interface'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
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
const createLogIntoDB = async (data: ILoginData): Promise<loginResponse> => {
  const { id, password } = data
  console.log('data from auth service:', data)
  // check user exists
  // const isUserExist = await User.findOne(
  //   { id },
  //   { id: 1, password: 1, needPasswordChange: 1 }
  // ).lean()
  const user = new User()
  const isUserExist = await user.isUserExist(id)
  console.log('isUserExist:', isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist")
  }
  // console.log(
  //   'user.isPasswordMatch(password, isUserExist?.password):',
  //   user.isPasswordMatch(password, isUserExist?.password)
  // )
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const passwordMatch = await user.isPasswordMatch(
    password,
    isUserExist.password!
  )
  console.log('passwordMatch:', passwordMatch)
  if (
    isUserExist?.password &&
    !(await user.isPasswordMatch(password, isUserExist?.password))
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
  // console.log('accessToken:', accessToken)
  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  }
}

// login -->degault password -->needPasswordChange (true| false) --> true --> change password else login
// otherwise always password change korte bolbe

const createRefreshToken = async (token: string): Promise<IRefreshToken> => {
  // verify token
  let verifiedToken = null
  try {
    verifiedToken = jwt.verify(token, config.jwt.jwt_refresh_secret as Secret)
    console.log('verifiedToken:', verifiedToken)
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token')
  }
  // when the user is deleted but refresh token still exists
  const { userId } = verifiedToken
  const user = new User()
  const isUserExist = await user.isUserExist(userId)
  console.log('isUserExists:', isUserExist)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found')
  }
  // generate accessToken
  const newAccessToken = jwtTokenCreate(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  return { accessToken: newAccessToken }
}
// function = change password
// input = user, old and new password
// 1: check if the user exist
// 2.if exist then check if the old password is correct with the saved password
// 3.if same then hash the new password
// 4. update and save the new password
const changePassword = async (
  userData: JwtPayload,
  passwordData: changePassword
) => {
  const user = new User()
  const isUserExist = await user.isUserExist(userData.userId)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "user doesn't exist")
  }
  const matchedPassword = await user.isPasswordMatch(
    passwordData.oldPassword,
    isUserExist.password as string
  )
  if (!matchedPassword) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'old password is not same ')
  }
  const hashedPassword = await bcrypt.hash(
    passwordData.newPassword,
    Number(config.bcrypt_hash_salt_round)
  )
  const updateData = {
    password: hashedPassword,
    needPasswordChange: false,
    passwordChangeAt: new Date(),
  }
  const updatedStudent = await User.findOneAndUpdate(
    { id: userData.userId },
    updateData
  )
  return updatedStudent
}
export const authService = {
  createLogIntoDB,
  createRefreshToken,
  changePassword,
}
