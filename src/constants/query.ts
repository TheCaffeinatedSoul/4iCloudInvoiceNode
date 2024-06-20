export const query = Object.freeze({
  GET_DETAILS_BY_INVOICE_NUMBER: `SELECT * FROM arc_archive_data where doc_number = ? AND doc_entity_name = "AP_INVOICE"`,
  GET_LINE_DETAILS: `SELECT JSON_UNQUOTE(JSON_EXTRACT(invoice_line.data, '$')) AS line_data
       FROM arc_archive_data
       JOIN JSON_TABLE(
         arc_archive_data.archive_data,
         '$.ap_invoice_lines_all[*]' 
         COLUMNS (
           line_number INT PATH '$.line_number',
           data JSON PATH '$'
         )
       ) AS invoice_line
       ON arc_archive_data.doc_number = ? AND invoice_line.line_number = ?`,
})
