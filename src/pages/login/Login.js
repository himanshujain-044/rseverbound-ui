import { useEffect } from "react";
import LoginForm from "../../components/feature/login-form/LoginForm";
import "./Login.scss";

const Login = () => {
  useEffect(() => {
    document.title = "Madhuvan Minerals - Login";
  });
  return (
    <div className="h-full flex items-center justify-center tablet:flex-col mobile:flex-col-reverse mobile:h-auto">
      <LoginForm />
    </div>
  );
};
export default Login;
