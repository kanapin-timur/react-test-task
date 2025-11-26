import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './services/productApi';
import productsSlice from './slices/products/productsSlice';
import favoritesSlice from './slices/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    products: productsSlice,
    favorites: favoritesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
