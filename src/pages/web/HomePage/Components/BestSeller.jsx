import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListContainer from '../../../../component/ProductGrid';
import { API_ROOT } from '../../../../constants';

export const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_ROOT}/user/product/list`, {
        params: {
          page: 2,
          limit: 4,
        },
      });
      const { products: fetchedProducts } = response.data;
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section id="bestseller" className="py-12 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">TRENDING PRODUCTS</h2>
      <div className="flex justify-center space-x-8 mb-4">
        <button className="text-sm text-gray-700 border-b-2 border-black px-4">
          BESTSELLER PRODUCTS
        </button>
        <button
          className="text-sm text-gray-500 px-4"
          onClick={() => {
            window.location.href = '#trending';
          }}
        >
          TRENDING PRODUCTS
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="w-full max-w-6xl px-4">
            <ProductListContainer products={products} />
          </div>
        </div>
      )}
    </section>
  );
};

export default BestSeller;
