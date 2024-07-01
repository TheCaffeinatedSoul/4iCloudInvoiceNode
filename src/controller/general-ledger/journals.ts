import { Request, Response } from 'express'
import { getJournalsBySearchService } from '../../service/general-ledger/journals'

export const getJournalsBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getJournalsBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getJournalsBySearchController: ', error })
  }
}
