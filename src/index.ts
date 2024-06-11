import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import parsedenv from './env'
import { mainRouter } from './router/router'

const app = express()

app.use(express.json({ limit: '150mb' }))
app.use(express.urlencoded({ limit: '150mb', extended: true }))

var corsOptions = {
  origin: 'http://localhost:2020',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(morgan('dev'))

async function connectToDB() {
  const connection = mysql.createPool({
    host: parsedenv.MYSQL_HOST,
    user: parsedenv.MYSQL_USERNAME,
    password: parsedenv.MYSQL_PASSWORD,
    database: parsedenv.MYSQL_DATABASE,
    connectTimeout: 0,
    connectionLimit: 1,
  })

  console.log(`Connected to MySQL database: ${parsedenv.MYSQL_DATABASE}`)

  return connection
}

connectToDB()
  .then(pool => {
    app.locals.db = pool
    app.listen(parsedenv.PORT, () => {
      console.log(`Server running on port: http://localhost:${parsedenv.PORT}`)
    })
  })
  .catch(err => {
    console.log('Unable to establish connection to MySQL database: ', err)
    process.exit(1)
  })

app.use('/archive', mainRouter)
