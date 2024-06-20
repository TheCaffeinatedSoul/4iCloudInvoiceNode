import { Router } from 'express'
import { getDetailsByInvoiceNumberController, getInvoiceBySearchController, getLineController } from '../controller/invoice'

export const applicationRouter = Router()

applicationRouter.post('/getdetails', getDetailsByInvoiceNumberController)
applicationRouter.post('/getsearchedinvoice', getInvoiceBySearchController)
applicationRouter.post('/getlineinformation', getLineController)
