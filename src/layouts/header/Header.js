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

const Header = () => {
  const dispatch = useDispatch();
  const { name, paymentMethod } = useSelector((state) => state.userData.data);
  const { updatedPaymentModeData, success } = useSelector((state) => state.api);
  const [isPymtModeModalOpen, setIsPymtModeModalOpen] = useState(false);
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
      <div className="bg-[#fff] fixed z-999 top-0 h-16 w-full py-4 px-16 flex justify-between shadow-inner">
        <div className="flex items-center justify-center text-primary">
          <PersonOutlineOutlinedIcon /> <strong className="ml-2">{name}</strong>
        </div>
        <div className="flex items-center gap-8">
          <Button
            variant="outlined"
            className="flex gap-2 border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary"
            // disabled={paymentMethod?.method}
            onClick={() => {
              console.log("25", isPymtModeModalOpen);
              setIsPymtModeModalOpen(true);
            }}
          >
            {!paymentMethod?.method && (
              <>
                <ControlPointOutlinedIcon /> <span>Select payment mode</span>
              </>
            )}
            {paymentMethod?.method && (
              <UserPaymentMethod paymentMethod={paymentMethod} />
            )}
          </Button>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
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
    </>
  );
};
export default Header;
