import React from 'react';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setProducts,
  sortByPriceAsc,
  sortByPriceDesc,
  setSearchQuery,
  setCurrentPage,
} from '../store/slices/products/productsSlice';
import { useGetProductsQuery } from '../store/services/productApi';
import ProductItem from '../components/ProductItem';
import { Link } from 'react-router-dom';

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetProductsQuery();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const products = useAppSelector((state) => state.products.items);
  const favourites = useAppSelector((state) => state.favorites.ids);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const currentPage = useAppSelector((state) => state.products.currentPage);
  const itemsPerPage = useAppSelector((state) => state.products.itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(
    (showFavoritesOnly
      ? products.filter((product) => favourites.includes(product.id)).length
      : products.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        ).length) / itemsPerPage
  );

  const filteredProducts = showFavoritesOnly
    ? products.filter((product) => favourites.includes(product.id))
    : products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    if (data && products.length === 0) dispatch(setProducts(data));
  }, [data, dispatch, products.length]);

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <div className="flex items-end">
          <Link
            to="/react-test-task/create-product"
            className="font-bold text-2xl hover:underline mr-10"
          >
            Create product page
          </Link>
        </div>
        <div className="flex flex-wrap items-end">
          <input
            type="text"
            value={searchQuery}
            placeholder="Поиск..."
            className="border py-2 px-3 rounded-lg mr-6 min-w-[300px]"
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <div className="mr-6 gap-4 flex flex-wrap">
            <button
              className="font-bold cursor-pointer"
              onClick={() => dispatch(sortByPriceAsc())}
            >
              Price: Low to High ↑
            </button>
            <button
              className="font-bold cursor-pointer"
              onClick={() => dispatch(sortByPriceDesc())}
            >
              Price: High to Low ↓
            </button>
          </div>
          <div>
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="py-2 px-3 bg-gray-500 text-white rounded-md mr-3 cursor-pointer font-bold hover:bg-gray-600 transition duration-200"
            >
              Show all
            </button>
            <button
              onClick={() => {
                setShowFavoritesOnly(true);
                dispatch(setCurrentPage(1));
              }}
              className="py-2 px-3 bg-gray-500 text-white rounded-md cursor-pointer font-bold hover:bg-gray-600 transition duration-200"
            >
              Show favorites
            </button>
          </div>
        </div>
      </div>
      {filteredProducts.length === 0 && !isLoading && !error && (
        <div className="font-bold text-4xl">No products to display.</div>
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-800">{error.toString()}</div>}
      {products.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {currentItems.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        >
          Back
        </button>

        <span className="px-3 py-1">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;
