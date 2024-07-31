import { queryWithBindExecute } from '../../config/database'
import { query } from '../../constants/query'
import { T_InvoiceNumber, T_InvoiceSearch } from '../../types/services'

export const getDetailsByInvoiceNumberService = async (payload: T_InvoiceNumber) => {
  const { INVOICE_ID } = payload
  let invoice_id = INVOICE_ID
  if (INVOICE_ID.includes('%')) invoice_id = decodeURIComponent(INVOICE_ID)
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_INVOICE_NUMBER,
      values: [invoice_id],
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
  const { ORGANIZATION, INVOICE_NUMBER, INVOICE_TYPE, SUPPLIER_NUMBER, SUPPLIER_NAME, FROM_DATE, TO_DATE } = payload
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
      conditions.push("archive_data->>'$.invoice_num' LIKE ?")
      params.push(`%${INVOICE_NUMBER}%`)
    }
    if (INVOICE_TYPE) {
      conditions.push("archive_data->>'$.invoice_type_lookup_code_meaning' LIKE ? ")
      params.push(`%${INVOICE_TYPE}%`)
    }
    if (SUPPLIER_NUMBER) {
      conditions.push("archive_data->>'$.vendor_num' = ?")
      params.push(SUPPLIER_NUMBER)
    }
    if (SUPPLIER_NAME) {
      conditions.push("archive_data->>'$.vendor_name' LIKE ?")
      params.push(`%${SUPPLIER_NAME}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
      SELECT * FROM arc_archive_data WHERE doc_entity_name = "AP_INVOICE" ${conditions.length ? 'AND' : ''}
      ${whereClause} 
      LIMIT ? OFFSET ?
    `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
      SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "AP_INVOICE" ${conditions.length ? 'AND' : ''}
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
  const { INVOICE_ID, LINE_NUMBER } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_LINE_DETAILS,
      values: [INVOICE_ID, LINE_NUMBER],
    })
    const response = rows.map((row: any) => {
      return JSON.parse(row.line_data)
    })
    return response
  } catch (error) {
    console.log('Error at getLineService: ', error)
  }
}
