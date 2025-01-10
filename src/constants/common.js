import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { ROUTES_LIST } from "./routes";
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

export const SIDEBAR_MENU_LIST = [
  {
    icon: <DashboardCustomizeOutlinedIcon />,
    text: "Dashboard",
    route: ROUTES_LIST.dashboard,
  },
  {
    icon: <WorkHistoryOutlinedIcon />,
    text: "Sell History",
    route: ROUTES_LIST.sellHistory,
  },
];
