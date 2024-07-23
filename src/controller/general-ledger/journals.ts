import { Request, Response } from 'express'
import { getJournalByIdService, getJournalsBySearchService, getLineDetailsService } from '../../service/general-ledger/journals'

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

export const getJournalByIdController = async (req: Request, res: Response) => {
  try {
    const data = await getJournalByIdService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error fetching journal by id: ', error })
  }
}

export const getLineDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await getLineDetailsService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error fetching line details: ', error })
  }
}
