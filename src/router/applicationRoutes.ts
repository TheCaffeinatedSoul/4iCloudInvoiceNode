import { Router } from 'express'
import { getAllInvoiceController, getDetailsByInvoiceNumberController, getInvoiceBySearchController } from '../controller/applicationController'

export const applicationRouter = Router()

applicationRouter.get('/getall', getAllInvoiceController)
applicationRouter.post('/getdetails', getDetailsByInvoiceNumberController)
applicationRouter.post('/getsearchedinvoice', getInvoiceBySearchController)
