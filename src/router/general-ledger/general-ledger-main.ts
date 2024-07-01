import { Router } from 'express'
import { journalRouter } from './journals'

export const generalLedgerRouter = Router()

generalLedgerRouter.use('/journals', journalRouter)
