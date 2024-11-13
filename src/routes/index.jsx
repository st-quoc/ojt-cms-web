import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../pages/admin';
import { HomePage } from '../pages/web/HomePage';
import { LoginPage } from '../pages/login';
import { ProductDetailPage } from '../pages/web/ProductDetail';
import { ProductsListPage } from '../pages/web/ProductsList';
import { CartPage } from '../pages/web/Cart';
import PrivateRoute from './PrivateRoute';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/cart" element={<CartPage />} />
        <Route exact path="/products" element={<ProductsListPage />} />
        <Route
          exact
          path="/product/:productID"
          element={<ProductDetailPage />}
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute roleRequired="admin">
              <AdminLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
