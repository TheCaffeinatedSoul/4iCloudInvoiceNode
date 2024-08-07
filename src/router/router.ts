import { Router } from 'express'
import { loginRouter } from './login/login'
import { payablesRouter } from './payables/payables-main'
import { receivablesRouter } from './receivables/receivables-main'
import { purchaseRouter } from './purchase/purchase-main'
import { generalLedgerRouter } from './general-ledger/general-ledger-main'
import { fixedAssetsRouter } from './fixed-assets/fixed-assets-main'
import { inventoryRouter } from './inventory/inventory-main'
import { orderManagementRouter } from './order-management/order-management-main'

export const mainRouter = Router()

mainRouter.use('/login', loginRouter)

mainRouter.use('/payables', payablesRouter)
mainRouter.use('/receivables', receivablesRouter)
mainRouter.use('/purchase', purchaseRouter)
mainRouter.use('/generalledger', generalLedgerRouter)
mainRouter.use('/fixedassets', fixedAssetsRouter)
mainRouter.use('/inventory', inventoryRouter)
mainRouter.use('/ordermanagement', orderManagementRouter)
