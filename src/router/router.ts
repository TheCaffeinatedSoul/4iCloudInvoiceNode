import { Router } from 'express'
import { invoiceRouter } from './payables/invoice'
import { checksRouter } from './payables/checks'

export const mainRouter = Router()

mainRouter.use('/invoice', invoiceRouter)
mainRouter.use('/checks', checksRouter)
