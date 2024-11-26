import { Route, Routes, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/web/HomePage';
import { LoginPage } from '../pages/login';
import { ProductDetailPage } from '../pages/web/ProductDetail';
import { ProductsListPage } from '../pages/web/ProductsListPage';
import { CartPage } from '../pages/web/Cart';
import { Account } from '../pages/web/Account';
import Checkout from '../pages/web/Checkout';
import { BlogPage } from '../pages/web/BlogPage';
import { BlogDetail } from '../pages/web/BlogPage/BlogDetail';
import { RegisterPage } from '../pages/register';
import NoAccessPage from '../NoAccessPage';
import { ProductCreateAdmin } from '../pages/admin/Products/create';
import { ProductsListAdmin } from '../pages/admin/Products/list';
import { DetailProductAdmin } from '../pages/admin/Products/detail';
import { ProductEditAdmin } from '../pages/admin/Products/edit';
import { BlogListAdmin } from '../pages/admin/Blogs/list';
import { BlogCreateAdmin } from '../pages/admin/Blogs/create';
import { BlogDetailAdmin } from '../pages/admin/Blogs/detail';
import { BlogEditAdmin } from '../pages/admin/Blogs/edit';
import { AdminLayout } from '../pages/admin';
import { Dashboard } from '../pages/admin/Dashboard';

const AdminLayoutProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const role = userInfo?.role;

  if (!['admin', 'manager'].includes(role)) {
    return <Navigate to="/no-access" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children, requiredPermissions }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const permissions = userInfo?.permissions || [];

  const hasPermission = requiredPermissions.every(permission =>
    permissions.includes(permission),
  );

  if (!hasPermission) {
    return <Navigate to="/no-access" replace />;
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

      <Route
        path="admin"
        element={
          <AdminLayoutProtectedRoute>
            <AdminLayout />
          </AdminLayoutProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route index element={<Dashboard />} path="dashboard" />

        <Route
          element={
            <ProtectedRoute requiredPermissions={['create_product']}>
              <ProductCreateAdmin />
            </ProtectedRoute>
          }
          path="product/create"
        />
        <Route
          element={
            <ProtectedRoute requiredPermissions={['view_product']}>
              <ProductsListAdmin />
            </ProtectedRoute>
          }
          path="products"
        />
        <Route
          element={
            <ProtectedRoute requiredPermissions={['view_product']}>
              <DetailProductAdmin />
            </ProtectedRoute>
          }
          path="product/detail/:productID"
        />
        <Route
          element={
            <ProtectedRoute requiredPermissions={['update_product']}>
              <ProductEditAdmin />
            </ProtectedRoute>
          }
          path="product/edit/:productID"
        />

        <Route
          element={
            <ProtectedRoute requiredPermissions={['view_blog']}>
              <BlogListAdmin />
            </ProtectedRoute>
          }
          path="blogs"
        />
        <Route
          element={
            <ProtectedRoute requiredPermissions={['create_blog']}>
              <BlogCreateAdmin />
            </ProtectedRoute>
          }
          path="blog/create"
        />
        <Route element={<BlogDetailAdmin />} path="blog/detail/:blogID" />
        <Route
          element={
            <ProtectedRoute requiredPermissions={['update_blog']}>
              <BlogEditAdmin />
            </ProtectedRoute>
          }
          path="blog/edit/:blogID"
        />
      </Route>

      <Route element={<LoginPage />} path="login" />
      <Route element={<RegisterPage />} path="register" />
      <Route path="/no-access" element={<NoAccessPage />} />
    </Routes>
  );
};
