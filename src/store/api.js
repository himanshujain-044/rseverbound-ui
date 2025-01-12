import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiReq } from "../services/apiReq";

export const userLogin = createAsyncThunk(
  "login",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const logout = createAsyncThunk(
  "logout",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const getInvoiceDetails = createAsyncThunk(
  "invoice-details",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const getAllBuyers = createAsyncThunk(
  "all-buyers",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const getAllVehicles = createAsyncThunk(
  "all-vehicles",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "all-products",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const saveInvoiceDetails = createAsyncThunk(
  "save-invoice-details",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const getSellsHistory = createAsyncThunk(
  "sell-history",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

export const getSellData = createAsyncThunk(
  "sell-data",
  async (apiData, { rejectWithValue }) => {
    try {
      const { method, endpoint, payload } = apiData;
      const response = await apiReq({
        method,
        endpoint,
        payload,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err?.response || err);
    }
  }
);

const apiReducer = createSlice({
  name: "data",
  initialState: {
    reqCount: 0,
    componentLoader: false,
    message: "",
    data: "",
    statusCode: "",
    success: false,
    invoiceDetails: "",
    allBuyers: [],
    allVehicles: [],
    allProducts: [],
    isInvoiceSave: "",
    allSellsHistory: "",
    sellData: "",

    // brokerageData: "",
    // paidBrokerageData: "",
    // updatedPaymentModeData: "",
    // isUserLogout: false,
    // isRequestedPayoutModalOpen: false,
    // isRequestedOTP: false,
    // otpVerified: false,
  },
  reducers: {
    clearAPIState: (state, action) => {
      state.reqCount = 0;
      state.message = "";
      state.data = "";
      state.invoiceDetails = "";
      state.allBuyers = "";
      state.allVehicles = "";
      state.allProducts = "";
      state.isInvoiceSave = "";
      state.allSellsHistory = "";
      state.sellData = "";

      // state.brokerageData = "";
      // state.paidBrokerageData = "";
      // state.updatedPaymentModeData = "";
      // state.isUserLogout = false;
      // state.statusCode = "";
      // state.success = false;
      // state.isRequestedPayoutModalOpen = false;
      // state.isRequestedOTP = false;
      // state.otpVerified = false;
    },
    clearSomeStates: (state, action) => {
      action.payload.stateKeys.map((key) => {
        state[key] = "";
      });
    },
    // closeRequestedPayoutModal: (state, action) => {
    //   state.isRequestedPayoutModalOpen = false;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Verifying credentials";
        state.isRequestedOTP = false;
        state.otpVerified = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.data = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        const { code, message } = action?.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.reqCount += 1;
        state.isUserLogout = false;
        state.message = "Logging out ...";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isUserLogout = true;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(logout.rejected, (state, action) => {
        const { code = "", message = "" } = action?.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getInvoiceDetails.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Getting the latest bill number ...";
      })
      .addCase(getInvoiceDetails.fulfilled, (state, action) => {
        const invoiceDetails = action.payload?.data?.data;
        state.invoiceDetails = invoiceDetails;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getInvoiceDetails.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.invoiceDetails = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getAllBuyers.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Fetching all the buyers ...";
      })
      .addCase(getAllBuyers.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.allBuyers = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getAllBuyers.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.allBuyers = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getAllVehicles.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Fetching all the vichels ...";
      })
      .addCase(getAllVehicles.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.allVehicles = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getAllVehicles.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.allVehicles = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getAllProducts.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Fetching all the vichels ...";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.allProducts = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.allProducts = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(saveInvoiceDetails.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Fetching all the vichels ...";
        state.isInvoiceSave = false;
      })
      .addCase(saveInvoiceDetails.fulfilled, (state, action) => {
        state.isInvoiceSave = true;
        state.invoiceDetails = "";
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(saveInvoiceDetails.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.isInvoiceSave = false;
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getSellsHistory.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Fetching all the sells history ...";
        state.isInvoiceSave = false;
      })
      .addCase(getSellsHistory.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        console.log("sell history is calling", data);
        state.allSellsHistory = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getSellsHistory.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.allSellsHistory = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getSellData.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Fetching sell data ...";
      })
      .addCase(getSellData.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        console.log("api", action.payload?.data, data);
        state.sellData = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getSellData.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.sellData = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      });
  },
});
export const { clearAPIState, clearSomeStates, closeRequestedPayoutModal } =
  apiReducer.actions;
export default apiReducer.reducer;
