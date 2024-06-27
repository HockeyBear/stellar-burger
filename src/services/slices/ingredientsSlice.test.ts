import { TIngredient } from '@utils-types';
import { ingredientsReducer, fetchIngredients } from './ingredientsSlice';
import { initialState } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const ingredientsMock: TIngredient[] = [
    {
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];

  it('должен обрабатывать pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('должен обрабатывать выборку fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsMock);
    expect(state.error).toBeUndefined();
  });

  it('должен обрабатывать выборку rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка при загрузке ингредиентов' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state.isIngredientsLoading).toBe(false);
    expect(state.error).toBe('Ошибка при загрузке ингредиентов');
  });
});
