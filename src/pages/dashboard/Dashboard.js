import { useDispatch, useSelector } from "react-redux";
import Brokerage from "../../components/feature/brokerage/Brokerage";
import { useEffect } from "react";
import {
  closeRequestedPayoutModal,
  getBrokerage,
  getPaidBrokerageHistory,
  requestPayout,
} from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import PaidBrokerageHistory from "../../components/feature/paid-brokerage-history/PaidBrokerageHistory";
import ModalComp from "../../components/common/ModalComp/ModalComp";
import MsgModalContent from "../../components/common/MsgModalContent/MsgModalContent";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const { brokerageData, paidBrokerageData, isRequestedPayoutModalOpen } =
  //   useSelector((state) => state.api);
  useEffect(() => {
    document.title = "Madhuvan Minerals - Dashbaord";
  }, []);
  return (
    <div className="h-full flex gap-12 mobile:flex-col mobile:gap-6 mobile:h-auto">
      test
    </div>
  );
};
export default Dashboard;
