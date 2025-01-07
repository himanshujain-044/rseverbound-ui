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

export const getBillNumber = createAsyncThunk(
  "bill-number",
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

const apiReducer = createSlice({
  name: "data",
  initialState: {
    reqCount: 0,
    componentLoader: false,
    message: "",
    data: "",
    statusCode: "",
    success: false,
    billNumber: "",
    allBuyers: [],
    allVehicles: [],

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
      state.billNumber = "";
      state.allBuyers = "";
      state.allVehicles = "";

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
      .addCase(getBillNumber.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Getting the latest bill number ...";
      })
      .addCase(getBillNumber.fulfilled, (state, action) => {
        console.log("138", action.payload?.data);
        const { nextBillNumber } = action.payload?.data?.data;
        state.billNumber = nextBillNumber;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getBillNumber.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.billNumber = "";
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
        console.log("138", action.payload?.data);
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
        console.log("138", action.payload?.data);
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
      });
  },
});
export const { clearAPIState, closeRequestedPayoutModal } = apiReducer.actions;
export default apiReducer.reducer;
