import { Route, Routes } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProduct';
import { useAppDispatch } from './store/hooks';
import { createProduct } from './store/slices/products/productsSlice';

function App() {
  const dispatch = useAppDispatch();

  return (
    <Routes>
      <Route path="/react-test-task/" element={<ProductsPage />} />
      <Route path="/react-test-task/products/:id" element={<ProductPage />} />
      <Route
        path="/react-test-task/create-product"
        element={
          <CreateProductPage
            onSubmit={(product) => dispatch(createProduct(product))}
          />
        }
      />
    </Routes>
  );
}

export default App;
