import { ProductCard } from '../Product/ProductCard';
import { ProductListItem } from '../Product/ProductListItem';

export const ProductListContainer = ({ products, viewMode }) => {
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
        viewMode === 'list'
          ? 'space-y-4'
          : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
      }
    >
      {products.map(product =>
        viewMode === 'list' ? (
          <ProductListItem product={product} key={product._id} />
        ) : (
          <ProductCard product={product} key={product._id} />
        ),
      )}
    </div>
  );
};

export default ProductListContainer;
