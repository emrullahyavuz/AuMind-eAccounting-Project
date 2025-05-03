import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./slices/authSlice";
import { baseApi } from "./api/baseApi";
import { apiReducers, apiMiddlewares } from "./api/index";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ...apiReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);
