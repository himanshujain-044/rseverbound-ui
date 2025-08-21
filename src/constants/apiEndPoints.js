const baseUrl = process.env.REACT_APP_API_BASE_URL;
const userBaseUrl = baseUrl + "/users";
const invoiceDetailsBaseUrl = baseUrl + "/invoice-details";
const buyersBaseUrl = baseUrl + "/buyers";
const vehiclesBaseUrl = baseUrl + "/vehicles";
const productsBaseUrl = baseUrl + "/products";
const sellsBaseUrl = baseUrl + "/sells";
const industry = baseUrl + "/industry";

export const API_ENDPOINTS = {
  login: `${userBaseUrl}/login`,
  logout: `${userBaseUrl}/logout`,
  getBillNumber: `${invoiceDetailsBaseUrl}/invoice-details`,
  getAllBuyers: `${buyersBaseUrl}/all-buyers`,
  getAllVehicles: `${vehiclesBaseUrl}/all-vehicles`,
  getAllProducts: `${productsBaseUrl}/all-products`,
  saveInvoiceDetails: `${sellsBaseUrl}/save-invoice-details`,
  getSellsHistoryData: `${sellsBaseUrl}/sells-history`,
  getSellData: `${sellsBaseUrl}/sell-data`,
  getSellsReportsData: `${sellsBaseUrl}/sells-reports`,
  updateInvoice: `${sellsBaseUrl}/update-invoice`,
  getBuyerSellData: `${sellsBaseUrl}/buyer-sell-data`,
  buyerCreditAmount: `${buyersBaseUrl}/buyer-credit-amount`,
  getIndustryPerfReportData: `${industry}/industry-perf-report`,
};
