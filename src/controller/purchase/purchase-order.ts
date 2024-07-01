import { Request, Response } from 'express'
import { getDetailsByPONumberService, getLineLocationDetailsService, getLineService, getPOBySearchService } from '../../service/purchase/purchase-order'

export const getPOBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10
    const data = await getPOBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getPOBySearchController: ', error })
  }
}

export const getDetailsByPONumberController = async (req: Request, res: Response) => {
  try {
    const data = await getDetailsByPONumberService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getDetailsByPONumberController: ', error })
  }
}

export const getLineController = async (req: Request, res: Response) => {
  try {
    const data = await getLineService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getLineController: ', error })
  }
}

export const getLineLocationDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await getLineLocationDetailsService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getLineLocationDetailsController: ', error })
  }
}
