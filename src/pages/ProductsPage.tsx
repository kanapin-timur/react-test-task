import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import Spinner from '../components/Spinner';

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
    <div className="p-10 overflow-hidden">
      <div className="flex flex-col flex-wrap justify-between mb-6 lg:flex-row">
        <div className="flex items-end">
          <Link
            to="/react-test-task/create-product"
            className="font-bold text-2xl hover:underline"
          >
            Create product page
          </Link>
        </div>
        <div className="flex flex-col items-start gap-4 flex-wrap mt-4 xl:mt-0 lg:flex-row lg:items-end">
          <div className="w-80">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search products..."
              className="w-full border py-2 px-3 rounded-lg"
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
          <div className="gap-2 flex">
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
          <div className="flex gap-4">
            <button
              onClick={() => setShowFavoritesOnly(false)}
              className="py-2 px-3 bg-gray-500 text-white rounded-md cursor-pointer font-bold hover:bg-gray-600 transition duration-200"
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
        <div className="font-bold text-2xl text-center">
          No products to display
        </div>
      )}
      {isLoading && (
        <div className="min-h-[516px] flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {error && <div className="text-red-800">{error.toString()}</div>}
      {products.length > 0 && (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {currentItems.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
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
