import { Router } from 'express'
import { requistionRouter } from './requisition'
import { poRouter } from './purchase-order'

export const purchaseRouter = Router()

purchaseRouter.use('/requisition', requistionRouter)
purchaseRouter.use('/purchaseorder', poRouter)
