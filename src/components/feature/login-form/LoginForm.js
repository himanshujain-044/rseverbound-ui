import { Button, FormControl, OutlinedInput } from "@mui/material";

const LoginForm = () => {
  return (
    <div className="w-2/5 pr-24 mobile:w-2/4 laptop:pr-6 tablet:w-full tablet:px-12">
      <div className="shadow-login-box py-8 px-12">
        <strong className="text-3xl">Dashboard Login</strong>
        <form className="flex flex-col gap-2 mt-4">
          <FormControl>
            <label>Username</label>
            <OutlinedInput placeholder="abc@gmail.com" />
          </FormControl>
          <FormControl>
            <label>Password</label>
            <OutlinedInput placeholder="pa****rd" />
          </FormControl>
        </form>
        <span className="flex justify-end text-primary hover:cursor-pointer">
          Forgot Password?
        </span>

        <div className="flex justify-center gap-2 mt-5">
          <Button
            variant="outlined"
            className="border-primary text-[#5A298B] hover:bg-primaryHover hover:border-primary"
          >
            Clear
          </Button>
          <Button variant="contained" className="bg-primary hover:bg-primary">
            Login
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <strong className="text-[#5A298B] text-xl">Don't have account</strong>
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
        </p>
      </div>
    </div>
  );
};
export default LoginForm;
