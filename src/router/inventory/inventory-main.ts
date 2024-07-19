import { Router } from 'express'
import { receiptRouter } from './receipts'
import { moveOrderRouter } from './move-orders'

export const inventoryRouter = Router()

inventoryRouter.use('/receipts', receiptRouter)
inventoryRouter.use('/moveorders', moveOrderRouter)
