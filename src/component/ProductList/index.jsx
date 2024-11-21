const ProductList = ({ products, addToCart }) => {
  return (
    <div className="space-y-4">
      {products.map(product => (
        <div
          key={product.id}
          className="flex items-center p-4 bg-gray-50 border rounded-lg shadow-md hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg mr-4"
          />
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-500 text-sm md:text-lg">
              ${product.price1.toFixed(2)} - ${product.price2.toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="ml-4 px-4 py-2 rounded-lg border-2 border-slate-300 bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
