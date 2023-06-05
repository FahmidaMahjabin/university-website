import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
// body perser
app.use(express.json())
app.use(express.urlencoded())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
