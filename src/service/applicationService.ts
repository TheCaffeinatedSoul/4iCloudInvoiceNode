import { queryWithBindExecute } from '../config/database'
import { query } from '../constants/query'
import { T_InvoiceNumber, T_InvoiceSearch } from '../types/services'

export const getDetailsByInvoiceNumberService = async (payload: T_InvoiceNumber) => {
  const { INVOICE_NUMBER } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_INVOICE_NUMBER,
      values: [INVOICE_NUMBER],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getDetailsByInvoiceNumberService: ', error)
  }
}

export const getInvoiceBySearchService = async (payload: T_InvoiceSearch, page: number, limit: number) => {
  const { ORGANIZATION, INVOICE_NUMBER, SUPPLIER_NUMBER, SUPPLIER_NAME, FROM_DATE, TO_DATE } = payload
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.org_name' LIKE ?")
      params.push(`%${ORGANIZATION}%`)
    }
    if (FROM_DATE) {
      if (TO_DATE) {
        conditions.push("archive_data->>'$.invoice_date' BETWEEN ? AND ?")
        params.push(FROM_DATE, TO_DATE)
      } else {
        conditions.push("archive_data->>'$.invoice_date' >= ?")
        params.push(FROM_DATE)
      }
    }
    if (TO_DATE) {
      conditions.push("archive_data->>'$.invoice_date' <= ?")
      params.push(TO_DATE)
    }
    if (INVOICE_NUMBER) {
      conditions.push("archive_data->>'$.invoice_num' = ?")
      params.push(INVOICE_NUMBER)
    }
    if (SUPPLIER_NUMBER) {
      conditions.push("archive_data->>'$.vendor_num' = ?")
      params.push(SUPPLIER_NUMBER)
    }
    if (SUPPLIER_NAME) {
      conditions.push("archive_data->>'$.vendor_name' = ?")
      params.push(SUPPLIER_NAME)
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
      SELECT * FROM arc_archive_data 
      ${whereClause} 
      LIMIT ? OFFSET ?
    `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
      SELECT COUNT(*) as totalCount FROM arc_archive_data 
      ${whereClause}
    `

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getInvoiceBySearchService: ', error)
  }
}

export const getLineService = async (payload: T_InvoiceNumber) => {
  const { INVOICE_NUMBER, LINE_NUMBER } = payload
  console.log('Payload: ', payload)
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_LINE_DETAILS,
      values: [INVOICE_NUMBER, LINE_NUMBER],
    })
    console.log('Rows: ', rows)
    const response = rows.map((row: any) => {
      return JSON.parse(row.line_data)
    })
    console.log('Response: ', response)
    return response
  } catch (error) {
    console.log('Error at getLineService: ', error)
  }
}
