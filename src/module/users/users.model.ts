import { Schema, model } from 'mongoose'
import { IUser, IUserMethod, userModel } from './users.interface'
import config from '../../config'
import bcrypt from 'bcrypt'
const userSchema = new Schema<IUser, IUserMethod, userModel>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      // select 0 means this field will not be sent to frontend
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
      select: 0,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'admin',
    },
  },
  {
    timestamps: true,
  }
)
// User.create() and user.save() ei duita function e pre() method use kora jay. create model e and save() model theke instance create kore use korte hoy.
// pre() function ta database e save or create er age kaj kore.
// important note: this use korte hole normal function use korte hobe not arrow function
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, needPasswordChange: 1 }
  )
  return user
}

userSchema.methods.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  console.log('this from user:', this)
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_hash_salt_round)
  )

  next()
})
export const User = model<IUser, userModel>('users_uw', userSchema)
