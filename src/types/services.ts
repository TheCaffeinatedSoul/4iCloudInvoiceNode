export type T_InvoiceNumber = {
  INVOICE_ID: string
  LINE_NUMBER: number
}

export type T_InvoiceSearch = {
  ORGANIZATION: string
  INVOICE_NUMBER: string
  INVOICE_TYPE: string
  SUPPLIER_NUMBER: string
  SUPPLIER_NAME: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_CheckNumber = {
  CHECK_ID: string
}

export type T_CheckSearch = {
  ORGANIZATION: string
  CHECK_NUMBER: string
  SUPPLIER_NAME: string
  SUPPLIER_NUMBER: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_TransactionNumber = {
  TRANSACTION_NUMBER: string
  CUSTOMER_TRX_ID: string
  LINE_NUMBER: string
}

export type T_ReceiptNumber = {
  CASH_RECEIPT_ID: string
}

export type T_ReceivableInvoiceSearch = {
  ORGANIZATION: string
  INVOICE_NUMBER: string
  INVOICE_TYPE: string
  INVOICE_CLASS: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_ReceivableReceiptSearch = {
  ORGANIZATION: string
  RECEIPT_NUMBER: string
  BANK_NAME: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_PORequisitionSearch = {
  ORGANIZATION: string
  REQUISITION_NUMBER: string
  PREPARER: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_RequisitionNumber = {
  REQUISITION_ID: string
  LINE_NUMBER: number
}

export type T_POSearch = {
  ORGANIZATION: string
  BUYER: string
  PO_NUMBER: string
  APPROVAL_STATUS: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_PONumber = {
  PO_HEADER_ID: string
  LINE_NUMBER: string
  LINE_LOCATION_ID: string
}

export type T_JournalSearch = {
  BATCH_NAME: string
  SOURCE: string
  LEDGER: string
  JOURNAL_NAME: string
  FROM_DATE: string
  TO_DATE: string
  PERIOD_NAME: string
}

export type T_Journals = {
  BATCH_ID: string
  HEADER_ID: string
}

export type T_AssetSearch = {
  ORGANIZATION: string
  ASSET_NUMBER: string
  FROM_DATE: string
  TO_DATE: string
  NEW_OR_USED: string
  PROPERTY_TYPE: string
}

export type T_AssetId = {
  ASSET_ID: string
  TRANSACTION_HEADER_ID: string
}

export type T_InvReceiptSearch = {
  ORGANIZATION: string
  RECEIPT_NUMBER: string
  SUPPLIER_NAME: string
  SUPPLIER_NUMBER: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_InvReceiptID = {
  RECEIPT_NUMBER: string
  LINE_ID: string
}

export type T_SalesOrderSearch = {
  ORGANIZATION: string
  SALESPERSON: string
  SOURCE: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_SalesOrder = {
  HEADER_ID: string
}

export type T_MoveOrderSearch = {
  HEADER_ID: string
  ORGANIZATION: string
  RECEIPT_NUMBER: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_MtlTrxSearch = {
  ORGANIZATION: string
  ITEM: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_MtlTrxId = {
  TRANSACTION_ID: string
}

export type T_ShpTrxSearch = {
  ORGANIZATION: string
  STATUS: string
  FROM_DATE: string
  TO_DATE: string
}
