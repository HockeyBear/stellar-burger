import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  orderUserReducer,
  fetchUserOrder,
  orderUserInitialState
} from './orderUserSlice';

describe('orderUserSlice', () => {
  const orderMock: TOrder = {
    _id: '123',
    status: 'done',
    name: 'Test Order',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  };

  const ordersMock = [orderMock];

  it('должен обработать fetchUserOrder.pending', () => {
    const action = { type: fetchUserOrder.pending.type };
    const state = orderUserReducer(orderUserInitialState, action);
    expect(state.ordersUserIsLoaded).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('должен обработать fetchUserOrder.fulfilled', () => {
    const action = {
      type: fetchUserOrder.fulfilled.type,
      payload: ordersMock
    };
    const state = orderUserReducer(orderUserInitialState, action);
    expect(state.ordersUser).toEqual(ordersMock);
    expect(state.ordersUserIsLoaded).toBe(false);
  });

  it('должен обработать fetchUserOrder.rejected', () => {
    const action = {
      type: fetchUserOrder.rejected.type,
      error: { message: 'Error fetching user orders' }
    };
    const state = orderUserReducer(orderUserInitialState, action);
    expect(state.error).toBe('Error fetching user orders');
    expect(state.ordersUserIsLoaded).toBe(false);
  });
});
