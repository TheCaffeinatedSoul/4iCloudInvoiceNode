import { Router } from 'express'
import { getMaterialTransactionsBySearchController, getMtlTrxByIDController } from '../../controller/inventory/material-transactions'

export const materialTransactionRouter = Router()

materialTransactionRouter.post('/getmtltrxbysearch', getMaterialTransactionsBySearchController)
materialTransactionRouter.post('/getmtltrxdetails', getMtlTrxByIDController)
