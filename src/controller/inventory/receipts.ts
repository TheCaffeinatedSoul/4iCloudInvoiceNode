import { Request, Response } from 'express'
import { getLineDetailsService, getReceiptByIdService, getReceiptsBySearchService } from '../../service/inventory/receipts'

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

export const getReceiptByIdController = async (req: Request, res: Response) => {
  try {
    const data = await getReceiptByIdService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getReceiptByIdController: ', error })
  }
}

export const getLineDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await getLineDetailsService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getLineDetailsController: ', error })
  }
}
