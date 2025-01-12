import { Button, FormControl, OutlinedInput } from "@mui/material";
import { useState } from "react";
import SnackbarsComp from "../../common/SnackbarsComp/SnackbarsComp";
import { useDispatch } from "react-redux";
import { userLogin } from "../../../store/api";
import { API_ENDPOINTS } from "../../../constants/apiEndPoints";
import { encryptData } from "../../../utils/helperFunction";
import logo from "../../../assets/logo/logo.png";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
    </div>
  );
};
export default LoginForm;
