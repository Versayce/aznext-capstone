import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./serviceSlice";
import workOrderReducer from "./workOrderSlice";

export const store = configureStore({
  reducer: {
    workOrder: workOrderReducer,
    services: serviceReducer,
  },
});
