import { Router } from 'express'
import { invoiceRouter } from './invoice'

export const receivablesRouter = Router()

receivablesRouter.use('/invoice', invoiceRouter)
