import { Request, Response } from 'express'
import { getAssetDetailsByAssetIdService, getAssetsBySearchService, getDepreciationDetailsService } from '../../service/fixed-assets/assets'

export const getAssetsBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getAssetsBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getAssetsBySearchController: ', error })
  }
}

export const getAssetDetailsByAssetIdController = async (req: Request, res: Response) => {
  try {
    const data = await getAssetDetailsByAssetIdService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getAssetDetailsByAssetIdController: ', error })
  }
}

export const getDepreciationDetailsController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10
    const data = await getDepreciationDetailsService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getDepreciationDetailsController: ', error })
  }
}
