import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { IProduct } from '../../services/productTypes';

interface ProductsState {
  items: IProduct[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductsState = {
  items: [],
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 10,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<IProduct[]>) {
      state.items = action.payload;
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    createProduct: {
      reducer(state, action: PayloadAction<IProduct>) {
        state.items.push(action.payload);
      },
      prepare(product: Omit<IProduct, 'id'>) {
        return {
          payload: {
            ...product,
            id: Date.now(),
          },
        };
      },
    },
    sortByPriceAsc: (state) => {
      state.items.sort((a, b) => a.price - b.price);
    },
    sortByPriceDesc: (state) => {
      state.items.sort((a, b) => b.price - a.price);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setProducts,
  deleteProduct,
  createProduct,
  sortByPriceAsc,
  sortByPriceDesc,
  setSearchQuery,
  setCurrentPage,
} = productsSlice.actions;
export default productsSlice.reducer;
