import { Router } from 'express'
import { getSalesOrderBySearchController, getSalesOrderDetailsController } from '../../controller/order-management/sales-order'

export const salesOrderRouter = Router()

salesOrderRouter.post('/getsalesorderbysearch', getSalesOrderBySearchController)
salesOrderRouter.post('/getsodetails', getSalesOrderDetailsController)
