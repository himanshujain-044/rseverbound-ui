import { useDispatch, useSelector } from "react-redux";
import Brokerage from "../../components/feature/brokerage/Brokerage";
import { useEffect, useRef } from "react";
import {
  closeRequestedPayoutModal,
  getBillNumber,
  getBrokerage,
  getPaidBrokerageHistory,
  requestPayout,
} from "../../store/api";
import { PDFViewer } from "@react-pdf/renderer";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import PaidBrokerageHistory from "../../components/feature/paid-brokerage-history/PaidBrokerageHistory";
import ModalComp from "../../components/common/ModalComp/ModalComp";
import MsgModalContent from "../../components/common/MsgModalContent/MsgModalContent";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import BillPdfGen from "../../components/feature/bill-pdf/BillPdfGen";
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import BillForm from "../../components/feature/bill-form/BillForm";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { billNumber } = useSelector((state) => state.api);
  useEffect(() => {
    document.title = "Madhuvan Minerals - Dashbaord";
  }, []);
  const componentRef = useRef();

  const downloadPdf = async () => {
    const fileName = "test.pdf";
    const blob = await pdf(<BillPdfGen />).toBlob();
    saveAs(blob, fileName);
  };

  return (
    <div className="h-[calc(100%_-_1rem)] flex justify-center gap-12 my-2 mx-6 mobile:h-[calc(100%_-_2.5rem)] mobile:mx-0">
      {/* test {billNumber} */}
      <div className="w-full">
        <BillForm />
      </div>
      {/* <div onClick={downloadPdf}>PDF Download</div>
      <PDFViewer height={600} width={700}>
        <BillPdfGen ref={componentRef} />
      </PDFViewer> */}
    </div>
  );
};
export default Dashboard;
