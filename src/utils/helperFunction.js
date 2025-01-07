const { AES, enc } = require("crypto-js");
const { MONTH_NAMES } = require("../constants/common");

const formatDate = (date) => {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${MONTH_NAMES[monthIndex]}-${year.toString().slice(-2)}`;
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
  decryptData,
  encryptData,
  setSessionStorage,
  getSessionStorage,
  clearSessionStorage,
};
