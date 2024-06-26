import { Request, Response } from 'express'
import { getDetailsByRequisitionNumberService, getLineService, getRequisitionBySearchService } from '../../service/purchase/requisition'

export const getRequisitionbySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10
    const data = await getRequisitionBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getRequisitionBySearchController: ', error })
  }
}

export const getDetailsByRequisitionNumberController = async (req: Request, res: Response) => {
  try {
    const data = await getDetailsByRequisitionNumberService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getDetailsByRequisitionNumberController: ', error })
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
