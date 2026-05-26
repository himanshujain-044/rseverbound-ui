import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
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

  useEffect(() => {
    if ((sellData?.invoiceNo || sellData?.deliveryChNo) && isEditClicked) {
      navigate(ROUTES_LIST.dashboard);
    }
  }, [sellData]);

  const onCancelInvoice = () => {
    dispatch(
      updateInvoice({
        method: "patch",
        endpoint: API_ENDPOINTS.updateInvoice,
        payload: {
          ...(row?.invoiceNo &
            { invoiceNo: row?.invoiceNo ? row?.invoiceNo : "" }),
          ...(row?.deliveryChNo && {
            deliveryChNo: row?.deliveryChNo ? row?.deliveryChNo : "",
          }),
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
          ...(row?.invoiceNo &
            { invoiceNo: row?.invoiceNo ? row?.invoiceNo : "" }),
          ...(row?.deliveryChNo && {
            deliveryChNo: row?.deliveryChNo ? row?.deliveryChNo : "",
          }),
        },
      }),
    );
  };

  return (
    <div className="w-full z-[998] flex gap-2">
      <strong onClick={onCancelInvoice}>
        <CancelOutlinedIcon
          className={cx(
            "text-[22px]",
            row?.isInvoiceCancel ? "fill-success" : "fill-error",
          )}
        />
      </strong>
      <Button onClick={onEditBtn} disabled={row?.isInvoiceCancel}>
        <ModeEditOutlineOutlinedIcon
          className={!row?.isInvoiceCancel && "text-primary"}
        />
      </Button>
    </div>
  );
};
export default UpdateInvoice;
