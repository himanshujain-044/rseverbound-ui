import axios from "axios";
import { clearLocalStorage, getLocalStorage } from "../utils/helperFunction";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      clearLocalStorage();
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);
export const apiReq = async ({
  method = "get",
  endpoint = "",
  payload = {},
}) => {
  let token = "";
  if (!endpoint.includes("/login")) {
    token = getLocalStorage("userData")?.token;
  }
  if (method === "get") {
    return axios[method](endpoint, {
      params: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    return axios[method](endpoint, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};
