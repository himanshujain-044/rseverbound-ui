import { Button, FormControl, OutlinedInput } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useState } from "react";
import SnackbarsComp from "../../common/SnackbarsComp/SnackbarsComp";
import { useDispatch } from "react-redux";
import { apiCalls } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { encryptData } from "../../../utils/helperFunction";
import "./LoginForm.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [isSnackBarDisplay, setIsSnackBarDisplay] = useState({
    msg: "",
    severity: "",
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    // const postReq = axios.post(API_ENDPOINTS.login, {
    //   email: username,
    //   password: encryptPassword(password),
    // });
    // dispatch(
    //   apiCalls(
    //     axios.post(API_ENDPOINTS.login, {
    //       email: username,
    //       password: encryptPassword(password),
    //     })
    //   )
    // ); method: "post",

    dispatch(
      apiCalls({
        method: "post",
        endpoint: API_ENDPOINTS.login,
        payload: { email: username, password: encryptData(password) },
      })
    );
  };
  return (
    <div className="w-2/6 max-h-full pr-12 mobile:w-2/4 laptop:pr-6 tablet:w-full tablet:px-12">
      <div className="shadow-container-box py-8 px-4">
        <h3 className="text-3xl">Dashboard Login</h3>
        <form className="flex flex-col gap-4 mt-4">
          <FormControl>
            <label className="text-inputLabel font-medium">Email/Mobile</label>
            <OutlinedInput
              placeholder="abc@gmail.com"
              className="[&_input]:p-2"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <label className="text-inputLabel font-medium">Password</label>
            <OutlinedInput
              placeholder="pa****rd"
              className="[&_input]:p-2"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </FormControl>
        </form>
        <span className="flex justify-end text-primary hover:cursor-pointer">
          Forgot Password?
        </span>

        <div className="flex justify-center gap-2 mt-5">
          <Button
            variant="outlined"
            className="border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            className="bg-primary hover:bg-primary"
            disabled={!username || !password}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <strong className="text-[#5A298B] text-xl">Don't have account ?</strong>
        <p>
          <strong>
            Note:- <i>Get Rs. 100 to Rs. 500 upon account opening under us.</i>
          </strong>
          <br />

          <a
            href="https://upstox.com/open-account/?f=JD1505"
            target="_blank"
            rel="noreferrer"
            className="block mt-4 font-medium underline text-primary"
          >
            Click here to open your demat account today
          </a>
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center mt-2 gap-2 text-primary"
          >
            Copy Link <ContentCopyOutlinedIcon />
          </button>
        </p>
      </div>
      {isSnackBarDisplay.msg && (
        <SnackbarsComp
          message={isSnackBarDisplay.msg}
          severity={isSnackBarDisplay.severity}
        />
      )}
    </div>
  );
};
export default LoginForm;
