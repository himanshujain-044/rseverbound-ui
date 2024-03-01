import { createSlice } from "@reduxjs/toolkit";
import { getSessionStorage } from "../utils/helperFunction";

const userData = createSlice({
  name: "userData",
  initialState: { data: getSessionStorage("userData") },
  reducers: {
    updateUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});
export const { updateUserData } = userData.actions;
export default userData.reducer;
