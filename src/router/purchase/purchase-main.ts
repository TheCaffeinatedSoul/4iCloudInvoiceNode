import { Router } from 'express'
import { requistionRouter } from './requisition'

export const purchaseRouter = Router()

purchaseRouter.use('/requisition', requistionRouter)
