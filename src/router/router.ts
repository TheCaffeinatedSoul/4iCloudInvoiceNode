import { Router } from 'express'
import { applicationRouter } from './invoice'

export const mainRouter = Router()

mainRouter.use('/invoice', applicationRouter)
