import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWorkOrders = createAsyncThunk(
  "workOrders/fetchWorkOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:5000/api/work-orders");
      if (!res.ok) throw new Error("Failed to fetch work orders");
      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createWorkOrder = createAsyncThunk(
  "workOrders/createWorkOrder",
  async ({ customerName, customerEmail, comments, items }, { rejectWithValue }) => {
    try {
      const mappedItems = items.map(i => ({
        serviceId: i.id,
        quantity: i.quantity || 1,
      }));

      const res = await fetch("http://localhost:5000/api/work-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, customerEmail, comments, items: mappedItems }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create work order");
      }

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
      const res = await fetch(`http://localhost:5000/api/work-orders/${id}`, {
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
        `http://localhost:5000/api/work-orders/${workOrderId}/items/${itemId}`,
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
        `http://localhost:5000/api/work-orders/${id}/complete`,
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
      })
      .addCase(createWorkOrder.fulfilled, (state, action) => {
        state.workOrders.unshift(action.payload);
        state.items = [];
      });
  },
});

export const { addWorkOrderItem, removeWorkOrderItem, clearWorkOrderItems } =
  workOrderSlice.actions;

export default workOrderSlice.reducer;
