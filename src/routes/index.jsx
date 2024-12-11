import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/web/HomePage';
import { ProductDetailPage } from '../pages/web/ProductDetail';
import { CartPage } from '../pages/web/Cart';
import { Account } from '../pages/web/Account';
import Checkout from '../pages/web/Checkout';
import { BlogPage } from '../pages/web/BlogPage';
import { BlogDetail } from '../pages/web/BlogPage/BlogDetail';
import { AboutUs } from '../pages/web/AboutUs';
import ProductsListPage from '../pages/web/ProductsListPage';
import { NotFound } from '../404';
import Profile from '../pages/web/Account/profile';
import OrderHistory from '../pages/web/Order/Index';
import ResetPassword from '../reset-password';

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
        <Route element={<BlogDetail />} path="/blog/:id" />
        <Route element={<AboutUs />} path="about-us" />
        <Route element={<Profile />} path="profile" />
        <Route element={<OrderHistory />} path="order" />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
};
