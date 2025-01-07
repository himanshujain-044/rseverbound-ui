import { Route, Routes } from "react-router-dom";
import { ROUTES_LIST } from "../constants/routes";
import Dashboard from "../pages/dashboard/Dashboard";
import Header from "../layouts/header/Header";

const PrivateRoutes = () => {
  return (
    <>
      <Header />
      <div className="h-[calc(100%_-_134px)] relative top-[64px] overflow-auto mobile:top-[24px] mobile:m-4 mobile:h-[calc(100%_-_80px)]">
        <Routes>
          <Route path={ROUTES_LIST.dashboard} element={<Dashboard />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </>
  );
};
export default PrivateRoutes;
