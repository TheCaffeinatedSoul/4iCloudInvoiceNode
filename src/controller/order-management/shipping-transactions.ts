import { Request, Response } from 'express'
import { getShippingTransactionBySearchService } from '../../service/order-management/shipping-transaction'

export const getShippingTransactionsBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10
    const data = await getShippingTransactionBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getShippingTransactionsBySearchController: ', error })
  }
}
