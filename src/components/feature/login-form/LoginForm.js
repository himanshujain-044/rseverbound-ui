import { Button, FormControl, OutlinedInput } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useEffect, useState } from "react";
import SnackbarsComp from "../../common/SnackbarsComp/SnackbarsComp";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { encryptData } from "../../../utils/helperFunction";
import logo from "../../../assets/logo/logo.png";
import ForgotPasswordModal from "../forgot-password-modal/ForgotPasswordModal";
import ModalComp from "../../common/ModalComp/ModalComp";
import upstoxEmptyLogo from "../../../assets/logo/upstox-empty-logo.jpeg";
import ResetNewPassword from "../reset-new-password/ResetNewPassword";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isSnackBarDisplay, setIsSnackBarDisplay] = useState({
    msg: "",
    severity: "",
  });
  const { isRequestedOTP } = useSelector((state) => state.api);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPwdModalOpen, setIsForgotPwdModalOpen] = useState(false);
  const [isNewPasswordModalOpen, setIsNewPasswordModalOpen] =
    useState(isRequestedOTP);
  const [forgotPwdEmail, setForgotPwdEmail] = useState();

  const copyToClipboard = () => {
    navigator.clipboard.writeText("https://upstox.com/open-account/?f=JD1505");
    setIsSnackBarDisplay({
      msg: "Text copied to clipboard",
      severity: "success",
    });
    setTimeout(() => {
      setIsSnackBarDisplay({
        msg: "",
        severity: "",
      });
    }, 3000);
  };
  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    dispatch(
      userLogin({
        method: "post",
        endpoint: API_ENDPOINTS.login,
        payload: { email: username, password: encryptData(password) },
      })
    );
  };
  const handleForgotPwdSentReq = ({ data }) => {
    if (data) {
      setForgotPwdEmail(data?.email);
    }
  };

  useEffect(() => {
    if (isRequestedOTP) {
      setIsForgotPwdModalOpen(false);
      setIsNewPasswordModalOpen(true);
    }
  }, [isRequestedOTP]);

  return (
    <div className="w-2/6 max-h-full pr-12 laptop:pr-6 tablet:w-full tablet:px-12 mobile:w-full mobile:px-3 mobile:mt-6">
      <img
        src={logo}
        alt="logo"
        className="hidden mb-6 max-w-[50%] mobile:inline"
      />
      <div className="shadow-container-box py-8 px-4">
        <h3 className="text-3xl mobile:text-xl">Dashboard Login</h3>
        <form className="flex flex-col gap-2 mt-2">
          <FormControl>
            <label className="text-inputLabel font-medium mobile:text-[14px]">
              Email
            </label>
            <OutlinedInput
              placeholder="abc@gmail.com"
              className="[&_input]:p-2 mobile:text-[14px]"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <label className="text-inputLabel font-medium mobile:text-[14px]">
              Password
            </label>
            <OutlinedInput
              placeholder="pa****rd"
              className="[&_input]:p-2 mobile:text-[14px]"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
        </form>
        <span className="flex justify-end text-primary hover:cursor-pointer mobile:text-[14px]">
          <span
            onClick={() => {
              setIsForgotPwdModalOpen(true);
              setIsNewPasswordModalOpen(false);
            }}
          >
            Forgot Password?
          </span>
        </span>

        <div className="flex justify-center gap-2 mt-5">
          <Button
            variant="outlined"
            className="border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary mobile:text-[12px] mobile:h-[30px]"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary mobile:text-[12px] mobile:h-[30px]"
            disabled={!username || !password}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <strong className="text-[#5A298B] text-xl mobile:text-md">
          Don't have account ?
        </strong>
        <div className="mobile:text-[12px]">
          <strong>
            Note:- Get Rs. 100 to Rs. 500 upon account opening under us.
          </strong>
          <div className="mt-4 flex gap-4 items-center mobile:mt-2 mobile:gap-2">
            <a
              href="https://upstox.com/open-account/?f=JD1505"
              target="_blank"
              rel="noreferrer"
              className="block font-medium underline text-primary"
            >
              Click here to open your demat account today in Upstox
            </a>
            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 text-primary"
            >
              <ContentCopyOutlinedIcon className="mobile:w-[16px]" />
            </button>
          </div>
          <div className="flex items-center gap-4 mt-4 mobile:gap-2">
            <img
              src={upstoxEmptyLogo}
              alt="Upstox Logo"
              className="rounded-[50%] h-[46px] w-[46px]"
            />
            <strong>
              Upstox - India's Trusted Broker with Minimal Charges
            </strong>
          </div>
        </div>
      </div>
      {isSnackBarDisplay.msg && (
        <SnackbarsComp
          message={isSnackBarDisplay.msg}
          severity={isSnackBarDisplay.severity}
        />
      )}
      {isForgotPwdModalOpen && (
        <ModalComp
          isOpen={isForgotPwdModalOpen}
          setOpen={setIsForgotPwdModalOpen}
          title="Forgot Password"
          content={
            <ForgotPasswordModal
              sentOTPReq={handleForgotPwdSentReq}
              closeModal={() => setIsForgotPwdModalOpen(false)}
            />
          }
        />
      )}
      {isNewPasswordModalOpen && (
        <ModalComp
          isOpen={isNewPasswordModalOpen}
          setOpen={setIsNewPasswordModalOpen}
          title="Reset New Password"
          content={
            <ResetNewPassword
              data={{ email: forgotPwdEmail }}
              toggleModal={() => {
                setIsNewPasswordModalOpen(false);
              }}
            />
          }
        />
      )}
    </div>
  );
};
export default LoginForm;
