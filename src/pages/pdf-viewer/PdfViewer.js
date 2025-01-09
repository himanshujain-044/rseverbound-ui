import { PDFViewer } from "@react-pdf/renderer";
import BillPdfGen from "../../components/feature/bill-pdf/BillPdfGen";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ROUTES_LIST } from "../../constants/routes";

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const onClickBackToDashboard = () => {
    navigate({
      pathname: ROUTES_LIST.dashboard,
    });
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <PDFViewer height={600} width={850}>
        <BillPdfGen data={data} />
      </PDFViewer>
      <Button
        variant="contained"
        className="w-[220px] mobile:text-[12px] mobile:h-[30px] bg-primary hover:bg-primary"
        onClick={onClickBackToDashboard}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};
export default PdfViewer;
