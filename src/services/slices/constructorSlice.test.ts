import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  initialState,
  constructorSlice,
  constructorReducer,
  addIngredients
} from './constructorSlice';

const { reducer, actions } = constructorSlice;
import { data } from '../../../cypress/fixtures/ingredients.json';

const bunMock = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  id: '460e4ef0-d2c8-47c8-9da6-e5654d16c33e'
};

const mainMock = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  id: 'df0670f4-6435-4384-b75a-3ee0fa49a29a'
};

const sauceMock = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  id: 'b097fe74-75a2-4fa2-b193-86f97909b839'
};

describe('constructorSlice', () => {
  it('должен обработать экшен добавления ингредиента', () => {
    const actualState = constructorReducer(
      {
        ...initialState
      },
      addIngredients(mainMock)
    );
    const result = actualState.constructorItems;
    expect(result.ingredients[0]._id).toEqual(mainMock._id);
  });

  it('должен обработать экшен добавление булки', () => {
    const actualState = constructorReducer(
      {
        ...initialState
      },
      addIngredients(data[0])
    );
    const result = actualState.constructorItems;
    expect(result.bun?._id).toEqual(bunMock._id);
  });

  it('должен обработать экшен удаления ингредиента', () => {
    const initialStateWithIngredient = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...bunMock, id: '1' }]
      }
    };

    const action = actions.removeIngredient('1');
    const state = reducer(initialStateWithIngredient, action);

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('должен обработать экшен изменения порядка ингредиентов в начинке', () => {
    const initialStateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...mainMock, id: '1' },
          { ...sauceMock, id: '2' }
        ]
      }
    };

    const action = actions.moveIngredient({ id: '2', direction: 'up' });
    const state = reducer(initialStateWithIngredients, action);

    expect(state.constructorItems.ingredients[0].id).toBe('2');
    expect(state.constructorItems.ingredients[1].id).toBe('1');
  });
});
