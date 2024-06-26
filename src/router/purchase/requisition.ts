import { Router } from 'express'
import { getDetailsByRequisitionNumberController, getLineController, getRequisitionbySearchController } from '../../controller/purchase/requisition'

export const requistionRouter = Router()

requistionRouter.post('/getrequisitionbysearch', getRequisitionbySearchController)
requistionRouter.post('/getdetails', getDetailsByRequisitionNumberController)
requistionRouter.post('/getlinedetails', getLineController)
