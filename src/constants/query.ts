export const login = Object.freeze({
  //LOGIN QUERY
  LOGIN: `SELECT * FROM arc_user WHERE user_name = ? AND encrypted_password = ?`,
})

export const query = Object.freeze({
  //ID SPECIFIC
  GET_DETAILS_BY_ID: `SELECT * FROM arc_archive_data WHERE doc_pk_id = ? AND doc_entity_name = ?`,

  //AP_INVOICE
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

  //AR_INVOICE
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

  //REQ_HEADERS
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
		 '$.po_lines_all[*].po_lines_locations_all[*]' 
         COLUMNS (
		   po_line_location_id INT PATH '$.line_location_id',
           data JSON PATH '$'
         )
       ) AS po_distributions_all
       WHERE arc_archive_data.doc_pk_id = ? AND po_distributions_all.po_line_location_id= ?`,

  //AP_ASSETS
  GET_ASSET_DETAILS: `SELECT * FROM arc_archive_data WHERE doc_pk_id = ? AND doc_entity_name = "FA_BOOKS_V"`,
  GET_DEPRECIATION_DETAILS: `SELECT 
  JSON_UNQUOTE(JSON_EXTRACT(books.data, '$')) AS depreciations_data
FROM 
  arc_archive_data,
  JSON_TABLE(
    arc_archive_data.archive_data,
    '$.fa_books[*]' 
    COLUMNS (
      transaction_header_id_in INT PATH '$.transaction_header_id_in',
      fa_financial_inquiry_deprn_v JSON PATH '$.fa_financial_inquiry_deprn_v',
      data JSON PATH '$'
    )
  ) AS books,
  JSON_TABLE(
    books.fa_financial_inquiry_deprn_v,
    '$[*]' 
    COLUMNS (
      data JSON PATH '$'
    )
  ) AS depreciation
WHERE 
  arc_archive_data.doc_pk_id = ?
  AND books.transaction_header_id_in = ?
LIMIT ? OFFSET ?`,
  GET_DEPRECIATION_DETAILS_PAGECOUNT: `SELECT 
  SUM(JSON_LENGTH(fa_books.fa_financial_inquiry_deprn_v)) AS total_depreciations_count
FROM 
  arc_archive_data,
  JSON_TABLE(
    arc_archive_data.archive_data,
    '$.fa_books[*]' 
    COLUMNS (
      transaction_header_id_in INT PATH '$.transaction_header_id_in',
      fa_financial_inquiry_deprn_v JSON PATH '$.fa_financial_inquiry_deprn_v'
    )
  ) AS fa_books
WHERE 
  arc_archive_data.doc_pk_id = ? 
  AND fa_books.transaction_header_id_in = ?;
`,

  //GL_JE_BATCHES
  GET_JOURNAL_LINES: `SELECT JSON_UNQUOTE(JSON_EXTRACT(gl_je_lines.data,'$')) AS line_data 
	FROM arc_archive_data
	JOIN JSON_TABLE(arc_archive_data.archive_data,
					'$.gl_je_headers[*]'
                    COLUMNS( je_header_id INT PATH '$.je_header_id',
								data JSON PATH '$'
							)
					) AS gl_je_lines
                    ON arc_archive_data.doc_pk_id = ? AND je_header_id = ?`,

  //RCV HEADERS
  GET_INV_RECEIPT_LINES_BY_ID: `SELECT JSON_UNQUOTE(JSON_EXTRACT(receipt_lines.data,'$')) AS line_data
                                FROM arc_archive_data
                                JOIN JSON_TABLE(arc_archive_data.archive_data,
                                                '$.rcv_shipment_lines[*]'
                                                COLUMNS(
                                                  PO_LINE_ID INT PATH '$.PO_LINE_ID',
                                                  data JSON PATH '$')
                                                ) AS receipt_lines
                                ON arc_archive_data.doc_pk_id = ? AND PO_LINE_ID = ?`,
})
