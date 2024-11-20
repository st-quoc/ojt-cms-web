import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../pages/admin';
import { HomePage } from '../pages/web/HomePage';
import { LoginPage } from '../pages/login';
import { ProductDetailPage } from '../pages/web/ProductDetail';
import { ProductsListPage } from '../pages/web/ProductsList';
import { CartPage } from '../pages/web/Cart';
import { Dashboard } from '../pages/admin/Dashboard';
import { Account } from '../pages/web/Account';
// import PrivateRoute from './PrivateRoute';
import Checkout from '../pages/web/Checkout';
import { BlogPage } from '../pages/web/BlogPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<HomePage />} />
        <Route element={<CartPage />} path="cart" />
        <Route element={<Checkout />} path="checkout" />
        <Route element={<ProductsListPage />} path="products" />
        <Route element={<ProductDetailPage />} path="product/:productId" />
        <Route element={<Account />} path="account" />
        <Route element={<BlogPage />} path="blogs" />
      </Route>

      <Route
        element={
          // <PrivateRoute>
          <AdminLayout />
          // </PrivateRoute>
        }
        path="admin"
      >
        <Route index element={<Dashboard />} />
      </Route>

      <Route element={<LoginPage />} path="login" />
    </Routes>
  );
};
