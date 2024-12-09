import { Alert, CircularProgress } from '@mui/material';
import Footer from '../../../component/Footer/Footer';
import Header from '../../../component/Header';
import useCartItems from '../../../hooks/useCartItems';
import CartItem from './CartItem';
import { useCart } from '../../../context/CartContext';
import { formatCurrencyVND } from '../../../utils';
import { useNavigate } from 'react-router-dom';

export const CartPage = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userInfo'))?.id;
  const { cartItems, loading, error } = useCartItems(userId);

  const { getTotalQuantity, getTotalPrice } = useCart();
  const cartQuantity = getTotalQuantity();
  const totalPrice = getTotalPrice();

  return (
    <>
      <Header />
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full  after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 mx-auto relative z-10">
          <div className="grid grid-cols-12">
            <div className="col-span-12  pt-14 pb-8  w-full ">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                  Shopping Cart
                </h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                  {cartQuantity > 1
                    ? `${cartQuantity} Items`
                    : `${cartQuantity} Item`}
                </h2>
              </div>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Alert severity="error">
                  Sorry! An error occurred while loading the cart page
                </Alert>
              ) : (
                cartItems.length > 0 &&
                cartItems.map((product, index) => (
                  <CartItem product={product} key={index} />
                ))
              )}
            </div>
          </div>
        </div>
        <div
          className="w-full py-12"
          style={{
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'white',
            padding: '24px',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="font-manrope font-bold text-xl leading-10 text-black pb-2 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-2">
              <form>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Promo Code
                </label>
                <div className="flex  w-full">
                  <div className="relative w-full flex">
                    <input
                      type="text"
                      className="block w-[90%] h-11 pr-11 pl-5 py-2 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                      placeholder="xxxx xxxx xxxx"
                    />
                    <button className="rounded-lg  bg-black py-2.5 px-4 text-white text-sm font-semibold text-center  transition-all duration-500 hover:bg-black/80">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="font-medium text-xl leading-8 text-black">
                    {cartQuantity > 1
                      ? `${cartQuantity} Items`
                      : `${cartQuantity} Item`}
                  </p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">
                    {formatCurrencyVND(totalPrice)}
                  </p>
                </div>
                <button
                  className="w-full text-center bg-indigo-600 rounded-xl py-1 px-6 font-semibold  text-white transition-all duration-500 hover:bg-indigo-700"
                  onClick={() => navigate(`/checkout`)}
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};
