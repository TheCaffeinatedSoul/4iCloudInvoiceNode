import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import parsedenv from './env'
import { mainRouter } from './router/router'
import { dbInitialize } from './config/database'

const app = express()

app.use(express.json({ limit: '150mb' }))
app.use(express.urlencoded({ limit: '150mb', extended: true }))

var corsOptions = {
  origin: 'http://localhost:2020',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(morgan('dev'))

const startup = async () => {
  console.log('Starting application')
  try {
    console.log('Initializing database module')
    const dbPool = await dbInitialize()
    app.locals.db = dbPool
    app.listen(parsedenv.PORT, () => {
      console.log(`Server running on port : http://localhost:${parsedenv.PORT}`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

startup().catch(error => {
  console.log('Error starting application: ', error)
  process.exit(1)
})

app.use('/archive', mainRouter)
