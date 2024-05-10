import { PAYMENT_MODE } from "../../../constants/common";
import gpay from "../../../assets/icons/gpay.png";
import phonepe from "../../../assets/icons/phonepe.png";
import paytm from "../../../assets/icons/paytm.png";

const UserPaymentMethod = ({ paymentMethod = {} }) => {
  switch (paymentMethod?.method) {
    case PAYMENT_MODE.GPAY:
      return (
        <>
          <img
            src={gpay}
            alt="gpay icon"
            className="w-[18px] mobile:w-[10px]"
          />
          <strong className="mobile:text-[10px]">GPay</strong>
        </>
      );
    case PAYMENT_MODE.PHONEPE:
      return (
        <>
          <img
            src={phonepe}
            alt="phonepe icon"
            className="w-[18px] mobile:w-[10px]"
          />
          <strong className="mobile:text-[10px]">Phonepe</strong>
        </>
      );
    case PAYMENT_MODE.PAYTM:
      return (
        <>
          <img
            src={paytm}
            alt="paytm icon"
            className="w-[18px] mobile:w-[10px]"
          />
          <strong className="mobile:text-[10px]">Paytm</strong>
        </>
      );

    default:
      return;
  }
};
export default UserPaymentMethod;
