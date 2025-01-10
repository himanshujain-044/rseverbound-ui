import { saveAs } from "file-saver";
import { pdf, PDFViewer } from "@react-pdf/renderer";
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

  const downloadPdf = async () => {
    const fileName = `${data.buyerDetails.name}_${data.date}.pdf`;
    const blob = await pdf(<BillPdfGen data={data} />).toBlob();
    saveAs(blob, fileName);
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div className="mobile:hidden">
        <PDFViewer height={600} width={850}>
          <BillPdfGen data={data} />
        </PDFViewer>
        <Button
          variant="contained"
          className="w-[220px] mt-2 mobile:text-[12px] mobile:h-[30px] bg-primary hover:bg-primary"
          onClick={onClickBackToDashboard}
        >
          Back to Dashboard
        </Button>
      </div>
      <div className="mobile:h-full mobile:gap-6 mobile:flex-col mobile:items-center mobile:justify-center hidden mobile:flex">
        <div>Mobile screen does not support for PDF view.</div>
        <div className="flex gap-4">
          <Button
            variant="contained"
            className="w-[170px] mobile:text-[12px] mobile:h-[30px] bg-primary hover:bg-primary"
            onClick={onClickBackToDashboard}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="contained"
            className="w-[150px] mobile:text-[12px] mobile:h-[30px] bg-primary hover:bg-primary"
            onClick={downloadPdf}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PdfViewer;
