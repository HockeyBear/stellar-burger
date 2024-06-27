import { orderBurgerApi } from '@api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type MakeOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
};

export const initialState: MakeOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const makeOrder = createAsyncThunk(
  'makeOrder/make',
  async (fetchOrderID: string[]) => {
    const response = await orderBurgerApi(fetchOrderID);
    return response;
  }
);

export const makeOrderSlice = createSlice({
  name: 'makeOrder',
  initialState,
  reducers: {
    setOrderMakeRequest: (
      state: MakeOrderState,
      action: PayloadAction<boolean>
    ) => {
      state.orderRequest = action.payload;
    },
    setOrderMakeModal: (
      state: MakeOrderState,
      action: PayloadAction<TOrder>
    ) => {
      state.orderModalData = action.payload;
    },
    deleteOrderModal: (state: MakeOrderState) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrderRequest: (state: MakeOrderState): boolean => state.orderRequest,
    getOrderModalData: (state: MakeOrderState): TOrder | null =>
      state.orderModalData
  },
  extraReducers(builder) {
    builder
      .addCase(makeOrder.pending, (state: MakeOrderState) => {
        state.orderRequest = true;
      })
      .addCase(makeOrder.rejected, (state, action) => {
        state.orderModalData = null;
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(makeOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.error = undefined;
      });
  }
});

export const { setOrderMakeRequest, setOrderMakeModal, deleteOrderModal } =
  makeOrderSlice.actions;
export const { getOrderRequest, getOrderModalData } = makeOrderSlice.selectors;
export const makeOrderReducer = makeOrderSlice.reducer;
