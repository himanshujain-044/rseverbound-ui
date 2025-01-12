import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES_LIST } from "../constants/routes";
import FullPageLoadingSpinner from "../components/common/FullPageLoadingSpinner/FullPageLoadingSpinner";
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Header = lazy(() => import("../layouts/header/Header"));
const PdfViewer = lazy(() => import("../pages/pdf-viewer/PdfViewer"));
const SellHistory = lazy(() => import("../pages/sell-history/SellHistory"));
const Reports = lazy(() => import("../pages/reports/Reports"));

const PrivateRoutes = () => {
  return (
    <Suspense fallback={<FullPageLoadingSpinner />}>
      <Header />
      <div className="h-[calc(100%_-_134px)] relative top-[64px] overflow-auto mobile:top-[24px] mobile:m-4 mobile:h-[calc(100%_-_80px)]">
        <Routes>
          <Route path={ROUTES_LIST.dashboard} element={<Dashboard />} />
          <Route path={ROUTES_LIST.pdfViewer} element={<PdfViewer />} />
          <Route path={ROUTES_LIST.sellHistory} element={<SellHistory />} />
          <Route path={ROUTES_LIST.reports} element={<Reports />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </div>
    </Suspense>
  );
};
export default PrivateRoutes;
