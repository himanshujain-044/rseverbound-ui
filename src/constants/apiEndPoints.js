const baseUrl = process.env.REACT_APP_API_BASE_URL;
const userBaseUrl = baseUrl + "/users";
export const API_ENDPOINTS = {
  login: `${userBaseUrl}/login`,
  getBrokrage: `${userBaseUrl}/get-user-brokrage`,
  getPaidBrokrageHistory: `${userBaseUrl}/paid-user-brokrage`,
};
