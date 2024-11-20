export const Product = ({ products, viewMode }) => {
  return (
    <div>
      {products.map(product => (
        <div
          key={product.id}
          className={`border rounded-lg overflow-hidden ${viewMode === 'list' ? 'flex items-center' : ''}`}
        >
          <img src={product.image} alt={product.name} />
          <div className="p-4">
            <div className="text-center items-center mt-2">
              <h3 className="font-semibold text-lg">
                {product.brand.BrandName}
              </h3>
              <p className="text-gray-500">{product.name}</p>
              <p className="text-xl font-semibold">${product.price1}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
