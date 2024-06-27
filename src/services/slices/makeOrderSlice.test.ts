import { PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { makeOrderReducer, makeOrder, initialState } from './makeOrderSlice';

describe('makeOrderSlice', () => {
  const orderMock: TOrder = {
    _id: '123',
    status: 'done',
    name: 'Test Order',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
    number: 1,
    ingredients: ['ingredient1', 'ingredient2']
  };

  it('должен обработать makeOrder.pending', () => {
    const action = { type: makeOrder.pending.type };
    const state = makeOrderReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('должен обработать makeOrder.fulfilled', () => {
    const action = {
      type: makeOrder.fulfilled.type,
      payload: { order: orderMock }
    };
    const state = makeOrderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(orderMock);
    expect(state.error).toBeUndefined();
  });

  it('должен обработать makeOrder.rejected', () => {
    const action = {
      type: makeOrder.rejected.type,
      error: { message: 'Ошибка при создании заказа' }
    };
    const state = makeOrderReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBe('Ошибка при создании заказа');
  });
});
