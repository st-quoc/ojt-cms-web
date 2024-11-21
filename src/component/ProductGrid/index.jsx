const ProductGrid = ({ products, addToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div
          key={product.id}
          className="p-6 bg-gray-50 border rounded-lg transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg"
        >
          <img
            src={product.image}
            alt={product.name}
            className="mx-auto mb-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
          />
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm md:text-lg text-center">
            ${product.price1.toFixed(2)} - ${product.price2.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(product.id)}
            className="mt-4 px-4 py-2 w-full rounded-lg border-2 border-slate-300 bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
