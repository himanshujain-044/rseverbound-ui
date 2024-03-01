const { AES, enc } = require("crypto-js");

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

module.exports = {
  decryptData,
  encryptData,
  setSessionStorage,
  getSessionStorage,
};
