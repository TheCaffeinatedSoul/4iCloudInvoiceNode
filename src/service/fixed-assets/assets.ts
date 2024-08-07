import { queryWithBindExecute } from '../../config/database'
import { entities } from '../../constants/entities'
import { query } from '../../constants/query'
import { T_AssetId, T_AssetSearch } from '../../types/services'

export const getAssetsBySearchService = async (payload: T_AssetSearch, page: number, limit: number) => {
  const { ORGANIZATION, ASSET_NUMBER, NEW_OR_USED, PROPERTY_TYPE, FROM_DATE, TO_DATE } = payload

  try {
    const conditions = []
    const params = []

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
    if (ASSET_NUMBER) {
      conditions.push("archive_data->>'$.asset_number' LIKE ?")
      params.push(`%${ASSET_NUMBER}%`)
    }
    if (NEW_OR_USED) {
      conditions.push("archive_data->>'$.new_used' LIKE ?")
      params.push(`%${NEW_OR_USED.toUpperCase()}%`)
    }
    if (PROPERTY_TYPE) {
      conditions.push("archive_data->>'$.property_type_code' LIKE ?")
      params.push(`%${PROPERTY_TYPE.toUpperCase()}%`)
    }

    const whereClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    const offset = (page - 1) * limit
    params.push(limit)
    params.push(offset)

    const query = `
      SELECT * FROM arc_archive_data WHERE doc_entity_name = "${entities.FA_BOOKS_V}" ${conditions.length ? 'AND' : ''}
      ${whereClause} 
      LIMIT ? OFFSET ?
    `

    const rows = await queryWithBindExecute({ sql: query, values: params })
    const totalCountQuery = `
      SELECT COUNT(*) as totalCount FROM arc_archive_data WHERE doc_entity_name = "${entities.FA_BOOKS_V}" ${conditions.length ? 'AND' : ''}
      ${whereClause}
    `

    const totalCountRow = await queryWithBindExecute({ sql: totalCountQuery, values: params.slice(0, -2) })
    const totalCount = totalCountRow[0].totalCount
    const pageCount = Math.ceil(totalCount / (limit || 10))
    const response = rows.map((row: any) => row.archive_data)

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getAssetsBySearchService: ', error)
  }
}

export const getAssetDetailsByAssetIdService = async (payload: T_AssetId) => {
  const { ASSET_ID } = payload
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DETAILS_BY_ID,
      values: [ASSET_ID, entities.FA_BOOKS_V],
    })
    const response = rows.map((row: any) => {
      return row.archive_data
    })
    return response
  } catch (error) {
    console.log('Error at getAssetDetailsByAssetIdService: ', error)
  }
}

export const getDepreciationDetailsService = async (payload: T_AssetId, page: number, limit: number) => {
  const { ASSET_ID, TRANSACTION_HEADER_ID } = payload
  const offset = (page - 1) * limit
  try {
    const rows = await queryWithBindExecute({
      sql: query.GET_DEPRECIATION_DETAILS,
      values: [ASSET_ID, TRANSACTION_HEADER_ID, limit, offset],
    })
    const response = rows.map((row: any) => {
      return JSON.parse(row.depreciations_data)
    })

    const totalCount = await queryWithBindExecute({
      sql: query.GET_DEPRECIATION_DETAILS_PAGECOUNT,
      values: [ASSET_ID, TRANSACTION_HEADER_ID],
    })
    const pageCount = Math.ceil(totalCount[0].total_depreciations_count / (limit || 10))

    return { data: response, pageCount }
  } catch (error) {
    console.log('Error at getDepreciationDetailsService: ', error)
  }
}
