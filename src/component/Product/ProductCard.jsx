import { Stack } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const ProductCard = ({ product }) => {
  const uniqueColors = [
    ...new Set(product.variants.map(variant => variant.color.name)),
  ];
  const colorIds = product.variants.map(variant => variant.color._id);

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]);
  const availableSizes = product.variants
    .filter(variant => variant.color.name === selectedColor)
    .map(variant => variant.size.name);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0] || null);
  const [variantId, setVariantId] = useState(null); // Track the variant ID

  const [price, setPrice] = useState(
    product.variants.find(
      variant =>
        variant.color.name === selectedColor &&
        variant.size.name === availableSizes[0],
    )?.price || 'N/A',
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleColorChange = e => {
    const color = e.target.value;
    setSelectedColor(color);

    const sizes = product.variants
      .filter(variant => variant.color.name === color)
      .map(variant => variant.size.name);

    setSelectedSize(sizes[0] || null);

    updateVariant(color, sizes[0]);
  };

  const handleSizeChange = e => {
    const size = e.target.value;
    setSelectedSize(size);
    updateVariant(selectedColor, size);
  };

  const updateVariant = (color, size) => {
    const selectedVariant = product.variants.find(
      variant => variant.color.name === color && variant.size.name === size,
    );

    setPrice(selectedVariant?.price || 'N/A');
    setVariantId(selectedVariant?.id || null);
  };

  const userInfo = localStorage.getItem('userInfo');
  const userId = userInfo ? JSON.parse(userInfo).id : null;

  const addToCart = async () => {
    if (price === 'N/A') return;

    setLoading(true);
    setError(null);

    try {
      // Find the index of the selected color
      const colorIndex = uniqueColors.indexOf(selectedColor);
      const selectedColorId = colorIds[colorIndex];

      const sizeIndex = product.variants.find(
        variant =>
          variant.size.name === selectedSize &&
          variant.color.name === selectedColor,
      );
      const selectedSizeId = sizeIndex ? sizeIndex.size._id : null;

      const response = await fetch('http://localhost:8017/v1/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          productId: product.id,
          variantId: variantId,
          quantity: 1,
          name: product.name,
          price,
          size: selectedSizeId,
          color: selectedColorId, // Add the selected colorId
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Product added to cart!');
        //set time out to reload the page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast.success('Product created successfully!');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to add product to cart.', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border group relative transition-transform transform hover:scale-105">
      <div className="bg-gray-200">
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
          onClick={addToCart}
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full py-2 px-4 rounded-md transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 ${
            price === 'N/A' || loading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
          disabled={price === 'N/A' || loading}
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>

        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
};
