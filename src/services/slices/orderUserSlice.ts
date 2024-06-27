import { getOrdersApi } from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type OrderUserState = {
  ordersUser: TOrder[];
  ordersUserIsLoaded: boolean;
  error: string | undefined;
};

const initialState: OrderUserState = {
  ordersUser: [],
  ordersUserIsLoaded: false,
  error: undefined
};

export const fetchUserOrder = createAsyncThunk(
  'ordersUser/user/get',
  async () => await getOrdersApi()
);

const orderUserSlice = createSlice({
  name: 'ordersUser',
  initialState,
  reducers: {
    setOrderUserIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.ordersUserIsLoaded = action.payload;
    },
    setOrdersUser: (state, action: PayloadAction<TOrder[]>) => {
      state.ordersUser = action.payload;
    }
  },
  selectors: {
    fetchOrderUserIsLoaded: (state) => state.ordersUserIsLoaded,
    fetchOrderUser: (state) => state.ordersUser
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserOrder.pending, (state) => {
        state.ordersUserIsLoaded = true;
        state.error = undefined;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.ordersUser = action.payload;
        state.ordersUserIsLoaded = false;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.error = action.error.message;
        state.ordersUserIsLoaded = false;
      });
  }
});

export const { setOrderUserIsLoaded, setOrdersUser } = orderUserSlice.actions;
export const { fetchOrderUserIsLoaded, fetchOrderUser } =
  orderUserSlice.selectors;
export const orderUserReducer = orderUserSlice.reducer;
export { initialState as orderUserInitialState };
