import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type FeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isOrderLoading: boolean;
  error: undefined | string;
};

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isOrderLoading: true,
  error: undefined
};

export const fetchOrderLoad = createAsyncThunk(
  'orders/all/get',
  async () => await getFeedsApi()
);

export const orderSlice = createSlice({
  name: 'orders',
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
    },
    setLoadingOrder: (state, action: PayloadAction<boolean>) => {
      state.isOrderLoading = action.payload;
    }
  },
  selectors: {
    fetchOrders: (state) => state.orders,
    fetchTotal: (state) => state.total,
    fetchTotalToday: (state) => state.totalToday,
    fetchLoadingOrder: (state: FeedState): boolean => state.isOrderLoading
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

export const {
  setIsOrder,
  setTotalOrder,
  setTotalOrderToday,
  setLoadingOrder
} = orderSlice.actions;

export const { fetchOrders, fetchTotal, fetchTotalToday, fetchLoadingOrder } =
  orderSlice.selectors;

export const orderReducer = orderSlice.reducer;

export { initialState as orderInitialState };
