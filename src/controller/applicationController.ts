import { getAllInvoiceService, getDetailsByInvoiceNumberService } from '../service/applicationService'
import { Request, Response } from 'express'

export const getAllInvoiceController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string
    const searchname = req.query.query as string
    const searchOrganizationName = searchname ? searchname.trim().toLowerCase() : ''

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getAllInvoiceService(req, searchOrganizationName, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getAllInvoiceController: ', error })
  }
}

export const getDetailsByInvoiceNumberController = async (req: Request, res: Response) => {
  try {
    const data = await getDetailsByInvoiceNumberService(req, res)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getDetailsByInvoiceNumberController: ', error })
  }
}
