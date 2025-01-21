const { AES, enc } = require("crypto-js");
const {
  MONTH_NAMES,
  NUMBERS_DIGITS_UNITS,
  STATES_GST_CODE,
} = require("../constants/common");

const formatDate = (date) => {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day}-${MONTH_NAMES[monthIndex]}-${year}`;
};
const calculateGstAmount = (percent, amount) => {
  return (amount * percent) / 100;
};

function numberToWords(number) {
  let [num, decimalPoints] = String(number)?.split(".");
  if ((num = num.toString()).length > 9) return "Overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (NUMBERS_DIGITS_UNITS.TEENS[Number(n[1])] ||
          NUMBERS_DIGITS_UNITS.TENS[n[1][0]] +
            " " +
            NUMBERS_DIGITS_UNITS.TEENS[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (NUMBERS_DIGITS_UNITS.TEENS[Number(n[2])] ||
          NUMBERS_DIGITS_UNITS.TENS[n[2][0]] +
            " " +
            NUMBERS_DIGITS_UNITS.TEENS[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (NUMBERS_DIGITS_UNITS.TEENS[Number(n[3])] ||
          NUMBERS_DIGITS_UNITS.TENS[n[3][0]] +
            " " +
            NUMBERS_DIGITS_UNITS.TEENS[n[3][1]]) + "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (NUMBERS_DIGITS_UNITS.TEENS[Number(n[4])] ||
          NUMBERS_DIGITS_UNITS.TENS[n[4][0]] +
            " " +
            NUMBERS_DIGITS_UNITS.TEENS[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (NUMBERS_DIGITS_UNITS.TEENS[Number(n[5])] ||
          NUMBERS_DIGITS_UNITS.TENS[n[5][0]] +
            " " +
            NUMBERS_DIGITS_UNITS.TEENS[n[5][1]]) +
        ""
      : "";
  const decArr = decimalPoints?.split("");
  if (decArr?.length) {
    const lastDecmal = NUMBERS_DIGITS_UNITS.TEENS[decArr?.[1]]
      ? NUMBERS_DIGITS_UNITS.TEENS[decArr?.[1]]
      : "";
    return (
      str +
      "Points " +
      NUMBERS_DIGITS_UNITS.TEENS[decArr[0]] +
      lastDecmal +
      " Only"
    );
  } else {
    return str?.length ? str + " Only" : "";
  }
}

const convertFixedDecimal = (number) => {
  return (Math.round((number + Number.EPSILON) * 100) / 100).toFixed(2);
};
const decryptData = (data = "") => {
  return AES.decrypt(data, process.env.REACT_APP_ENCRYPTED_SECRET).toString(
    enc.Utf8
  );
};

const encryptData = (data = "") => {
  return AES.encrypt(data, process.env.REACT_APP_ENCRYPTED_SECRET).toString();
};

const setLocalStorage = (key = "", value = "") => {
  if (key) {
    localStorage.setItem(key, encryptData(JSON.stringify(value)));
  }
};

const getLocalStorage = (key = "") => {
  if (key) {
    const sessionData = localStorage.getItem(key);
    const data =
      sessionData && JSON.parse(decryptData(localStorage.getItem(key)));
    return data;
  }
};

const clearLocalStorage = (key = "") => {
  localStorage.clear();
};

const getStateNameByGstCode = (gstCode) => {
  const gstRecord = STATES_GST_CODE.find(
    (record) => record.gst_code === gstCode
  );
  if (gstRecord) {
    return gstRecord.state;
  } else {
    return "State not found for the given GST code";
  }
};

const convertDDOptions = (list = []) => {
  const ddOptionsList = list.map((item = "") => {
    return { text: item, value: String(item)?.toLowerCase() };
  });
  return ddOptionsList;
};
module.exports = {
  formatDate,
  calculateGstAmount,
  numberToWords,
  convertFixedDecimal,
  decryptData,
  encryptData,
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  getStateNameByGstCode,
  convertDDOptions,
};
