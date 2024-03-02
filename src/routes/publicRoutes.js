import { Route, Routes } from "react-router-dom";
import { ROUTES_LIST } from "../constants/routes";
import Login from "../pages/login/Login";
import { useDispatch, useSelector } from "react-redux";
import { setSessionStorage } from "../utils/helperFunction";
import { updateUserData } from "../store/userData";

const PublicRoutes = () => {
  const { data } = useSelector((state) => state?.api);
  const dispatch = useDispatch();
  if (data?.token) {
    setSessionStorage("userData", data);
    dispatch(updateUserData(data));
  }

  return (
    <div className="overflow-auto">
      <Routes>
        <Route path={ROUTES_LIST.login} element={<Login />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </div>
  );
};
export default PublicRoutes;
