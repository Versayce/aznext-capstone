import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const workOrderSlice = createSlice({
  name: "workOrders",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // push new work order into items
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // remove work order by id
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearAll: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearAll } = workOrderSlice.actions;

export default workOrderSlice.reducer;
