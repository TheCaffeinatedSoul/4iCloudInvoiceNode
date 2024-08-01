import { queryWithBindExecute } from '../../config/database'
import { T_ShpTrxSearch } from '../../types/services'

export const getShippingTransactionBySearchService = async (payload: T_ShpTrxSearch, page: number, limit: number) => {
  const { ORGANIZATION, STATUS, FROM_DATE, TO_DATE } = payload
  try {
    let conditions = []
    let params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.ORGANIZATION_NAME' LIKE ?")
      params.push(`%${ORGANIZATION}%`)
    }
    if (STATUS) {
      conditions.push("archive_data->>'$.LINE_STATUS' LIKE ?")
      params.push(`%${STATUS}%`)
    }
    if (FROM_DATE) {
      if (TO_DATE) {
        conditions.push("archive_data->>'$.CREATION_DATE' BETWEEN ? AND ?")
        params.push(FROM_DATE, TO_DATE)
      } else {
        conditions.push("archive_data->>'$.CREATION_DATE' >= ?")
        params.push(FROM_DATE)
      }
    }
    if (TO_DATE) {
      conditions.push("archive_data->>'$.CREATION_DATE' <= ?")
      params.push(TO_DATE)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit, offset)

    const query = `SELECT * FROM arc_archive_data WHERE doc_entity_name = "OE_SHIPPING" ${conditions.length ? 'AND' : ''} ${whereClause} LIMIT ? OFFSET ?`

    const rows = await queryWithBindExecute({
      sql: query,
      values: params,
    })
    const totalCountQuery = `SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "OE_SHIPPING" ${conditions.length ? 'AND' : ''} ${whereClause}`

    const totalCountRow = await queryWithBindExecute({
      sql: totalCountQuery,
      values: params.slice(0, -2),
    })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / limit)
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getShippingTransactionBySearchService: ', error)
  }
}
