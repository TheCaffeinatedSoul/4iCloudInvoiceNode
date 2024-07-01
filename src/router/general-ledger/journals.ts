import { Router } from 'express'
import { getJournalsBySearchController } from '../../controller/general-ledger/journals'

export const journalRouter = Router()

journalRouter.post('/getjournalsbysearch', getJournalsBySearchController)
