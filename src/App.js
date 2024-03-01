import { useSelector } from "react-redux";
import "./App.scss";
import CircularIndeterminate from "./components/common/LoadingSpinner/LoadingSpinner";
import Footer from "./layouts/footer/Footer";
import PublicRoutes from "./routes/publicRoutes";
import PrivateRoutes from "./routes/privateRoutes";
import SnackbarsComp from "./components/common/SnackbarsComp/SnackbarsComp";

function App() {
  const { reqCount, data, message, success } = useSelector(
    (state) => state.api
  );
  const userData = useSelector((state) => state.userData?.data);
  if (reqCount) {
    return (
      <>
        <CircularIndeterminate /> <Footer />
      </>
    );
  }
  return (
    <div className="background-img h-[calc(100vh_-_64px)]">
      {console.log("inside app")}
      {!userData && <PublicRoutes />}
      {userData && <PrivateRoutes />}
      <Footer />
      {!data && message && (
        <SnackbarsComp
          message={message}
          severity={success ? "success" : "error"}
        />
      )}
    </div>
  );
}

export default App;
