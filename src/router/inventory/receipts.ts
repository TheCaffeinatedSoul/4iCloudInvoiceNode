import { Router } from 'express'
import { getReceiptsBySearchController } from '../../controller/inventory/receipts'

export const receiptRouter = Router()

receiptRouter.post('/getreceiptbysearch', getReceiptsBySearchController)
