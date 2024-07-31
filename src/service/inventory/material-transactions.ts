import { queryWithBindExecute } from '../../config/database'
import { query } from '../../constants/query'
import { T_MtlTrxId, T_MtlTrxSearch } from '../../types/services'

export const getMaterialTransactionsBySearchService = async (payload: T_MtlTrxSearch, page: number, limit: number) => {
  const { ORGANIZATION, FROM_DATE, TO_DATE } = payload
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.operating_unit' LIKE ?")
      params.push(`%${ORGANIZATION}%`)
    }
    if (FROM_DATE) {
      if (TO_DATE) {
        conditions.push("archive_data->>'$.trx_date' BETWEEN ? AND ?")
        params.push(FROM_DATE, TO_DATE)
      } else {
        conditions.push("archive_data->>'$.trx_date' >= ?")
        params.push(FROM_DATE)
      }
    }
    if (TO_DATE) {
      conditions.push("archive_data->>'$.trx_date' <= ?")
      params.push(TO_DATE)
    }

    const whereClause = conditions.length ? `${conditions.join('AND')}` : ''

    const offset = (page - 1) * limit
    params.push(limit, offset)

    const query = `SELECT * FROM arc_archive_data WHERE doc_entity_name = "MTL_TRX" ${conditions.length ? 'AND' : ''} ${whereClause} LIMIT ? OFFSET ?;`

    const rows = await queryWithBindExecute({
      sql: query,
      values: params,
    })

    const totalCountQuery = `SELECT COUNT(*) AS totalCount FROM arc_archive_data WHERE doc_entity_name = "MTL_TRX" ${conditions.length ? 'AND' : ''} ${whereClause};`

    const totalCountRow = await queryWithBindExecute({
      sql: totalCountQuery,
      values: params.slice(0, -2),
    })

    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / limit)

    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getMaterialTransactionsBySearch: ', error)
  }
}

export const getMtlTrxByIDService = async (payload: T_MtlTrxId) => {
  const { TRANSACTION_ID } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_ID,
      values: [TRANSACTION_ID, 'MTL_TRX'],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getMtlTrxByIDService: ', error)
  }
}
