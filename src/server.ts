import mongoose from 'mongoose'
import app from './module/app/app'
import config from './config/index'

async function connectToMongoose() {
  try {
    await mongoose.connect(config.databaseUlr as string)
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('error:', error)
  }
}
connectToMongoose()
