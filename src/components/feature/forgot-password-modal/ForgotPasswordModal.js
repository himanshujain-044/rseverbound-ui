import { useState } from "react";
import validator from "validator";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { requestOTP } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { OTP_TYPE } from "../../../constants/common";
import { LoadingSpinner } from "../../common/FullPageLoadingSpinner/FullPageLoadingSpinner";
import cx from "classnames";

const ForgotPasswordModal = ({
  sentOTPReq = () => {},
  closeModal = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [isEmailFieldDirty, setIsEmailFieldDirty] = useState("");
  const { componentLoader } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const handleRequestOTP = () => {
    dispatch(
      requestOTP({
        method: "post",
        endpoint: API_ENDPOINTS.requestOTP,
        payload: { email, type: OTP_TYPE.FORGOT_PASSWORD },
      })
    );
    sentOTPReq({ data: { email } });
  };
  return (
    <div className="flex flex-col gap-2">
      <FormControl>
        <label className="text-inputLabel font-medium mobile:text-[14px]">
          Registered Email
        </label>
        <OutlinedInput
          placeholder="abc@gmail.com"
          className="[&_input]:p-2 mobile:text-[14px]"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (e.target.value.length !== 0 && !isEmailFieldDirty) {
              setIsEmailFieldDirty(true);
            }
          }}
        />
        {!validator.isEmail(email) && isEmailFieldDirty && (
          <label className="text-error">Please enter vaild email.</label>
        )}
      </FormControl>
      <div className="flex gap-6 mt-4 mobile:gap-3">
        <Button
          variant="outlined"
          className="flex gap-2 border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary mobile:text-[12px] mobile:h-[30px]"
          onClick={closeModal}
        >
          Close
        </Button>

        <Button
          variant="contained"
          className={cx(
            "hover:bg-primary  w-[108px] mobile:text-[12px] mobile:h-[30px]",
            componentLoader && "bg-none",
            !componentLoader && "bg-primary"
          )}
          disabled={!validator.isEmail(email) || componentLoader}
          onClick={handleRequestOTP}
        >
          Send OTP
        </Button>
        {componentLoader ? <LoadingSpinner /> : ""}
      </div>
    </div>
  );
};
export default ForgotPasswordModal;
