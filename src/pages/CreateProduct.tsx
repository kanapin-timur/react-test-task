import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

type IForm = {
  title: string;
  price: number;
  image: string;
  description: string;
};

export default function CreateProductPage({
  onSubmit,
}: {
  onSubmit: (data: IForm) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onChange',
  });

  const submit = (data: IForm) => {
    onSubmit({ ...data });
    reset();
  };

  return (
    <div className="flex justify-center items-center flex-col h-screen relative">
      <Link
        to="/react-test-task/"
        className="font-bold text-2xl hover:underline absolute top-4 left-4"
      >
        Home page
      </Link>
      <h1 className="font-bold text-xl mb-6">Create a product card</h1>

      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md min-w-[300px] flex flex-col gap-6"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Title"
            className="w-full py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            {...register('title', {
              required: 'Please enter a title',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters long',
              },
            })}
          />
          {errors.title && (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            placeholder="Price"
            className="w-full py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            {...register('price', {
              required: 'Please enter a price',
              min: { value: 1, message: 'Please enter a price greater than 0' },
              valueAsNumber: true,
            })}
          />
          {errors.price && (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Image URL"
            className="w-full py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            {...register('image', { required: 'Please enter an image URL' })}
          />
          {errors.image && (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">
              {errors.image.message}
            </p>
          )}
        </div>
        <div className="relative">
          <textarea
            placeholder="Description"
            className="w-full py-3 px-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            {...register('description', {
              required: 'Please enter a description',
              minLength: {
                value: 10,
                message: 'Description must be at least 10 characters long',
              },
            })}
          />
          {errors.description && (
            <p className="absolute left-0 top-full text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-3 bg-gray-500 text-white rounded-md cursor-pointer font-bold hover:bg-gray-600 transition duration-200"
        >
          Create
        </button>
      </form>
    </div>
  );
}
