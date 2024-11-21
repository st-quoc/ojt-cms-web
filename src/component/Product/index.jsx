export const Product = ({ product }) => {
  const addToCart = productId => {
    console.log('ᥫᩣ:rocket:  productId  :rocket:ᥫᩣ ', productId);
  };
  return (
    <div className="p-6 bg-gray-50 border rounded-lg transform transition duration-300 hover:scale-105 shadow-md hover:shadow-lg">
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto mb-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover"
      />
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
        {product.name}
      </h3>
      <p className="text-gray-500 text-sm md:text-lg">{product.items} items</p>
      <button
        onClick={productId => addToCart(productId)}
        className="border-2 border-slate-300 mt-4 px-4 py-2 rounded-lg bg-zinc-200 hover:bg-zinc-700 hover:text-gray-100 transition"
      >
        Add to cart
      </button>
    </div>
  );
};
