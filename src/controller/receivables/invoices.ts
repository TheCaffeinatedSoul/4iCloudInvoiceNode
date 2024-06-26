import { Request, Response } from 'express'
import { getInvoiceBySearchService, getTransactionDetailsService } from '../../service/receivables/invoice'

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

export const getTransactionDetailsController = async (req: Request, res: Response) => {
  try {
    const data = await getTransactionDetailsService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getTransactionDetailsController: ', error })
  }
}
