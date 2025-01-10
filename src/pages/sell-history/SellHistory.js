// import { SellHistory } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES_LIST } from "../../constants/routes";
import { useEffect } from "react";
import DataTable from "../../components/common/DataTable/DataTable";
import { sellHistoryCols } from "./sellHistoryCols";
import { useDispatch, useSelector } from "react-redux";
import { getSellsHistory } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
const SellHistory = () => {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  //   const data = location.state;
  //   const onClickBackToDashboard = () => {
  //     navigate({
  //       pathname: ROUTES_LIST.dashboard,
  //     });
  //   };
  const dispatch = useDispatch();
  const { allSellsHistory, isInvoiceSave } = useSelector((state) => state.api);
  useEffect(() => {
    console.log("22", allSellsHistory);
    if (!allSellsHistory || isInvoiceSave) {
      dispatch(
        getSellsHistory({
          method: "get",
          endpoint: API_ENDPOINTS.getSellsHistoryData,
        })
      );
    }
  }, []);
  return (
    <div className="h-full flex mx-[4rem] items-center justify-center bg-[#fff]">
      <DataTable
        cols={sellHistoryCols}
        data={allSellsHistory?.length ? allSellsHistory : []}
        // checkboxSelection={true}
        // getSelectedRows={handleGetSelectedRows}
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
