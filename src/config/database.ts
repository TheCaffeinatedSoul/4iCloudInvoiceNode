import { createPool } from 'mysql2'
import { Pool } from 'mysql2/typings/mysql/lib/Pool'
import { PoolConnection } from 'mysql2/typings/mysql/lib/PoolConnection'
import parsedenv from '../env'
import { promisify } from 'util'
import { I_Mysql } from '../interfaces/database'

let pool: Pool

const dbPool = {
  host: parsedenv.MYSQL_HOST,
  user: parsedenv.MYSQL_USERNAME,
  password: parsedenv.MYSQL_PASSWORD,
  database: parsedenv.MYSQL_DATABASE,
  connectTimeout: 0,
  connectionLimit: 1,
}

export const dbInitialize = async () => {
  let conn: PoolConnection | null = null
  try {
    pool = createPool(dbPool)
    conn = await getConnection()
    const asyncQuery = promisify<string, any[]>(conn.query.bind(conn))
    const result = await asyncQuery("select 'success'")
    return result
  } catch (error) {
    throw error
  } finally {
    if (conn) conn!.release()
  }
}

export const close = () => {
  if (pool) pool.end()
}

export const getConnection = (): Promise<PoolConnection> => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) reject(err)
      resolve(conn)
    })
  })
}

export const queryExecute = async (query: string) => {
  var conn: PoolConnection | null = null
  try {
    conn = await getConnection()
    const asyncQuery = promisify<string, any[]>(conn.query.bind(conn))
    const result = await asyncQuery(query)
    return result
  } catch (error) {
    throw error
  } finally {
    if (conn) conn!.release()
  }
}

export const queryWithBindExecute = async (obj: I_Mysql): Promise<any> => {
  var conn: PoolConnection | null = null
  return new Promise(async (resolve, reject) => {
    try {
      conn = await getConnection()
      conn.query(
        {
          sql: obj.sql,
          values: obj.values,
        },
        (err, results) => {
          if (err) reject(err)
          resolve(results)
        }
      )
    } catch (err) {
      reject(err)
    } finally {
      if (conn) conn!.release()
    }
  })
}
