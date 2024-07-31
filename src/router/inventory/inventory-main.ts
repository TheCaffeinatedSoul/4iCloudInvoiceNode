import { Router } from 'express'
import { receiptRouter } from './receipts'
import { moveOrderRouter } from './move-orders'
import { materialTransactionRouter } from './material-transactions'

export const inventoryRouter = Router()

inventoryRouter.use('/receipts', receiptRouter)
inventoryRouter.use('/moveorders', moveOrderRouter)
inventoryRouter.use('/mtltrx', materialTransactionRouter)
