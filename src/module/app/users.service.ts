import { IUser } from './users.interface'
import { User } from './users.model'
import { createID } from '../app/users.utils'
import config from '../../config/index'
const createUser = async (user: IUser): Promise<IUser | null> => {
  // need a user id and password. A default id and password is given from the university admin
  const id = await createID()
  user.id = id as string
  if (!user.password) {
    user.password = config.user_default_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('failed to create a user')
  }
  console.log('user:', createUser)
  return createdUser
}
export default {
  createUser,
}
