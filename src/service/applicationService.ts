import { Request, Response } from 'express'

export const getAllInvoiceService = async (req: Request, searchOrganizationName: string, page: number, limit: number) => {
  const searchTerm = new RegExp(searchOrganizationName, 'i')
  try {
    const db = req.app.locals.db
    const offset = (page - 1) * limit

    const [rows, fields] = await db.query('SELECT SQL_CALC_FOUND_ROWS * FROM arc_archive_data WHERE archive_data LIMIT ? OFFSET ?', [limit, offset])

    const [totalCountRow] = await db.query('SELECT FOUND_ROWS() as totalCount')
    const totalCount = totalCountRow[0].totalCount

    const response = rows.map((row: any) => row.archive_data)
    const pageCount = Math.ceil(totalCount / limit)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getAllInvoiceService: ', error)
  }
}

export const getDetailsByInvoiceNumberService = async (req: Request) => {
  try {
    const db = req.app.locals.db
    const invoice_number = req.body.INVOICE_NUMBER
    const [rows, fields] = await db.query('SELECT * FROM arc_archive_data where doc_number = ?', [invoice_number])
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getDetailsByInvoiceNumberService: ', error)
  }
}

export const getInvoiceBySearchService = async (req: Request, page: number, limit: number) => {
  const { ORGANIZATION, INVOICE_NUMBER, SUPPLIER_NUMBER, SUPPLIER_NAME, FROM_DATE, TO_DATE } = req.body
  try {
    const db = req.app.locals.db
    const query = `
      SELECT * FROM arc_archive_data 
      WHERE archive_data->>'$.org_name' LIKE ? 
      AND archive_data->>'$.gl_date' >= ? 
      AND archive_data->>'$.gl_date' <= ?
      ${INVOICE_NUMBER ? "AND archive_data->>'$.invoice_num' = ?" : ''}
      ${SUPPLIER_NUMBER ? "AND archive_data->>'$.vendor_num' = ?" : ''}
      ${SUPPLIER_NAME ? "AND archive_data->>'$.vendor_name' = ?" : ''}
      LIMIT ? OFFSET ?
    `

    const offset = (page - 1) * limit

    const params = [
      `%${ORGANIZATION}%`,
      FROM_DATE,
      TO_DATE,
      ...(INVOICE_NUMBER ? [INVOICE_NUMBER] : []),
      ...(SUPPLIER_NUMBER ? [SUPPLIER_NUMBER] : []),
      ...(SUPPLIER_NAME ? [SUPPLIER_NAME] : []),
      limit,
      offset,
    ]

    const [rows] = await db.query(query, params)
    const totalCountQuery = `
      SELECT COUNT(*) as totalCount FROM arc_archive_data 
      WHERE archive_data->>'$.org_name' LIKE ? 
      AND archive_data->>'$.gl_date' >= ? 
      AND archive_data->>'$.gl_date' <= ?
      ${INVOICE_NUMBER ? "AND archive_data->>'$.invoice_num' = ?" : ''}
      ${SUPPLIER_NUMBER ? "AND archive_data->>'$.vendor_num' = ?" : ''}
      ${SUPPLIER_NAME ? "AND archive_data->>'$.vendor_name' = ?" : ''}
    `
    const [totalCountRow] = await db.query(totalCountQuery, params.slice(0, -2))
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getInvoiceBYSearchService: ', error)
  }
}
