const baseUrl = process.env.REACT_APP_API_BASE_URL;
const userBaseUrl = baseUrl + "/users";
const billsBaseUrl = baseUrl + "/bills";
const buyersBaseUrl = baseUrl + "/buyers";
const vehiclesBaseUrl = baseUrl + "/vehicles";
const productsBaseUrl = baseUrl + "/products";
const sellsBaseUrl = baseUrl + "/sells";
export const API_ENDPOINTS = {
  login: `${userBaseUrl}/login`,
  logout: `${userBaseUrl}/logout`,
  getBillNumber: `${billsBaseUrl}/bill-number`,
  getAllBuyers: `${buyersBaseUrl}/all-buyers`,
  getAllVehicles: `${vehiclesBaseUrl}/all-vehicles`,
  getAllProducts: `${productsBaseUrl}/all-products`,
  saveInvoiceDetails: `${sellsBaseUrl}/save-invoice-details`,
  // getBrokerage: `${userBaseUrl}/get-user-brokerage`,
  // getPaidBrokerageHistory: `${userBaseUrl}/paid-user-brokerage`,
  // updatePaymentMethod: `${userBaseUrl}/update-payment-method`,
  // requestPayout: `${userBaseUrl}/update-user-brokerage`,
  // requestOTP: `${userBaseUrl}/request-otp`,
  // verifyOTP: `${userBaseUrl}/verify-otp`,
};
