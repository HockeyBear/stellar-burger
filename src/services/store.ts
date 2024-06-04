import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { constructorReducer } from './slices/constructorSlice';
import { orderReducer } from './slices/orderSlice';
import { userAuthReducer } from './slices/userSlice';
import { makeOrderReducer } from './slices/makeOrderSlice';
import { orderUserReducer } from './slices/orderUserSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorBuilder: constructorReducer, // конструктор рзарезервирован надо поменять ему имя (особенно для названий полей объектов)
  orders: orderReducer,
  ordersUser: orderUserReducer,
  userAuth: userAuthReducer,
  makeOrder: makeOrderReducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
