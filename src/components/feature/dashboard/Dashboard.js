import { useDispatch, useSelector } from "react-redux";
import Brokerage from "../brokerage/Brokerage";
import { useEffect } from "react";
import {
  getBrokerage,
  getPaidBrokerageHistory,
  requestPayout,
} from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import PaidBrokerageHistory from "../paid-brokerage-history/PaidBrokerageHistory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { brokerageData, paidBrokerageData } = useSelector(
    (state) => state.api
  );
  useEffect(() => {
    if (!brokerageData) {
      dispatch(
        getBrokerage({
          method: "get",
          endpoint: API_ENDPOINTS.getBrokerage,
        })
      );
    }
    if (!paidBrokerageData) {
      dispatch(
        getPaidBrokerageHistory({
          method: "get",
          endpoint: API_ENDPOINTS.getPaidBrokerageHistory,
        })
      );
    }
  }, []);
  const handlePayout = (selectedRows = []) => {
    const dates = brokerageData
      .filter((brokerage) =>
        selectedRows.some((rowId) => brokerage.id === rowId)
      )
      .map((selectedBrokerage) => selectedBrokerage?.date);

    dispatch(
      requestPayout({
        method: "patch",
        endpoint: API_ENDPOINTS.requestPayout,
        payload: { dates },
      })
    );
  };
  return (
    <div className="h-full flex gap-12 mobile:flex-col mobile:gap-6 mobile:h-auto">
      <Brokerage data={brokerageData} handlePayoutEvent={handlePayout} />
      <PaidBrokerageHistory data={paidBrokerageData} />
    </div>
  );
};
export default Dashboard;
