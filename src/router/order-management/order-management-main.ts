import { Router } from 'express'
import { salesOrderRouter } from './sales-order'

export const orderManagementRouter = Router()

orderManagementRouter.use('/salesorder', salesOrderRouter)
