import React from 'react';
import { useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useAppSelector } from '../store/hooks';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = useAppSelector((state) => state.products.items);

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="p-10">
      <button
        onClick={() => window.history.back()}
        className="mb-10 font-bold text-2xl hover:underline cursor-pointer"
      >
        <IoMdArrowRoundBack className="inline-block mr-2 pb-1" />
        Back
      </button>
      <img
        src={product.image}
        alt={product.title}
        className="w-[300px] h-[350px] mb-10 object-contain m-auto"
      />
      <h1 className="mb-6 font-bold text-4xl text-center">{product.title}</h1>
      <p className="text-2xl mb-6">{product.description}</p>
      <p className="font-bold text-2xl text-center">Price: ${product.price}</p>
    </div>
  );
};

export default ProductPage;
