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

export const OTP_TYPE = {
  FORGOT_PASSWORD: "forgotPassword",
};

export const RESEND_OTP_TIMER = 120;

export const FORM_REDUCER = {
  SET_FORM_DETAILS: "set_form_details",
  UPDATE_FORM_VALUES: "update_form_values",
};

export const DATED_OPTIONS = ["Date", "Telephonic", "On Delivery"];

export const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const NUMBERS_DIGITS_UNITS = {
  UNITS: [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ],
  TEENS: [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ],
  TENS: [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ],
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
