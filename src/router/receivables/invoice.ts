import { Router } from 'express'
import { getInvoiceBySearchController, getTransactionDetailsController } from '../../controller/receivables/invoices'

export const invoiceRouter = Router()

invoiceRouter.post('/getinvoicebysearch', getInvoiceBySearchController)
invoiceRouter.post('/gettransactiondetails', getTransactionDetailsController)
