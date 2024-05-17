import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiReq } from "../services/apiReq";

export const userLogin = createAsyncThunk(
  "data/api",
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
export const getBrokerage = createAsyncThunk(
  "data/brokerage",
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
export const getPaidBrokerageHistory = createAsyncThunk(
  "data/paidBrokerage",
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
export const updatePaymentMethod = createAsyncThunk(
  "updatePaymentMethod/api",
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
export const requestPayout = createAsyncThunk(
  "requestPayout",
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
export const requestOTP = createAsyncThunk(
  "request-otp",
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
export const verifyOTP = createAsyncThunk(
  "verify-otp",
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

const apiReducer = createSlice({
  name: "data",
  initialState: {
    reqCount: 0,
    componentLoader: false,
    message: "",
    data: "",
    brokerageData: "",
    paidBrokerageData: "",
    updatedPaymentModeData: "",
    isUserLogout: false,
    statusCode: "",
    success: false,
    isRequestedPayoutModalOpen: false,
    isRequestedOTP: false,
    otpVerified: false,
  },
  reducers: {
    clearAPIState: (state, action) => {
      state.reqCount = 0;
      state.message = "";
      state.data = "";
      state.brokerageData = "";
      state.paidBrokerageData = "";
      state.updatedPaymentModeData = "";
      state.isUserLogout = false;
      state.statusCode = "";
      state.success = false;
      state.isRequestedPayoutModalOpen = false;
      state.isRequestedOTP = false;
      state.otpVerified = false;
    },
    closeRequestedPayoutModal: (state, action) => {
      state.isRequestedPayoutModalOpen = false;
    },
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
      .addCase(getBrokerage.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Getting the brokerage data ...";
      })
      .addCase(getBrokerage.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.brokerageData = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getBrokerage.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getPaidBrokerageHistory.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Getting the paid brokerage data ...";
      })
      .addCase(getPaidBrokerageHistory.fulfilled, (state, action) => {
        const { data } = action.payload?.data;
        state.paidBrokerageData = data;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(getPaidBrokerageHistory.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(updatePaymentMethod.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Updating the payment method ...";
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const {
          data: { method, paymentAddress },
        } = action.payload?.data;
        state.updatedPaymentModeData = {
          paymentMethod: {
            method,
            paymentAddress,
          },
        };
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
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
      .addCase(requestPayout.pending, (state, action) => {
        state.reqCount += 1;
        state.message = "Your request is verifying ...";
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        state.paidBrokerageData = "";
        state.brokerageData = "";
        state.reqCount -= 1;
        state.success = true;
        state.isRequestedPayoutModalOpen = true;
      })
      .addCase(requestPayout.rejected, (state, action) => {
        const { code, message } = action?.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(requestOTP.pending, (state, action) => {
        state.componentLoader = true;
        state.message = "";
        state.isRequestedOTP = false;
        state.otpVerified = false;
      })
      .addCase(requestOTP.fulfilled, (state, action) => {
        const { message, code } = action.payload?.data;
        state.componentLoader = false;
        state.statusCode = code;
        state.message = message;
        state.success = true;
        state.isRequestedOTP = true;
      })
      .addCase(requestOTP.rejected, (state, action) => {
        const { code, message } = action?.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.componentLoader = false;
        state.success = false;
      })
      .addCase(verifyOTP.pending, (state, action) => {
        state.componentLoader = true;
        state.message = "";
        state.otpVerified = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        const { message, code } = action.payload?.data;
        state.componentLoader = false;
        state.statusCode = code;
        state.message = message;
        state.success = true;
        state.otpVerified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        const { code, message } = action?.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.componentLoader = false;
        state.success = false;
      });
  },
});
export const { clearAPIState, closeRequestedPayoutModal } = apiReducer.actions;
export default apiReducer.reducer;
