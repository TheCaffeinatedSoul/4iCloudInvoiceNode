import { Router } from 'express'
import { getShippingTransactionsBySearchController } from '../../controller/order-management/shipping-transactions'

export const shippingTrxRouter = Router()

shippingTrxRouter.post('/getshippingtrxbysearch', getShippingTransactionsBySearchController)
