export const reportsCols = [
  {
    field: "id",
    headerName: "ID",
    hideable: true,
  },
  {
    field: "date",
    headerName: "Billing Date",
    width: 170,
  },
  { field: "invoiceNo", headerName: "Invoice No.", width: 130 },
  { field: "gst", headerName: "GSTIN", width: 140 },
  { field: "name", headerName: "Name", width: 80 },
  { field: "weight", headerName: "Weight (MT)", width: 150 },
  { field: "amount", headerName: "Billing Amont", width: 130 },
  { field: "otherExpensesGST", headerName: "Other GST Expenses", width: 150 },
  { field: "sgst", headerName: "SGST", width: 150 },
  { field: "cgst", headerName: "CGST", width: 130 },
  { field: "igst", headerName: "IGST", width: 90 },
  { field: "totalAmount", headerName: "Total (Bill+Tax)", width: 90 },
];
