import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type ConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredients: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const typeIngredient = action.payload.type;

        switch (typeIngredient) {
          case 'bun':
            state.constructorItems.bun = action.payload;
            break;
          case 'main':
          case 'sauce':
            state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { id, ...ingredient } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: 'up' | 'down' }>
    ) => {
      const { id, direction } = action.payload;
      const { ingredients } = state.constructorItems;
      const currentItem = ingredients.findIndex((itemIng) => itemIng.id === id);
      if (currentItem === -1) return;

      const moveIngredient = ingredients[currentItem];
      if (direction === 'up' && currentItem > 0) {
        ingredients[currentItem] = ingredients[currentItem - 1];
        ingredients[currentItem - 1] = moveIngredient;
      }
      if (direction === 'down' && currentItem < ingredients.length - 1) {
        ingredients[currentItem] = ingredients[currentItem + 1];
        ingredients[currentItem + 1] = moveIngredient;
      }
    },
    clearConstructor: (state: ConstructorState) => (state = initialState)
  },
  selectors: {
    selectConstructor: (state) => state.constructor
  }
});

export const constructorReducer = constructorSlice.reducer;
export const selectConstructor = (state: { constructor: ConstructorState }) =>
  state.constructor;
export const { addIngredients, removeIngredient, moveIngredient } =
  constructorSlice.actions;
