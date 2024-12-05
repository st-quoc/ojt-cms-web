import { Stack, IconButton, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { formatCurrencyVND } from '../../utils';
import { useNavigate } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const uniqueColors = [
    ...new Map(
      product.variants.map(variant => [variant.color.name, variant.color]),
    ).values(),
  ];

  const [selectedColor, setSelectedColor] = useState(uniqueColors[0]._id);

  const availableSizes = product.variants
    .filter(variant => variant.color._id === selectedColor)
    .map(variant => variant.size);

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]._id);

  const [price, setPrice] = useState(
    product.variants.find(
      variant =>
        variant.color._id === selectedColor &&
        variant.size._id === availableSizes[0]._id,
    )?.price || 'N/A',
  );

  const handleColorChange = e => {
    e.stopPropagation();
    const color = e.target.value;
    setSelectedColor(color);
    const sizes = product.variants
      .filter(variant => variant.color._id === color)
      .map(variant => variant.size);

    setSelectedSize(sizes[0]._id || null);

    updateVariant(color, sizes[0]._id);
  };

  const handleSizeChange = e => {
    e.stopPropagation();
    const size = e.target.value;
    setSelectedSize(size);
    updateVariant(selectedColor, size);
  };

  const updateVariant = (color, size) => {
    const selectedVariant = product.variants.find(
      variant => variant.color._id === color && variant.size._id === size,
    );

    setPrice(selectedVariant?.price || 'N/A');
  };

  const navigate = useNavigate();

  const handleProductDetailClick = e => {
    if (e.target.classList.contains('no-detail')) {
      e.stopPropagation();
      return;
    }
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = e => {
    e.stopPropagation();
    if (price === 'N/A') {
      toast.error('This variant is not available.');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price,
      colorId: selectedColor,
      sizeId: selectedSize,
      quantity: 1,
    });
  };

  return (
    <Box
      onClick={handleProductDetailClick}
      className="cursor-pointer max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border group duration-500 relative transition-transform transform hover:scale-105"
    >
      <IconButton
        aria-label="Add to Cart"
        onClick={handleAddToCart}
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          transition: 'all 0.3s',
          color: price === 'N/A' ? 'gray' : 'orange',
          '&:hover': {
            color: price !== 'N/A' ? 'darkorange' : 'gray',
          },
        }}
        disabled={price === 'N/A'}
      >
        <ShoppingCartIcon />
      </IconButton>
      <Box className="bg-gray-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover aspect-square"
        />
      </Box>

      <Box className="p-4">
        <h2 className="text-md font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h2>

        <Stack spacing={2} direction={'row'}>
          <Box className="w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              <strong>Color</strong>
            </label>
            <select
              value={selectedColor}
              onChange={handleColorChange}
              onClick={e => e.stopPropagation()}
              className="w-full h-7 border-gray-300 rounded-md shadow-md focus:ring-orange-500 focus:border-orange-500 no-detail"
            >
              {uniqueColors.map((color, index) => (
                <option key={index} value={color._id}>
                  {color.name}
                </option>
              ))}
            </select>
          </Box>

          <Box className="w-[50%]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <strong>Size</strong>
            </label>
            {availableSizes.length > 0 ? (
              <select
                value={selectedSize}
                onChange={handleSizeChange}
                onClick={e => e.stopPropagation()}
                className="w-full h-7 border-gray-300 rounded-md shadow-md focus:ring-orange-500 focus:border-orange-500 no-detail"
              >
                {availableSizes.map(size => (
                  <option key={size._id} value={size._id}>
                    {size.name}
                  </option>
                ))}
              </select>
            ) : (
              <Box className="text-sm text-gray-500 italic">
                No sizes available for this color.
              </Box>
            )}
          </Box>
        </Stack>

        <Box className="mt-4">
          <span className="text-gray-500">Price: </span>
          <span className="text-lg font-bold text-orange-500">
            {price !== 'N/A' ? formatCurrencyVND(price) : 'Not Available'}
          </span>
        </Box>
      </Box>
    </Box>
  );
};
