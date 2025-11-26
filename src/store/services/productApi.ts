import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IProduct } from './productTypes';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
