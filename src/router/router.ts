import { Router } from 'express'
import { payablesRouter } from './payables/payables-main'
import { receivablesRouter } from './receivables/receivables-main'
import { purchaseRouter } from './purchase/purchase-main'

export const mainRouter = Router()

mainRouter.use('/payables', payablesRouter)
mainRouter.use('/receivables', receivablesRouter)
mainRouter.use('/purchase', purchaseRouter)
