import { PAYMENT_MODE } from "../../../constants/common";
import gpay from "../../../assets/icons/gpay.png";
import phonepe from "../../../assets/icons/phonepe.png";
import paytm from "../../../assets/icons/paytm.png";

const UserPaymentMethod = ({ paymentMethod = {} }) => {
  console.log("7", paymentMethod);
  switch (paymentMethod?.method) {
    case PAYMENT_MODE.GPAY:
      return (
        <>
          <img src={gpay} alt="gpay icon" width="18px" />
          <strong>GPay</strong>
        </>
      );
    case PAYMENT_MODE.PHONEPE:
      return (
        <>
          <img src={phonepe} alt="phonepe icon" width="18px" />
          <strong>Phonepe</strong>
        </>
      );
    case PAYMENT_MODE.PAYTM:
      return (
        <>
          <img src={paytm} alt="paytm icon" width="18px" />
          <strong>Paytm</strong>
        </>
      );

    default:
      return;
  }
};
export default UserPaymentMethod;
