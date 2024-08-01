import { Router } from 'express'
import { salesOrderRouter } from './sales-order'
import { shippingTrxRouter } from './shipping-transactions'

export const orderManagementRouter = Router()

orderManagementRouter.use('/salesorder', salesOrderRouter)
orderManagementRouter.use('/shippingtrx', shippingTrxRouter)
