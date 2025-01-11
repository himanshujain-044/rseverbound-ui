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

export const STATES_GST_CODE = [
  { state: "Andhra Pradesh", state_code: "AP", gst_code: "37" },
  { state: "Arunachal Pradesh", state_code: "AR", gst_code: "12" },
  { state: "Assam", state_code: "AS", gst_code: "18" },
  { state: "Bihar", state_code: "BR", gst_code: "10" },
  { state: "Chhattisgarh", state_code: "CG", gst_code: "22" },
  { state: "Goa", state_code: "GA", gst_code: "30" },
  { state: "Gujarat", state_code: "GJ", gst_code: "24" },
  { state: "Haryana", state_code: "HR", gst_code: "06" },
  { state: "Himachal Pradesh", state_code: "HP", gst_code: "02" },
  { state: "Jharkhand", state_code: "JH", gst_code: "20" },
  { state: "Karnataka", state_code: "KA", gst_code: "29" },
  { state: "Kerala", state_code: "KL", gst_code: "32" },
  { state: "Madhya Pradesh", state_code: "MP", gst_code: "23" },
  { state: "Maharashtra", state_code: "MH", gst_code: "27" },
  { state: "Manipur", state_code: "MN", gst_code: "14" },
  { state: "Meghalaya", state_code: "ML", gst_code: "17" },
  { state: "Mizoram", state_code: "MZ", gst_code: "15" },
  { state: "Nagaland", state_code: "NL", gst_code: "13" },
  { state: "Odisha", state_code: "OD", gst_code: "21" },
  { state: "Punjab", state_code: "PB", gst_code: "03" },
  { state: "Rajasthan", state_code: "RJ", gst_code: "08" },
  { state: "Sikkim", state_code: "SK", gst_code: "11" },
  { state: "Tamil Nadu", state_code: "TN", gst_code: "33" },
  { state: "Telangana", state_code: "TS", gst_code: "36" },
  { state: "Tripura", state_code: "TR", gst_code: "16" },
  { state: "Uttar Pradesh", state_code: "UP", gst_code: "09" },
  { state: "Uttarakhand", state_code: "UK", gst_code: "05" },
  { state: "West Bengal", state_code: "WB", gst_code: "19" },
  { state: "Andaman and Nicobar Islands", state_code: "AN", gst_code: "35" },
  { state: "Chandigarh", state_code: "CH", gst_code: "04" },
  {
    state: "Dadra and Nagar Haveli and Daman and Diu",
    state_code: "DD",
    gst_code: "26",
  },
  { state: "Lakshadweep", state_code: "LD", gst_code: "31" },
  { state: "Delhi", state_code: "DL", gst_code: "07" },
  { state: "Puducherry", state_code: "PY", gst_code: "34" },
];

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
