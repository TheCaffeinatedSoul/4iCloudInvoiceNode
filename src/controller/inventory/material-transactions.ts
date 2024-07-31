import { Request, Response } from 'express'
import { getMaterialTransactionsBySearchService, getMtlTrxByIDService } from '../../service/inventory/material-transactions'

export const getMaterialTransactionsBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getMaterialTransactionsBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getMaterialTransactionsBySearchController: ', error })
  }
}

export const getMtlTrxByIDController = async (req: Request, res: Response) => {
  try {
    const data = await getMtlTrxByIDService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getMtlTrxByIDController: ', error })
  }
}
