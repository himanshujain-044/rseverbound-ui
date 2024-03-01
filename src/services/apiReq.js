import axios from "axios";
import { getSessionStorage } from "../utils/helperFunction";

export const apiReq = async ({
  method = "get",
  endpoint = "",
  payload = {},
}) => {
  let token = "";
  if (!endpoint.includes("/login")) {
    token = getSessionStorage("userData")?.token;
  }
  if (method === "get") {
    return axios[method](endpoint, {
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
