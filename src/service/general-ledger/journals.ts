import { queryWithBindExecute } from '../../config/database'
import { T_JournalSearch } from '../../types/services'

export const getJournalsBySearchService = async (payload: T_JournalSearch, page: number, limit: number) => {
  const { BATCH_NAME, SOURCE, LEDGER, JOURNAL_NAME, PERIOD_NAME, FROM_DATE, TO_DATE } = payload
  try {
    const conditions = []
    const params = []

    if (BATCH_NAME) {
      conditions.push("archive_data->>'$.gl_je_headers.batch_name' LIKE ?")
      params.push(BATCH_NAME)
    }
    if (SOURCE) {
      conditions.push("archive_data->>'$.gl_je_headers.je_source' LIKE ?")
      params.push(SOURCE)
    }
    if (LEDGER) {
      conditions.push("archive_data->>'$.gl_je_headers.gl_je_lines.ledger_name' LIKE ?")
      params.push(LEDGER)
    }
    if (JOURNAL_NAME) {
      conditions.push("archive_date->>'$.gl_je_headers.je_name' LIKE ?")
      params.push(JOURNAL_NAME)
    }
    if (PERIOD_NAME) {
      conditions.push("archive_data->>'$.gl_je_headers.period_name' LIKE ?")
      params.push(PERIOD_NAME)
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
        SELECT * FROM arc_archive_data WHERE doc_entity_name = "GL_JE_BATCHES" ${conditions.length ? 'AND' : ''}
        ${whereClause} 
        LIMIT ? OFFSET ?
      `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
        SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "GL_JE_BATCHES" ${conditions.length ? 'AND' : ''}
        ${whereClause}
      `

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {}
}
