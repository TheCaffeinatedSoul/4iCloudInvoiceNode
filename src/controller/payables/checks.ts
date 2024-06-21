import { Request, Response } from 'express'
import { getChecksBySearchService, getDetailsByCheckNumberService } from '../../service/payables/checks'

export const getDetailsByCheckNumberController = async (req: Request, res: Response) => {
  try {
    const data = await getDetailsByCheckNumberService(req.body)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getDetailsByCheckNumberController: ', error })
  }
}

export const getChecksBySearchController = async (req: Request, res: Response) => {
  try {
    const pageStr = req.query.page as string
    const limitStr = req.query.limit as string

    const page = parseInt(pageStr) || 1
    const limit = parseInt(limitStr) || 10

    const data = await getChecksBySearchService(req.body, page, limit)
    if (data) {
      res.status(200).json({ message: 'Data fetched', data })
    }
  } catch (error) {
    res.status(404).json({ message: 'Error at getChecksBySearchController: ', error })
  }
}
