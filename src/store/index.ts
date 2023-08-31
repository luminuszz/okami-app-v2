import { configureStore } from "@reduxjs/toolkit";
import okamiServer from "@services/okami";

export const Store = configureStore({
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okamiServer.middleware),

  reducer: {},
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
