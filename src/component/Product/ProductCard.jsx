import { Stack } from '@mui/material';
import { useState } from 'react';

export const ProductCard = ({ product }) => {
  const uniqueColors = [
    ...new Set(product.variants.map(variant => variant.color)),
  ];

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
  const availableSizes = product.variants
    .filter(variant => variant.color === selectedColor)
    .map(variant => variant.size);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || null);

  const [price, setPrice] = useState(
    product.variants.find(
      variant =>
        variant.color === selectedColor && variant.size === availableSizes[0],
    )?.price || 'N/A',
  );

  const handleColorChange = e => {
    const color = e.target.value;
    setSelectedColor(color);

    const sizes = product.variants
      .filter(variant => variant.color === color)
      .map(variant => variant.size);

    setSelectedSize(sizes[0] || null);

    updatePrice(color, sizes[0]);
  };

  const handleSizeChange = e => {
    const size = e.target.value;
    setSelectedSize(size);
    updatePrice(selectedColor, size);
  };

  const updatePrice = (color, size) => {
    const selectedVariant = product.variants.find(
      variant => variant.color === color && variant.size === size,
    );
    setPrice(selectedVariant?.price || 'N/A');
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border group relative transition-transform transform hover:scale-105">
      <div className=" bg-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover aspect-square"
        />
      </div>

      <div className="p-4">
        <h2 className="text-md font-bold text-gray-800 mb-2">{product.name}</h2>

        <Stack spacing={2} direction={'row'}>
          <div className="w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <strong>Color</strong>
            </label>
            <select
              value={selectedColor}
              onChange={handleColorChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            >
              {uniqueColors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          <div className="w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <strong>Size</strong>
            </label>
            {availableSizes.length > 0 ? (
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              >
                {availableSizes.map(size => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-sm text-gray-500 italic">
                No sizes available for this color.
              </div>
            )}
          </div>
        </Stack>

        <div className="mt-4">
          <span className="text-gray-500">Price: </span>
          <span className="text-lg font-bold text-orange-500">
            {price !== 'N/A' ? `$${price}` : 'Not Available'}
          </span>
        </div>

        <button
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full py-2 px-4 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 ${price === 'N/A' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
          disabled={price === 'N/A'}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
