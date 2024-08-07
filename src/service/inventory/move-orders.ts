import { queryWithBindExecute } from '../../config/database'
import { entities } from '../../constants/entities'
import { query } from '../../constants/query'
import { T_MoveOrderSearch } from '../../types/services'

export const getMoveOrdersBySearchService = async (payload: T_MoveOrderSearch, page: number, limit: number) => {
  const { ORGANIZATION, RECEIPT_NUMBER, FROM_DATE, TO_DATE } = payload
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.ORGANIZATION_NAME' LIKE ?")
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

    if (RECEIPT_NUMBER) {
      conditions.push("archive_data->>'$.RECEIPT_NUM' LIKE ?")
      params.push(`%${RECEIPT_NUMBER}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''

    const offset = (page - 1) * limit
    params.push(limit, offset)

    const query = `SELECT * FROM arc_archive_data WHERE doc_entity_name = "${entities.MOV_ORD}" ${conditions.length ? 'AND' : ''} ${whereClause} LIMIT ? OFFSET ?;`

    const rows = await queryWithBindExecute({ sql: query, values: params })

    const totalCountQuery = `SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = '${entities.MOV_ORD}' ${conditions.length ? `AND ${whereClause}` : ''}`

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / limit || 10)

    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getMoveOrdersBySearchService: ', error)
  }
}

export const getMoveOrderDetailsService = async (payload: T_MoveOrderSearch) => {
  const { HEADER_ID } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_ID,
      values: [HEADER_ID, entities.MOV_ORD],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getMoveOrderDetailsService: ', error)
  }
}
