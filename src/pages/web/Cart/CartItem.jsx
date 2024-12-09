import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatCurrencyVND } from '../../../utils';

const CartItem = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(product.quantity);
  const { updateQuantity, removeFromCart, fetchCart } = useCart();

  const handleQuantityChange = e => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity <= 0) {
      removeFromCart(product.productId, product.color._id, product.size._id);
    } else {
      updateQuantity(
        product.productId,
        product.color._id,
        product.size._id,
        newQuantity,
      );
    }
  };

  const handleQuantityIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(
      product.productId,
      product.color._id,
      product.size._id,
      newQuantity,
    );
  };

  const handleQuantityDecrement = () => {
    const newQuantity = quantity - 1;
    if (newQuantity === 0) {
      removeFromCart(product.productId, product.color._id, product.size._id);
      fetchCart();
    } else {
      updateQuantity(
        product.productId,
        product.color._id,
        product.size._id,
        newQuantity,
      );
    }
  };

  return (
    <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
      <div className="w-full md:max-w-[126px]">
        <img
          src={product.images[0]}
          alt="product image"
          className="mx-auto rounded-xl object-cover"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6
              className="font-semibold text-base leading-7 text-black cursor-pointer"
              onClick={() => navigate(`/product/detail/${product.productId}`)}
            >
              {product.name}
            </h6>
            <h6 className="font-normal text-base leading-7 text-gray-500">
              <strong>Color:</strong> {product.color.name} |
              <strong>Size:</strong> {product.size.name}
            </h6>
            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              <strong>Price:</strong> {formatCurrencyVND(product.price)}
            </h6>
          </div>
        </div>

        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
          <div className="flex items-center h-full">
            <button
              className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
              onClick={handleQuantityDecrement}
            >
              <svg
                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M16.5 11H5.5"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <input
              type="text"
              value={quantity}
              className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
              onChange={handleQuantityChange}
            />
            <button
              className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
              onClick={handleQuantityIncrement}
            >
              <svg
                className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M11 5.5V16.5M16.5 11H5.5"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
            {formatCurrencyVND(product.price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
