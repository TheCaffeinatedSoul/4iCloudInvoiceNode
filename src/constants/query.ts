export const query = Object.freeze({
  //AP_INVOICE
  GET_DETAILS_BY_INVOICE_NUMBER: `SELECT * FROM arc_archive_data where doc_pk_id = ? AND doc_entity_name = "AP_INVOICE"`,
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
       ON arc_archive_data.doc_pk_id = ? AND invoice_line.line_number = ?`,

  //AP_CHECKS
  GET_CHECK_DETAILS: `SELECT * FROM arc_archive_data WHERE doc_pk_id = ? AND doc_entity_name = "AP_CHECKS"`,

  //AR_INVOICE
  GET_TRANSACTION_DETAILS: `SELECT * FROM arc_archive_data WHERE doc_pk_id = ? AND doc_entity_name = "AR_INVOICE"`,
  GET_AR_DISTRIBUTIONS: `SELECT JSON_UNQUOTE(JSON_EXTRACT(ar_invoice_line.data, '$')) AS line_data
       FROM arc_archive_data
       JOIN JSON_TABLE(
         arc_archive_data.archive_data,
         '$.ra_customer_trx_lines_all[*]' 
         COLUMNS (
           line_number INT PATH '$.line_number',
           data JSON PATH '$'
         )
       ) AS ar_invoice_line
       ON arc_archive_data.doc_pk_id = ? AND ar_invoice_line.line_number = ?`,

  //AR_RECEIPT
  GET_RECEIPT_DETAILS: `SELECT * FROM arc_archive_data WHERE doc_pk_id = ? AND doc_entity_name = "AR_RECEIPT"`,

  //REQ_HEADERS
  GET_DETAILS_BY_REQUISITION_NUMBER: `SELECT * FROM arc_archive_data where doc_pk_id = ? AND doc_entity_name = "REQ_HEADERS"`,
  GET_REQUISITION_LINES: `SELECT JSON_UNQUOTE(JSON_EXTRACT(requisition_line.data, '$')) AS line_data
       FROM arc_archive_data
       JOIN JSON_TABLE(
         arc_archive_data.archive_data,
         '$.requisition_lines[*]' 
         COLUMNS (
           line_num INT PATH '$.line_num',
           data JSON PATH '$'
         )
       ) AS requisition_line
       ON arc_archive_data.doc_pk_id = ? AND requisition_line.line_num = ?`,

  //PO_HEADERS
  GET_DETAILS_BY_PO_NUMBER: `SELECT * FROM arc_archive_data where doc_pk_id = ? AND doc_entity_name = "PO_HEADERS"`,
  GET_PO_LINE_DETAILS: `SELECT JSON_UNQUOTE(JSON_EXTRACT(po_line.data, '$')) AS line_data
       FROM arc_archive_data
       JOIN JSON_TABLE(
         arc_archive_data.archive_data,
         '$.po_lines_all[*]' 
         COLUMNS (
           line_num INT PATH '$.line_num',
           data JSON PATH '$'
         )
       ) AS po_line
       ON arc_archive_data.doc_pk_id = ? AND po_line.line_num = ?`,
  GET_PO_LINE_LOCATION_DETAILS: `SELECT JSON_UNQUOTE(JSON_EXTRACT(po_distributions_all.data, '$')) AS line_location_data
       FROM arc_archive_data
       JOIN JSON_TABLE(
         arc_archive_data.archive_data,
		 '$.po_lines_all[*].po_lines_locations_all[*].po_distributions_all[*]' 
         COLUMNS (
		   po_line_location_id INT PATH '$.line_location_id',
           data JSON PATH '$'
         )
       ) AS po_distributions_all
       ON arc_archive_data.doc_pk_id = ? AND po_line_location_id= ?`,
})
