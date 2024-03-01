import { useDispatch, useSelector } from "react-redux";
import Brokrage from "../brokrage/Brokrage";
import { useEffect } from "react";
import { getBrokrage, getPaidBrokrageHistory } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import PaidBrokrageHistory from "../paid-brokrage-history/PaidBrokrageHistory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { brokrageData, paidBrokrageData } = useSelector((state) => state.api);
  useEffect(() => {
    if (!brokrageData) {
      dispatch(
        getBrokrage({
          method: "get",
          endpoint: API_ENDPOINTS.getBrokrage,
        })
      );
    }
    if (!paidBrokrageData) {
      dispatch(
        getPaidBrokrageHistory({
          method: "get",
          endpoint: API_ENDPOINTS.getPaidBrokrageHistory,
        })
      );
    }
  }, []);
  return (
    <div className="flex gap-12 h-full">
      <Brokrage data={brokrageData} />
      <PaidBrokrageHistory data={paidBrokrageData} />
    </div>
  );
};
export default Dashboard;
