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
    width: 220,
  },
  // { field: "address", headerName: "Address", width: 130 },
  { field: "invoiceNo", headerName: "Invoice No", width: 150 },
  { field: "deliveryChNo", headerName: "Delivery Challan No", width: 150 },
  { field: "invoiceDate", headerName: "Invoice Date", width: 140 },
  { field: "gst", headerName: "GST No", width: 160 },
  // { field: "gstAmount", headerName: "GST Amount", width: 130 },
  // { field: "otherExpenses", headerName: "Other Expenses Amount", width: 150 },
  // { field: "otherExpensesText", headerName: "Other Expenses For", width: 150 },
  {
    field: "grandTotal",
    headerName: "Grand Total",
    renderCell: (params) => {
      return params?.row?.totalProductAmount
        ? params?.row?.totalProductAmount
        : params?.row?.grandTotal;
    },
    width: 150,
  },
  // { field: "vehicleNo", headerName: "Vehicle No", width: 90 },
  {
    field: "_id",
    headerName: "Action",
    width: 150,
    renderCell: UpdateInvoice,
  },
];
