import { getDetailsByInvoiceNumberService, getInvoiceBySearchService, getLineService } from '../service/applicationService'
import { Request, Response } from 'express'

export const getDetailsByInvoiceNumberController = async (req: Request, res: Response) => {
  try {
    const data = await getDetailsByInvoiceNumberService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getDetailsByInvoiceNumberController: ', error })
  }
}

export const getInvoiceBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getInvoiceBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getInvoiceBySearchController: ', error })
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
