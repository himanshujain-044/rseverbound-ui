import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ModalComp from "../../components/common/ModalComp/ModalComp";
import UserPaymentMethod from "../../components/common/UserPaymentMethod/UserPaymentMethod";
import AddPaymentModeModal from "../../components/feature/add-payment-mode-modal/AddPaymentModeModal";
import { useEffect, useState } from "react";
import {
  getSessionStorage,
  setSessionStorage,
} from "../../utils/helperFunction";
import { updateUserData } from "../../store/userData";
import { logout } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MsgModalContent from "../../components/common/MsgModalContent/MsgModalContent";

const Header = () => {
  const dispatch = useDispatch();
  const { name, paymentMethod } = useSelector((state) => state.userData.data);
  const { updatedPaymentModeData, success } = useSelector((state) => state.api);
  const [isPymtModeModalOpen, setIsPymtModeModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const handleLogout = () => {
    dispatch(
      logout({
        method: "get",
        endpoint: API_ENDPOINTS.logout,
      })
    );
  };
  const togglePymtModeModal = () => {
    setIsPymtModeModalOpen((preVal) => !preVal);
  };
  const toggleInfoModal = () => {
    setIsInfoModalOpen((preVal) => !preVal);
  };

  useEffect(() => {
    if (updatedPaymentModeData && success) {
      const userData = {
        ...getSessionStorage("userData"),
        ...updatedPaymentModeData,
      };
      setSessionStorage("userData", userData);
      dispatch(updateUserData(userData));
    }
  }, [updatedPaymentModeData, success, dispatch]);

  return (
    <>
      <div className="bg-[#fff] fixed top-0 z-[999] h-16 w-full py-4 px-16 flex justify-between shadow-inner mobile:px-4 mobile:py-2 mobile:h-12">
        <div className="flex items-center justify-center text-primary">
          <PersonOutlineOutlinedIcon />
          <strong className="ml-2 mobile:ml-1 mobile:text-[10px]">
            {name}
          </strong>
        </div>
        <div className="flex items-center gap-8 mobile:gap-2">
          <InfoOutlinedIcon
            className="text-primary cursor-pointer"
            onClick={() => {
              setIsInfoModalOpen(true);
            }}
          />
          <Button
            variant="outlined"
            className="flex gap-2 border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary mobile:text-[10px] mobile:p-[2px]"
            disabled={paymentMethod?.method}
            onClick={() => {
              setIsPymtModeModalOpen(true);
            }}
          >
            {!paymentMethod?.method && (
              <>
                <ControlPointOutlinedIcon className="mobile:text-[10px]" />{" "}
                <span className="mobile:text-[7px] mobile:py-[2px]">
                  Select payment mode
                </span>
              </>
            )}
            {paymentMethod?.method && (
              <UserPaymentMethod paymentMethod={paymentMethod} />
            )}
          </Button>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary mobile:hidden"
            onClick={handleLogout}
          >
            Logout
          </Button>
          <LogoutOutlinedIcon
            className="hidden text-primary mobile:inline"
            onClick={handleLogout}
          />
        </div>
      </div>
      |
      {isPymtModeModalOpen && (
        <ModalComp
          isOpen={isPymtModeModalOpen}
          setOpen={togglePymtModeModal}
          title="Save Payment Mode"
          content={
            <AddPaymentModeModal togglePymtModeModal={togglePymtModeModal} />
          }
        />
      )}
      {isInfoModalOpen && (
        <ModalComp
          isOpen={isInfoModalOpen}
          setOpen={toggleInfoModal}
          title="Important Info"
          content={
            <MsgModalContent
              icon={
                <div className="w-[100px] h-[120px] mobile:w-[60px] mobile:h-[60px]">
                  <lord-icon
                    src="https://cdn.lordicon.com/jnzhohhs.json"
                    trigger="loop"
                    colors="primary:#5a298b"
                    delay="2000"
                    style={{ width: "100%", height: "100%" }}
                  ></lord-icon>
                </div>
              }
              content={
                <div className="flex flex-col">
                  <strong className="text-justify">
                    1 - Data Retention Policy:
                  </strong>
                  <span>
                    We retain data for up to one month. Information beyond this
                    period is permanently erased and cannot be retrieved.
                  </span>
                  <strong className="text-justify mt-[4px]">
                    2 - Payout Request Processing:
                  </strong>
                  <span>
                    Payout requests are processed within 24 hours of submission.
                  </span>
                </div>
              }
              closeModal={toggleInfoModal}
            />
          }
        />
      )}
    </>
  );
};
export default Header;
