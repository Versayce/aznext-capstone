import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch services from backend
export const fetchServices = createAsyncThunk("services/fetch", async () => {
  const res = await fetch("/api/services"); // hits your Express server
  if (!res.ok) {
    throw new Error("Failed to fetch services");
  }
  return await res.json();
});

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default serviceSlice.reducer;
