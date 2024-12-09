import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../constants';

const useCartItems = userId => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_ROOT}/user/cart/list/${userId}`,
        );
        setCartItems(response.data.items);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  return { cartItems, loading, error };
};

export default useCartItems;
