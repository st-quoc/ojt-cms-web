import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/web/HomePage';
import { ProductDetailPage } from '../pages/web/ProductDetail';
import { CartPage } from '../pages/web/Cart';
import { Account } from '../pages/web/Account';
import Checkout from '../pages/web/Checkout';
import { BlogPage } from '../pages/web/BlogPage';
import { BlogDetail } from '../pages/web/BlogPage/BlogDetail';
import { RegisterPage } from '../pages/register';
import NoAccessPage from '../NoAccessPage';
import { AboutUs } from '../pages/web/AboutUs';
import ProductsListPage from '../pages/web/ProductsListPage';

// const AdminLayoutProtectedRoute = ({ children }) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const role = userInfo?.role;

//   if (!['admin', 'manager'].includes(role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// const ProtectedRoute = ({ children, requiredPermissions }) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//   const permissions = userInfo?.permissions || [];

//   const hasPermission = requiredPermissions.every(permission =>
//     permissions.includes(permission),
//   );

//   if (!hasPermission) {
//     return <Navigate to="/no-access" replace />;
//   }

//   return children;
// };

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
        <Route element={<AboutUs />} path="AboutUs" />
      </Route>

      <Route element={<RegisterPage />} path="register" />
      <Route path="/no-access" element={<NoAccessPage />} />
    </Routes>
  );
};
