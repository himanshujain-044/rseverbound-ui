import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BillPdf from "../../components/feature/gen-pdf/BillPdf";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ROUTES_LIST } from "../../constants/routes";
import { clearSomeStates } from "../../store/api";
import { useDispatch } from "react-redux";

const PdfViewer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    dispatch(
      clearSomeStates({
        stateKeys: ["allSellsHistory", "isInvoiceSave", "sellData"],
      })
    );
  }, []);
  useEffect(() => {
    if (location.state) {
      setData(location.state);
    }
  }, [location.state]);
  const downloadPdf = async () => {
    const fileName = `${data.buyerDetails.name}_${data.date}.pdf`;
    const blob = await pdf(<BillPdf data={data} />).toBlob();
    saveAs(blob, fileName);
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div>
        <PDFDownloadLink
          document={<BillPdf data={data} />}
          fileName={`${data?.buyerDetails?.name}_${data?.date}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              "Loading document..."
            ) : (
              <div className="flex justify-center items-center my-2">
                <Button
                  variant="contained"
                  className="bg-primary hover:bg-primary w-full"
                  endIcon={<FileDownloadOutlinedIcon />}
                >
                  Download PDF
                </Button>
              </div>
            )
          }
        </PDFDownloadLink>
        <PDFViewer height={600} width={850}>
          <BillPdf data={data} />
        </PDFViewer>
      </div>
      <div className="mobile:h-full mobile:gap-6 mobile:flex-col mobile:items-center mobile:justify-center hidden mobile:flex">
        <div>Mobile screen does not support for PDF view.</div>
        <div className="flex gap-4">
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
