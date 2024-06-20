import { Router } from 'express'
import { invoiceRouter } from './invoice'
import { checksRouter } from './checks'

export const mainRouter = Router()

mainRouter.use('/invoice', invoiceRouter)
mainRouter.use('/checks', checksRouter)
