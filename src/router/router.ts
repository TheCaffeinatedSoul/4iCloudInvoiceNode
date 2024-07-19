import { Router } from 'express'
import { payablesRouter } from './payables/payables-main'
import { receivablesRouter } from './receivables/receivables-main'
import { purchaseRouter } from './purchase/purchase-main'
import { generalLedgerRouter } from './general-ledger/general-ledger-main'
import { fixedAssetsRouter } from './fixed-assets/fixed-assets-main'
import { inventoryRouter } from './inventory/inventory-main'

export const mainRouter = Router()

mainRouter.use('/payables', payablesRouter)
mainRouter.use('/receivables', receivablesRouter)
mainRouter.use('/purchase', purchaseRouter)
mainRouter.use('/generalledger', generalLedgerRouter)
mainRouter.use('/fixedassets', fixedAssetsRouter)
mainRouter.use('/inventory', inventoryRouter)
