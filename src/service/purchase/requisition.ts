import { queryWithBindExecute } from '../../config/database'
import { query } from '../../constants/query'
import { T_PORequisitionSearch, T_RequisitionNumber } from '../../types/services'

export const getRequisitionBySearchService = async (payload: T_PORequisitionSearch, page: number, limit: number) => {
  const { ORGANIZATION, REQUISITION_NUMBER, FROM_DATE, TO_DATE } = payload
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.organization_name' LIKE ?")
      params.push(`%${ORGANIZATION}%`)
    }
    if (FROM_DATE) {
      if (TO_DATE) {
        conditions.push("archive_data->>'$.creation_date' BETWEEN ? AND ?")
        params.push(FROM_DATE, TO_DATE)
      } else {
        conditions.push("archive_data->>'$.creation_date' >= ?")
        params.push(FROM_DATE)
      }
    }
    if (TO_DATE) {
      conditions.push("archive_data->>'$.creation_date' <= ?")
      params.push(TO_DATE)
    }
    if (REQUISITION_NUMBER) {
      conditions.push("archive_data->>'$.requisition_number' LIKE ?")
      params.push(`%${REQUISITION_NUMBER}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
        SELECT * FROM arc_archive_data WHERE doc_entity_name = "REQ_HEADERS" ${conditions.length ? 'AND' : ''}
        ${whereClause} 
        LIMIT ? OFFSET ?
      `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
        SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "REQ_HEADERS" ${conditions.length ? 'AND' : ''}
        ${whereClause}
      `

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getRequisitionBySearchService: ', error)
  }
}

export const getDetailsByRequisitionNumberService = async (payload: T_RequisitionNumber) => {
  const { REQUISITION_NUMBER } = payload
  let req_num = REQUISITION_NUMBER
  if (REQUISITION_NUMBER.includes('%')) req_num = decodeURIComponent(REQUISITION_NUMBER)
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_REQUISITION_NUMBER,
      values: [req_num],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {}
}

export const getLineService = async (payload: T_RequisitionNumber) => {
  const { REQUISITION_NUMBER, LINE_NUMBER } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_REQUISITION_LINES,
      values: [REQUISITION_NUMBER, LINE_NUMBER],
    })
    const response = rows.map((row: any) => {
      return JSON.parse(row.line_data)
    })
    return response
  } catch (error) {
    console.log('Error at getLineService: ', error)
  }
}
