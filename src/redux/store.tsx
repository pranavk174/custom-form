import { configureStore } from "@reduxjs/toolkit";
import metadata from "./Slices/headerconnect";
const store = configureStore({
  reducer: {
    metadata: metadata,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
