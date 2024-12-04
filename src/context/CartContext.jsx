import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../constants';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userInfo = localStorage.getItem('userInfo');
  const userId = userInfo ? JSON.parse(userInfo).id : null;

  const fetchCart = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_ROOT}/user/cart/list/${userId}`);
      setCartItems(response.data.items || []);
    } catch (err) {
      setError('Failed to fetch cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const addToCart = async item => {
    if (!userId) {
      toast.error('Please log in to add items to the cart!');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.post(`http://localhost:8017/v1/user/cart/add`, {
        userId,
        ...item,
      });

      fetchCart();
      toast.success('Product added to cart!');
    } catch (err) {
      setError('Failed to add product to cart.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, colorId, sizeId) => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:8017/v1/user/cart/remove`, {
        data: { userId, productId, colorId, sizeId },
      });

      fetchCart();
      toast.success('Product removed from cart!');
    } catch (err) {
      setError('Failed to remove product from cart.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, colorId, sizeId, newQuantity) => {
    if (!userId || newQuantity < 1) return;

    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:8017/v1/user/cart/update`, {
        userId,
        productId,
        colorId,
        sizeId,
        quantity: newQuantity,
      });
      fetchCart();
      toast.success('Cart updated successfully!');
    } catch (err) {
      setError('Failed to update cart.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalQuantity,
        getTotalPrice,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
