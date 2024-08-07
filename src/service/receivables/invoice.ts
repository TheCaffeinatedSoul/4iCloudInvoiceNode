import { queryWithBindExecute } from '../../config/database'
import { entities } from '../../constants/entities'
import { query } from '../../constants/query'
import { T_ReceivableInvoiceSearch, T_TransactionNumber } from '../../types/services'

export const getInvoiceBySearchService = async (payload: T_ReceivableInvoiceSearch, page: number, limit: number) => {
  const { ORGANIZATION, INVOICE_NUMBER, INVOICE_TYPE, INVOICE_CLASS, FROM_DATE, TO_DATE } = payload
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
    if (INVOICE_NUMBER) {
      conditions.push("archive_data->>'$.trx_number' LIKE ?")
      params.push(`%${INVOICE_NUMBER}%`)
    }
    if (INVOICE_TYPE) {
      conditions.push("archive_data->>'$.cust_trx_type_name' LIKE ? ")
      params.push(`%${INVOICE_TYPE}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
        SELECT * FROM arc_archive_data WHERE doc_entity_name = "${entities.AR_INVOICE}" ${conditions.length ? 'AND' : ''}
        ${whereClause} 
        LIMIT ? OFFSET ?
      `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
        SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "${entities.AR_INVOICE}" ${conditions.length ? 'AND' : ''}
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
      sql: query.GET_DETAILS_BY_ID,
      values: [transaction_num, entities.AR_INVOICE],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getTransactionDetailsService: ', error)
  }
}

export const getLineService = async (payload: T_TransactionNumber) => {
  const { CUSTOMER_TRX_ID, LINE_NUMBER } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_AR_DISTRIBUTIONS,
      values: [CUSTOMER_TRX_ID, LINE_NUMBER],
    })
    const response = rows.map((row: any) => {
      return JSON.parse(row.line_data)
    })
    return response
  } catch (error) {
    console.log('Error at getLineService: ', error)
  }
}
