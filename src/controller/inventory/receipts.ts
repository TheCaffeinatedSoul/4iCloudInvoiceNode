import { Request, Response } from 'express'
import { getReceiptsBySearchService } from '../../service/inventory/receipts'

export const getReceiptsBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getReceiptsBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getReceiptsBySearchController: ', error })
  }
}
