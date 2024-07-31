import { queryWithBindExecute } from '../../config/database'
import { query } from '../../constants/query'
import { T_SalesOrder, T_SalesOrderSearch } from '../../types/services'

export const getSalesOrderBySearchService = async (payload: T_SalesOrderSearch, page: number, limit: number) => {
  const { ORGANIZATION, ORDER_NUMBER, FROM_DATE, TO_DATE } = payload

  try {
    const conditions = []
    const params = []

    if (ORDER_NUMBER) {
      conditions.push("archive_data->>'$.order_number' LIKE ?")
      params.push(`%${ORDER_NUMBER}%`)
    }

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.org_name' LIKE ?")
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

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
        SELECT * FROM arc_archive_data WHERE doc_entity_name = "OE_HEADER" ${conditions.length ? 'AND' : ''}
        ${whereClause} 
        LIMIT ? OFFSET ?
      `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
        SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "OE_HEADER" ${conditions.length ? 'AND' : ''}
        ${whereClause}
      `

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error in getSalesOrderBySearchService: ', error)
  }
}

export const getSalesOrderDetailsService = async (payload: T_SalesOrder) => {
  const { HEADER_ID } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_ID,
      values: [HEADER_ID, 'OE_HEADER'],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error in getSalesOrderDetailsService: ', error)
  }
}
