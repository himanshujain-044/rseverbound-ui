import { Route, Routes } from "react-router-dom";
import { ROUTES_LIST } from "../constants/routes";
import Dashboard from "../components/feature/dashboard/Dashboard";
import Header from "../layouts/header/Header";

const PrivateRoutes = () => {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh_-_192px)] relative top-[64px] mx-12 my-8">
        <Routes>
          <Route path={ROUTES_LIST.dashboard} element={<Dashboard />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
};
export default PrivateRoutes;
