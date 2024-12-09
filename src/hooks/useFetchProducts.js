import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../constants';

const useFetchProducts = (filters = {}, currentPage = 1, itemsPerPage = 10) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_ROOT}/user/product/list`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            ...filters,
          },
        });
        const { products, totalProducts } = response.data;

        setProducts(products || []);
        setTotalPages(totalProducts || 0);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage, itemsPerPage]);

  return { products, loading, error, totalPages };
};

export default useFetchProducts;
