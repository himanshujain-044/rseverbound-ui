import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { pdf, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import BillPdf from "../../components/feature/gen-pdf/BillPdf";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { getSellData, updateInvoice } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
import cx from "classnames";
import { ROUTES_LIST } from "../../constants/routes";
import { Button } from "@mui/material";

const UpdateInvoice = (props) => {
  const { value, row } = props;
  const { sellData } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [isDownloadClicked, setIsDownloadClicked] = useState(false);

  useEffect(() => {
    if ((sellData?.invoiceNo || sellData?.deliveryChNo) && isEditClicked) {
      navigate(ROUTES_LIST.dashboard);
    }
    if ((sellData?.invoiceNo || sellData?.deliveryChNo) && isDownloadClicked) {
      setIsDownloadClicked(false);
      downloadPdf(sellData);
    }
  }, [sellData]);

  const downloadPdf = async (data) => {
    const fileName = `${data?.invoiceNo ? data?.invoiceNo : data?.deliveryChNo}_${data?.invoiceDate}_${data?.buyerDetails?.name}.pdf`;
    const blob = await pdf(<BillPdf data={data} />).toBlob();
    saveAs(blob, fileName);
  };
  const onCancelInvoice = () => {
    dispatch(
      updateInvoice({
        method: "patch",
        endpoint: API_ENDPOINTS.updateInvoice,
        payload: {
          invoiceNo: row?.invoiceNo ? row?.invoiceNo : "",
          deliveryChNo: row?.deliveryChNo ? row?.deliveryChNo : "",
        },
      }),
    );
  };

  const onEditBtn = () => {
    setIsEditClicked(true);
    dispatch(
      getSellData({
        method: "get",
        endpoint: API_ENDPOINTS.getSellData,
        payload: {
          invoiceNo: row?.invoiceNo ? row?.invoiceNo : "",
          deliveryChNo: row?.deliveryChNo ? row?.deliveryChNo : "",
        },
      }),
    );
  };
  const onDownloadBtn = () => {
    setIsDownloadClicked(true);
    dispatch(
      getSellData({
        method: "get",
        endpoint: API_ENDPOINTS.getSellData,
        payload: {
          invoiceNo: row?.invoiceNo ? row?.invoiceNo : "",
          deliveryChNo: row?.deliveryChNo ? row?.deliveryChNo : "",
        },
      }),
    );
  };

  return (
    <div className="w-full z-[998] flex">
      <strong onClick={onCancelInvoice}>
        <CancelOutlinedIcon
          className={cx(
            "text-[22px]",
            row?.isInvoiceCancel ? "fill-success" : "fill-error",
          )}
        />
      </strong>
      <Button
        onClick={onEditBtn}
        disabled={row?.isInvoiceCancel}
        className="min-w-0"
      >
        <ModeEditOutlineOutlinedIcon
          className={!row?.isInvoiceCancel && "text-primary"}
        />
      </Button>
      <Button onClick={onDownloadBtn} className="min-w-0">
        <FileDownloadOutlinedIcon className={"text-primary"} />
      </Button>
    </div>
  );
};
export default UpdateInvoice;
