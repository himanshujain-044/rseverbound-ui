import { useNavigate } from "react-router-dom";
import { ROUTES_LIST } from "../../constants/routes";
import { useEffect, useState } from "react";
import DataTable from "../../components/common/DataTable/DataTable";
import { sellHistoryCols } from "./sellHistoryCols";
import { useDispatch, useSelector } from "react-redux";
import { clearSomeStates, getSellData, getSellsHistory } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
const SellHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allSellsHistory, isInvoiceSave, sellData, isInvoiceUpdated } =
    useSelector((state) => state.api);

  const [isRowClicked, setIsRowClicked] = useState(false);
  useEffect(() => {
    if (!allSellsHistory || isInvoiceSave || isInvoiceUpdated) {
      dispatch(
        getSellsHistory({
          method: "get",
          endpoint: API_ENDPOINTS.getSellsHistoryData,
        }),
      );
    }
    dispatch(clearSomeStates({ stateKeys: ["sellsReportsData"] }));
  }, [isInvoiceUpdated, isInvoiceSave]);

  useEffect(() => {
    if ((sellData?.invoiceNo || sellData?.deliveryChNo) && isRowClicked) {
      navigate(ROUTES_LIST.pdfViewer, { state: sellData });
    }
  }, [sellData]);

  const handleOnCellClick = (cellParams) => {
    if (cellParams.field !== "_id") {
      setIsRowClicked(true);
      dispatch(
        getSellData({
          method: "get",
          endpoint: API_ENDPOINTS.getSellData,
          payload: {
            invoiceNo: cellParams?.row?.invoiceNo
              ? cellParams?.row?.invoiceNo
              : "",
            deliveryChNo: cellParams?.row?.deliveryChNo
              ? cellParams?.row?.deliveryChNo
              : "",
          },
        }),
      );
    }
  };
  const getRowClassName = (params) => {
    if (params.row.isInvoiceCancel) {
      return "line-through"; // Apply a CSS class to disable this row
    }
    return "";
  };
  return (
    <div className="h-full items-center justify-center">
      <DataTable
        cols={sellHistoryCols}
        data={allSellsHistory?.length ? allSellsHistory : []}
        onCellClick={handleOnCellClick}
        tableProps={{ getRowClassName: getRowClassName }}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: "invoiceNo", sort: "desc" }],
          },
        }}
      />
    </div>
  );
};
export default SellHistory;
