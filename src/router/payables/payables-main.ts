import { Router } from 'express'
import { invoiceRouter } from './invoice'
import { checksRouter } from './checks'

export const payablesRouter = Router()

payablesRouter.use('/invoice', invoiceRouter)
payablesRouter.use('/checks', checksRouter)
