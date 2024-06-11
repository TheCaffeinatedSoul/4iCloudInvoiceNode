import { Router } from 'express'
import { applicationRouter } from './applicationRoutes'

export const mainRouter = Router()

mainRouter.use('/', applicationRouter)
