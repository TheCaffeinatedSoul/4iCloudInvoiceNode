export type T_InvoiceNumber = {
  INVOICE_NUMBER: string
  LINE_NUMBER: number
}

export type T_InvoiceSearch = {
  ORGANIZATION: string
  INVOICE_NUMBER: string
  SUPPLIER_NUMBER: string
  SUPPLIER_NAME: string
  FROM_DATE: string
  TO_DATE: string
}

export type T_CheckNumber = {
  CHECK_NUMBER: string
}

export type T_CheckSearch = {
  ORGANIZATION: string
  CHECK_NUMBER: string
  SUPPLIER_NAME: string
  SUPPLIER_NUMBER: string
  FROM_DATE: string
  TO_DATE: string
}
