import gpay from "../assets/icons/gpay.png";
import phonepe from "../assets/icons/phonepe.png";
import paytm from "../assets/icons/paytm.png";

export const PAYMENT_MODE = {
  GPAY: "gpay",
  PHONEPE: "phonepe",
  PAYTM: "paytm",
};

export const AMOUNT_PAID = {
  PAID: "Paid",
  NOT_PAID: "Not Paid",
  PENDING: "Pending",
};

export const paymentModeOptions = [
  {
    text: (
      <div className="flex items-center justify-center gap-2">
        <img src={gpay} alt="gpay icon" width="18px" />
        <span className="mb-1">GPay</span>
      </div>
    ),
    value: PAYMENT_MODE.GPAY,
  },
  {
    text: (
      <div className="flex items-center justify-center gap-2">
        <img src={phonepe} alt="phonepe icon" width="18px" />
        <span className="mb-1">Phonepe</span>
      </div>
    ),
    value: PAYMENT_MODE.PHONEPE,
  },
  {
    text: (
      <div className="flex items-center justify-center gap-2">
        <img src={paytm} alt="paytm icon" width="18px" />
        <span className="mb-2">Paytm</span>
      </div>
    ),
    value: PAYMENT_MODE.PAYTM,
  },
];
