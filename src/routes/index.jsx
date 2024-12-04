import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/web/HomePage';
import { LoginPage } from '../pages/login';
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
      <Route element={<LoginPage />} path="login" />
      <Route element={<RegisterPage />} path="register" />
      <Route path="/no-access" element={<NoAccessPage />} />
    </Routes>
  );
};
