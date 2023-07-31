import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
  port: process.env.PORT,
  databaseUlr: process.env.DATABASE_URL,
  student_default_password: process.env.STUDENT_DEFAULT_PASSWORD,
  env: process.env.NODE_ENV,
  faculty_default_password: process.env.FACULTY_DEFAULT_PASSWORD,
  admin_default_password: process.env.ADMIN_DEFAULT_PASSWORD,
  bcrypt_hash_salt_round: process.env.BCRYPT_HASH_SALT_ROUND,
}
