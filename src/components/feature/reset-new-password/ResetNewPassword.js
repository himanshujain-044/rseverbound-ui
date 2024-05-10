import { useEffect, useState } from "react";
import { Button, FormControl, OutlinedInput } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { requestOTP, verifyOTP } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { OTP_TYPE, RESEND_OTP_TIMER } from "../../../constants/common";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { LoadingSpinner } from "../../common/FullPageLoadingSpinner/FullPageLoadingSpinner";
import cx from "classnames";
import { encryptData } from "../../../utils/helperFunction";

const ResetNewPassword = ({ toggleModal = () => {}, data = {} }) => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { componentLoader, otpVerified, isRequestedOTP } = useSelector(
    (state) => state.api
  );
  const [isResendOTPDisabled, setIsResendOTPDisabled] = useState(0);
  const { email } = data;

  useEffect(() => {
    const timer = setInterval(() => {
      setIsResendOTPDisabled((preValue) => preValue - 1);
    }, 1000);
    if (isResendOTPDisabled < 1) {
      clearInterval(timer);
    }
    if (otpVerified) {
      console.log("29 otpVerified", otpVerified);
      toggleModal();
    }

    return () => clearInterval(timer);
  }, [isResendOTPDisabled, otpVerified, toggleModal]);

  useEffect(() => {
    if (isRequestedOTP) {
      setIsResendOTPDisabled(RESEND_OTP_TIMER);
    }
  }, [isRequestedOTP]);

  const dispatch = useDispatch();
  const handleResetPassword = () => {
    dispatch(
      verifyOTP({
        method: "post",
        endpoint: API_ENDPOINTS.verifyOTP,
        payload: {
          email,
          otp,
          type: OTP_TYPE.FORGOT_PASSWORD,
          newPassword: encryptData(newPassword),
        },
      })
    );
  };
  const handleResendOTP = () => {
    dispatch(
      requestOTP({
        method: "post",
        endpoint: API_ENDPOINTS.requestOTP,
        payload: { email, type: OTP_TYPE.FORGOT_PASSWORD },
      })
    );
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="flex gap-2 font-medium mobile:text-[14px]">
        <CheckCircleOutlineOutlinedIcon className="fill-success" />{" "}
        <strong>{email}</strong>
      </label>
      <FormControl>
        <label className="text-inputLabel font-medium mobile:text-[14px]">
          Enter OTP
        </label>
        <OutlinedInput
          placeholder="abc@gmail.com"
          className="[&_input]:p-2 mobile:text-[14px]"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <label className="text-inputLabel font-medium mobile:text-[14px]">
          New Password
        </label>
        <OutlinedInput
          placeholder="******"
          className="[&_input]:p-2 mobile:text-[14px]"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </FormControl>
      <div className="flex items-center gap-2 mt-4 ">
        <span
          className={cx(
            "flex hover:cursor-pointer mobile:text-[14px]",
            isResendOTPDisabled && "pointer-events-none text-disabledText",
            !isResendOTPDisabled && "text-primary"
          )}
          onClick={handleResendOTP}
          disabled={isResendOTPDisabled}
        >
          Resend OTP
        </span>
        {isResendOTPDisabled ? (
          <strong className="text-info">{isResendOTPDisabled}</strong>
        ) : (
          ""
        )}
      </div>
      <div className="flex gap-6 mt-2 mobile:gap-2">
        <Button
          variant="outlined"
          className="flex gap-2 border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary mobile:text-[12px] mobile:h-[30px]"
          onClick={toggleModal}
        >
          Close
        </Button>
        <Button
          variant={componentLoader ? "outlined" : "contained"}
          className={cx(
            "flex gap 2 hover:bg-primary mobile:text-[12px] mobile:h-[30px]",
            componentLoader && "bg-none",
            !componentLoader && "bg-primary"
          )}
          disabled={newPassword?.length < 6 || componentLoader}
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>
        {componentLoader ? <LoadingSpinner /> : ""}
      </div>
    </div>
  );
};
export default ResetNewPassword;
