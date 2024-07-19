import { Router } from 'express'
import { getMoveOrderDetailsController, getMoveOrdersBySearchController } from '../../controller/inventory/move-orders'

export const moveOrderRouter = Router()

moveOrderRouter.post('/getmoveordersbysearch', getMoveOrdersBySearchController)
moveOrderRouter.post('/getmoveorderdetails', getMoveOrderDetailsController)
