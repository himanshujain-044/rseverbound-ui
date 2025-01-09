import { PDFViewer } from "@react-pdf/renderer";
import BillPdfGen from "../../components/feature/bill-pdf/BillPdfGen";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { ROUTES_LIST } from "../../constants/routes";

const PdfViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams.get("pdfData"), searchParams);
  const onClickBackToDashboard = () => {
    navigate({
      pathname: ROUTES_LIST.dashboard,
    });
  };
  return (
    <div className="flex items-center justify-center">
      <PDFViewer height={600} width={800}>
        <BillPdfGen />
      </PDFViewer>
      <Button
        variant="contained"
        className="w-[220px] mobile:text-[12px] mobile:h-[30px] bg-primary hover:bg-primar"
        // disabled={!validator.isEmail(email) || componentLoader}
        onClick={onClickBackToDashboard}
      >
        Back to Dashboard
      </Button>
    </div>
  );
};
export default PdfViewer;
