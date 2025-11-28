import React from 'react';
import { useState } from 'react';
import { useForm, type FieldErrors } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  deleteProduct,
  updateProduct,
} from '../store/slices/products/productsSlice';
import type { IProduct } from '../store/services/productTypes';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { toggleFavorite } from '../store/slices/favorites/favoritesSlice';

const ProductItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm<IProduct>({
    defaultValues: { title: product.title, price: product.price },
  });
  const dispatch = useAppDispatch();
  const favourites = useAppSelector((state) => state.favorites.ids);

  const isLiked = favourites.includes(product.id);

  const onSubmit = (data: IProduct) => {
    dispatch(
      updateProduct({
        ...product,
        title: data.title,
        price: Number(data.price),
      })
    );
    setIsEditing(false);
  };

  const onError = (errors: FieldErrors<IProduct>) => {
    const messages = Object.values(errors)
      .map((err) => err.message)
      .filter(Boolean);
    if (messages.length) {
      alert(messages.join('\n'));
    }
  };

  const cancelEditing = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(false);
    reset();
  };

  return (
    <Link
      to={`/react-test-task/products/${product.id}`}
      className="h-[250px] rounded-xl p-3 shadow-sm bg-gray-200 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl"
      draggable={false}
    >
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-[100px] h-[150px] object-contain"
          aria-label={`Image of ${product.title}`}
        ></img>
      </div>

      {!isEditing && (
        <div className="flex items-center justify-between mt-7">
          <div className="font-medium text-sm overflow-hidden text-ellipsis whitespace-nowrap mr-5">
            {product.title}
          </div>
          <div className="text-sm">${product.price}</div>
        </div>
      )}

      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-7">
          <div className="flex justify-between mb-1">
            <input
              {...register('title', {
                required: 'Please enter a title',
                minLength: {
                  value: 3,
                  message: 'Title must be at least 3 characters long',
                },
                maxLength: {
                  value: 70,
                  message: 'Title must be at most 70 characters long',
                },
              })}
              className="text-sm font-medium overflow-hidden text-ellipsis whitespace-nowrap w-full focus:outline-none"
              onClick={(e) => e.preventDefault()}
            />

            <input
              type="number"
              step="0.01"
              {...register('price', {
                required: 'Please enter a price',
                min: {
                  value: 1,
                  message: 'Please enter a price greater than 0',
                },
                pattern: {
                  value: /^\d+([.]\d+)?$/,
                  message: 'Please enter a valid price',
                },
              })}
              className="text-sm max-w-[50px] text-right focus:outline-none"
              onClick={(e) => e.preventDefault()}
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              type="submit"
              className="text-sm py-1 px-2 font-medium bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              aria-label="Save Product"
            >
              Save
            </button>
            <button
              className="text-sm py-1 px-2 font-medium bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200 cursor-pointer"
              onClick={cancelEditing}
              aria-label="Cancel Editing"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!isEditing && (
        <div className="flex justify-end gap-2 mt-3">
          {isLiked ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(toggleFavorite(product.id));
              }}
              className="cursor-pointer"
              aria-label="Unlike Product"
            >
              <AiFillLike
                size={20}
                className="hover:scale-110 transition duration-200"
              />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(toggleFavorite(product.id));
              }}
              className="cursor-pointer"
              aria-label="Like Product"
            >
              <AiOutlineLike
                size={20}
                className="hover:scale-110 transition duration-200"
              />
            </button>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(deleteProduct(product.id));
            }}
            className="cursor-pointer"
            aria-label="Delete Product"
          >
            <FaTrash
              size={18}
              className="hover:scale-110 transition duration-200"
            />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="cursor-pointer"
            aria-label="Edit Product"
          >
            <FaPencilAlt
              size={18}
              className="hover:scale-110 transition duration-200"
            />
          </button>
        </div>
      )}
    </Link>
  );
};

export default ProductItem;
