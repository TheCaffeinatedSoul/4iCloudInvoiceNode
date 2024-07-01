import { Router } from 'express'
import { invoiceRouter } from './invoice'
import { receiptRouter } from './receipts'

export const receivablesRouter = Router()

receivablesRouter.use('/invoice', invoiceRouter)
receivablesRouter.use('/receipts', receiptRouter)
