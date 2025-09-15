import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// --------------------
// Async Thunks
// --------------------
export const fetchWorkOrders = createAsyncThunk(
  "workOrders/fetchWorkOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/work-orders");
      if (!res.ok) throw new Error("Failed to fetch work orders");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteWorkOrder = createAsyncThunk(
  "workOrders/deleteWorkOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/work-orders/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete work order");
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteWorkOrderItem = createAsyncThunk(
  "workOrders/deleteWorkOrderItem",
  async ({ workOrderId, itemId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/work-orders/${workOrderId}/items/${itemId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Failed to delete work order item");
      return { workOrderId, itemId };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const completeWorkOrder = createAsyncThunk(
  "workOrders/completeWorkOrder",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/work-orders/${id}/complete`,
        { method: "PATCH" }
      );
      if (!res.ok) throw new Error("Failed to complete work order");
      const data = await res.json();
      return { id, status: data.status };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// --------------------
// Slice
// --------------------
const initialState = {
  items: [],
  workOrders: [],
  loading: false,
  error: null,
};

const workOrderSlice = createSlice({
  name: "workOrders",
  initialState,
  reducers: {
    addWorkOrderItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeWorkOrderItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWorkOrderItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.workOrders = action.payload;
      })
      .addCase(fetchWorkOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteWorkOrder.fulfilled, (state, action) => {
        state.workOrders = state.workOrders.filter((o) => o.id !== action.payload);
      })
      .addCase(deleteWorkOrderItem.fulfilled, (state, action) => {
        const { workOrderId, itemId } = action.payload;
        const order = state.workOrders.find((o) => o.id === workOrderId);
        if (order) {
          order.items = order.items.filter((i) => i.id !== itemId);
        }
      })
      .addCase(completeWorkOrder.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const order = state.workOrders.find((o) => o.id === id);
        if (order) order.status = status;
      });
  },
});

export const { addWorkOrderItem, removeWorkOrderItem, clearWorkOrderItems } =
  workOrderSlice.actions;

export default workOrderSlice.reducer;
