import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { deleteProduct } from '../store/slices/products/productsSlice';
import type { IProduct } from '../store/services/productTypes';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { toggleFavorite } from '../store/slices/favorites/favoritesSlice';

const ProductItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favorites.ids);

  const isLiked = favourites.includes(product.id);

  return (
    <Link
      to={`/react-test-task/products/${product.id}`}
      className="h-[250px] rounded-xl p-3 shadow-sm bg-gray-200"
    >
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-[100px] h-[150px] object-contain"
        ></img>
      </div>
      <div className="flex items-center justify-between mt-7">
        <div className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap mr-5">
          {product.title}
        </div>
        <div className="text-sm">${product.price}</div>
      </div>
      <div className="flex justify-end mt-3">
        {isLiked ? (
          <AiFillLike
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleFavorite(product.id));
            }}
            size={20}
            className="mr-2 hover:scale-110 transition duration-200"
          />
        ) : (
          <AiOutlineLike
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleFavorite(product.id));
            }}
            size={20}
            className="mr-2 hover:scale-110 transition duration-200"
          />
        )}

        <FaTrash
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(deleteProduct(product.id));
          }}
          size={18}
          className="hover:scale-110 transition duration-200"
        />
      </div>
    </Link>
  );
};

export default ProductItem;
