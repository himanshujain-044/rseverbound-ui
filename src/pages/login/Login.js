import LoginContent from "../../components/feature/login-content/LoginContent";
import LoginForm from "../../components/feature/login-form/LoginForm";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-background-img h-[calc(100vh_-_64px)] flex gap-10 items-center tablet:flex-col">
      <LoginContent />
      <LoginForm />
    </div>
  );
};
export default Login;
