import { Router } from 'express'
import {
  getDetailsByPONumberController,
  getLineController,
  getLineLocationDetailsController,
  getPOBySearchController,
} from '../../controller/purchase/purchase-order'

export const poRouter = Router()

poRouter.post('/getpobysearch', getPOBySearchController)
poRouter.post('/getdetails', getDetailsByPONumberController)
poRouter.post('/getlinedetails', getLineController)
poRouter.post('/getlinelocationdetails', getLineLocationDetailsController)
