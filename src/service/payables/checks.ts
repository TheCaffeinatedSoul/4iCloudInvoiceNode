import { queryWithBindExecute } from '../../config/database'
import { query } from '../../constants/query'
import { T_CheckNumber, T_CheckSearch } from '../../types/services'

export const getDetailsByCheckNumberService = async (payload: T_CheckNumber) => {
  const { CHECK_ID } = payload
  let check_id = CHECK_ID
  if (CHECK_ID.includes('%')) check_id = decodeURIComponent(CHECK_ID)
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_CHECK_DETAILS,
      values: [check_id],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getDetailsByInvoiceNumberService: ', error)
  }
}

export const getChecksBySearchService = async (payload: T_CheckSearch, page: number, limit: number) => {
  const { ORGANIZATION, CHECK_NUMBER, FROM_DATE, TO_DATE, SUPPLIER_NUMBER, SUPPLIER_NAME } = payload
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.org_name' LIKE ?")
      params.push(`%${ORGANIZATION}%`)
    }
    if (FROM_DATE) {
      if (TO_DATE) {
        conditions.push("archive_data->>'$.check_date' BETWEEN ? AND ?")
        params.push(FROM_DATE, TO_DATE)
      } else {
        conditions.push("archive_data->>'$.check_date' >= ?")
        params.push(FROM_DATE)
      }
    }
    if (TO_DATE) {
      conditions.push("archive_data->>'$.check_date' <= ?")
      params.push(TO_DATE)
    }
    if (CHECK_NUMBER) {
      conditions.push("archive_data->>'$.check_number' LIKE ?")
      params.push(`%${CHECK_NUMBER}%`)
    }
    if (SUPPLIER_NUMBER) {
      conditions.push("archive_data->>'$.vendor_number' = ?")
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
      SELECT * FROM arc_archive_data WHERE doc_entity_name = "AP_CHECKS" ${conditions.length ? 'AND' : ''}
      ${whereClause} 
      LIMIT ? OFFSET ?
    `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
      SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "AP_CHECKS" ${conditions.length ? 'AND' : ''}
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

export const getLineService = async (payload: T_CheckNumber) => {
  const { CHECK_ID } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_LINE_DETAILS,
      values: [CHECK_ID],
    })
    const response = rows.map((row: any) => {
      return JSON.parse(row.line_data)
    })
    return response
  } catch (error) {
    console.log('Error at getLineService: ', error)
  }
}
