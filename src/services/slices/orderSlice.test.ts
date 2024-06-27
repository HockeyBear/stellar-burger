import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderReducer, fetchOrderLoad, orderInitialState } from './orderSlice';

describe('orderSlice', () => {
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

  it('должен обработать fetchOrderLoad.pending', () => {
    const action = { type: fetchOrderLoad.pending.type };
    const state = orderReducer(orderInitialState, action);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });

  it('должен обработать fetchOrderLoad.fulfilled', () => {
    const action = {
      type: fetchOrderLoad.fulfilled.type,
      payload: { orders: ordersMock, total: 1, totalToday: 1 }
    };
    const state = orderReducer(orderInitialState, action);
    expect(state.orders).toEqual(ordersMock);
    expect(state.total).toBe(1);
    expect(state.totalToday).toBe(1);
  });

  it('должен обработать fetchOrderLoad.rejected', () => {
    const action = { type: fetchOrderLoad.rejected.type };
    const state = orderReducer(orderInitialState, action);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
  });
});
