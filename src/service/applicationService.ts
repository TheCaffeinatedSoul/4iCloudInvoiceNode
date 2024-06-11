import { Request, Response } from 'express'
export const getAllInvoiceService = async (req: Request, searchOrganizationName: string, page: number, limit: number) => {
  const searchTerm = new RegExp(searchOrganizationName, 'i')
  try {
    const db = req.app.locals.db
    const [rows, fields] = await db.query('SELECT * FROM arc_archive_data_bkp')
    const data = rows.map((row: any) => {
      const base64Data = row.archive_data.toString('base64')
      const jsonData = Buffer.from(base64Data, 'base64').toString('utf-8')
      return JSON.parse(jsonData)
    })
    const dataLength = data.length
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const response = data.slice(startIndex, endIndex)
    const pageCount = Math.ceil(searchOrganizationName ? response.length : dataLength / limit)
    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getAllInvoiceService: ', error)
  }
}

export const getDetailsByInvoiceNumberService = async (req: Request, res: Response) => {
  try {
    const db = req.app.locals.db
    const invoice_number = req.body.INVOICE_NUMBER
    const [rows, fields] = await db.query('SELECT * FROM arc_archive_data_bkp where doc_number = ?', [invoice_number])
    const response = rows.map((row: any) => {
      const base64Data = row.archive_data.toString('base64')
      const jsonData = Buffer.from(base64Data, 'base64').toString('utf-8')
      return JSON.parse(jsonData)
    })
    return response
  } catch (error) {
    console.log('Error at getDetailsByInvoiceNumberService: ', error)
  }
}
