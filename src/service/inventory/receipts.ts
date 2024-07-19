import { queryWithBindExecute } from '../../config/database'
import { T_InvReceiptSearch } from '../../types/services'

export const getReceiptsBySearchService = async (payload: T_InvReceiptSearch, page: number, limit: number) => {
  const { ORGANIZATION, RECEIPT_NUMBER, SUPPLIER_NAME, SUPPLIER_NUMBER, FROM_DATE, TO_DATE } = payload
  
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.ORGANIZATION_NAME' LIKE ?")
      params.push(`%${ORGANIZATION}%`)
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

    if (RECEIPT_NUMBER) {
      conditions.push("archive_data->>'$.RECEIPT_NUM' LIKE ?")
      params.push(`%${RECEIPT_NUMBER}%`)
    }

    if (SUPPLIER_NAME) {
      conditions.push("archive_data->>'$.VENDOR_NAME' LIKE ?")
      params.push(`%${SUPPLIER_NAME}%`)
    }

    if (SUPPLIER_NUMBER) {
      conditions.push("archive_data->>'$.VENDOR_NUMBER' LIKE ?")
      params.push(`%${SUPPLIER_NUMBER}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `SELECT * FROM arc_archive_data WHERE doc_entity_name = "RCV_HEADERS" ${conditions.length ? 'AND' : ''} ${whereClause} LIMIT ? OFFSET ?`

    const rows = await queryWithBindExecute({ sql: query, values: params })

    const totalCountQuery = `SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "RCV_HEADERS" ${conditions.length ? 'AND' : ''} ${whereClause}`

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)
    return {
      data: response,
      pageCount,
    }
  } catch (error) {
    console.log('Error getting receipts by search: ', error)
  }
}
