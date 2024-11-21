import ProductGrid from '../../component/ProductGrid';
import ProductList from '../../component/ProductList';

export const Product = ({ products, viewMode }) => {
  const addToCart = productId => {
    console.log('🛒 Added to cart: ', productId);
  };

  return (
    <>
      {viewMode === 'grid' ? (
        <ProductGrid products={products} addToCart={addToCart} />
      ) : (
        <ProductList products={products} addToCart={addToCart} />
      )}
    </>
  );
};

export default Product;
