import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./api";
import userDataReducer from "./userData";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    api: apiReducer,
    userData: userDataReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
