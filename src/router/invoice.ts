import { Router } from 'express'
import { getDetailsByInvoiceNumberController, getInvoiceBySearchController, getLineController } from '../controller/invoice'

export const invoiceRouter = Router()

invoiceRouter.post('/getdetails', getDetailsByInvoiceNumberController)
invoiceRouter.post('/getsearchedinvoice', getInvoiceBySearchController)
invoiceRouter.post('/getlineinformation', getLineController)
