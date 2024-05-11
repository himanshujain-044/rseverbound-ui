import { Route, Routes } from "react-router-dom";
import { ROUTES_LIST } from "../constants/routes";
import Login from "../pages/login/Login";

const PublicRoutes = () => {
  return (
    <div className="h-[calc(100%_-_40px)] overflow-auto">
      <Routes>
        <Route path={ROUTES_LIST.login} element={<Login />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </div>
  );
};
export default PublicRoutes;
