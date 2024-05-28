import { getFeedsApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const fetchOrderLoad = createAsyncThunk(
  'orders/all/get',
  async () => await getFeedsApi()
);

export const orderSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setIsOrder: (state, action: PayloadAction<TOrder[]>) => {
      state.orders = action.payload;
    },
    setTotalOrder: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setTotalOrderToday: (state, action: PayloadAction<number>) => {
      state.totalToday = action.payload;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderLoad.pending, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      })
      .addCase(fetchOrderLoad.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchOrderLoad.rejected, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      });
  }
});

export const { setIsOrder, setTotalOrder, setTotalOrderToday } =
  orderSlice.actions;

export const { getOrders, getTotal, getTotalToday } = orderSlice.selectors;

export const orderReducer = orderSlice.reducer;
