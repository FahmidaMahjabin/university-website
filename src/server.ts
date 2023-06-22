import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorLogger, logger } from './shared/logger'

import { Server } from 'http'

process.on('uncaughtException', error => {
  console.log('uncaught error occure:', error)
  process.exit(1)
})

let server: Server
async function connectToMongoose() {
  try {
    await mongoose.connect(config.databaseUlr as string)
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    logger.error('error:', error)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled rejection occured. server is closed')
    if (server) {
      server.close(() => {
        errorLogger.error('server error:', error)
        process.exit(1)
      })
    }
    process.exit(1)
  })
}

// sigterm handle
process.on('SIGTERM', error => {
  errorLogger.error('sigterm error occure:', error)
  if (server) {
    server.close()
  }
})

connectToMongoose()
