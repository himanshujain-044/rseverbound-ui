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

export const getBrokrage = createAsyncThunk(
  "data/brokrage",
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
export const getPaidBrokrageHistory = createAsyncThunk(
  "data/paidBrokrage",
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
    brokrageData: "",
    paidBrokrageData: "",
    statusCode: "",
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiCalls.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(apiCalls.fulfilled, (state, action) => {
        const { code, message, data } = action.payload?.data;
        state.data = data;
        state.reqCount -= 1;
        state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(apiCalls.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getBrokrage.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(getBrokrage.fulfilled, (state, action) => {
        const { code, message, data } = action.payload?.data;
        state.brokrageData = data;
        state.data = "";
        state.reqCount -= 1;
        state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(getBrokrage.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      })
      .addCase(getPaidBrokrageHistory.pending, (state, action) => {
        state.reqCount += 1;
      })
      .addCase(getPaidBrokrageHistory.fulfilled, (state, action) => {
        const { code, message, data } = action.payload?.data;
        state.paidBrokrageData = data;
        state.reqCount -= 1;
        state.statusCode = code;
        state.message = message;
        state.success = true;
      })
      .addCase(getPaidBrokrageHistory.rejected, (state, action) => {
        const { code, message } = action.payload?.data;
        state.data = "";
        state.statusCode = code;
        state.message = message;
        state.reqCount -= 1;
        state.success = false;
      });
  },
});
export default apiReducer.reducer;
