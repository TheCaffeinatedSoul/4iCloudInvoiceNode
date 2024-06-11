import { Router } from 'express'
import { getAllInvoiceController, getDetailsByInvoiceNumberController } from '../controller/applicationController'

export const applicationRouter = Router()

applicationRouter.get('/getall', getAllInvoiceController)
applicationRouter.post('/getdetails', getDetailsByInvoiceNumberController)
