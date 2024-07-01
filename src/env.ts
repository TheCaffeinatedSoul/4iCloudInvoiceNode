import { z } from 'zod'

const envSchema = z.object({
  PORT: z.string().min(1),
  MYSQL_USERNAME: z.string().min(1),
  MYSQL_PASSWORD: z.string().min(1),
  MYSQL_HOST: z.string().min(1),
  MYSQL_DATABASE: z.string().min(1),
})

const parsedenv = envSchema.safeParse(process.env)

if (!parsedenv.success) {
  console.error('Invalid environment variables: ', parsedenv.error.flatten().fieldErrors)
  process.exit(1)
}

const env = Object.freeze(parsedenv.data)

export { env }
