import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiReq } from "../services/apiReq";

export const apiCalls = createAsyncThunk(
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
    message: "",
    data: "",
    brokerageData: "",
    paidBrokerageData: "",
    updatedPaymentModeData: "",
    isUserLogout: false,
    statusCode: "",
    success: false,
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiCalls.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(apiCalls.fulfilled, (state, action) => {
        const { code = "", message = "", data = "" } = action.payload?.data;
        state.data = data;
        state.reqCount -= 1;
        // state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(apiCalls.rejected, (state, action) => {
        const { code = "", message = "", status } = action?.payload?.data;
        state.data = "";
        state.statusCode = code || status;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getBrokerage.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(getBrokerage.fulfilled, (state, action) => {
        const { code = "", message = "", data = "" } = action.payload?.data;
        state.brokerageData = data;
        state.data = "";
        state.reqCount -= 1;
        // state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(getBrokerage.rejected, (state, action) => {
        const { code = "", message = "", status } = action.payload?.data;
        state.data = "";
        state.statusCode = code || status;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getPaidBrokerageHistory.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(getPaidBrokerageHistory.fulfilled, (state, action) => {
        const { code = "", message = "", data = "" } = action.payload?.data;
        state.paidBrokerageData = data;
        state.reqCount -= 1;
        // state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(getPaidBrokerageHistory.rejected, (state, action) => {
        const { code = "", message = "", status } = action.payload?.data;
        state.data = "";
        state.statusCode = code || status;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(updatePaymentMethod.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        const {
          data: { method, paymentAddress },
          code,
          message,
        } = action.payload?.data;
        state.updatedPaymentModeData = {
          paymentMethod: {
            method,
            paymentAddress,
          },
        };
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = true;
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        const { code = "", message = "", status } = action?.payload?.data;
        state.data = "";
        state.statusCode = code || status;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(logout.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const { code = "", message = "" } = action.payload?.data;
        state.isUserLogout = true;
        state.reqCount -= 1;
        // state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(logout.rejected, (state, action) => {
        const { code = "", message = "", status } = action?.payload?.data;
        state.data = "";
        state.statusCode = code || status;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(requestPayout.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(requestPayout.fulfilled, (state, action) => {
        const { message = "" } = action.payload?.data;
        state.paidBrokerageData = "";
        state.brokerageData = "";
        state.reqCount -= 1;
        // state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(requestPayout.rejected, (state, action) => {
        const { code = "", message = "", status } = action?.payload?.data;
        state.data = "";
        state.statusCode = code || status;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      });
  },
});
export const { clearAPIState } = apiReducer.actions;
export default apiReducer.reducer;
