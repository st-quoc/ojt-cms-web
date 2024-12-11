import { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import useCartItems from '../../../hooks/useCartItems';
import CartItem from './CartItem';
import { useCart } from '../../../context/CartContext';
import { formatCurrencyVND } from '../../../utils';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../../../constants';

export const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = JSON.parse(localStorage.getItem('userInfo'))?.id;
  const { cartItems, loading, error } = useCartItems(userId);

  const { getTotalPrice, getTotalItems } = useCart();
  const cartQuantity = getTotalItems();
  const totalPrice = getTotalPrice();

  useEffect(() => {
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [totalPrice]);

  useEffect(() => {
    if (!userId) {
      console.error('User ID is undefined or null');
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('success')) {
      const deleteCartItems = async () => {
        try {
          const response = await axios.delete(
            `${API_ROOT}/user/cart/delete-all`,
            { data: { userId } },
          );
          console.log('Cart cleared:', response.data.message);
        } catch (error) {
          console.error(
            'Error clearing cart:',
            error.response?.data || error.message,
          );
        }

        localStorage.removeItem('totalPrice');
      };
      deleteCartItems();
      toast.success('Order placed successfully!');
    }
    if (searchParams.has('payment-fail')) {
      toast.error('Payment fail!');
    }
  }, [location.search, userId]);

  return (
    <>
      <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full  after:top-0 after:right-0 after:bg-gray-50">
        <div className="w-full max-w-7xl px-4 mx-auto relative z-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8">
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

            <div className="col-span-12 md:col-span-4">
              <div
                className="sticky top-4 p-6 bg-white rounded-lg shadow-md"
                id="checkout"
              >
                <h2 className="font-manrope font-bold text-xl leading-10 text-black pb-2 border-b border-gray-300">
                  Order Summary
                </h2>
                <div className="mt-2">
                  <p className="font-medium text-lg leading-8 text-gray-500 mb-4">
                    Total Price:{' '}
                    <span className="font-semibold text-black">
                      {formatCurrencyVND(totalPrice)}
                    </span>
                  </p>
                  <button
                    className="w-full text-center bg-indigo-600 rounded-xl py-1 px-6 font-semibold text-white transition-all duration-500 hover:bg-indigo-700"
                    onClick={() => {
                      navigate(`/checkout`);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
