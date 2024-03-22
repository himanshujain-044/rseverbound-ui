import { useDispatch, useSelector } from "react-redux";
import CircularIndeterminate from "./components/common/LoadingSpinner/LoadingSpinner";
import Footer from "./layouts/footer/Footer";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/privateRoutes";
import SnackbarsComp from "./components/common/SnackbarsComp/SnackbarsComp";
import { clearSessionStorage } from "./utils/helperFunction";
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
    if ((isUserLogout && success) || statusCode === 401) {
      dispatch(updateUserData(""));
      dispatch(clearAPIState());
      clearSessionStorage();
    }
  }, [isUserLogout, success, statusCode, dispatch]);
  console.log("14 userdata", data, message, statusCode);
  if (reqCount) {
    return (
      <>
        <CircularIndeterminate msg={message} /> <Footer />
      </>
    );
  }
  return (
    <div className="background-img h-[calc(100vh_-1px)] mobile:h-[calc(100vh_-_1px)]">
      {!userData && <PublicRoutes />}
      {userData && <PrivateRoutes />}
      <Footer />
      {!data && message && statusCode && (
        <SnackbarsComp
          message={message}
          severity={success ? "success" : "error"}
        />
      )}
    </div>
  );
}

export default App;
