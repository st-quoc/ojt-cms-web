import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from '../pages/admin';
import { HomePage } from '../pages/web/HomePage';
import { LoginPage } from '../pages/login';
import { ProductDetailPage } from '../pages/web/ProductDetail';
import { ProductsListPage } from '../pages/web/ProductsListPage';
import { CartPage } from '../pages/web/Cart';
import { Dashboard } from '../pages/admin/Dashboard';
import { Account } from '../pages/web/Account';
import Checkout from '../pages/web/Checkout';
import { BlogPage } from '../pages/web/BlogPage';
import { BlogDetail } from '../pages/web/BlogPage/BlogDetail';
import { RegisterPage } from '../pages/register';
import { ProductCreateAdmin } from '../pages/admin/Products/create';
import { ProductsListAdmin } from '../pages/admin/Products/list';
import { DetailProductAdmin } from '../pages/admin/Products/detail';
import { ProductEditAdmin } from '../pages/admin/Products/edit';

const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

const ProtectedRoute = ({ children }) => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
        <Route element={<BlogDetail />} path="blog/:blogId" />
      </Route>

      <Route element={<AdminLayout />} path="admin">
        <Route
          path="history-order"
          element={
            <ProtectedRoute>{/* <HistoryOrderPage /> */}</ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="admin"
        element={
          // <ProtectedRoute role="admin">
          <AdminLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route index element={<Dashboard />} path="dashboard" />
        <Route element={<ProductsListAdmin />} path="products" />
        <Route element={<ProductCreateAdmin />} path="product/create" />
        <Route
          element={<DetailProductAdmin />}
          path="product/detail/:productID"
        />
        <Route element={<ProductEditAdmin />} path="product/edit/:productID" />
      </Route>

      <Route element={<LoginPage />} path="login" />
      <Route element={<RegisterPage />} path="register" />
    </Routes>
  );
};
