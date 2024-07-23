import { Router } from 'express'
import { getJournalByIdController, getJournalsBySearchController, getLineDetailsController } from '../../controller/general-ledger/journals'

export const journalRouter = Router()

journalRouter.post('/getjournalsbysearch', getJournalsBySearchController)
journalRouter.post('/getjournalbyid', getJournalByIdController)
journalRouter.post('/getlinedetails', getLineDetailsController)
