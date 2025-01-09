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

const numberToWords = (num) => {
  if (num === 0) return "";

  const integerPart = Math.floor(num);
  const decimalPart = (num - integerPart).toFixed(2).slice(2);

  function convertInteger(num) {
    if (num < 10) return NUMBERS_DIGITS_UNITS.UNITS[num];

    if (num < 20) return NUMBERS_DIGITS_UNITS.TEENS[num - 10];

    const divisor = Math.pow(10, Math.floor(Math.log10(num)));
    const quotient = Math.floor(num / divisor);
    const remainder = num % divisor;

    switch (divisor) {
      case 1000000000:
        return quotient + " billion " + convertInteger(remainder);
      case 1000000:
        return quotient + " million " + convertInteger(remainder);
      case 1000:
        return quotient + " thousand " + convertInteger(remainder);
      case 100:
        return (
          NUMBERS_DIGITS_UNITS.TENS[quotient] +
          (remainder ? " " + convertInteger(remainder) : "")
        );
      case 10:
        return (
          NUMBERS_DIGITS_UNITS.TENS[quotient] +
          (remainder ? " " + convertInteger(remainder) : "")
        );
      default:
        return "";
    }
  }

  const integerPartWords = convertInteger(integerPart);
  const decimalPartWords = decimalPart
    ? ` point ${convertInteger(decimalPart)}`
    : "";

  return integerPartWords + decimalPartWords;
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
  decryptData,
  encryptData,
  setSessionStorage,
  getSessionStorage,
  clearSessionStorage,
};
