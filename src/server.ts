import mongoose from 'mongoose'
import app from './module/app/app'
import config from './config/index'
import { logger } from './shared/logger'
import path from 'path'
async function connectToMongoose() {
  try {
    await mongoose.connect(config.databaseUlr as string)
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    logger.error('error:', error)
  }
}
logger.info(
  `current directory from server: ${path.join(process.cwd(), 'my-test')}`
)
connectToMongoose()
