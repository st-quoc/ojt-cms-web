import { ProductCard } from '../Product/ProductCard';

export const ProductListContainer = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div
      className={
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      }
    >
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductListContainer;
