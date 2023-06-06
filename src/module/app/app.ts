import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
// body perser
app.use(express.json())
app.use(express.urlencoded())
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
