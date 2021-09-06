import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/products/productsSlice';

export const store = configureStore({
  reducer: {
      productList: productsReducer
  },
});