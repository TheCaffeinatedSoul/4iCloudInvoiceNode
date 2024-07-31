import { Router } from 'express'
import { getLineDetailsController, getReceiptByIdController, getReceiptsBySearchController } from '../../controller/inventory/receipts'

export const receiptRouter = Router()

receiptRouter.post('/getreceiptbysearch', getReceiptsBySearchController)
receiptRouter.post('/getreceiptdetails', getReceiptByIdController)
receiptRouter.post('/getlinedetails', getLineDetailsController)
