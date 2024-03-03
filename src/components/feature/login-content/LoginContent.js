import logo from "../../../assets/logo/logo.png";
import loginStocks from "../../../assets/images/login-stocks.png";
const LoginContent = () => {
  return (
    <div className="w-3/5 max-h-full h-full flex flex-col pl-12 pt-4 justify-around leading-5 laptop:pl-6 tablet:w-full tablet:px-12 mobile:w-full mobile:px-3">
      <img src={logo} alt="logo" className="max-w-[30%] mobile:hidden" />
      <span className="mobile:text-[12px]">
        <strong className="mt-4">Dear Valued Investors,</strong>
        <p>
          Delighted to extend a unique opportunity: earn 50% brokerage share
          from trades made via our demat account. Your success, our priority.
        </p>
        <br />
        <strong className="pr-1">Swift Withdrawals:</strong>
        Withdrawal within 48 hours through your registered payment method.
        <br />
        <strong className="mt-1 pr-1">User-Friendly Dashboard:</strong>
        Personalized dashboard to track daily brokerage updates.
      </span>
      <img
        src={loginStocks}
        alt="login-stocks-market"
        className="mt-[10%] max-w-[50%]"
      />
    </div>
  );
};
export default LoginContent;
