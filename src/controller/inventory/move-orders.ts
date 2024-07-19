import { Request, Response } from 'express'
import { getMoveOrderDetailsService, getMoveOrdersBySearchService } from '../../service/inventory/move-orders'

export const getMoveOrdersBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getMoveOrdersBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getMoveOrdersBySearchController: ', error })
  }
}

export const getMoveOrderDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await getMoveOrderDetailsService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getMoveOrderDetailsController: ', error })
  }
}
