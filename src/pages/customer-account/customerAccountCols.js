export const customerDebitAcCols = [
  {
    field: "invoiceDate",
    headerName: "Billing Date",
    width: 170,
  },
  { field: "invoiceNo", headerName: "Invoice No.", width: 150 },
  { field: "gstAmount", headerName: "GST Amount", width: 150 },
  { field: "grandTotal", headerName: "Total (Bill+Tax)", width: 150 },
  ,
];

export const customerCreditAcCols = [
  {
    field: "date",
    headerName: "Credit Date",
    width: 170,
  },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "description", headerName: "Description", width: 150 },
];
