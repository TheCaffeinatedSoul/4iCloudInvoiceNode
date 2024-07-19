import { Router } from 'express'
import { getAssetDetailsByAssetIdController, getAssetsBySearchController, getDepreciationDetailsController } from '../../controller/fixed-assets/assets'

export const assetsRouter = Router()

assetsRouter.post('/getassetsbysearch', getAssetsBySearchController)
assetsRouter.post('/getassetdetailsbyassetid', getAssetDetailsByAssetIdController)
assetsRouter.post('/getdepreciationdetails', getDepreciationDetailsController)
