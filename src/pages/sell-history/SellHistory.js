// import { SellHistory } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_LIST } from "../../constants/routes";
import { useEffect } from "react";
import DataTable from "../../components/common/DataTable/DataTable";
import { sellHistoryCols } from "./sellHistoryCols";
import { useDispatch, useSelector } from "react-redux";
import { getSellData, getSellsHistory } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
const SellHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allSellsHistory, isInvoiceSave, sellData } = useSelector(
    (state) => state.api
  );

  useEffect(() => {
    if (!allSellsHistory || isInvoiceSave) {
      dispatch(
        getSellsHistory({
          method: "get",
          endpoint: API_ENDPOINTS.getSellsHistoryData,
        })
      );
    }
  }, []);

  useEffect(() => {
    console.log("sell data", sellData);
    console.log("29 da", isInvoiceSave, allSellsHistory);
    if (sellData?.invoiceNo) {
      navigate(ROUTES_LIST.pdfViewer, { state: sellData });
    }
  }, [sellData]);

  const handleGetSelectedRows = (rowIds) => {
    console.log("row", rowIds);
    dispatch(
      getSellData({
        method: "get",
        endpoint: API_ENDPOINTS.getSellData,
        payload: { invoiceNo: rowIds[0] },
      })
    );
  };
  return (
    <div className="h-full items-center justify-center">
      <DataTable
        cols={sellHistoryCols}
        data={allSellsHistory?.length ? allSellsHistory : []}
        // checkboxSelection={true}
        getSelectedRows={handleGetSelectedRows}
        // rowSelectionModel={selectedRows}
        // tableProps={{
        //   isRowSelectable: (params) =>
        //     params.row.status !== AMOUNT_PAID.PENDING,
        // }}
      />
    </div>
  );
};
export default SellHistory;
