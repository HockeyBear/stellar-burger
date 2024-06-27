import { current } from '@reduxjs/toolkit';
import { rootReducer } from './store';

describe('тест rootReducer', () => {
  it('проверка инициализации rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const state = {
      constructorBuilder: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderModalData: null,
        orderRequest: false
      },
      ingredients: {
        error: undefined,
        ingredients: [],
        isIngredientsLoading: false
      },
      makeOrder: {
        error: undefined,
        orderModalData: null,
        orderRequest: false
      },
      orders: {
        error: undefined,
        isOrderLoading: true,
        orders: [],
        total: 0,
        totalToday: 0
      },
      ordersUser: {
        error: undefined,
        ordersUser: [],
        ordersUserIsLoaded: false
      },
      userAuth: {
        currentUser: null,
        isAuthenticationChecked: false
      }
    };
    const newState = rootReducer(undefined, action);
    console.log(newState.toString());
    expect(newState).toEqual(state);
  });
});
