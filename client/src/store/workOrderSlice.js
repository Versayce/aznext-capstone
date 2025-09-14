import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const workOrderSlice = createSlice({
  name: "workOrders",
  initialState,
  reducers: {
    addWorkOrder: (state, action) => {
      state.items.push(action.payload);
    },
    removeWorkOrder: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWorkOrder: (state) => {
      state.items = [];
    },
  },
});

export const { addWorkOrder, removeWorkOrder, clearWorkOrder } = workOrderSlice.actions;

export default workOrderSlice.reducer;
