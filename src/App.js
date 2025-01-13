import { useDispatch, useSelector } from "react-redux";
import FullPageLoadingSpinner from "./components/common/FullPageLoadingSpinner/FullPageLoadingSpinner";
import Footer from "./layouts/footer/Footer";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/privateRoutes";
import SnackbarsComp from "./components/common/SnackbarsComp/SnackbarsComp";
import { clearLocalStorage, setLocalStorage } from "./utils/helperFunction";
import { useEffect } from "react";
import { updateUserData } from "./store/userData";
import { clearAPIState } from "./store/api";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  const { reqCount, data, message, success, isUserLogout, statusCode } =
    useSelector((state) => state.api);

  const userData = useSelector((state) => state.userData?.data);

  useEffect(() => {
    if (data?.token) {
      setLocalStorage("userData", data);
      dispatch(updateUserData(data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    if ((isUserLogout && success) || statusCode === 401) {
      clearLocalStorage();
      dispatch(updateUserData(""));
      dispatch(clearAPIState());
    }
  }, [isUserLogout, success, statusCode, dispatch]);

  return (
    <div className="background-img h-[calc(100vh_-1px)] mobile:h-[calc(100vh_-_20px)]">
      {userData ? <PrivateRoutes /> : <PublicRoutes />}
      <Footer />
      {!data && message && statusCode && (
        <SnackbarsComp
          message={message}
          severity={success ? "success" : "error"}
        />
      )}
      {reqCount > 0 && <FullPageLoadingSpinner msg={message} />}
    </div>
  );
}

export default App;
