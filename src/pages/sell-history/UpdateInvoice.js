import { useDispatch, useSelector } from "react-redux";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { updateInvoice } from "../../store/api";
import { API_ENDPOINTS } from "../../constants/apiEndPoints";
const UpdateInvoice = (props) => {
  const { value, row } = props;
  console.log("7", props);
  const dispatch = useDispatch();
  const onCancelInvoice = () => {
    dispatch(
      updateInvoice({
        method: "patch",
        endpoint: API_ENDPOINTS.updateInvoice,
        payload: { invoiceNo: value },
      })
    );
  };
  return (
    <div className="w-full z-[998]">
      {!row?.isInvoiceCancel && (
        <strong onClick={onCancelInvoice}>
          <CancelOutlinedIcon className="text-[22px] fill-error" />
        </strong>
      )}
    </div>
  );
};
export default UpdateInvoice;
