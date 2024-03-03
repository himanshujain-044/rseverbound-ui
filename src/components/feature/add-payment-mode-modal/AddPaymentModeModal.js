import { Button, OutlinedInput } from "@mui/material";
import Dropdown from "../../common/Dropdown/Dropdown";
import { useState } from "react";
import { paymentModeOptions } from "../../../constants/common";
import { useDispatch } from "react-redux";
import { updatePaymentMethod } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";

const AddPaymentModeModal = ({ togglePymtModeModal = () => {} }) => {
  const dispatch = useDispatch();
  const [paymentAdd, setPaymentAdd] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleClose = () => {
    togglePymtModeModal();
  };
  const savePymtMethod = () => {
    dispatch(
      updatePaymentMethod({
        method: "patch",
        endpoint: API_ENDPOINTS.updatePaymentMethod,
        payload: {
          paymentMethod: { method: paymentMethod, paymentAddress: paymentAdd },
        },
      })
    );
  };

  const handleDDOptionChange = ({ target: { value } }) => {
    setPaymentMethod(value);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 h-[42px] mb-6">
        <Dropdown
          className="w-1/2"
          options={paymentModeOptions}
          selectedValue={paymentMethod}
          onChangeDDOption={handleDDOptionChange}
        />
        <OutlinedInput
          placeholder="mobile/upi"
          className="[&_input]:p-2 w-1/2"
          value={paymentAdd}
          type="number"
          onChange={(e) => {
            setPaymentAdd(e.target.value);
          }}
        />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outlined"
          className="flex gap-2 border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant="contained"
          className="bg-primary hover:bg-primary"
          disabled={!paymentAdd || !paymentMethod}
          onClick={savePymtMethod}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default AddPaymentModeModal;
