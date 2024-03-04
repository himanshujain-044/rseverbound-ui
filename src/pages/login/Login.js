import { useEffect } from "react";
import LoginContent from "../../components/feature/login-content/LoginContent";
import LoginForm from "../../components/feature/login-form/LoginForm";
import "./Login.scss";

const Login = () => {
  useEffect(() => {
    document.title = "50% Brokerage Sharing - Login";
  });
  return (
    <div className="h-full flex gap-10 items-center tablet:flex-col mobile:flex-col-reverse mobile:h-auto">
      <LoginContent />
      <LoginForm />
    </div>
  );
};
export default Login;
