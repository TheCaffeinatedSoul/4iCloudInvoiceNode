import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().min(1),
  MYSQL_USERNAME: z.string().min(1),
  MYSQL_PASSWORD: z.string().min(1),
  MYSQL_HOST: z.string().min(1),
  MYSQL_DATABASE: z.string().min(1),
})

const parsedenv = envSchema.parse(process.env)

export default parsedenv
