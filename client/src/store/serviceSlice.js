import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
  name: "products",
  initialState: {
    items: [
      { id: 1, name: "Oil Change", description: "Standard oil change", price: 50 },
      { id: 2, name: "Tuning", description: "Engine tuning", price: 120 },
      { id: 3, name: "Alignment", description: "Wheel alignment", price: 80 },
    ],
  },
  reducers: {},
});

export default serviceSlice.reducer;
