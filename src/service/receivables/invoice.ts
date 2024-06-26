import { queryWithBindExecute } from '../../config/database'
import { query } from '../../constants/query'
import { T_ReceivableInvoiceSearch, T_TransactionNumber } from '../../types/services'

export const getInvoiceBySearchService = async (payload: T_ReceivableInvoiceSearch, page: number, limit: number) => {
  const { ORGANIZATION, TRANSACTION_NUMBER, FROM_DATE, TO_DATE } = payload
  try {
    const conditions = []
    const params = []

    if (ORGANIZATION) {
      conditions.push("archive_data->>'$.org_name' LIKE ?")
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
    if (TRANSACTION_NUMBER) {
      conditions.push("archive_data->>'$.trx_number' LIKE ?")
      params.push(`%${TRANSACTION_NUMBER}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
        SELECT * FROM arc_archive_data WHERE doc_entity_name = "AR_INVOICE" ${conditions.length ? 'AND' : ''}
        ${whereClause} 
        LIMIT ? OFFSET ?
      `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
        SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "AR_INVOICE" ${conditions.length ? 'AND' : ''}
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

export const getTransactionDetailsService = async (payload: T_TransactionNumber) => {
  const { TRANSACTION_NUMBER } = payload
  let transaction_num = TRANSACTION_NUMBER
  if (TRANSACTION_NUMBER.includes('%')) transaction_num = decodeURIComponent(TRANSACTION_NUMBER)
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_TRANSACTION_DETAILS,
      values: [transaction_num],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getTransactionDetailsService: ', error)
  }
}
