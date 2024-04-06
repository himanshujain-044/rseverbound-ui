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
  const dispatch = useDispatch();
  const { brokerageData, paidBrokerageData, isRequestedPayoutModalOpen } =
    useSelector((state) => state.api);
  useEffect(() => {
    document.title = "50% Brokerage Sharing - Dashbaord";
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
  const closeModal = () => {
    dispatch(closeRequestedPayoutModal());
  };
  return (
    <div className="h-full flex gap-12 mobile:flex-col mobile:gap-6 mobile:h-auto">
      <Brokerage data={brokerageData} handlePayoutEvent={handlePayout} />
      <PaidBrokerageHistory data={paidBrokerageData} />
      {isRequestedPayoutModalOpen && (
        <ModalComp
          isOpen={isRequestedPayoutModalOpen}
          setOpen={closeModal}
          title="Request for payout"
          content={
            <MsgModalContent
              icon={
                <CheckCircleOutlineOutlinedIcon className="text-success text-[3.5rem]" />
              }
              content={
                <strong className="text-justify">
                  We are pleased to inform you that your request has been
                  approved successfully. Your payment will be processed within
                  the next 24 hours and the updated status will be reflected in
                  your paid brokerage.
                </strong>
              }
              closeModal={closeModal}
            />
          }
        />
      )}
    </div>
  );
};
export default Dashboard;
