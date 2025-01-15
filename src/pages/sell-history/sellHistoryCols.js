import UpdateInvoice from "./UpdateInvoice";
export const sellHistoryCols = [
  {
    field: "id",
    headerName: "ID",
    hideable: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 170,
  },
  { field: "address", headerName: "Address", width: 130 },
  { field: "date", headerName: "Date", width: 140 },
  { field: "invoiceNo", headerName: "Invoice No", width: 100 },
  { field: "gst", headerName: "GST No", width: 150 },
  { field: "gstAmount", headerName: "GST Amount", width: 130 },
  { field: "otherExpenses", headerName: "Other Expenses Amount", width: 150 },
  { field: "otherExpensesText", headerName: "Other Expenses For", width: 150 },
  { field: "grandTotal", headerName: "Grand Total", width: 130 },
  { field: "vehicleNo", headerName: "Vehicle No", width: 90 },
  {
    field: "_id",
    headerName: "Action",
    width: 50,
    renderCell: UpdateInvoice,
  },
];
