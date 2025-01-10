const { AES, enc } = require("crypto-js");
const { MONTH_NAMES, NUMBERS_DIGITS_UNITS } = require("../constants/common");

const formatDate = (date) => {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${MONTH_NAMES[monthIndex]}-${year.toString().slice(-2)}`;
};
const calculateGstAmount = (percent, amount) => {
  return (amount * percent) / 100;
};

var a = [
  "",
  "One ",
  "Two ",
  "Three ",
  "Four ",
  "Five ",
  "Six ",
  "Seven ",
  "Eight ",
  "Nine ",
  "Ten ",
  "Eleven ",
  "Twelve ",
  "Thirteen ",
  "Fourteen ",
  "Fifteen ",
  "Sixteen ",
  "Seventeen ",
  "Eighteen ",
  "Nineteen ",
];
var b = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function numberToWords(number) {
  console.log(
    "51",
    typeof number,
    typeof String(number),
    String(number)?.split(".")
  );
  let [num, decimalPoints] = String(number)?.split(".");
  if ((num = num.toString()).length > 9) return "Overflow";
  let n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  console.log("56", n);
  if (!n) return;
  var str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
        (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
        ""
      : "";
  const decArr = decimalPoints?.split("");
  if (decArr?.length) {
    const lastDecmal = a[decArr?.[1]] ? a[decArr?.[1]] : "";
    return str + "Points " + a[decArr[0]] + lastDecmal + " Only";
  } else {
    return str?.length ? str + " Only" : "";
  }
}

const convertFixedDecimal = (number) => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};
const decryptData = (data = "") => {
  return AES.decrypt(data, process.env.REACT_APP_ENCRYPTED_SECRET).toString(
    enc.Utf8
  );
};

const encryptData = (data = "") => {
  return AES.encrypt(data, process.env.REACT_APP_ENCRYPTED_SECRET).toString();
};

const setSessionStorage = (key = "", value = "") => {
  if (key) {
    sessionStorage.setItem(key, encryptData(JSON.stringify(value)));
  }
};

const getSessionStorage = (key = "") => {
  if (key) {
    const sessionData = sessionStorage.getItem(key);
    const data =
      sessionData && JSON.parse(decryptData(sessionStorage.getItem(key)));
    return data;
  }
};

const clearSessionStorage = (key = "") => {
  sessionStorage.clear();
};

module.exports = {
  formatDate,
  calculateGstAmount,
  numberToWords,
  convertFixedDecimal,
  decryptData,
  encryptData,
  setSessionStorage,
  getSessionStorage,
  clearSessionStorage,
};
