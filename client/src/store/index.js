import { configureStore } from "@reduxjs/toolkit";
import workOrderReducer from "./workOrderSlice";
import serviceReducer from "./serviceSlice";

export const store = configureStore({
  reducer: {
    workOrder: workOrderReducer,
    services: serviceReducer,
  },
});
