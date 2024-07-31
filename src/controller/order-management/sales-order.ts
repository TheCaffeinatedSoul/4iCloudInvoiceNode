import { Request, Response } from 'express'
import { getSalesOrderBySearchService, getSalesOrderDetailsService } from '../../service/order-management/sales-order'

export const getSalesOrderBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10
    const data = await getSalesOrderBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getSalesOrderBySearchController: ', error })
  }
}

export const getSalesOrderDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await getSalesOrderDetailsService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getSalesOrderDetailsController: ', error })
  }
}
