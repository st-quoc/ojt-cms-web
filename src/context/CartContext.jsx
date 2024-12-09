import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ROOT } from '../constants';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const userInfo = localStorage.getItem('userInfo');
  const userId = userInfo ? JSON.parse(userInfo).id : null;

  const clearCart = () => setCartItems([]);

  const fetchCart = async () => {
    const userInfo = localStorage.getItem('userInfo');
    const userId = userInfo ? JSON.parse(userInfo).id : null;
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
      await axios.post(`${API_ROOT}/user/cart/add`, {
        userId,
        ...item,
      });

      fetchCart();

      if (!toastVisible) {
        toast.success('Product added to cart!');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
      }
    } catch (err) {
      setError('Failed to add product to cart.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId, colorId, sizeId) => {
    if (!userId) {
      toast.error('You need to be logged in to remove items from the cart.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.delete(`${API_ROOT}/user/cart/remove`, {
        data: { userId, productId, colorId, sizeId },
      });

      fetchCart();

      if (!toastVisible) {
        toast.success('Product removed from cart successfully!');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
      }
    } catch (err) {
      setError('Failed to remove product from cart.');
      if (!toastVisible) {
        toast.error('Failed to remove product. Please try again later.');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 2000);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, colorId, sizeId, newQuantity) => {
    if (!userId) {
      toast.error('You need to be logged in to update item quantity.');
      return;
    }

    if (newQuantity < 1) {
      toast.error(
        'Quantity cannot be less than 1. Please remove the item if you no longer need it.',
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await axios.put(`${API_ROOT}/user/cart/update`, {
        userId,
        productId,
        colorId,
        sizeId,
        quantity: newQuantity,
      });

      fetchCart();

      if (!toastVisible) {
        toast.success(`Cart updated successfully.`);
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 5000);
      }
    } catch (err) {
      setError('Failed to update cart.');
      if (!toastVisible) {
        toast.error('Failed to update quantity. Please try again later.');
        setToastVisible(true);
        setTimeout(() => {
          setToastVisible(false);
        }, 2000);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  const getTotalItems = () => {
    return cartItems.length;
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
        getTotalItems,
        getTotalPrice,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
