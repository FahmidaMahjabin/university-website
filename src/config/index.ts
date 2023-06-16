import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
  port: process.env.PORT,
  databaseUlr: process.env.DATABASE_URL,
  user_default_password: process.env.USER_DEFAULT_PASSWORD,
  env: process.env.NODE_ENV,
}
