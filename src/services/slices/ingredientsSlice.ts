import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';
import { getIngredientsApi } from '../../utils/burger-api';

type IngredientsState = {
  isIngredientsLoading: boolean;
  error: undefined | string;
  ingredients: TIngredient[];
};

export const initialState: IngredientsState = {
  isIngredientsLoading: false,
  error: undefined,
  ingredients: []
};

export const getIngredientsByType = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) =>
      ingredients ? ingredients.filter((item) => item.type === type) : []
  );

export const fetchIngredients = createAsyncThunk(
  'ingredients/get',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIsLoadingIngredients: (state) => {
      state.isIngredientsLoading = false;
    },
    getIngredients: (state, action: PayloadAction<TIngredient[]>) => {
      state.ingredients = action.payload;
      state.isIngredientsLoading = false;
    }
  },
  selectors: {
    getIsLoadingIngredientsSelector: (state) => state.isIngredientsLoading,
    getIngredientsSelector: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
        state.error = undefined;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = 'Ошибка при загрузке ингредиентов';
        console.log('Error loadIngredients ', action.error);
      });
  }
});

export const { getIsLoadingIngredientsSelector, getIngredientsSelector } =
  ingredientsSlice.selectors;

export const { getIsLoadingIngredients, getIngredients } =
  ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
