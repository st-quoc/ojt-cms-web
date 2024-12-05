import { useState } from 'react';
import axios from 'axios';

const useAddToCart = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addToCart = async ({
    userId,
    productId,
    name,
    price,
    quantity,
    sizeId,
    colorId,
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('/cart', {
        userId,
        productId,
        name,
        price,
        quantity,
        sizeId,
        colorId,
      });
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, error, success };
};

export default useAddToCart;
