import { Router } from 'express'
import { getSalesOrderBySearchController } from '../../controller/order-management/sales-order'

export const salesOrderRouter = Router()

salesOrderRouter.post('/getsalesorderbysearch', getSalesOrderBySearchController)
