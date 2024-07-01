import { Router } from 'express'
import { getReceiptDetailController, getReceiptsBySearchController } from '../../controller/receivables/receipts'

export const receiptRouter = Router()

receiptRouter.post('/getreceiptbysearch', getReceiptsBySearchController)
receiptRouter.post('/getreceiptdetails', getReceiptDetailController)
